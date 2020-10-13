import axios from 'axios'
// import qs from "qs"

// 3.数据请求配置
// 请求拦截
axios.interceptors.request.use(config => {
    return config
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.group(`-------本次请求地址:${res.config.url}-------`)
    console.log(res);
    console.groupEnd()
    return res
})

const baseUrl = "https://api.mtnhao.com";
// 首页banner
export const reqBanner = (params) => {
    return axios({
        url:baseUrl+"/banner",
        method: "get",
        params: params
    })
}
// 首页推荐歌单
export const reqTuijian = (params) => {
    return axios({
        url:baseUrl+"/personalized",
        method: "get",
        params: params
    })
}
// 首页推荐新音乐
export const reqNews = (params) => {
    return axios({
        url:baseUrl+"/personalized/newsong",
        method: "get",
        params: params
    })
}

// 热歌榜
export const reqHotList = (params) => {
    return axios({
        url:baseUrl+ "/playlist/detail",
        method: "get",
        params: params
    })
}

// 热门搜索
export const reqSearchHot = (params) => {
    return axios({
        url:baseUrl+ "/search/hot",
        method: "get",
        params: params
    })
}
// 搜索提示
export const reqSearchSuggest = (params) => {
    return axios({
        url:baseUrl+ "/search/suggest",
        method: "get",
        params: params
    })
}

// 搜索结果
export const reqSearch = (params) => {
    return axios({
        url:baseUrl+ "/search",  //search?keywords= 海阔天空
        method: "get",
        params: params
    })
}

// 歌单列表
export const reqPlayList = (params) => {
    return axios({
        url:baseUrl+ "/playlist/detail",
        method: "get",
        params: params
    })
}

// 音乐url
export const reqSongUrl = (params) => {
    return axios({
        url:baseUrl+ "/song/url",
        method: "get",
        params: params
    })
}

// 歌曲详情（图片）
export const reqSongImg = (params) => {
    return axios({
        url:baseUrl+ "/song/detail",
        method: "get",
        params: params
    })
}

// 歌词
export const reqSongLyric = (params) => {
    return axios({
        url:baseUrl+ "/lyric",
        method: "get",
        params: params
    })
}