import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserProfile.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import { apiFetch } from "../../services/api";
import UploadImage from "../UploadImage/UploadImage";
import avatarUnknown from "../../assets/img/avatarUnknown.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState({});

  const fetchDataUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
      );
      if (!response.ok) {
        console.log("Lỗi fetch category data...");
        return;
      }
      const userData = await response.json();
      setUser(userData);
      setAvatar(userData.avatar);
      setFullname(userData.fullname);
      setPhoneNumber(userData.phoneNumber);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const handleUploadComplete = (url) => {
    setAvatar(url);
  };

  const notify = () =>
    toast.error("Vui lòng nhập đủ thông tin", {
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
    if (fullname.trim() === "" || phoneNumber.trim() === "") {
      notify();
      return;
    }

    const newProfile = {
      id: user.id,
      fullname: fullname,
      avatar: avatar,
    };
    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/user/user-role",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfile),
        }
      );

      if (response.ok) {
        toast.success("Thông tin cá nhân của bạn được sửa thành công!");
        fetchDataUser();
      } else {
        toast.error("Thông tin cá nhân của bạn sửa thất bại");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* <!-- User Info--> */}

      {/* <!-- User Info Side Bar--> */}

      {/* <!-- User information detail--> */}

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
                    <span style={{ fontSize: "20px" }}>Số điện thoại:</span>
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
                    <span style={{ fontSize: "20px" }}>{user.email}</span>
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
        <div className="col-md-4 py-5 px-2" style={{ boxSizing: "border-box" }}>
          <div
            className="w-100 h-100 d-flex justify-content-center"
            style={{ borderLeft: "1px solid black" }}
          >
            <div className="content align-content-center">
              <div className="avatar d-flex justify-content-center">
                <div
                  className="w-50 text-center"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={avatar || avatarUnknown}
                    alt=""
                    className="w-75"
                    style={{ borderRadius: "50%", width: "75%" }}
                  />
                </div>
              </div>
              <div className="box-choose-image text-center pt-3">
                <UploadImage
                  aspectRatio={1 / 1}
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
    </>
  );
};
export default UserProfile;
