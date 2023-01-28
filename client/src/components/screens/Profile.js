import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import {DefaultPlayer as Video} from "react-html5video"
import "react-html5video/dist/styles.css"

const Profile = () => {
    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch("/myrecipe", {
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            setPics(result.myrecipe)
            
        })
}, [])
return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>

        <div style={{  //for upper div(dp and name)
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0px",

        }}>

            {/* dp part */}
            <div>
                <img style={{ width: "160px", height: "160px", borderRadius: "80px", margin: "0px 0px" }}
                    src={state?state.pic:"loading.."}
                />

                {/* name part */}
            </div>
            <div>
                <h4>{state ? state.name : "loading"}</h4>
                <h5>{state ? state.email : "loading"}</h5>
                <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                <h6>{mypics.length} recipes</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                </div>
            </div>
        </div>


        {/* for pic uploaded part */}
        <div className="gallery">
            {
                mypics.map(item => {
                    return (
                        <Video key={item._id} className="item">
                               <source  src={item.photo} alt={item.title} type="video/webm" />
                        </Video>
                    )
                })
            }
        </div>
    </div>
)
}

export default Profile;