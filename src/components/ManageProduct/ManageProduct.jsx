import React from 'react'
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
import '../../assets/css/styleadminproduct.css'
import similac from "../../assets/img/similac.png";

 const ManageProduct = () => {

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
                    <td className="py-1 ps-3 hover-dashboard">
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
                    <td className="py-1 ps-3 active-admin ">
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
                                <p className="m-0"style={{ fontFamily: "sans-serif", fontSize: '16px' }}>Dashboard</p>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-content-center">
                        <div className="icon-nav p-2 py-3">
                            <i className="fa-solid fa-house"></i>
                        </div>
                        <div className="pos-nav d-flex align-content-center p-2 py-3">
                            <p className="m-0" style={{ fontFamily: "sans-serif", fontSize: '16px' }}>Home</p><span style={{ fontFamily: "sans-serif" }}>/Product Management</span>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex align-content-center justify-content-center">
                        <div className="pos-nav d-flex align-content-center p-2 py-3">
                            <p className="m-0" style={{ fontFamily: "sans-serif", fontSize: '16px' }}>phamhieu</p>
                        </div>
                        <div className="icon-nav-log p-2 py-3 text-white">
                            <FontAwesomeIcon icon={faPowerOff} />
                        </div>
                    </div>
                    <div className="col-md-12 p-0">
                        <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Product Management</span>
                                    <div className="add-product px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-product">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Product</p></a>
                                    </div>
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-start">
                                            <div className="search-user p-3"><input type="text" className="p-1 ps-3"
                                                    placeholder="Search Product"/></div>
                                            <div className="filter-status p-3">
                                                <select name="" id="" className="p-1" defaultValue="">
                                                    <option value="" selected disabled>Type</option>
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
                                                    <td className="p-3 px-4"><span className="float-start">ProductID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Name</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Type</span></td>
                                                    <td className="p-3 px-4 "><span>Quantity</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Price</span></td>
                                                    <td className="p-3 px-4 "><span>Rating</span></td>
                                                    <td className="p-3 px-4 "><span>Image</span></td>
                                                    <td className="p-3 px-4 description-product"><span>Description</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-10">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">B005</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Wild</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Box</span></td>
                                                    <td className="p-3 px-4 "><span>10</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">250.000</span></td>
                                                    <td className="p-3 px-4 "><span>4.5</span></td>
                                                    <td className="w-5">
                                                        <div className="img-product">
                                                            <img src={similac} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-4 description-product"><span>Một sự pha trộn độc đáo của hoa tulip trắng, tím và cam được tô điểm thêm bởi sự lựa chọn hấp dẫn của hương vani thơm ngon, quả chanh hồ trăn và bánh hạnh nhân sô cô la.</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-product p-2" data-bs-toggle="modal" data-bs-target="#edit-product">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-product p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-end paging p-2">
                                            <a href="" className="p-2 me-3 active-paging">1</a>
                                            <a href="" className="p-2 me-3">2</a>
                                            <a href="" className="p-2 me-3">3</a>
                                            <a href="" className="p-2 me-3">4</a>
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

    {/* <!-- Modal add product --> */}
    <div className="modal" id="add-product">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Product Add</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    <div className="p-2">
                        <table className="w-100 table-modal">
                            <tbody>
                            <tr>
                                <td className="w-20"><span className="py-2">Name:</span></td>
                                <td className="py-2"><input type="text" className="ps-2 p-1 w-100"/></td>
                            </tr>
                            <tr>
                                <td><span className="py-2">Type:</span></td>
                                <td className="py-2"><select name="" id="" className="ps-2 p-1">
                                    <option value="" selected disabled>Choose</option>
                                    <option value="">Birthday</option>
                                    <option value="">Weeding</option>
                                    <option value="">Boxes</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td><span className="py-2">Price:</span></td>
                                <td className="py-2"><input type="text" className="ps-2 p-1 w-100"/></td>
                            </tr>
                            <tr>
                                <td><span className="py-2">Quantity:</span></td>
                                <td>
                                    <div className="btn-quantity w-100 d-flex justify-content-start p-2">
                                        <div className="btn btn-secondary rounded-0 w-10 text-center p-2"
                                            id="quantity-down" onClick="sub('quantity1')">
                                            <span>-</span>
                                        </div>
                                        <div className="button w-15">
                                            <input type="number" className="text-center w-100 p-2" id="quantity1"
                                                value="5"></input>
                                        </div>
                                        <div className="btn btn-secondary rounded-0 w-10 text-center p-2"
                                            id="quantity-up" onClick="add('quantity1')">
                                            <span>+</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            
                            </tbody>
                        </table>
                    </div>
                    <div className="title-product-modal p-2 my-1">
                        <span className="w-100">Description: </span>
                    </div>
                    <div className="p-2 description-text">
                        <textarea id="myTextarea" name="myTextarea" rows="4" cols="50" className="w-100 p-2"></textarea>
                    </div>
                    <div className="title-product-modal p-2 my-1">
                        <span className="w-100">URL image: </span>
                    </div>
                    <div className="p-2 description-text">
                        <textarea id="myTextarea" name="myTextarea" rows="4" cols="50" className="w-100 p-2"></textarea>
                    </div>
                    
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input type="submit" value="Save" className="input-submit p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>

    {/* <!-- modal edit product --> */}
    <div className="modal" id="edit-product">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Product Modify</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    <div className="p-2">
                        <table className="w-100 table-modal">
                            <tbody>
                            <tr>
                                <td className="w-20"><span className="py-2">Name:</span></td>
                                <td className="py-2"><input type="text" className="ps-2 p-1 w-100"/></td>
                            </tr>
                            <tr>
                                <td><span className="py-2">Type:</span></td>
                                <td className="py-2"><select name="" id="" className="ps-2 p-1" defaultValue="">
                                    <option value="" disabled>Choose</option>
                                    <option value="">Birthday</option>
                                    <option value="">Weeding</option>
                                    <option value="">Boxes</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td><span className="py-2">Price:</span></td>
                                <td className="py-2"><input type="text" className="ps-2 p-1 w-100"/></td>
                            </tr>
                            <tr>
                                <td><span className="py-2">Quantity:</span></td>
                                <td>
                                    <div className="btn-quantity w-100 d-flex justify-content-start p-2">
                                        <div className="btn btn-secondary rounded-0 w-10 text-center p-2"
                                            id="quantity-down" onClick="sub('quantity2')">
                                            <span>-</span>
                                        </div>
                                        <div className="button w-15">
                                            <input type="number" className="text-center w-100 p-2" id="quantity2"
                                                value="5"></input>
                                        </div>
                                        <div className="btn btn-secondary rounded-0 w-10 text-center p-2"
                                            id="quantity-up" onClick="add('quantity2')">
                                            <span>+</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            
                            </tbody>
                        </table>
                    </div>
                    <div className="title-product-modal p-2 my-1">
                        <span className="w-100">Description: </span>
                    </div>
                    <div className="p-2 description-text">
                        <textarea id="myTextarea" name="myTextarea" rows="4" cols="50" className="w-100 p-2"></textarea>
                    </div>
                    <div className="title-product-modal p-2 my-1">
                        <span className="w-100">URL image: </span>
                    </div>
                    <div className="p-2 description-text">
                        <textarea id="myTextarea" name="myTextarea" rows="4" cols="50" className="w-100 p-2"></textarea>
                    </div>
                    
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input type="submit" value="Save" className="input-submit p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </div>
    </>
  )
}
export default ManageProduct;