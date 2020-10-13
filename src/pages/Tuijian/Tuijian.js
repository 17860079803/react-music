import React, { Component } from 'react'
import { connect } from "react-redux"
// 子组件引入
import Banner from './components/Banner/Banner'
import Songs from "./components/Songs/Songs"
import News from "./components/News/News"
// 仓库属性方法引入
import { banner, reqBannerAction, tuijian, reqTuijianAction, news, reqNewsAction } from '../../store/modules/tuijian'
class Tuijian extends Component {
    componentDidMount() {
        const { reqBanner, reqTuijian, reqNews } = this.props;
        reqBanner() // 触发banner
        reqTuijian() // 触发推荐歌单
        reqNews() // 触发最新歌曲
    }
    // 歌单详情
    toPlayList(id) {
        this.props.history.push("/playlist/" + id)
    }
    // 去听音乐
    toSong(id) {
        this.props.history.push("/song/" + id)
    }
    render() {
        const { banner, tuijian, news } = this.props
        return (
            <div className="index">
                {banner.length > 0 ? <Banner banner={banner}></Banner> : null}
                {tuijian.length > 0 ? < Songs tuijian={tuijian} toPlayList={(id) => this.toPlayList(id)}></Songs> : null}
                {news.length > 0 ? <News news={news} toSong={(id) => this.toSong(id)} ></News> : null}
                <div className="footer">
                <a href="https://github.com/17860079803/react-music.git">觉得不错来github点个start吧</a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        banner: banner(state),
        tuijian: tuijian(state),
        news: news(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reqBanner: () => dispatch(reqBannerAction()),
        reqTuijian: () => dispatch(reqTuijianAction()),
        reqNews: () => dispatch(reqNewsAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tuijian)