import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserProfile.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import { apiFetch } from '../../services/api';
import UploadImage from "../UploadImage/UploadImage";
import avatarUnknown from "../../assets/img/avatarUnknown.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {

  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState('');
  const [fullname,setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  
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
        setFullname(userData.fullname);
        setAvatar(userData.avatar);
        setPhoneNumber(userData.phoneNumber);

      } catch (error) {
        console.error(error.message);
      }
    };

    useEffect(() => {
      fetchDataUser();
    }, [])

  const handleUploadComplete = (url) => {
    setAvatar(url);
  };

  const notify = () =>
    toast.error('Vui lòng nhập đủ thông tin', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const handleChangProfile = async () => {
    if (
      fullname.trim() === "" ||
      phoneNumber.trim() === ""
    ) {
      notify();
      return;
    }

  const newProfile = {
    id: user.id,
    fullname: fullname,
    avatar: avatar,
  };
  console.log(newProfile);
  try {
    const response = await fetch('https://littlejoyapi.azurewebsites.net/api/user/user-role', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProfile),
    });
    
    if (response.ok) {
      toast.success('Thông tin cá nhân của bạn được sửa thành công!');
      fetchDataUser();
    } else {
      toast.error('Thông tin cá nhân của bạn sửa thất bại');
    }
    const result = await response.json();
  } catch (error) {
    console.error('Lỗi:', error);
  }
  }

  const navigate = useNavigate();
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
    <>
    <ToastContainer />
      <section>
        <div>
          <div className="banner container-fluid pb-5 mb-5">
            <h1 className="pt-5">My Profile</h1>
            <p className="myhome pt-2">
              <Link to="/">Home</Link>
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-angles-right"
                  className="px-4"
                />
              </span>
              <Link to="/profile">Profile</Link>
            </p>
          </div>
        </div>
      </section>

      {/* <!-- User Info--> */}
      <div className="container mt-5">
        <div className="row">
          {/* <!-- User Info Side Bar--> */}
          <div className="col-md-3">
            <table className="w-100 m-0">
              <tbody>
                <tr>
                  <td className="w-25">
                    <div className="w-100 d-flex justify-content-center">
                      <div className="border-avatar w-75 text-center">
                        <img src={user.avatar || avatarUnknown} alt="" className="w-100" style={{ borderRadius: '50%', width: '75%' }} />
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
                      <div className="CoverButton">
                        <Link
                          className="d-flex py-2"
                          to="/userprofile"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            className="text-center w-25"
                            style={{ color: "#3C75A6" }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-user" className="fs-3" />
                          </div>

                          <div className="w-75">
                            <span className="fs-5 ps-2">
                              Thông tin tài khoản
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="2">
                    <div className="user-address-sidebar">
                      <Link
                        className="d-flex py-2"
                        to="/userchangepassword"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div
                          className="text-center w-25"
                          style={{ color: "#3C75A6" }}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-lock" className="fs-3" />
                        </div>

                        <div className="w-75">
                          <span className="fs-5 ps-2">Thay đổi mật khẩu</span>
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="2">
                    <div className="user-address-sidebar">
                      <Link
                        className="d-flex py-2"
                        to="/userordermanagement"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div
                          className="text-center w-25"
                          style={{ color: "#3C75A6" }}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="fs-3" />
                        </div>

                        <div className="w-75">
                          <span className="fs-5 ps-2">Quản lí đơn hàng</span>
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="2">
                    <div className="user-address-sidebar">
                      <Link
                        className="d-flex py-2"
                        to="/useraddress"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div
                          className="text-center w-25"
                          style={{ color: "#3C75A6" }}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-map-location" className="fs-3" />
                        </div>

                        <div className="w-75">
                          <span className="fs-5 ps-2">Địa chỉ</span>
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>

                

                <tr>
                  <td colSpan="2" className="pt-4">
                    <div className="fs-5">
                      <Link to="/" style={{ textDecoration: "none" }} onClick={handleLogout}>
                        
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" style={{ color: "#CCCCCC" }} />
                        <span style={{ color: "black" }} className="ps-4">
                          Đăng xuất
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- User information detail--> */}
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8">
                <div className="w-100 ms-3">
                  <table className="w-100 mt-5">
                    <tbody>
                      <tr>
                        <td colSpan="2" className="pb-4">
                          <span className="fs-5 fw-bold">Thông tin</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-30 ps-3">
                          <span style={{ fontSize: "20px" }}>Username:</span>
                        </td>
                        <td className="w-70 ps-3">
                          <span style={{ fontSize: "20px" }}>{user.userName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-30 ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>Fullname:</span>
                        </td>
                        <td className="pt-3 ps-3">
                          <input
                            type="text"
                            name=""
                            id=""
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-75 px-2 py-1"
                            style={{
                              border: "1px solid #CCCCCC",
                              fontSize: "20px",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-30 ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>Points:</span>
                        </td>
                        <td className="pt-3 ps-3">
                          <span style={{ fontSize: "20px" }}>{user.points}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-30 ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>
                            Số điện thoại:
                          </span>
                        </td>
                        <td className="pt-3 ps-3">
                          <input
                            type="text"
                            name=""
                            id=""
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-75 px-2 py-1"
                            style={{
                              border: "1px solid #CCCCCC",
                              fontSize: "20px",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-30 ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>Email:</span>
                        </td>
                        <td className="pt-3 ps-3">
                          <span style={{ fontSize: "20px" }}>
                            {user.email}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="pt-5">
                          <div className="">
                            <input
                              type="submit"
                              value="Lưu thay đổi"
                              className="px-4 py-2"
                              style={{
                                backgroundColor: "rgba(60, 117, 166, 0.42)",
                                border: "none",
                                borderRadius: "5px",
                              }}
                              onClick={handleChangProfile}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="col-md-4 py-5 px-2"
                style={{ boxSizing: "border-box" }}
              >
                <div
                  className="w-100 h-100 d-flex justify-content-center"
                  style={{ borderLeft: "1px solid black" }}
                >
                  <div className="content align-content-center">
                    <div className="avatar d-flex justify-content-center">
                      <div
                        className="w-50 text-center"
                        style={{
                          border: "1px solid rgba(128, 128, 128, 0.39)",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img src={avatar || avatarUnknown} alt="" className="w-75" style={{ borderRadius: '50%', width: '75%' }} />
                      </div>
                    </div>
                    <div className="box-choose-image text-center pt-3">
                    <UploadImage
                      aspectRatio={1/1}
                      onUploadComplete={handleUploadComplete}
                      maxWidth={2048}
                      maxHeight={2048}
                      minWidth={300}
                      minHeight={300}
                    />
                    </div>
                    <div className="box-choose-image text-center pt-3">
                      <span style={{ color: "#757575" }}>
                        Dụng lượng file tối đa 1 MB<br></br>
                        Định dạng: .JPEG, .PNG
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
