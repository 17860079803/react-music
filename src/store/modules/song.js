import {
    reqSongUrl,
    reqSongImg,
    reqSongLyric
} from "../../utils/requset"

// 1.初始数据
const initState = {
    songurl: "", // 音乐url
    songdetail: {}, // 音乐详情
    songlyric: [] // 歌词
}

// 2.reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "changeSongUrl":
            return {
                ...state,
                songurl: action.songurl
            }
            case "changeSongDetail":
                return {
                    ...state,
                    songdetail: action.songdetail
                }
                case "changeSongLyric":
                    return {
                        ...state,
                        songlyric: action.songlyric
                    }
                    default:
                        return state
    }
}

// 3.action
// 修改音乐url
const changeSongUrlAction = (songurl) => {
    return {
        type: "changeSongUrl",
        songurl
    }
}
// 修改音乐详情
const changeSongDetailAction = (songdetail) => {
    return {
        type: "changeSongDetail",
        songdetail
    }
}
// 修改音乐歌词
const changeSongLyircAction = (songlyric) => {
    return {
        type: "changeSongLyric",
        songlyric
    }
}

// 4.组件触发action
// 触发修改音乐url，音乐img
export const reqSongAction = (id) => {
    return (dispatch, getState) => {
        if (id === getState().song.songurl.id + "") {
            return;
        } else {
            dispatch(changeSongUrlAction(""));
            dispatch(changeSongDetailAction({}))
            dispatch(changeSongLyircAction([]))
        }
        reqSongUrl({
            id: id
        }).then(res => {
            dispatch(changeSongUrlAction(res.data.data[0]))
        })
        reqSongImg({
            ids: id
        }).then(res => {
            dispatch(changeSongDetailAction(res.data.songs[0]))
        })
        reqSongLyric({
            id: id
        }).then(res => {
            //如果有歌词,进行歌词处理
            if (res.data.lrc) {
                let lyric = res.data.lrc.lyric;
                // 依据[分割成数组 第一位空切割
                let arr = lyric.split("[").slice(1)
                // 定义个空数组接收数据
                let result = []
                arr.forEach(item => {
                    // item- '00:00.000] 作曲 : 姚六一'
                    let itemArr = item.split("]") //['00:00.000','作曲 : 姚六一']

                    // let time=(itemArr[0].slice(0, 9)).padEnd(9,'0');//01:01.010
                    // let transTime=time.split(":")
                    // let num=parseInt(transTime[0])*60+parseInt(transTime[1].split(".")[0])+Math.floor(transTime[1].split(".")[1])/1000

                    result.push({
                        // time: (itemArr[0].slice(0, 9)).padEnd(9, '0'),
                        time: itemArr[0].slice(0, 5), // 截取时间 "00:00"
                        lyc: itemArr[1],
                        // num:num
                    })
                })
                // 剔除歌词是空的
                let songlyric = result.filter(item => item.lyc !== "\n")
                dispatch(changeSongLyircAction(songlyric))
            }

        })
    }
}
// 5.导出数据
export const songurl = state => state.song.songurl
export const songdetail = state => state.song.songdetail
export const songlyric = state => state.song.songlyric

export default reducer