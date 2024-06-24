import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserChangePassword.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import avatarUnknown from "../../assets/img/avatarUnknown.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [mess, setMess] = useState({});


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

      const handleChangePassword = async () => {
        if (
          oldPassword.trim() === "" ||
          newPassword.trim() === "" ||
          confirmPassword.trim() === ""
        ) {
          notify();
          return;
        }
    
      const changePassword = {
        id: localStorage.getItem('userId'),
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      };
      try {
        const response = await fetch('https://littlejoyapi.azurewebsites.net/api/user/change-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changePassword),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Thay đổi mật khẩu thành công');
        } else {
          toast.error('Thay đổi mật khẩu thất bại');
          setError(data.message);
          
        }
        
      } catch (error) {
        setError({ general: "Something went wrong. Please try again." });
      }
    }

    const displayErrors = () => {
      if (error.general) {
        return <span>{error.general}</span>;
      }
      return Object.keys(error).map((key) => (
        <span key={key}>
          {Array.isArray(error[key]) ? (
            error[key].map((error, index) => (
              <>
                <span key={index}>{error}</span>
                <br></br>
              </>
            ))
          ) : (
            <span>{error[key]}</span>
          )}
        </span>
      ));
    };


  return (
    <>
      <ToastContainer />

      {/* <!-- User Info--> */}
      
          {/* <!-- User Info Side Bar--> */}
          

          {/* <!-- User Change Password Table --> */}
          
            <div className="w-100 ms-3 pt-3">
              <table className="w-100 mt-4">
                <tbody>
                  <tr>
                    <td className="pb-4" colSpan="3">
                      <span className="fs-5 fw-bold">Thay đổi mật khẩu</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-25 ps-4">
                      <span className="pt-2 fs-5">Mật khẩu cũ:</span>
                    </td>
                    <td className="w-50">
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-90 px-2 py-1"
                        style={{
                          border: "1px solid #CCCCCC",
                          fontSize: "20px",
                        }}
                      />
                    </td>
                    <td className="w-25">
                      <Link to="/forgotpass1" id="forgotpasswordUserProfile">
                        <span>Quên mật khẩu ? </span>
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className="pt-3" colSpan="3">
                      <span id="texterror" className="ps-3">
                        {error}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-4 pt-3">
                      <span className="pt-4 fs-5">Mật khẩu mới:</span>
                    </td>
                    <td className="pt-3">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-90 px-2 py-1"
                        style={{
                          border: "1px solid #CCCCCC",
                          fontSize: "20px",
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className="pt-3" colSpan="3">
                      <div>
                        <span id="texterror" className="ps-3">
                          {}
                        </span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-4 pt-3">
                      <span className="pt-4 fs-5">Xác nhận mật khẩu:</span>
                    </td>
                    <td className="pt-3">
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-90 px-2 py-1"
                        style={{
                          border: "1px solid #CCCCCC",
                          fontSize: "20px",
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className="pt-3" colSpan="3">
                      <span id="texterror" className="ps-3">
                        {}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className="pt-4" colSpan="3">
                      <div className="">
                        <input
                          type="submit"
                          value="Lưu thay đổi"
                          onClick={handleChangePassword}
                          className="px-4 py-2"
                          style={{
                            backgroundColor: "rgba(60, 117, 166, 0.42)",
                            border: "none",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          
    </>
  );
}
export default UserChangePassword;
