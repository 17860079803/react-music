import { reqBanner, reqTuijian, reqNews } from "../../utils/requset"
// 1.初始数据
const initState = {
    banner: [], // 轮播图数据
    tuijian: [], // 推荐歌单
    news: [] // 最新音乐
}

// 2.reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "changeBanner":
            return {
                ...state,
                banner: action.banner
            }
        case "changeTuijian":
            return {
                ...state,
                tuijian: action.tuijian
            }
        case "changeNews":
            return {
                ...state,
                news: action.news
            }
        default:
            return state
    }
}

// 3.action
// 修改banner
const changeBannerAction = (banner) => {
    return { type: "changeBanner", banner }
}
// 修改推荐歌单
const changeTuijianAction = (tuijian) => {
    return { type: "changeTuijian", tuijian }
}
// 修改最新音乐
const changeNewsAction = (news) => {
    return { type: "changeNews", news }
}

// 4.组件触发action
// 触发修改banner
export const reqBannerAction = () => {
    return (dispatch, getState) => {
        const { banner } = getState().tuijian
        if (banner.length > 0) {
            return
        }
        reqBanner({ type: 1 }).then(res => {
            dispatch(changeBannerAction(res.data.banners))
        })
    }
}
// 触发修改推荐歌单
export const reqTuijianAction = () => {
    return (dispatch, getState) => {
        const { tuijian } = getState().tuijian
        if (tuijian.length > 0) {
            return
        }
        reqTuijian({ limit: 6 }).then(res => {
            dispatch(changeTuijianAction(res.data.result))
        })
    }
}
// 触发修改最新音乐
export const reqNewsAction = () => {
    return (dispatch, getState) => {
        const { news } = getState().tuijian
        if (news.length > 0) {
            return
        }
        reqNews().then(res => {
            dispatch(changeNewsAction(res.data.result))
        })
    }
}

// 5.导出数据
export const banner = state => state.tuijian.banner;
export const tuijian = state => state.tuijian.tuijian;
export const news = state => state.tuijian.news;

export default reducer;