import React from "react";
import "../../assets/css/styleadminorder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBoxOpen,
  faRightFromBracket,
  faHouse,
  faPowerOff,
  faDollarSign,
  faClipboardList,
  faUsers,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ManageOrder = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
    <div style={{ background: "#151C2C" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 nav-admin-left">
            <div className="logo-admin d-flex justify-content-center w-100 mt-3">
              <a href="">
                <p
                  className="logo-admin-left d-inline-block p-1 m-0"
                  style={{ fontFamily: "sans-serif" }}
                >
                  LITTLE JOY
                </p>
                <p
                  className="d-inline-block logo-admin-right ms-2"
                  style={{ fontFamily: "sans-serif" }}
                >
                  ADMIN
                </p>
              </a>
            </div>
            <div className="nav-admin mt-5 w-100">
              <table className="w-100">
                <tbody>
                  <tr>
                    <td colSpan="2" className="py-1">
                      <span
                        className="nav-admin-title"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        Main
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1 hover-dashboard ps-3">
                      <Link to="/dashboard">
                        <span style={{ fontFamily: "sans-serif" }}>
                          Dashboard
                        </span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="py-1">
                      <span
                        className="nav-admin-title"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        Shop
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1 ps-3 hover-dashboard">
                      <Link to="/manageuser">
                        <FontAwesomeIcon icon={faUser} />{" "}
                        <span style={{ fontFamily: "sans-serif" }}>
                          Quản lý người dùng
                        </span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1 ps-3 active-admin">
                      <Link to="/manageorder">
                        <FontAwesomeIcon icon={faCartShopping} />{" "}
                        <span style={{ fontFamily: "sans-serif" }}>
                          Quản lý đơn hàng
                        </span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1 ps-3 hover-dashboard">
                      <Link to="/manageproduct">
                        <FontAwesomeIcon icon={faBoxOpen} />{" "}
                        <span style={{ fontFamily: "sans-serif" }}>
                          Quản lý sản phẩm
                        </span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/managecategory">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý danh mục
                          </span>
                        </Link>
                      </td>
                    </tr>
                  <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageblog">
                        <FontAwesomeIcon icon="fa-solid fa-paste" />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý bài viết
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/requestrefund">
                        <FontAwesomeIcon icon="fa-solid fa-credit-card" />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Yêu cầu hoàn tiền
                          </span>
                        </Link>
                      </td>
                    </tr>
                  <tr>
                  <td className="py-2">
                      <Link to="/" style={{textDecoration: 'none'}} className="text-white" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                        </Link>
                      </td>
                      <td>
                      <Link to="/" style={{textDecoration: 'none'}} className="text-white" onClick={handleLogout}>
                        <span >Logout</span>
                        </Link>
                      </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-10">
            <div className="row top-nav">
              <div className="col-md-2 text-center">
                <div className="dashboard p-2 py-3">
                  <a href="" className="">
                    <p className="m-0" style={{ fontFamily: "sans-serif", fontSize: '16px' }}>
                      Dashboard
                    </p>
                  </a>
                </div>
              </div>
              <div className="col-md-8 d-flex align-content-center">
                <div className="icon-nav p-2 py-3">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div className="pos-nav d-flex align-content-center p-2 py-3">
                  <p className="m-0" style={{ fontFamily: "sans-serif", fontSize: '16px' }}>
                    Home
                  </p>
                  <span style={{ fontFamily: "sans-serif" }}>
                    /User Management
                  </span>
                </div>
              </div>
              <div className="col-md-2 d-flex align-content-center justify-content-center">
                <div className="pos-nav d-flex align-content-center p-2 py-3">
                  <p className="m-0" style={{fontFamily: "sans-serif", fontSize: '16px'}}>phamhieu</p>
                </div>
                <div className="icon-nav-log p-2 py-3 text-white">
                  <FontAwesomeIcon icon={faPowerOff} />
                </div>
              </div>
              <div className="col-md-12 p-0">
                <div className="flex-content text-center w-100">
                  <div className="body-top w-100">
                    <div className="body-title d-flex justify-content-between align-items-center w-100">
                      <span
                        className="ms-3"
                        style={{
                          color: "#F8B940",
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Order Management
                      </span>
                    </div>
                  </div>
                  <div className="body-center">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12 d-flex justify-content-start">
                          <div className="search-user p-3">
                            <input
                              type="text"
                              className="p-1 ps-3"
                              placeholder="Search user"
                            />
                          </div>
                          <div className="filter-status p-3" >
                            <select name="" id="" className="p-1" defaultValue="">
                              <option value="" disabled>
                                Status
                              </option>
                              <option value="">Cancelled</option>
                              <option value="">Pending</option>
                              <option value="">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12 p-0">
                          <table className="w-100 table-body">
                            <tbody>
                            <tr className="table-header">
                              <td className="p-3 px-4">
                                <span className="float-start">OrderID</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Customer</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Date</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Location</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  Phone number
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Method</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Price</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="">Status</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span>Action</span>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-complete px-1 py-2">
                                  <span className="inter">COMPLETED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-complete px-1 py-2">
                                  <span className="inter">COMPLETED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end paging p-2">
                          <a href="" className="p-2 me-3 active-paging">
                            1
                          </a>
                          <a href="" className="p-2 me-3">
                            2
                          </a>
                          <a href="" className="p-2 me-3">
                            3
                          </a>
                          <a href="" className="p-2 me-3">
                            4
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal details order --> */}
      <div className="modal" id="details-order">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="py-2 header-modal d-flex justify-content-between">
              <h4 className="modal-title inter ms-3">Details Order</h4>
              <div className="btn-close-modal me-3" data-bs-dismiss="modal">
                <i className="fa-solid fa-x"></i>
              </div>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <table className="w-100 table-modal">
                <tbody>
                <tr>
                  <td className="p-2">
                    <span>Order ID:</span>
                  </td>
                  <td className="p-2">
                    <span>200803</span>
                  </td>
                  <td className="p-2">
                    <span>Customer:</span>
                  </td>
                  <td className="p-2">
                    <span>taile03</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Date:</td>
                  <td className="p-2">2024-1-2 13:23:44</td>
                  <td className="p-2">Method:</td>
                  <td className="p-2">VNPAY</td>
                </tr>
                <tr>
                  <td className="p-2">Location</td>
                  <td colSpan="3" className="p-2">
                    <input type="text" name="" id="" className="w-100 ps-2" />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Phone Number: </td>
                  <td colSpan="3" className="p-2">
                    <input type="text" name="" id="" className="w-100 ps-2" />
                  </td>
                </tr>
                </tbody>
              </table>
              <div className="title-product-modal p-2 my-1">
                <span className="w-100">Product:</span>
              </div>
              <div className="p-2">
                <table className="w-100 text-center table-product-modal">
                    <tbody>
                  <tr className="product-modal-title">
                    <td>
                      <span className="py-2">Name</span>
                    </td>
                    <td>
                      <span className="py-2">Quantity</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">Price</span>
                    </td>
                  </tr>
                  <tr className="product-modal-list">
                    <td>
                      <span className="py-2">Wild</span>
                    </td>
                    <td>
                      <span className="py-2">5</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">750.000</span>
                    </td>
                  </tr>
                  <tr className="product-modal-list">
                    <td>
                      <span className="py-2">Stylish</span>
                    </td>
                    <td>
                      <span className="py-2">7</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">750.000</span>
                    </td>
                  </tr>
                  <tr className="product-modal-title">
                    <td>
                      <span className="py-2">Total</span>
                    </td>
                    <td>
                      <span className="py-2">12</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">1.500.500</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-2 mt-2">
                <table className="w-100 table-option-modal">
                    <tbody>
                  <tr>
                    <td className="py-2 w-20">
                      <span>Status:</span>
                    </td>
                    <td className="py-2 w-80">
                      <select name="" id="" className="ps-2">
                        <option value="">Cancelled</option>
                        <option value="">Pending</option>
                        <option value="">Completed</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 w-20">
                      <span>Note:</span>
                    </td>
                    <td className="py-2 w-80">
                      <textarea
                        id="myTextarea"
                        name="myTextarea"
                        rows="4"
                        cols="50"
                        className="w-75 p-2"
                      ></textarea>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="footer-modal py-4 d-flex justify-content-end">
              <div className="close me-4">
                <div
                  className="modal-btn-close p-2 px-4"
                  data-bs-dismiss="modal"
                >
                  <span>Close</span>
                </div>
              </div>
              <div className="save-modal me-4">
                <input
                  type="submit"
                  value="Save"
                  className="input-submit p-2 px-4 inter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ManageOrder;
