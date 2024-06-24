import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCartShopping, faMapLocation, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import avatarUnknown from "../../assets/img/avatarUnknown.jpg";

const UserProfileSidebar = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const fetchDataUser = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const response = await fetch(
            `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
          );
          if (!response.ok) {
            console.log('Lỗi fetch category data...');
            return;
          }
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error(error.message);
        }
      };
  
      useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
        } else {
            fetchDataUser();
        }
    }, [location.state]);

      const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('cart');
        
        navigate("/");
        window.location.reload();
      };


  return (
    <div className="col-md-3 ">
      <table className="w-100 mt-4">
        <tbody>
          <tr>
            <td className="w-25">
              <div className="w-100 d-flex justify-content-center">
                <div className="border-avatar w-75 text-center">
                  <img src={user.avatar || avatarUnknown} alt="" className="w-100" />
                </div>
              </div>
            </td>
            <td className="w-75">
              <span className="fs-5 ps-2 fw-bold">{user.userName}</span>
            </td>
          </tr>
          <tr>
            <td className="pt-4" colSpan="2">
              <div className="user-address-sidebar">
              <div className={(location.pathname == '/userprofile') ? "CoverButton" : ""}>
                <Link className="d-flex py-2" to={{pathname: '/userprofile', state: {user}}} style={{ textDecoration: "none", color: "black" }}>
                  <div className="text-center w-25" style={{ color: "#3C75A6" }}>
                    <FontAwesomeIcon icon={faUser} className="fs-3" />
                  </div>
                  <div className="w-75">
                    <span className="fs-5 ps-2">Thông tin tài khoản</span>
                  </div>
                </Link>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="pt-4" colSpan="2">
              <div className="user-address-sidebar">
                <div className={(location.pathname == '/userchangepassword') ? "CoverButton" : ""}>
                  <Link className="d-flex py-2" to={{pathname: '/userchangepassword', state: {user}}} style={{ textDecoration: "none", color: "black" }}>
                    <div className="text-center w-25" style={{ color: "#3C75A6" }}>
                      <FontAwesomeIcon icon={faLock} className="fs-3" />
                    </div>
                    <div className="w-75">
                      <span className="fs-5 ps-2">Thay đổi mật khẩu</span>
                    </div>
                  </Link>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="pt-4" colSpan="2">
              <div className="user-address-sidebar">
              <div className={(location.pathname == '/userordermanagement' || location.pathname == '/userorderdetail') ? "CoverButton" : ""}>
                <Link className="d-flex py-2" to={{pathname: "/userordermanagement", state: {user}}} style={{ textDecoration: "none", color: "black" }}>
                  <div className="text-center w-25" style={{ color: "#3C75A6" }}>
                    <FontAwesomeIcon icon={faCartShopping} className="fs-3" />
                  </div>
                  <div className="w-75">
                    <span className="fs-5 ps-2">Quản lí đơn hàng</span>
                  </div>
                </Link>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="pt-4" colSpan="2">
              <div className="user-address-sidebar">
              <div className={(location.pathname == '/useraddress') ? "CoverButton" : ""}>
                <Link className="d-flex py-2" to={{pathname: '/useraddress', state: {user}}} style={{ textDecoration: "none", color: "black" }}>
                  <div className="text-center w-25" style={{ color: "#3C75A6" }}>
                    <FontAwesomeIcon icon={faMapLocation} className="fs-3" />
                  </div>
                  <div className="w-75">
                    <span className="fs-5 ps-2">Địa chỉ</span>
                  </div>
                </Link>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="pt-4">
              <div className="fs-5">
                <Link to="/" style={{ textDecoration: "none" }} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#CCCCCC" }} />
                  <span style={{ color: "black" }} className="ps-4">Đăng xuất</span>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfileSidebar;
