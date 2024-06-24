import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserOrderManagement.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import Abott from "../../assets/img/Abott.png";
import similac from "../../assets/img/similac.png";

const UserOrderManagement = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  return (
    <>
      

      
          {/* <!-- User Info Side Bar--> */}
          

          {/* <!-- User Order Management --> */}
          
            <table className="w-100 mt-4">
              <tbody>
                <tr>
                  <td className="pb-4 textMenu" colSpan="5">
                    <span className="fs-3">Quản lí đơn hàng</span>
                  </td>
                </tr>

                <tr>
                  <td className="FieldAll" colSpan="5">
                    <div className="d-flex w-100 pt-2">
                      <div className="w-20 borderAll">
                        <div className="w-100 text-center">
                          <span className="fs-5 py-2 text-center w-100">
                            Tất cả
                          </span>
                        </div>
                      </div>
                      <div className="w-80" style={{ textAlign: "right" }}>
                        <div className="fs-5">
                          <a
                            className="pe-2 fs-4 inconCursor"
                            href="#"
                            style={{ color: "#3C75A6" }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" className="opacity-50 fs-4" />
                          </a>
                          <span style={{ fontFamily: "Poppins" }}>
                            {" "}
                            Trang 1{" "}
                          </span>
                          <a
                            className="ps-2 fs-4"
                            href="#"
                            style={{ color: "#3C75A6" }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" className="pe-3 fs-4"/>
                            
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="3">
                    <Link to='/userorderdetail' style={{textDecoration: 'none'}}>
                    <span className="textBlue fs-5">#200803</span></Link>
                  </td>

                  <td className="w-40 pt-4 ps-4">
                    <div className="d-flex ps-5">
                      <div
                        className="me-2"
                        style={{ verticalAlign: "baseline" }}
                      >
                        <span className="fw-semibold textGray pe-2">
                          Tình trạng thanh toán:
                        </span>
                      </div>

                      <div className="Borderall">
                        <div className="text-center">
                          <span style={{ color: "white" }}>Hoàn thành</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="w-10 ps-3 pt-4">
                    <div
                      className="w-100 h-100 d-flex"
                      style={{
                        borderLeft: "1px solid #757575",
                        color: "#757575",
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-truck" className="w-50 pt-2 ps-3 fs-6" />
                      <span className="w-50 fs-6 py-1 me-4">14.06.2024</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid #CCCCCC" }}
                    ></div>
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

                  <td className="w-10 ps-4 pb-3">
                    <div className="ms-4">
                      <span className="ps-3">575.000 đ</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="w-10 pt-3">
                    <div id="ProductImg">
                      <img src={similac} alt="Product" />
                    </div>
                  </td>

                  <td className="" colSpan="3">
                    <div>
                      <span>
                        Sữa Similac Total Protection 4 900g (2 - 6 tuổi)
                      </span>
                    </div>

                    <div>
                      <span>x1</span>
                    </div>
                  </td>

                  <td className="w-10 ps-4">
                    <div className="ms-4 mb-4">
                      <span className="ps-3">559.000 đ</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid #CCCCCC" }}
                    ></div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-3 pb-5" colSpan="4">
                    
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{ color: "#26AA99" }} className="ps-2"/>
                    <span className="ps-3" style={{ color: "#26AA99" }}>
                      Giao hàng thành công
                    </span>
                  </td>

                  <td className="w-10 pt-3 pb-5">
                    <span className="ps-1">Total:</span>
                    <span className="ps-2 fw-bold" style={{ color: "#3C75A6" }}>
                      1.134.000 đ
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="3">
                  <Link to='/userorderdetail' style={{textDecoration: 'none'}}>
                    <span className="textBlue fs-5">#200803</span></Link>
                  </td>

                  <td className="w-40 pt-4 ps-4">
                    <div className="d-flex ps-5">
                      <div
                        className="Text me-2"
                        style={{ verticalAlign: "baseline" }}
                      >
                        <span className="fw-semibold textGray pe-2">
                          Tình trạng thanh toán:
                        </span>
                      </div>

                      <div
                        className="Borderall"
                        style={{ backgroundColor: "red" }}
                      >
                        <div className="text-center">
                          <span style={{ color: "white" }}>Thất bại</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="w-10 ps-3 pt-4">
                    <div
                      className="w-100 h-100 d-flex"
                      style={{
                        borderLeft: "1px solid #757575",
                        color: "#757575",
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-truck" className="w-50 pt-2 ps-3 fs-6" />
                      <span className="w-50 fs-6 py-1 me-4">14.06.2024</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid #CCCCCC" }}
                    ></div>
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

                  <td className="w-10 ps-4 pb-3">
                    <div className="ms-4">
                      <span className="ps-3">575.000 đ</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="w-10 pt-3">
                    <div id="ProductImg">
                      <img src={similac} alt="Product" />
                    </div>
                  </td>

                  <td className="" colSpan="3">
                    <div>
                      <span>
                        Sữa Similac Total Protection 4 900g (2 - 6 tuổi)
                      </span>
                    </div>

                    <div>
                      <span>x1</span>
                    </div>
                  </td>

                  <td className="w-10 ps-4">
                    <div className="ms-4 mb-4">
                      <span className="ps-3">559.000 đ</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid #CCCCCC" }}
                    ></div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-3 pb-5" colSpan="4">
                    
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" className="ps-2" style={{ color: "red" }} />
                    <span className="ps-3" style={{ color: "red" }}>
                      Giao hàng thất bại
                    </span>
                  </td>

                  <td className="w-10 pt-3 pb-5">
                    <span className="ps-1">Total:</span>
                    <span className="ps-2 fw-bold" style={{ color: "#3C75A6" }}>
                      1.134.000 đ
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="pt-4" colSpan="3">
                  <Link to='/userorderdetail' style={{textDecoration: 'none'}}>
                    <span className="textBlue fs-5">#200803</span></Link>
                  </td>

                  <td className="w-40 pt-4 ps-4">
                    <div className="d-flex ps-5">
                      <div
                        className="Text me-2"
                        style={{ verticalAlign: "baseline" }}
                      >
                        <span className="fw-semibold textGray pe-2">
                          Tình trạng thanh toán:
                        </span>
                      </div>

                      <div
                        className="Borderall"
                        style={{ backgroundColor: "#9AA14B" }}
                      >
                        <div className="text-center">
                          <span style={{ color: "white" }}>Đang chờ</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="w-10 ps-3 pt-4">
                    <div
                      className="w-100 h-100 d-flex"
                      style={{
                        borderLeft: "1px solid #757575",
                        color: "#757575",
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-truck" className="w-50 pt-2 ps-3 fs-6" />
                      <span className="w-50 fs-6 py-1 me-4">14.06.2024</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid #CCCCCC" }}
                    ></div>
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

                  <td className="w-10 ps-4 pb-3">
                    <div className="ms-4">
                      <span className="ps-3">575.000 đ</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="w-10 pt-3">
                    <div id="ProductImg">
                      <img src={similac} alt="Product" />
                    </div>
                  </td>

                  <td className="" colSpan="3">
                    <div>
                      <span>
                        Sữa Similac Total Protection 4 900g (2 - 6 tuổi)
                      </span>
                    </div>

                    <div>
                      <span>x1</span>
                    </div>
                  </td>

                  <td className="w-10 ps-4">
                    <div className="ms-4 mb-4">
                      <span className="ps-3">559.000 đ</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid #CCCCCC" }}
                    ></div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-3" colSpan="4">
                    
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" className="ps-2" style={{ color: "#9aa14ba1" }} />
                    <span className="ps-3" style={{ color: "#9aa14ba1" }}>
                      Đơn hàng đang chờ xác nhận
                    </span>
                  </td>

                  <td className="w-10 pt-3">
                    <span className="ps-1">Total:</span>
                    <span className="ps-2 fw-bold" style={{ color: "#3C75A6" }}>
                      1.134.000 đ
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          
    </>
  );
}
export default UserOrderManagement;
