import React from 'react'
import { Carousel } from "antd-mobile"
import "./Banner.css"
export default function Banner(props) {
    const { banner } = props
    return (
        <div className="banner">
            <Carousel
                autoplay
                infinite
            >
                {
                    banner.map(item => {
                        return <img key={item.encodeId} src={item.pic} alt="" />
                    })
                }
            </Carousel>
        </div>
    )
}
