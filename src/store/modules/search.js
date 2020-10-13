import { reqSearchHot, reqSearchSuggest, reqSearch } from '../../utils/requset'

// 1.初始值
const initState = {
    searchhot: [], // 热门搜索
    searchlist: [], // 搜索列表
    search: [] // 搜索结果
}

// 2.reducer

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "changeSearchHot":
            return {
                ...state,
                searchhot: action.searchhot
            }
        case "changeSearchList":
            return {
                ...state,
                searchlist: action.searchlist
            }
        case "changeSearch":
            return {
                ...state,
                search: action.search
            }
        default:
            return state
    }
}
 
// 3.action
const changeSearchHotAction = (searchhot) => {
    return { type: "changeSearchHot", searchhot }
}
const changeSearchListAction = (searchlist) => {
    return { type: "changeSearchList", searchlist }
}
const changeSearchAction = (search) => {
    return { type: "changeSearch", search }
}

// 4.组件触发action
// 热搜列表
export const reqSearchHotAction = () => {
    return (dispatch, getState) => {
        const { searchhot } = getState().search
        if (searchhot.length > 0) {
            return;
        }
        reqSearchHot().then(res => {
            dispatch(changeSearchHotAction(res.data.result.hots))
        })
    }
}
// 搜索建议
export const reqSearchListAction = (value) => {
    return (dispatch, getState) => {
        if (value) {
            reqSearchSuggest({ keywords: value, type: "mobile" }).then(res => {
                dispatch(changeSearchListAction(res.data.result.allMatch))
            })
        } else {
            dispatch(changeSearchListAction([]))
        }
    }
}
export const reqSearchAction = (value) => {
    return (dispatch, getState) => {
        if (value) {
            reqSearch({ keywords: value }).then(res => {
                dispatch(changeSearchAction(res.data.result.songs))
            })
        } else {
            dispatch(changeSearchAction([]))
        }

    }
}


// 5.导出数据
export const searchhot = state => state.search.searchhot
export const searchlist = state => state.search.searchlist
export const search = state => state.search.search

export default reducer