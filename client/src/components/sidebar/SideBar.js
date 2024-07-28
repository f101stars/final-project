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
  MdList,
  MdMenu
} from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai"
import { HiOutlineShoppingBag } from "react-icons/hi"
import MenuLink from "./MenuLink";
import "./sideBar.css"
import { useSendLoguotMutation } from "../../features/auth/authApiSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import useGetFilePath from "../../hooks/useGetFilePath";

const SideBar = () => {
  const { username, fullname, roles, image } = useAuth()
  const user = useAuth()
  console.log(user);
  const navigate = useNavigate()
  const { getFilePath } = useGetFilePath()

  const adminMenuItems = [{
    title: "דפים",
    list: [
      {
        title: "ראשי",
        path: "/dash",
        icon: <MdDashboard />,
      },
      {
        title: "משתמשים",
        path: "/dash/users",
        icon: <MdOutlineBusinessCenter />,
      },
      {
        title: "קביעת תור",
        path: "/dash/turns-admin",
        icon: < MdCalendarMonth />,
      },
      {
        title: "סוגי טיפול",
        path: "/dash/types",
        icon: < HiOutlineShoppingBag />,
      },
      {
        title: "מוצרים",
        path: "/dash/products",
        icon: < HiOutlineShoppingBag />,
      },
      {
        title: "מחירון",
        path: "/dash/prices",
        icon: <MdEuro />,
      },
      {
        title: "המלצות",
        path: "/dash/fitback",
        icon: <AiOutlineLike />,
      },
      {
        title: "פעולות",
        path: "/dash/actions",
        icon: <MdPendingActions />,
      },
    ],
  },
  {
    title: "משתמש",
    list: [
      {
        title: "הגדרות",
        path: "/dash/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "הפרופיל שלי",
        path: `/dash/my-profile/${user._id}`,
        icon: <MdPerson />,
      },
    ],
  },
  ];

  const userMenuItems = [{
    title: "דפים",
    list: [
      {
        title: "ראשי",
        path: "/dash",
        icon: <MdDashboard />,
      },
      {
        title: "מוצרים",
        path: "/dash/products",
        icon: < HiOutlineShoppingBag />,
      },
      {
        title: "קביעת תור",
        path: "/dash/turns-user",
        icon: < MdCalendarMonth />,
      },
      {
        title: "מחירון",
        path: "/dash/prices",
        icon: <MdEuro />,
      },
      {
        title: "המלצות",
        path: "/dash/fitback",
        icon: <AiOutlineLike />,
      },
      {
        title: "פעולות",
        path: "/dash/actions",
        icon: <MdPendingActions />,
      },
    ],
  },
  {
    title: "משתמש",
    list: [
      {
        title: "הגדרות",
        path: "/dash/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "הפרופיל שלי",
        path: `/dash/my-profile/${user._id}`,
        icon: <MdPerson />,
      },
    ],
  }
  ]
  const menuItems = roles === "Admin" ? adminMenuItems : userMenuItems

  const [logout, { isSuccess }] = useSendLoguotMutation()
  const logoutClick = () => {
    logout()
  }
  useEffect(() => {
    if (isSuccess)
      navigate("/login")
  })
  return (
    <div>
      <p className="hiden-menu"><MdMenu /></p>
      <div className="side-bar">
        <div className="side-bar-user">
          <img
            src={getFilePath(image)}
            alt=""
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
        <button onClick={logoutClick} className="side-bar-logout">
          <MdLogout />
          יציאה
        </button>
      </div>
    </div>
  );
};

export default SideBar;
