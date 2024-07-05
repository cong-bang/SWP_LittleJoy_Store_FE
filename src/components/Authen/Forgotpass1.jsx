import React, { useState, useEffect } from "react";
import "../../assets/css/styleforgot_password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgotpass1() {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [mess, setMess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [messResetPass, setMessResetPass] = useState([]);

  const notify = (a) =>
    toast.success(a, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const startCountdown = async () => {
    setBtnDisabled(true);
    let seconds = 30;
    const countdownInterval = setInterval(() => {
      seconds--;
      setCountdown(seconds);
      if (seconds <= 0) {
        setBtnDisabled(false);
        clearInterval(countdownInterval);
      }
    }, 1000);

    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/authen/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );
      const data = await response.json();
      if (response.ok) {
        notify("Gửi OTP thành công")
      } else {
        setMess(data.message);
      }
    } catch (error) {
      setError("");
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      setCountdown(30);
    }
  }, [countdown]);

  const handleSubmit = async () => {
    try {
      const formResetPass1 = {
        email: email,
        otpCode: otp,
      };
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/authen/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formResetPass1),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setVerified(true);
        notify("Xác thực thành công");
      } else {
        setMess(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const formResetPass2 = {
        email: email,
        password: newPassword,
        confirmPassword: newPasswordConfirm,
      };
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/authen/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formResetPass2),
        }
      );

      const data = await response.json();
      if (response.ok) {
        notify("Đổi mật khẩu thành công");
        navigate("/login");
      } else {
        setMessResetPass(data.errors);
      }
    } catch (error) {
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {verified != true ? (
        <section className="roboto my-5 py-5">
          <div className="container my-5 py-5">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-around">
                <div className="w-50 px-3 py-5 box-forgot">
                  <p className="forgot-title text-center content-forgot">
                    Reset Password
                  </p>
                  <div className="d-flex justify-content-center">
                    <table className="w-50">
                      <tbody>
                        <tr>
                          <td colSpan="3">Email</td>
                        </tr>
                        <tr>
                          <td className="w-70 py-2">
                            <input
                              required
                              className="w-100 ps-2"
                              type="email"
                              placeholder="example@gmail.com"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </td>
                          <td className="w-20">
                            <div
                              className={`text-center btn-send w-75 float-end ${
                                btnDisabled ? "btn-fade" : ""
                              }`}
                              onClick={!btnDisabled ? startCountdown : null}
                            >
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </div>
                          </td>
                          <td className="w-10">
                            <div
                              className={`w-100 countdown-box ${
                                btnDisabled ? "" : "hidden"
                              }`}
                            >
                              <p
                                className="countdown m-0 float-end"
                                style={{ fontSize: "16px" }}
                              >
                                {countdown}s
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">OTP Code</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="py-2">
                            <input
                              required
                              className="w-100 ps-2"
                              type="text"
                              placeholder=""
                              name="otp"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </td>
                          <td></td>
                        </tr>
                        <tr className="hidden-error">
                          <td colSpan="3">
                            <p
                              className="text-error m-0"
                              style={{ fontSize: "16px" }}
                            >
                              {mess}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="py-2">
                            <input
                              className="w-100 btn-continue p-1"
                              type="submit"
                              value="CONTINUE"
                              onClick={handleSubmit}
                            />
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="py-2">
                            Không nhận được mail? Hãy thử lại
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="my-5 py-5">
          <div className="container my-5 py-5">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-around">
                <div className="w-50 px-3 py-5 box-forgot">
                  <p className="forgot-title text-center content-forgot">
                    Reset Password
                  </p>
                  <div className="d-flex justify-content-center">
                    <table className="w-50">
                      <tr>
                        <td colSpan="3">Password</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="w-100 pt-2">
                          <input
                            required
                            className="w-100 ps-2"
                            type="password"
                            placeholder=""
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr className="hidden-error">
                        <td colSpan="3">
                          <p className="text-error m-0 fs-6">
                            {messResetPass["Password"] || ""}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">Confirm password</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="pt-2">
                          <input
                            required
                            className="w-100 ps-2"
                            type="password"
                            placeholder=""
                            name="otp"
                            value={newPasswordConfirm}
                            onChange={(e) =>
                              setNewPasswordConfirm(e.target.value)
                            }
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr className="hidden-error">
                        <td colSpan="3">
                          <p className="text-error m-0 fs-6">
                            {messResetPass["ConfirmPassword"] || ""}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="py-2">
                          <input
                            className="w-100 btn-continue p-1"
                            type="submit"
                            value="CONFIRM RESET"
                            onClick={handleResetPassword}
                          />
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
