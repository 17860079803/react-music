import React, { Component } from 'react'
import { connect } from "react-redux"
// 引入仓库
import { songurl, reqSongAction, songdetail, songlyric } from '../../store/modules/song'
class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isok: false, // 定义开关
            index: 0, //记录歌词位置
        }
        // 获取DOM节点
        this.audiou = React.createRef() // 播放器
        this.outer = React.createRef() // 歌词外
        this.inner = React.createRef() // 歌词内

        const { reqSong } = this.props
        let id = this.props.match.params.id
        reqSong(id) // 触发音乐获取url,img,lyc
    }
    componentWillReceiveProps(nextProps) {
        const songlyric = nextProps.songlyric
        if (songlyric.length > 0 && this.audiou.current) {
            this.playAudio(songlyric) // 歌曲播放
        }
    }
    // 歌曲播放
    playAudio(songlyric) {
        let audio = this.audiou.current // 播放器dom
        let inner = this.inner.current; // 歌词小盒子dom
        let outerH = this.outer.current.clientHeight // 歌词大盒子的高度
        let itemH = outerH / 3; // 一行歌词的高度
        // 监听播放器时间更改
        audio.ontimeupdate = () => {
            // 当前播放时间
            let currentTime = audio.currentTime; // 歌曲当前时间 80.132324--'01:20' 
            // let duration = audio.duration; // 歌曲总时间 183.12332
            // 转换时间格式
            let transTime = (Math.floor(currentTime / 60) + '').padStart(2, '0') + ":" + (Math.floor(currentTime % 60) + '').padStart(2, '0') // 当前时间
            // let transTime2 = (Math.floor(duration / 60) + '').padStart(2, '0') + ":" + (Math.floor(duration % 60) + '').padStart(2, '0') // 总时间

            // let transTime = (Math.floor(currentTime / 60) + '').padStart(2, '0') + ":" + (Math.floor(currentTime % 60) + '').padStart(2, '0')+((currentTime-Math.floor(currentTime)+'').slice(1,5)) // 当前时间  9位

            // 当歌曲当前时间和歌词里time时间一致，跳转歌词
            let index = songlyric.findIndex(item => item.time === transTime)

            // 通过计数器比较歌词
            // let index = 0;
            // for (let i = 0; i < songlyric.length; i++) {
            //     index = i;
            //     if (songlyric[i].num > currentTime) {
            //         break;
            //     }
            // }
            // console.log(index);

            if (index === -1) {
                return;
            }
            this.setState({
                index
            })
            inner.style.top = -(index - 1) * itemH + "px"
        }
    }
    // 操作歌词
    start(e) {
        this.startY = e.touches[0].clientY; // 点击起点y坐标
        this.endY = 0; // 每次点击清空结束y坐标
    }
    move(e) {
        this.endY = e.touches[0].clientY;
    }
    end(e) {
        let audio = this.audiou.current
        let inner = this.inner.current;
        let outerH = this.outer.current.clientHeight // 歌词大盒子的高度
        let itemH = outerH / 3; // 一行歌词的高度
        let { songlyric } = this.props
        let { index } = this.state
        if (this.endY === 0) {
            return;
        }
        if (this.startY > this.endY + 15) {//上
            index += 1;
            if (index >= songlyric.length - 1) {
                index = songlyric.length - 1
            }
        }
        if (this.endY > this.startY + 15) {//下
            index -= 1;
            if (index <= 0) {
                index = 0;
            }
        }
        this.setState({
            index
        })
        inner.style.top = -(index - 2) * itemH + "px"
        let time = songlyric[index].time; //'01:06'---66
        let transTime = parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]); //66
        audio.currentTime = transTime;

        // 滑动歌词,开启唱
        this.setState({
            isok: true
        }, () => {
            setTimeout(() => {
                audio.play() // 播放
            }, 500)
        })
    }
    // 开始/暂停
    onPlay() {
        this.setState({
            isok: !this.state.isok
        }, () => {
            let audio = this.audiou.current
            if (this.state.isok) {
                setTimeout(() => {
                    audio.play() // 播放
                }, 500)
            } else {
                audio.pause() //暂停
            }
        })
    }
    render() {
        const { isok, index } = this.state
        const { songurl, songdetail, songlyric } = this.props
        return (
            <div className="song">
                {songdetail.id ? <div className="song_bg" style={{ backgroundImage: `url("${songdetail.al.picUrl}")` }}></div> : null}
                <div className="back" onClick={() => this.props.history.go(-1)}>&lt;</div>
                <div className="song_wrap" onClick={() => this.onPlay()}>
                    <div className={isok ? "song_disc circling" : "song_disc"}>
                        <div className="song_turn">
                            <div className="song_rollwrap">
                                {songdetail.id ? <div className={isok ? "song_img song_circling" : "song_img song_circling song_pause"}>
                                    <img src={songdetail.al.picUrl + "?param=360y360"} alt="" />
                                </div> : null}
                            </div>
                            <div className="song_lgour">
                                <div className={isok ? "song_light song_circling" : "song_light song_circling song_pause"}></div>
                            </div>
                        </div>
                        {isok ? null : <div className="song_plybtn"></div>}
                    </div>
                </div>
                {/* 名字-坐着 */}
                {songdetail.id ? <div className="song_name"><span>{songdetail.name}</span>-<b>{
                    songdetail.ar.length > 1 ? songdetail.ar.map((i, index) => {
                        return (<i key={i.id}>{i.name}{index < 1 ? ' / ' : null}</i>)
                    }) : songdetail.ar.map(i => {
                        return (<i key={i.id}>{i.name}</i>)
                    })
                }</b></div> : null}

                {/* 歌词 */}
                <div className="outer" ref={this.outer}
                    onTouchStart={(e) => this.start(e)}
                    onTouchMove={(e) => this.move(e)}
                    onTouchEnd={(e) => this.end(e)}>
                    <div className="inner" ref={this.inner}>
                        {songlyric.length > 0 ? songlyric.map((item, i) => {
                            return (
                                <div key={i} className={i === index ? "songitem select" : "songitem"}>{item.lyc}</div>
                            )
                        }) : <p className="des">暂无歌词</p>}
                    </div>
                </div>
                {/* 播放器 */}
                {songurl ? <audio src={songurl.url} ref={this.audiou}></audio> : null}
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        songurl: songurl(state),
        songdetail: songdetail(state),
        songlyric: songlyric(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reqSong: (id) => dispatch(reqSongAction(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Song)