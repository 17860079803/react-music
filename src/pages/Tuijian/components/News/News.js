import React from 'react'

export default function News(props) {
    const { news, toSong } = props
    return (
        <div className="item">
            <h2>最新音乐</h2>
            <div className="news">
                {
                    news.map(item => {
                        return (
                            <div className="news_list" key={item.id} onClick={() => toSong(item.id)}>
                                <div className="news_list_item">
                                    <div className="news_list_item_fl">
                                        <div className="news_title">{item.name}</div>
                                        <div className="news_info"><i className="news_hot"></i>
                                            {
                                                item.song.artists.length > 1 ? item.song.artists.map((i, index) => {
                                                    return (<i key={i.id}>{i.name}{index < 1 ? ' / ' : null}</i>)
                                                }) : item.song.artists.map(i => {
                                                    return (<i key={i.id}>{i.name}</i>)
                                                })
                                            } - {item.name}</div>
                                    </div>
                                    <div className="news_list_item_fr"><span className="news_chply"></span></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
