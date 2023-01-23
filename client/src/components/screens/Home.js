import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import {DefaultPlayer as Video} from "react-html5video"
import "react-html5video/dist/styles.css"
const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/allrecipe', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.recipes)
            })
    }, [])
    return (
        
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            {/* 2 div (1. image & 2.caption) */}
                            <div className="card-image">
                            <Video  loop muted autoplay="autoplay">
                               <source  src={item.photo} type="video/webm" />
                                 </Video>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add a comment" />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default Home;