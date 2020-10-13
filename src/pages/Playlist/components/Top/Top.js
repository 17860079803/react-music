import React from 'react'
import { withRouter } from "react-router-dom"
function Top(props) {
    const { playlist } = props
    return (
        <div className="playlist_top">
            <div className="back" onClick={() => props.history.go(-1)}>&lt;</div>
            <div className="playlist_top_bg" style={{ backgroundImage: `url("${playlist.coverImgUrl + "?param=170y170"}")` }}></div>
            <div className="playlist_top_wrap">
                <div className="playlist_top_wrap_fl">
                    <img src={playlist.coverImgUrl + "?param=170y170"} alt="" />
                    <span>歌单</span>
                </div>
                <div className="playlist_top_wrap_fr">
                    <h2>{playlist.name}</h2>
                    <div className="playlist_top_wrap_fr_auth">
                        <div>
                            <img src={playlist.creator.avatarUrl + "?param=61y61"} alt="" />
                            <span>{playlist.creator.nickname}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Top)