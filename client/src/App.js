import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom"
import Home from "./components/screens/Home"
import SignIn from "./components/screens/Login"
import Profile from "./components/screens/Profile"
import UserProfile from './components/screens/UserProfile'
import SignUp from "./components/screens/Signup"
import CreateRecipe from "./components/screens/CreateRecipe"
import SubscribedUserRecipe from './components/screens/SubscribesUserRecipe'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      navigate("/login")
    }
  },[])
  return(
    <Routes>
      <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<CreateRecipe />} /> 
        <Route path="/profile/:userid" element={<UserProfile />} /> 
        <Route path="/myfollowingpost" element={<SubscribedUserRecipe/>} /> 
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />  
    </BrowserRouter>
    </UserContext.Provider>
  );
}



export default App;
