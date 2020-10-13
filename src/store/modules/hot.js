import { reqHotList } from "../../utils/requset"

// 1.初始数据
const initState = {
    hotlist: [], // 列表
    hottime: ""  // 时间
}

// 2.reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "changeHotList":
            return {
                ...state,
                hotlist: action.hotlist
            }
        case "changeHotTime":
            return {
                ...state,
                hottime: action.hottime
            }
        default:
            return state
    }
}

// 3.action
const changeHotListAction = (hotlist) => {
    return { type: "changeHotList", hotlist }
}
const changeHotTimeAction = (hottime) => {
    return { type: "changeHotTime", hottime }
}

// 4.组件触发action
export const reqHotListAction = () => {
    return (dispatch, getState) => {
        const { hotlist } = getState().hot
        if (hotlist.length > 0) {
            return;
        }
        reqHotList({ id: 3778678 }).then(res => {
            let time = new Date(res.data.playlist.updateTime)
            let m = (time.getMonth() + 1 + "").padStart(2, '0');
            let d = (time.getDate() + "").padStart(2, '0')
            let hottime = m + '月' + d + "日"
            dispatch(changeHotListAction(res.data.playlist.tracks))
            dispatch(changeHotTimeAction(hottime))
        })
    }
}


// 5.导出数据
export const hotlist = state => state.hot.hotlist
export const hottime = state => state.hot.hottime

export default reducer;