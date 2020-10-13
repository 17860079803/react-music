import React from 'react'

export default function Hotlist(props) {
    const { hotlist, toSong } = props
    const hotlist20 = hotlist.filter((i, index) => index < 20)
    return (
        <div className="hot">
            {
                hotlist20.map((item, index) => {
                    return (
                        <div className="news_list" key={item.id} onClick={() => toSong(item.id)} >
                            <div className={index <= 2 ? "list_index list_red" : "list_index"}>{(index + 1 + "").padStart(2, '0')}</div>
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
    )
}
