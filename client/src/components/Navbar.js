import React  from "react";
import {Link} from "react-router-dom"  
const NavBar=()=>{
    return (
               <nav>
    <div className="nav-wrapper white">
      <Link to="/" className="brand-logo">ZAGUAR</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/create">Upload Recipe</Link></li>
      </ul>
    </div>
  </nav>

    )
}

export default NavBar;