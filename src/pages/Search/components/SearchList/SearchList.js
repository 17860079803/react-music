import React from 'react'

export default function SearchList(props) {
    const { searchlist, value, onSearch } = props
    return (
        <div className="search_list">
            {value ? <h3>搜索“{value}”</h3> : null}
            <ul>
                {
                    searchlist.map(item => {
                        return (
                            <li className="search_list_item" onClick={() => onSearch(item.keyword)} key={item.keyword}><i></i><span>{item.keyword}</span></li>
                        )
                    })
                }

            </ul>
        </div>
    )
}
