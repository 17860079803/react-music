import React, { Component } from 'react'
import { Switch, Route, Redirect, NavLink } from "react-router-dom"
import asyncComponents from '../../utils/asyncComponents'
const Tuijian = asyncComponents(() => import("../Tuijian/Tuijian"))
const Hot = asyncComponents(() => import("../Hot/Hot"))
const Search = asyncComponents(() => import("../Search/Search"))
export default class Index extends Component {
    render() {
        return (
            <div>
                {/* 头部 */}
                <div className="header">
                    <div className="header_top">
                        <div className="header_top_fl"></div>
                        <div className="header_top_fr">Lei❤lei</div>
                    </div>
                    <div className="header_nav">
                        <NavLink to="/index/tuijian" activeClassName="active"><span>推荐音乐</span></NavLink>
                        <NavLink to="/index/hot" activeClassName="active"><span>热歌榜</span></NavLink>
                        <NavLink to="/index/search" activeClassName="active"><span>搜索</span></NavLink>
                    </div>
                </div>
                {/* 二级路由 */}
                <Switch>
                    <Route path="/index/tuijian" component={Tuijian}></Route>
                    <Route path="/index/hot" component={Hot}></Route>
                    <Route path="/index/search" component={Search}></Route>
                  
                    <Redirect to="/index/tuijian"></Redirect>
                </Switch>
            </div>
        )
    }
}