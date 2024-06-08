import React from 'react'
import '../../assets/css/styleadminuser.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faBoxOpen, faRightFromBracket, faHouse, faPowerOff, faDollarSign, faClipboardList, faUsers, faBan } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ManageUser = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
    <div style={{ background: "#151C2C" }}>
        <div className="container-fluid  ">
        <div className="row">
        <div className="col-md-2 nav-admin-left">
              <div className="logo-admin d-flex justify-content-center w-100 mt-3">
                <a href="">
                  <p className="logo-admin-left d-inline-block p-1 m-0" style={{ fontFamily: 'sans-serif' }}>
                    LITTLE JOY
                  </p>
                  <p className="d-inline-block logo-admin-right ms-2" style={{ fontFamily: 'sans-serif' }}>ADMIN</p>
                </a>
              </div>
              <div className="nav-admin mt-5 w-100">
                <table className="w-100">
                  <tbody>
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span className="nav-admin-title" style={{ fontFamily: 'sans-serif' }}>Main</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 hover-dashboard ps-3">
                        <Link to="/dashboard">
                          <span style={{ fontFamily: 'sans-serif' }}>Dashboard</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span className="nav-admin-title" style={{ fontFamily: 'sans-serif' }}>Shop</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 active-admin">
                        <Link to="/manageuser">
                          <FontAwesomeIcon icon={faUser} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Quản lý người dùng</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageorder">
                          <FontAwesomeIcon icon={faCartShopping} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Quản lý đơn hàng</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageproduct">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Quản lý sản phẩm</span>
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
                                <p className="m-0" style={{ fontFamily: 'sans-serif', fontSize: '16px' }}>Dashboard</p>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-content-center">
                        <div className="icon-nav p-2 py-3">
                            <i className="fa-solid fa-house"></i>
                        </div>
                        <div className="pos-nav d-flex align-content-center p-2 py-3">
                            <p className="m-0" style={{ fontFamily: 'sans-serif', fontSize: '16px' }}>Home</p><span style={{ fontFamily: 'sans-serif' }}>/User Management</span>
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
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Users</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-user">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add User</p></a>
                                    </div>
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search user"/></div>
                                        </div>
                                        <div className="col-md-12 p-0">
                                            <table className="w-100 table-body">
                                                <tbody>
                                                <tr className="table-header">
                                                    <td className="p-3 px-4"><span className="float-start">Tên tài khoản</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Họ & tên</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Email</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Số điện thoại</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Địa chỉ</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Role</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
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

    {/* <!-- Modal add user --> */}
    <div className="modal" id="add-user">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
      
            {/* <!-- Modal Header --> */}
            <div className="py-2 header-modal d-flex justify-content-between">
              <h4 className="modal-title inter ms-3" style={{fontFamily: 'system-ui'}}>Add new user</h4>
              <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon="fa-solid fa-x" /></div>
            </div>
      
            {/* <!-- Modal body --> */}
            <div className="modal-body">
                <table className="w-100 table-modal">
                    <tbody>
                    <tr>
                        <td colSpan="2" className="py-2"><span className="inter">Tên tài khoản</span></td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><input type="text" placeholder="" className="w-100 p-1"/></td>
                        <td></td>
                    </tr>
                    <tr className="row-error">
                        <td colSpan="2"><span className="error-text">User name is already exist</span></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Số điện thoại</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1"/></td>
                    </tr>
                    <tr>
                        <td className="py-2">Role</td>
                        <td className="py-2">Status</td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><select className="w-100 p-1">
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="user">User</option>
                          </select></td>
                          <td className="pe-1 py-1"><select className="w-100 p-1">
                            <option value="active">Active</option>
                            <option value="isactive">IsActive</option>
                          </select></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Email</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Địa chỉ</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
      
            {/* <!-- Modal footer --> */}
            <div className="footer-modal py-4 d-flex justify-content-end">
              <div className="close me-4">
                <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
              </div>
              <div className="save-modal me-4">
                <input type="submit" value="Add user" className="input-submit p-2 px-3 inter"/>
              </div>
            </div>
      
          </div>
        </div>
      </div>
      {/* <!-- Modal edit user --> */}
      <div className="modal" id="edit-user">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
      
            {/* <!-- Modal Header --> */}
            <div className="py-2 header-modal d-flex justify-content-between">
              <h4 className="modal-title inter ms-3" style={{fontFamily: 'system-ui'}}>Edit user</h4>
              <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon="fa-solid fa-x" /></div>
            </div>
      
            {/* <!-- Modal body --> */}
            <div className="modal-body">
                <table className="w-100 table-modal">
                    <tbody>
                    <tr>
                        <td colSpan="2" className="py-2"><span className="inter">Tên tài khoản</span></td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><input type="text" placeholder="" className="w-100 p-1"/></td>
                        <td></td>
                    </tr>
                    <tr className="row-error">
                        <td colSpan="2"><span className="error-text">User name is already exist</span></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Số điện thoại</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1"/></td>
                    </tr>
                    <tr>
                        <td className="py-2">Role</td>
                        <td className="py-2">Status</td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><select className="w-100 p-1">
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="user">User</option>
                          </select></td>
                          <td className="pe-1 py-1"><select className="w-100 p-1">
                            <option value="active">Active</option>
                            <option value="isactive">IsActive</option>
                          </select></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Email</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Địa chỉ</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1"/></td>
                    </tr>
                    </tbody>
                </table>
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
export default ManageUser;
