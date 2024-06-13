import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/styleregister.css';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recaptchaResponse, setRecaptchaResponse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load the reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.onRecaptchaChange = onRecaptchaChange;
  
    return () => {
      delete window.onRecaptchaChange;
    };
  }, []);
  
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!recaptchaResponse) {
      setError('Please complete the reCAPTCHA');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formRegister = {
      fullName: fullName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    console.log(formRegister);

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/authen/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegister),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        navigate('/confirmemail');
      } else {
        // setError(response.errors || 'Registration failed');
        const validationErrors = data.errors || {};
        setError(validationErrors);
      }
    } catch (error) {
      // setError('Something went wrong. Please try again.');
      setError({ general: 'Something went wrong. Please try again.' });
    }
  };
 
  const displayErrors = () => {
    if (error.general) {
      return <span>{error.general}</span>;
    }
    return Object.keys(error).map((key) => (
      <span key={key}>
        {Array.isArray(error[key]) ? (
          error[key].map((error, index) => (
            <><span key={index}>{error}</span><br></br></>
          ))
        ) : (
          <span>{error[key]}</span>
        )}
      </span>
    ));
  };

  const onRecaptchaChange = (response) => {
    setRecaptchaResponse(response);
  };

  return (
    <>
      <div style={{ marginBottom: '7%' }}>
        <div className="container p-5 mt-5 mb-5 roboto">
          <div className="row">
            <div className="col-md-12 text-center nav-login">
              <div className="d-flex align-items-center justify-content-center">
                <Link to="/" className="nav-link px-4">
                  Home
                </Link>
                <FontAwesomeIcon icon="fa-solid fa-angles-right px-4" />
                <Link to="/register" className="nav-link px-4">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="body-register container-fluid mb-4 roboto">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-center">
                    <table className="table-reg">
                      <tbody>
                        <tr>
                          <td colSpan="2">
                            <p className="noticia-text title-login">Đăng ký</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="text"
                              placeholder="FullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="text"
                              placeholder="Username"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr className="hidden">
                          <td colSpan="2">
                            <p className="noticia-text text-error mb-0">
                              Tên đăng nhập phải từ 4-20 chữ số
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="text"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr className="hidden">
                          <td colSpan="2">
                            <p className="noticia-text text-error mb-0">
                              Email không hợp lệ
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="text"
                              placeholder="Phone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
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
                        <tr className="hidden">
                          <td colSpan="2">
                            <p className="noticia-text text-error mb-0">
                              Mật khẩu phải có từ 4 chữ số
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="input-login py-2">
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr className="hidden">
                          <td colSpan="2">
                            <p className="noticia-text text-error mb-0">
                              Mật khẩu không trùng khớp
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="captcha-login d-flex flex-column align-items-center justify-content-center">
                            <div>
                            <div className="g-recaptcha" data-sitekey="6LeUy-8pAAAAAF4UncmMSagSyDveemB2A3IgscOP" data-callback="onRecaptchaChange"></div>
                            </div>
                            <div style={{ color: "red", fontSize: "15px" }}>
                              {displayErrors()}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="reg-btn py-2">
                            <input type="submit" className="p-2" value="Đăng ký" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <p className="text-center noticia-text title-login title-dangki">Đăng nhập</p>
                <div className="d-flex justify-content-center content-reg">
                  <p className="w-50 text-center noticia-text">
                    Bạn đã có tài khoản, đăng nhập ngay!
                  </p>
                </div>
                <div className="d-flex justify-content-center btn-reg">
                  <Link to="/login" className="text-center">Đăng nhập</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}