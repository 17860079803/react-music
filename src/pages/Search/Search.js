import React, { Component } from 'react'
import { connect } from "react-redux"
// 引入ui
import { SearchBar } from 'antd-mobile'
// 引入样式
import "./Search.css"
// 子组件引入
import HotList from "./components/HotList/HotList"
import SearchList from "./components/SearchList/SearchList"
import SearchResult from './components/Search/Search'
// 仓库属性方法引入
import { searchhot, reqSearchHotAction, searchlist, reqSearchListAction, search, reqSearchAction } from "../../store/modules/search"
class Search extends Component {
    constructor() {
        super()
        this.state = {
            value: ""
        }
    }
    componentDidMount() {
        const { reqSearchHot } = this.props
        reqSearchHot() // 触发热搜列表
    }
    // 监控搜索框
    onChange = (value) => {
        const { reqSearchList } = this.props
        this.setState({ value });
        reqSearchList(value) // 触发搜索列表
    };
    // 点击清空图标
    onClear = () => {
        const { reqSearchList, reqSearch } = this.props
        reqSearchList() // 清空搜索提示
        reqSearch() // 清空搜索结果
    }
    // 点击热搜列表
    onSearch(value) {
        const { reqSearchList, reqSearch } = this.props
        this.setState({ value });
        reqSearchList() // 清空搜索列表
        reqSearch(value) // 触发搜索结果
    }
     // 去听音乐
     toSong(id) {
        this.props.history.push("/song/" + id)
    }
    render() {
        const { searchhot, searchlist, search } = this.props
        const { value } = this.state
        return (
            <div className="index">
                <div className="search">
                    <div className="search_input">
                        <SearchBar
                            value={this.state.value}
                            placeholder="搜索歌曲、歌手、专辑"
                            onChange={this.onChange}
                            onClear={this.onClear}
                        />
                    </div>
                    {/* 搜索推荐 */}
                    {searchlist.length > 0 ? <SearchList searchlist={searchlist} value={value} onSearch={(value) => this.onSearch(value)}></SearchList> : null}

                    {searchlist.length === 0 && search.length === 0 ? <HotList searchhot={searchhot} onSearch={(value) => this.onSearch(value)}></HotList> : null}

                    {/* 搜索结果 */}
                    {search.length > 0 ? <SearchResult search={search} toSong={(id)=>this.toSong(id)}></SearchResult> : null}


                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        searchhot: searchhot(state),
        searchlist: searchlist(state),
        search: search(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reqSearchHot: () => dispatch(reqSearchHotAction()),
        reqSearchList: (value) => dispatch(reqSearchListAction(value)),
        reqSearch: (value) => dispatch(reqSearchAction(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)