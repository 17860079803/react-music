import React from 'react'

export default function Songs(props) {
    const { tuijian, toPlayList } = props
    return (
        <div className="item">
            <h2>推荐歌单</h2>
            <div className="songs">
                {
                    tuijian.map(item => {
                        return (
                            <div className="songs_li" key={item.id} onClick={() => toPlayList(item.id)}>
                                <img className="songs_img" src={item.picUrl + "?param=247y247"} alt="" />
                                <p className="songs_text">{item.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
