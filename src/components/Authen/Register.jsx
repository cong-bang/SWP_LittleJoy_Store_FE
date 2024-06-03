import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styleregister.css'

export default function Register() {
  const [recaptchaResponse, setRecaptchaResponse] = useState('');
    const [error, setError] = useState('');

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptchaResponse) {
            setError('Captcha lỗi');
            
            console.log('Form submitted');
        } else {
            setError('Please complete the reCAPTCHA');
        }
    };

    const onRecaptchaChange = (response) => {
        setRecaptchaResponse(response);
    };

  return (
    <>
      <div className="container p-5 mt-5 mb-5">
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

      <div className="body-register container-fluid mb-4">
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
                          <input type="text" placeholder="FullName" />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="input-login py-2">
                          <input type="text" placeholder="Username" />
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
                          <input type="text" placeholder="Email" />
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
                          <input type="password" placeholder="Password" />
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
                        <td colSpan="2" className="captcha-login">
                          <div className=" g-recaptcha"
                               data-sitekey="6LeUy-8pAAAAAF4UncmMSagSyDveemB2A3IgscOP" 
                               data-callback={onRecaptchaChange}
                          >
                          
                          </div>
                          <div
                            className="hidden"
                            style={{ color: "red", fontSize: "15px" }}
                          >
                            {error}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="reg-btn py-2">
                          <input
                            type="submit"
                            className="p-2"
                            value="Đăng ký"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <p className="text-center noticia-text title-login title-dangki">
                Đăng nhập
              </p>
              <div className="d-flex justify-content-center content-reg">
                <p className="w-50 text-center noticia-text">
                  Bạn đã có tài khoản, đăng nhập ngay!
                </p>
              </div>
              <div className="d-flex justify-content-center btn-reg">
                <Link to="/login" className="text-center">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
