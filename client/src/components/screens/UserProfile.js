import React,{useEffect,useState,useContext}  from "react";
import { UserContext } from "../../App";
import {Params, useParams} from "react-router-dom";

const Profile=()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
    },[])


    return (
        <>
        {userProfile? 
 <div style={{maxWidth:"550px",margin:"0px auto"}}>
       
     <div  style={{  //for upper div(dp and name)
         display:"flex",
         justifyContent:"space-around",
         margin:"20px 0px",
           }}>

               {/* dp part */}
                 <div>  
                     <img style={{width:"160px",height:"160px",borderRadius:"80px", margin:"0px 0px"}} 
                          src="https://images.newindianexpress.com/uploads/user/imagelibrary/2022/8/21/w600X390/Hrithik_Roshan_PTI.jpg"
                     />
             
                     {/* name part */}
                 </div>  
                       <div> 
                                <h4>{userProfile.user.name}</h4>
                                <h5>{userProfile.user.email}</h5>
                                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}> 
                                          <h6>40 recipe</h6>
                                          <h6>60 followers</h6>
                       <h6>60 following</h6>
                                     </div>
                 
                        </div>
         </div>


               {/* for pic uploaded part */}
                     <div className="gallery">
                        {
                           userProfile.recipes.map(item=>{
                           return(
                           <img key={item._id} className="item" src={item.photo} alt={item.title} />
                           )
                           })
                         } 
                     </div>
               

</div>
        
      :<h2>loading</h2>}
       
</>
    )
}

export default Profile;