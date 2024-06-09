import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/stylelogin.css";
import logogoogle from "../../assets/img/logogoogle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = [
    { username: "admin", password: "admin", role: "ADMIN" },
    { username: "staff", password: "staff", role: "STAFF" },
    { username: "user", password: "user", role: "USER" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);
      navigate("/");
      window.location.reload();
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <>
      <div style={{ marginBottom: '7%' }}>
        <div className="container p-5 mt-5 mb-xl-5">
          <div className="row">
            <div className="col-md-12 text-center nav-login">
              <Link to="/" className="nav-link d-inline-block px-4">
                Home
              </Link>
              <FontAwesomeIcon icon="fa-solid fa-angles-right px-4" />
              <Link to="/login" className="nav-link d-inline-block px-4">
                Account
              </Link>
            </div>
          </div>
        </div>

        <div className="body-login container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleLogin}>
                  <div className="d-flex justify-content-center">
                    <table className="w-50 mt-5">
                      <tbody>
                        <tr>
                          <td colSpan="2">
                            <p className="noticia-text title-login">Đăng nhập</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="text"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </td>
                        </tr>
                        {error && (
                          <tr>
                            <td colSpan="2">
                              <p className="noticia-text text-error">{error}</p>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="remember-login">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <p>Remember me</p>
                          </td>
                          <td className="forgot-pass">
                            <Link to="/forgotpass1" className="float-end">
                              Quên mật khẩu ?
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="login-btn py-2">
                            <input
                              type="submit"
                              className="p-2"
                              value="Đăng nhập"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="py-4 px-5">
                            <div className="hr-login"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="login-google text-center">
                      <img src={logogoogle} alt="Google Logo" />
                      <p className="mb-0">Đăng nhập với Google</p>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-md-6">
                <p className="text-center noticia-text title-login title-dangki">
                  Đăng ký
                </p>
                <div className="d-flex justify-content-center content-reg">
                  <p className="w-50 text-center noticia-text">
                    Bạn là người dùng mới, hãy đăng kí ngay để có thể nhận những
                    ưu đãi từ chúng tôi
                  </p>
                </div>
                <div className="d-flex justify-content-center btn-reg">
                  <Link to="/register" className="text-center">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
