import React, { Component } from 'react'
import { connect } from "react-redux"
// 子组件引入
import Hotlist from "./components/Hotlist/Hotlist"
// 仓库属性方法引入
import { hotlist, reqHotListAction, hottime } from '../../store/modules/hot'
class Hot extends Component {
    componentDidMount() {
        const { reqhotlist } = this.props
        reqhotlist() // 触发列表
    }
    // 去听音乐
    toSong(id) {
        this.props.history.push("/song/" + id)
    }
    render() {
        const { hotlist, hottime } = this.props
        return (
            <div className="index">
                <div className="hottop">
                    <div className="hotopct">
                        <div className="hoticon"></div>
                        <div className="hottime">更新日期：{hottime}</div>
                    </div>
                </div>
                <Hotlist hotlist={hotlist} toSong={(id)=>this.toSong(id)}></Hotlist>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        hotlist: hotlist(state),
        hottime: hottime(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reqhotlist: () => dispatch(reqHotListAction()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Hot)