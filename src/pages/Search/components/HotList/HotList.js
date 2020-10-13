import React from 'react'

export default function HotList(props) {
    const { searchhot, onSearch } = props
    return (
        <div className="hotsearc_list">
            <h3>热门搜索</h3>
            <ul className="list">
                {
                    searchhot.map(item => {
                        return (
                            <li className="list_item" onClick={() => onSearch(item.first)} key={item.first}>{item.first}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
