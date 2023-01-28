import React, { useContext,useRef,useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom"; //from going from one page to another page ,page will not refresh now ,it goes directly on that page without refreshing (😇)
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () => {
  const [search,setSearch] = useState('')
  const  searchModal = useRef(null)
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList = () => {
    if (state) {
      return [
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/create">Create Recipe</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My following Recipes</Link></li>,
        <li key="5">
          <button className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              navigate('/login')
              window.location.reload();
            }}>
            Logout
          </button>
        </li>
      ]
    } else {
      return [
        <li key="6">
          <Link to="/login">Signin</Link>
        </li>,
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>
      ]

    }
  }

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo">
          ZAAYKA
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            />
             <ul className="collection">
             <li></li>
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;