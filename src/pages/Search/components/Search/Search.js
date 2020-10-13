import React from 'react'

export default function Search(props) {
    const { search, toSong } = props
    return (
        <div className="Search_list">
            <h3>最佳匹配</h3>
            {
                search.map((item, index) => {
                    return (
                        <div className="news_list" key={item.id} onClick={() => toSong(item.id)}>
                            <div className="news_list_item">
                                <div className="news_list_item_fl">
                                    <div className="news_title">{item.name}</div>
                                    <div className="news_info"><i className="news_hot"></i>
                                        {
                                            item.artists.length > 1 ? item.artists.map((i, index) => {
                                                return (<i key={i.id}>{i.name}{index < 1 ? ' / ' : null}</i>)
                                            }) : item.artists.map(i => {
                                                return (<i key={i.id}>{i.name}</i>)
                                            })
                                        } - {item.artists.name}
                                    </div>
                                </div>
                                <div className="news_list_item_fr"><span className="news_chply"></span></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
