import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
  } from "react-icons/md";
  import "./navBar.css"
  import Search from "../search/Search"
  const Navbar = () => {
    return (
      <div className="navbar">
        <div className="navbar-title">
          ראשי
        </div>
        <div className="navbar-menu">
          <Search placeholder={"search..."}/>
          <div className="navbar-icons">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
          </div>
        </div>
      </div>
    )
  }
  
  export default Navbar