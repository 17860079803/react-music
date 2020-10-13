import React from 'react'

export default function List(props) {
    const { playlist, toSong } = props
    return (
        <div className="play_list">
            <h3>歌曲列表</h3>
            <div className="play_list_item">
                {
                    playlist.tracks.map((item, index) => {
                        return (
                            <div className="news_list" key={item.id} onClick={() => toSong(item.id)}>
                                <div className="list_index">{(index + 1 + "").padStart(2, '0')}</div>
                                <div className="news_list_item">
                                    <div className="news_list_item_fl">
                                        <div className="news_title">{item.name}</div>
                                        <div className="news_info"><i className="news_hot"></i>
                                            {
                                                item.ar.length > 1 ? item.ar.map((i, index) => {
                                                    return (<i key={i.id}>{i.name}{index < 1 ? ' / ' : null}</i>)
                                                }) : item.ar.map(i => {
                                                    return (<i key={i.id}>{i.name}</i>)
                                                })
                                            } - {item.name}
                                        </div>
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
