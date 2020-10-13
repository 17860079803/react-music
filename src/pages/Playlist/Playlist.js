import React, { Component } from 'react'
import { connect } from 'react-redux'
// 引入子组件
import List from "./components/List/List"
import Top from "./components/Top/Top"
// 引入仓库
import { playlist, reqPlayListAction } from '../../store/modules/playlist'
class Playlist extends Component {
    componentDidMount() {
        const { reqPlayList } = this.props
        let id = this.props.match.params.id
        reqPlayList(id) // 触发歌单列表
    }
    // 去听音乐
    toSong(id) {
        this.props.history.push("/song/" + id)
    }
    render() {
        const { playlist } = this.props
        return (
            <div className="playlist">
                {playlist.id ? <Top playlist={playlist}></Top> : null}
                {playlist.id ? <List playlist={playlist} toSong={(id)=>this.toSong(id)}></List> : null}
                <div className="footer">
                    <a href="https://github.com/17860079803/react-music.git">觉得不错来github点个start吧</a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        playlist: playlist(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reqPlayList: (id) => dispatch(reqPlayListAction(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist)