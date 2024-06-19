import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const ManageCategory = () => {
  const navigate = useNavigate();
  const [manage, setManage] = useState(null);
  const [username, setUsername] = useState("");
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const roleFromLocalStorage = localStorage.getItem("userRole");
    const usernameFromLocalStorage = localStorage.getItem("userName");
    if (
      roleFromLocalStorage === "ADMIN" ||
      roleFromLocalStorage === "STAFF" ||
      (roleFromLocalStorage === "USER" && usernameFromLocalStorage)
    ) {
      setUsername(usernameFromLocalStorage);
    }
  }, [pathname]);

  const fetchCategories = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/category?PageIndex=${pageIndex}&PageSize=9`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setCategories([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          console.log("Lỗi fetch data...");
          setCategories([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationData = await JSON.parse(
        response.headers.get("X-Pagination")
      );
      setPaging(paginationData);

      const dataCategories = await response.json();
      setCategories(dataCategories);
      console.log(categories);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(paging.CurrentPage, paging.PageSize);
  }, [paging.CurrentPage]);

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
                <Link to="/">
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
                </Link>
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
                      <td className="py-1 ps-3 hover-dashboard  ">
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
                      <td className="py-1 ps-3 active-admin ">
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
                        <Link
                          to="/"
                          style={{ textDecoration: "none" }}
                          className="text-white"
                          onClick={handleLogout}
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to="/"
                          style={{ textDecoration: "none" }}
                          className="text-white"
                          onClick={handleLogout}
                        >
                          <span>Logout</span>
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
                    <Link to="/dashboard" className="">
                      <p
                        className="m-0"
                        style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                      >
                        Dashboard
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="col-md-8 d-flex align-content-center">
                  <div className="icon-nav p-2 py-3">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <div className="pos-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Home
                    </p>
                    <span style={{ fontFamily: "sans-serif" }}>
                      /Categories Management
                    </span>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-content-center justify-content-center">
                  <div className="pos-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      {username}
                    </p>
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
                          Categories Management
                        </span>
                      </div>
                    </div>
                    {/* Body quản lý danh mục */}
                    <div className="">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6 mb-5 ">
                            <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Category</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-user">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Category</p></a>
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
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Category Name</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
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
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>

                          <div className="col-md-6 mb-5 ">
                          <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Origin</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-user">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Origin</p></a>
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
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Category Name</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
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
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-5 ">
                          <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Age Group</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-user">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Age Group</p></a>
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
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Category Name</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
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
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>

                          <div className="col-md-6 mb-5 ">
                          <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Brand</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-user">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Brand</p></a>
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
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Category Name</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
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
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>  
                    {/*end: body-quản lý danh mục */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;
