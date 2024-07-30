import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
  } from "react-icons/md";
  import "./navBar.css"
  import Search from "../search/Search"
import useGetFilePath from "../../hooks/useGetFilePath";
  const Navbar = () => {
    const {getFilePath} = useGetFilePath()
    return (
      <div className="navbar">
        <div className="navbar-title">
        </div>
        <div className="navbar-menu">
          {/* <Search placeholder={"search..."}/> */}
          <div className="navbar-icons">
          {/* <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} /> */}
          <img
              src={getFilePath("logo.jpg")}
              alt="User"
              width="130"
              height="70"
              className="logo-image"
            />          </div>
        </div>
      </div>
    )
  }
  
  export default Navbar