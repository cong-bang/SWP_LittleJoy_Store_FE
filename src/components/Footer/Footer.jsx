import React from 'react'
import logoinsta from '../../assets/img/logoinsta.png'
import logofacebook from '../../assets/img/logofacebook.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import '../../assets/css/stylefooter.css'

export default function Footer() {
    return (
      <>
        <div className="container-fluid d-flex justify-content-center footer-content py-3 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <p className="text-center title-footer opensans">THÔNG TIN CHUNG</p>
                <table className='roboto'>
                  <tbody>
                    <tr className="pb-3">
                      <td><FontAwesomeIcon icon="fa-solid fa-location-dot" /></td>
                      <td className="text-noticia ps-2 py-1">
                        Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
                      </td>
                    </tr>
                    <tr>
                      <td><FontAwesomeIcon icon="fa-solid fa-phone" /></td>
                      <td className="text-noticia ps-2 py-1">090 1614 568</td>
                    </tr>
                    <tr>
                      <td><FontAwesomeIcon icon="fa-solid fa-envelope" /></td>
                      <td className="text-noticia ps-2 pt-1">littlejoystore@store.vn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <p className="text-center title-footer opensans">MẠNG XÃ HỘI</p>
                <table className="mt-2 roboto">
                  <tbody>
                    <tr>
                      <td className="logop-footer fs-4">
                        <img src={logofacebook} className="logo-footer w-25 float-end" />
                      </td>
                      <td className="ps-2 py-2">
                        <a href="https://www.facebook.com/" className="mxh-footer text-noticia">fb.com/littlejoystore</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="logop-footer fs-4">
                        <img src={logoinsta} className="logo-footer w-25 float-end" />
                      </td>
                      <td className="ps-2 py-2">
                        <a href="https://www.instagram.com/" className="mxh-footer text-noticia">instagram.com/littlejoystore</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <div>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370224!2d106.8073080748058!3d10.84112758931163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1707141119843!5m2!1svi!2s"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 copyright-border">
              <div className="text-center">
                <p className="copyright-content m-0 roboto pt-1">©️LITTLE JOY STORE 2024.</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }