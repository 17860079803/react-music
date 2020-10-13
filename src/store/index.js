import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import tuijian from "./modules/tuijian"
import hot from "./modules/hot"
import search from "./modules/search"
import playlist from "./modules/playlist"
import song from './modules/song'
// import { reqSongUrlAction } from "./modules/song"
//创建根reducer
const reducer = combineReducers({
    tuijian,
    hot,
    search,
    playlist,
    song
})

//创建仓库
const store = createStore(reducer, applyMiddleware(thunk));

//测试
// store.dispatch(reqSongUrlAction())

// 添加监听
store.subscribe(() => {
    console.log(store.getState());
})

export default store;
