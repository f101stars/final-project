import React, { useEffect } from 'react';
import {
  MdDashboard,
  MdPendingActions,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdCalendarMonth,
  MdEuro,
  MdOutlineBusinessCenter,
  MdPerson,
  MdMenu
} from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import MenuLink from "./MenuLink";
import "./sideBar.css";
import { useSendLoguotMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetFilePath from "../../hooks/useGetFilePath";

const SideBar = () => {
  const { username, fullname, roles, image, _id } = useAuth();
  const navigate = useNavigate();
  const { getFilePath } = useGetFilePath();
  
  const adminMenuItems = [{
    list: [
      { title: "ראשי", path: "/dash", icon: <MdDashboard /> },
      { title: "משתמשים", path: "/dash/users", icon: <MdOutlineBusinessCenter /> },
      { title: "קביעת תור", path: "/dash/turns-admin", icon: <MdCalendarMonth /> },
      { title: "סוגי טיפול", path: "/dash/types", icon: <HiOutlineShoppingBag /> },
      { title: "המלצות", path: "/dash/posts", icon: <AiOutlineLike /> },
    ],
  }, {
    list: [
      { title: "הפרופיל שלי", path: `/dash/my-profile/${_id}`, icon: <MdPerson /> },
    ],
  }];

  const userMenuItems = [{
    list: [
      { title: "ראשי", path: "/dash", icon: <MdDashboard /> },
      { title: "קביעת תור", path: "/dash/turns-user", icon: <MdCalendarMonth /> },
      { title: "מחירון", path: "/dash/prices", icon: <MdEuro /> },
      { title: "המלצות", path: "/dash/posts", icon: <AiOutlineLike /> },
    ],
  }, {
    list: [
      { title: "הפרופיל שלי", path: `/dash/my-profile/${_id}`, icon: <MdPerson /> },
    ],
  }];

  const menuItems = roles === "Admin" ? adminMenuItems : userMenuItems;
  const [logout, { isSuccess }] = useSendLoguotMutation();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  return (
    <div className="hiden-menu-container">
      <p className="hiden-menu"><MdMenu /></p>
      <div className="side-bar-hidden">
        <div className="side-bar">
          <div className="side-bar-user">
            <img
              src={getFilePath(image)}
              alt="User"
              width="50"
              height="50"
              className="side-bar-user-image"
            />
            <div className="side-bar-user-details">
              <span className="side-car-user-username">{fullname}</span>
              <span className="side-car-user-title">{roles}</span>
            </div>
          </div>
          <ul className="side-bar-menu-list">
            {menuItems.map(cat => (
              <li key={cat.title}>
                <span className="side-bar-menu-cat">{cat.title}</span>
                {cat.list.map(item => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          </ul>
          <button onClick={() => logout()} className="side-bar-logout">
            <MdLogout />
            יציאה
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
