import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/stylelogin.css";
import logogoogle from "../../assets/img/logogoogle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const user = users.find(
  //     (user) => user.username === username && user.password === password
  //   );

  //   if (user) {
  //     localStorage.setItem("role", user.role);
  //     localStorage.setItem("username", user.username);
  //     navigate("/");
  //     window.location.reload();
  //   } else {
  //     setError("Tên đăng nhập hoặc mật khẩu không đúng");
  //   }
  // };

  //LoginAPI - store
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const newUser = {
  //     username: username,
  //     password: password
  //   };
  //   loginUser(newUser,dispatch,navigate);
  // }

  useEffect(() => {
    const rememberedUsername = sessionStorage.getItem('rememberedUsername');
    const rememberedPassword = sessionStorage.getItem('rememberedPassword');
    if (rememberedUsername && rememberedPassword) {
      setUsername(rememberedUsername);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/authen/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Decode
        const decodedToken = jwtDecode(data.accessToken);
        console.log(decodedToken);
        const nameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
        const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        const userClaim = 'user_ID';
        
        const userName = decodedToken[nameClaim];
        const userRole = decodedToken[roleClaim];
        const userId = decodedToken[userClaim];

        localStorage.setItem('userName', userName);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userId);

        if (rememberMe) {
          sessionStorage.setItem('rememberedUsername', username);
          sessionStorage.setItem('rememberedPassword', password);
        } else {
          sessionStorage.removeItem('rememberedUsername');
          sessionStorage.removeItem('rememberedPassword');
        }
        

        console.log(userName, userRole, userId);

        navigate("/");
        window.location.reload();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  
  


  return (
    <>
      <div style={{ marginBottom: '7%' }}>
        <div className="container p-5 mt-5 mb-xl-5 roboto">
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

        <div className="body-login container-fluid roboto">
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
                          <td className="remember-login py-2">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              id="remember"
                            />
                            <span className="ps-3"><label htmlFor="remember">Remember me</label></span>
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
                      <span className="mb-0">Đăng nhập với Google</span>
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
