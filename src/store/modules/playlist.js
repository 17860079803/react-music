import { reqPlayList } from "../../utils/requset"

// 1.初始数据
const initState = {
    playlist: {} // 歌单列表
}

// 2.reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "changePlayList":
            return {
                ...state,
                playlist: action.playlist
            }
        default:
            return state
    }
}

// 3.action
const changePlayListAction = (playlist) => {
    return { type: "changePlayList", playlist }
}

// 4.组件触发action
export const reqPlayListAction = (id) => {
    return (dispatch, getState) => {
        // 请求过来的id是number，路径取的是字符串
        if (id === getState().playlist.playlist.id + '') {
            return;
        } else {
            dispatch(changePlayListAction({}))
        }
        reqPlayList({ id: id }).then(res => {
            dispatch(changePlayListAction(res.data.playlist))
        })
    }
}

// 5.导出数据
export const playlist = state => state.playlist.playlist

export default reducer