import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserOrderDetail.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import Abott from "../../assets/img/Abott.png";

export default function UserOrderDetail() {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [image, setImage] = useState(null);

  const handleCancelOrder = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCancelConfirmation = () => {
    console.log("Reason:", reason);
    console.log("Comments:", comments);
    console.log("Image:", image);
    closeModal();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
              <Link to="/userprofile">Profile</Link>
            </p>
          </div>
        </div>
      </section>

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
                    <div className="user-address-sidebar">
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
                    <div className="user-address-sidebar ">
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
                      <div className="CoverButton">
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
                          <FontAwesomeIcon
                            icon="fa-solid fa-map-location"
                            className="fs-3"
                          />
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

          <div className="col-md-9">
            <div className="row">
              {/* <!-- Return Button --> */}
              <div className="col-md-12">
                <div className="w-100">
                  <div className="w-100 mt-4 pt-3">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/userordermanagement"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                      <span className="px-2">Trở lại</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Page Function --> */}
              <div className="col-md-12">
                <div className="w-100">
                  <div className="w-100 mt-4">
                    <p
                      className="fs-3 pb-3"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Chi tiết đơn hàng
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              {/* <!-- User info in order --> */}
              <div className="col-md-6 pb-5">
                <div className="background w-100">
                  <table className="w-100 pb-5 ps-2 pe-3">
                    <tbody>
                      <tr>
                        <td className="ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>
                            Tên khách hàng:
                          </span>
                        </td>
                        <td className="ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>
                            Pham Van Tuan Hieu
                          </span>
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                      <tr>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>
                            Số điện thoại:
                          </span>
                        </td>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>090 001 1234</span>
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                      <tr>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>Email:</span>
                        </td>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>
                            baoton1234@gmail.com
                          </span>
                          <td colSpan="2"></td>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>Địa chỉ:</span>
                        </td>
                        <td className="pt-4 ps-3">
                          <span style={{ fontSize: "20px" }}>
                            {" "}
                            S1.02 vinhomesgrandpark,....
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <!-- Overview global Order info --> */}
              <div className="col-md-6 pb-5 mb">
                <div
                  className="w-100 h-100 d-flex justify-content-center"
                  style={{ borderLeft: "1px solid black" }}
                >
                  <div className="w-100 ms-4">
                    <div className="background">
                      <table className="w-100 pb-5 ps-2 pe-2">
                        <tbody>
                          <tr>
                            <td className="ps-3 pt-3">
                              <span style={{ fontSize: "20px" }}>
                                Mã đơn hàng:
                              </span>
                            </td>
                            <td className="ps-3 pt-3">
                              <div className="d-flex">
                                <span
                                  className="pe-3"
                                  style={{ fontSize: "20px" }}
                                >
                                  #271455
                                </span>
                                <div
                                  style={{ borderLeft: "1px solid black" }}
                                ></div>
                                <span
                                  className="ps-3"
                                  style={{
                                    fontSize: "20px",
                                    color: "rgba(48, 207, 35, 1)",
                                  }}
                                >
                                  {" "}
                                  Mua hàng
                                </span>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="ps-3 pt-4">
                              <span style={{ fontSize: "20px" }}>
                                Ngày đặt:
                              </span>
                            </td>
                            <td className="pt-4 ps-3">
                              <span style={{ fontSize: "20px" }}>
                                27/05/2024
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="ps-3 pt-4">
                              <span style={{ fontSize: "20px" }}>
                                Trạng thái giao hàng:
                              </span>
                            </td>
                            <td className="pt-4 ps-3">
                              <span style={{ fontSize: "20px" }}>
                                đang giao...
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="ps-3 pt-4 pb-4">
                              <span style={{ fontSize: "20px" }}>
                                Hình thức thanh toán:
                              </span>
                            </td>
                            <td className="pt-4 ps-3 pb-4">
                              <span style={{ fontSize: "20px" }}>VN Pay</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Note --> */}
            <div className="col-md-12">
              <div className="pb-4 w-105">
                <form action="#">
                  <textarea
                    className="w-100 background form-control-lg"
                    readOnly
                  >
                    Hàng dễ vỡ, đắt tiền, gọi điện rồi xuống nhận hàng
                  </textarea>
                </form>
              </div>
            </div>

            {/* <!-- Product Detail --> */}
            <div className="col-md-12 w-105">
              <table className="w-100">
                <tbody>
                  <tr>
                    <td className="FieldALl w-100 pe-5" colSpan="5">
                      <div className="w-75">
                        <div className="w-25 borderAll-ProductDetailUser">
                          <div className="text-center">
                            <span className="fs-5 py-2 w-100  Black">
                              Chi tiết sản phẩm
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="pt-2" colSpan="5">
                      <div
                        className="w-100 h-100 d-flex justify-content-center"
                        style={{ borderBottom: "1px solid #CCCCCC" }}
                      ></div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-100 mt-4">
                <tbody>
                  <tr>
                    <td className="w-75 pt-3 posButton-SummaryOrder">
                      <span className="pe-3">Giảm giá:</span>
                    </td>

                    <td className="w-20 pt-3 me-4 posButton-SummaryOrder">
                      <div className="pe-5">
                        <span className="pe-4">-10.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-75 pt-3 posButton-SummaryOrder">
                      <span className="pe-3">Tổng tiền:</span>
                    </td>

                    <td className="w-20 pt-3 posButton-SummaryOrder">
                      <div className="pe-5">
                        <span className="pe-4">100.000.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td></td>

                    <td className="pt-4">
                      <div className="w-100 pe-5">
                        <button
                          className="w-100 Borderall-CancelOrder px-4 py-1 text-center text-white"
                          onClick={handleCancelOrder}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <p>Bạn có chắc chắn muốn hủy đơn hàng?</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <span className="fw-bold text-start">Lý do hủy đơn</span>
              <input
                type="text"
                placeholder="Lý do"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px" }}
              />
              <span className="fw-bold text-start">Mô tả lý do</span>
              <input
                type="text"
                placeholder="Mô tả"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px" }}
              />
              <span className="fw-bold text-start">Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "5px",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "#3c75a6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleCancelConfirmation}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
