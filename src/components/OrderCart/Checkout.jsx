import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import similac from "../../assets/img/similac.png";
import vnpay from "../../assets/img/vnpay.png";
import icon_payondelivery from "../../assets/img/icon_payondelivery.png";
import "./stylecheckout.css";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <>
      <section>
        <div className="banner container-fluid mb-5 pb-5">
          <h1 className="pt-5">Checkout</h1>
          <p className="myhome">
            <Link to="/">Home</Link>
            <span>
              <FontAwesomeIcon
                icon="fa-solid fa-angles-right"
                className="px-4"
              />
            </span>
            <Link to="/cart">Cart</Link>
            <span>
              <FontAwesomeIcon
                icon="fa-solid fa-angles-right"
                className="px-4"
              />
            </span>
            <Link to="/checkout">Checkout</Link>
          </p>
        </div>
      </section>

      <div className="background-container">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="w-100">
                <div className="profile-info w-100 d-flex justify-content-center">
                  <table className="w-75">
                    <tbody>
                      <tr>
                        <td className="py-2">
                          <span
                            className="Vidaloka"
                            style={{ fontSize: "25px" }}
                          >
                            Thông tin giao hàng
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="Fullname"
                            id=""
                            placeholder="Fullname"
                            value=""
                            className="w-100 p-1 ps-2 nochange"
                            readOnly
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="Email"
                            id=""
                            placeholder="Email"
                            value=""
                            className="w-100 p-1 ps-2 nochange"
                            readOnly
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="phoneNumber"
                            id=""
                            placeholder="Mobile Phone"
                            value=""
                            className="w-100 p-1 ps-2"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="address"
                            id=""
                            placeholder="Address"
                            value=""
                            className="w-100 p-1 ps-2"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <textarea
                            name="note"
                            id=""
                            cols="30"
                            rows="3"
                            placeholder="Note"
                            style={{ resize: "none" }}
                            className="w-100 p-1 ps-2"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="product-info w-100 mt-3">
                  <table className="w-100">
                    <tbody>
                      <tr style={{ borderBottom: "1px solid black" }}>
                        <td className="w-20 py-1 text-center fw-bold">
                          <span>Sản Phẩm</span>
                        </td>
                        <td className="py-1">
                          <span></span>
                        </td>
                        <td className="py-1 text-center fw-bold">
                          <span>Giá</span>
                        </td>
                        <td className="py-1 text-center fw-bold">
                          <span>Số lượng</span>
                        </td>
                        <td className="py-1 text-center fw-bold">
                          <span>Tổng cộng</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-5 py-1">
                          <div className="item w-100 text-center">
                            <img
                              src={similac}
                              alt="product-img"
                              className="w-50"
                            />
                          </div>
                        </td>
                        <td className="py-1 text-center">
                          <span>Sữa bầu cho mẹ</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>300.000 VND</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>50</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>500.000 VND</span>
                        </td>
                        <td className="py-1 text-center w-15">
                          <span
                            className="text-center fw-bold"
                            style={{ color: "#FF0000" }}
                          >
                            hết hàng
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-5 py-1">
                          <div className="item w-100 text-center">
                            <img
                              src={similac}
                              alt="product-img"
                              className="w-50"
                            />
                          </div>
                        </td>
                        <td className="py-1 text-center">
                          <span>Sữa bầu cho mẹ</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>300.000 VND</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>50</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>500.000 VND</span>
                        </td>
                        <td className="py-1 text-center w-15">
                          <span
                            className="text-center fw-bold"
                            style={{ color: "#FF0000" }}
                          >
                            hết hàng
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-5 py-1">
                          <div className="item w-100 text-center">
                            <img
                              src={similac}
                              alt="product-img"
                              className="w-50"
                            />
                          </div>
                        </td>
                        <td className="py-1 text-center">
                          <span>Sữa bầu cho mẹ</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>300.000 VND</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>50</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>500.000 VND</span>
                        </td>
                        <td className="py-1 text-center w-15">
                          <span
                            className="text-center fw-bold"
                            style={{ color: "#FF0000" }}
                          >
                            hết hàng
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-5 py-1">
                          <div className="item w-100 text-center">
                            <img
                              src={similac}
                              alt="product-img"
                              className="w-50"
                            />
                          </div>
                        </td>
                        <td className="py-1 text-center">
                          <span>Sữa bầu cho mẹ</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>300.000 VND</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>50</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>500.000 VND</span>
                        </td>
                        <td className="py-1 text-center w-15">
                          <span
                            className="text-center fw-bold"
                            style={{ color: "#FF0000" }}
                          >
                            hết hàng
                          </span>
                        </td>
                      </tr>

                      <tr style={{ borderTop: "1px solid black" }}>
                        <td className="w-20 py-3">
                          <div
                            className="p-3 text-center"
                            style={{
                              backgroundColor: "rgb(245, 245, 245)",
                              borderRadius: "10px",
                            }}
                          >
                            <a
                              href="#"
                              style={{
                                textDecoration: "none",
                                color: "#FF0000",
                                fontWeight: "600",
                              }}
                            >
                              Quay về Cart
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="w-100 d-flex justify-content-center">
                <div className="w-80">
                  <table
                    className="w-100"
                    style={{ border: "1px solid black" }}
                  >
                    <tbody>
                      <tr>
                        <td className="pt-3 ps-3 fw-semibold fs-5 w-75">
                          <span>Điểm của bạn: 1000</span>
                        </td>
                        <td className="pt-3 ps-3 fw-semibold fs-5 w-25 text-center">
                          <div
                            className="d-inline-block"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <FontAwesomeIcon
                              icon={faCircleQuestion}
                              data-bs-toggle="modal"
                              data-bs-target="#pointsModal"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="p-3">
                          <select
                            name="Discount"
                            id=""
                            className="w-100 py-2 px-2"
                            style={{ borderRadius: "15px" }}
                          >
                            <option value="apple" defaultValue>
                              10.000 VNĐ (1000 điểm)
                            </option>
                            <option value="apple">
                              10.000 VNĐ (1000 điểm)
                            </option>
                            <option value="apple" disabled>
                              10.000 VNĐ (1000 điểm)
                            </option>
                            <option value="apple">
                              10.000 VNĐ (1000 điểm)
                            </option>
                            <option value="apple">
                              10.000 VNĐ (1000 điểm)
                            </option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-100 mt-5">
                <div className="w-100 d-flex justify-content-center">
                  <div className="w-80 table-money px-4 py-3">
                    <table className="w-100">
                      <tbody>
                        <tr>
                          <td
                            colSpan="2"
                            className="py-2 w-50 fw-semibold fs-5"
                          >
                            <span style={{ fontSize: "25px" }}>
                              Tóm tắt đơn hàng
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 w-50 text-center">
                            <span
                              style={{ color: "#757575" }}
                              className="float-start"
                            >
                              Tổng tiền:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ fontWeight: "600" }}
                            >
                              VND 4.603.000
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 w-50 text-center">
                            <span
                              style={{ color: "#757575" }}
                              className="float-start"
                            >
                              Shipping:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ fontWeight: "600" }}
                            >
                              VND 25.000
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 w-50 text-center">
                            <span
                              style={{ color: "#757575" }}
                              className="float-start"
                            >
                              Điểm thưởng:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ fontWeight: "600" }}
                            >
                              VND -10.000
                            </span>
                          </td>
                        </tr>
                        <tr style={{ borderTop: "1px solid black" }}>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-start"
                              style={{ fontWeight: "600" }}
                            >
                              Tổng cộng:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ color: "#FF0000", fontWeight: "600" }}
                            >
                              VND 4.618.000
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-100 mt-5 d-flex justify-content-center">
                <div className="w-80 px-4 py-3 d-flex flex-column justify-content-center payment-choose">
                  <span
                    className="m-2 fw-semibold fs-5"
                    style={{ fontSize: "25px" }}
                  >
                    Phương thức thanh toán
                  </span>
                  <div className="w-100 d-flex flex-column justify-content-center">
                    <div
                      className="payment w-100 d-flex justify-content-between pe-2"
                      onclick="checkradio('vnpay')"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="w-75">
                        <img src={vnpay} alt="" className="w-25" />
                        <span className="ps-2">VNPAY</span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value="vnpay"
                        id="vnpay"
                        className="float-end"
                        required
                      />
                    </div>
                    <div
                      className="mt-3 payment w-100 d-flex justify-content-between pe-2"
                      onclick="checkradio('cod')"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="w-75">
                        <img src={icon_payondelivery} alt="" className="w-25" />
                        <span className="ps-2">Thanh toán khi nhận hàng</span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        id="cod"
                        className="float-end"
                        required
                      />
                    </div>
                  </div>
                  <div className="terms d-flex justify-content-center mt-3">
                    <input type="checkbox" required />
                    <p
                      className="m-0 ps-3"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Tôi đã đọc và chấp nhận các điều khoản
                    </p>
                  </div>
                  <div className="w-100 d-flex justify-content-center mt-3">
                    <input
                      type="submit"
                      value="Payment"
                      className="w-90 submit-checkout py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="pointsModal"
        tabIndex="-1"
        aria-labelledby="pointsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ fontFamily: "Open Sans" }}>
            <div
              className="modal-header"
              style={{ backgroundColor: "#3C75A6", color: "white" }}
            >
              <h5 className="modal-title" id="pointsModalLabel">
                Points Information
              </h5>
              <button
                type="button"
                className="btn-close btn-outline-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body table-responsive mx-2">
              <p>Quy trình tích điểm:</p>
              <div className="mx-4">
                <span>
                  Với <span className="fw-bold">1.000 VND / hóa đơn</span> mua
                  hàng thành công bạn sẽ tích ngay cho mình được{" "}
                  <span className="fw-bold">1 điểm</span> tương ứng.
                </span>
              </div>

              <p>Quá trình đổi điểm:</p>
              <div className="mx-4">
                <span>
                  Khi mua hàng, bạn sẽ được chọn các mốc đổi điểm như sau:
                </span>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Point</th>
                    <th className="text-center">Money Discount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1000</td>
                    <td className="text-center">10.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">5000</td>
                    <td className="text-center">50.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">10000</td>
                    <td className="text-center">100.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">50000</td>
                    <td className="text-center">1.000.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">100000</td>
                    <td className="text-center">5.000.000 VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer border-black">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
