import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styleUserAddress.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";

export default function UserAddress() {
  return (
    <>
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
                        <img src={Ellipse2} alt="" className="w-100" />
                      </div>
                    </div>
                  </td>
                  <td className="w-75">
                    <span className="fs-5 ps-2 fw-bold">phamhieu2k3</span>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="2">
                    <div className="user-address-sidebar ">
                      <Link
                        className="d-flex py-2"
                        to="/userprofile"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div
                          className="text-center w-25"
                          style={{ color: "#3C75A6" }}
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-user"
                            className="fs-3"
                          />
                        </div>

                        <div className="w-75">
                          <span className="fs-5 ps-2">Thông tin tài khoản</span>
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
                        to="/userchangepassword"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div
                          className="text-center w-25"
                          style={{ color: "#3C75A6" }}
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-lock"
                            className="fs-3"
                          />
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
                          <FontAwesomeIcon
                            icon="fa-solid fa-cart-shopping"
                            className="fs-3"
                          />
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
                      <div className="CoverButton">
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
                            <span className="fs-5 ps-2">
                            Địa chỉ
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>

                

                <tr>
                  <td colSpan="2" className="pt-4">
                    <div className="fs-5">
                      <a href="#" style={{ textDecoration: "none" }}>
                        <FontAwesomeIcon
                          icon="fa-solid fa-arrow-right-from-bracket"
                          style={{ color: "#CCCCCC" }}
                        />
                        <span style={{ color: "black" }} className="ps-4">
                          Đăng xuất
                        </span>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          

          {/* <!-- Address info --> */}
          <div className="col-md-9">
            <table className="w-100 mt-5">
              <tr>
                <td colSpan="5">
                  <span className="fs-4">Địa chỉ nhận hàng</span>
                </td>
                <td className="w-15 pe-4">
                  <div className="w-75">
                    <input
                      id="ButtonAdd"
                      type="submit"
                      value="Thêm địa chỉ mới"
                      className="px-4 py-1"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="pt-2" colSpan="6">
                  <div
                    className="w-100 h-100 d-flex justify-content-center"
                    style={{ borderBottom: "1px solid black" }}
                  ></div>
                </td>
              </tr>

              <tr>
                <td className="pt-3" colSpan="6">
                  <span className="fs-5">Địa chỉ</span>
                </td>
              </tr>

              <tr>
                <td className="pt-4" colSpan="3">
                  <input
                    type="text"
                    name=""
                    id="inputAddress"
                    value="S1.02 vinhomes grandpark, Long Thạnh Mỹ"
                    className="w-90 px-2 py-1"
                  />
                </td>

                <td className="w-15 pe-4 pt-2">
                  <div className="w-75 pt-3">
                    <input
                      id="ButtonAdd"
                      type="submit"
                      value="Cập nhật"
                      className="px-3 py-1"
                    />
                  </div>
                </td>

                <td className="w-15 pe-4 pt-2">
                  <div className="w-75 pt-3">
                    <input
                      id="ButtonAddSpecial"
                      type="submit"
                      value="Mặc định"
                      className="px-3 py-1"
                    />
                  </div>
                </td>

                <td></td>
              </tr>

              <tr className="pt-2">
                <td className="pt-4" colSpan="3">
                  <input
                    type="text"
                    name=""
                    id="inputAddress"
                    value="S1.02 vinhomes grandpark, Long Thạnh Mỹ"
                    className="w-90 px-2 py-1"
                  />
                </td>

                <td className="w-15 pe-4 pt-2">
                  <div className="w-75 pt-3">
                    <input
                      id="ButtonAdd"
                      type="submit"
                      value="Cập nhật"
                      className="px-3 py-1"
                    />
                  </div>
                </td>

                <td className="w-15 pe-4 pt-2">
                  <div className="w-75 pt-3">
                    <input
                      id="ButtonAdd"
                      type="submit"
                      value=" Đặc làm mặc định"
                      className="px-3 py-1"
                    />
                  </div>
                </td>

                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
