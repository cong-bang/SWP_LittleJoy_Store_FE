import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBoxOpen,
  faRightFromBracket,
  faHouse,
  faPowerOff,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ManageBlog() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "First Blog",
      banner: "banner1.jpg",
      content: "Content of the first blog",
      date: "2024-01-01",
    },
    {
      id: 2,
      title: "Second Blog",
      banner: "banner2.jpg",
      content: "Content of the second blog",
      date: "2024-02-01",
    },
  ]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    banner: "",
    content: "",
    date: "",
  });
  const [editing, setEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const handleEditBlog = (blog) => {
    setEditing(true);
    setCurrentBlog(blog);
    setNewBlog(blog);
    //openModal();
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
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
                      <td className="py-1 ps-3 active-admin">
                        <Link to="/manageblog">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý bài viết
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
              <div className="row top-admin-nav">
                <div className="col-md-2 text-center">
                  <div className="dashboard p-2 py-3">
                    <a href="">
                      <p
                        className="m-0"
                        style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                      >
                        Dashboard
                      </p>
                    </a>
                  </div>
                </div>
                <div className="col-md-8 d-flex align-content-center">
                  <div className="icon-admin-nav p-2 py-3">
                    <FontAwesomeIcon icon={faHouse} />
                  </div>
                  <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Home
                    </p>
                    <span style={{ fontFamily: "sans-serif" }}>/Dashboard</span>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-content-center justify-content-center">
                  <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      phamhieu
                    </p>
                  </div>
                  <div className="icon-admin-nav-log p-2 py-3 text-white">
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
                          Blog Management
                        </span>
                      </div>
                    </div>
                    <div className="body-center">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content">
                            <div className="search-user float-start p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                placeholder="Search title"
                              />
                            </div>
                            <div className="search-user float-start p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                placeholder="Search userid"
                              />
                            </div>
                            <div className=" d-flex align-items-center ps-3" style={{width: '10%'}}>
                            <select className="w-100 p-1 " style={{borderRadius: '5px', background: '#151C2C', color: '#888888'}}>
                              <option disabled selected >Ngày</option>
                              <option value="">thấp - cao</option>
                              <option value="">cao - thấp</option>
                            </select>
                            </div>
                          </div>
                          <div className="col-md-12 p-0">
                            <table className="w-100 table-body">
                              <tbody>
                                <tr className="table-header">
                                  <td className="p-3 px-4">
                                    <span className="float-start">ID</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Title</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Banner</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Content</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Date</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span>Action</span>
                                  </td>
                                </tr>

                                <tr className="table-content">
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">001</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Title here</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Imgae</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">
                                      Content here
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">
                                      6/8/2024
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 d-flex justify-content-center">
                                    <div
                                      className="edit-user p-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-user"
                                    >
                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                    </div>
                                    <div className="delete-user p-2">
                                      <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    </div>
                                  </td>
                                </tr>
                                <tr className="table-content">
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">002</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Title here</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Imgae</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">
                                      Content here
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">
                                      6/8/2024
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 d-flex justify-content-center">
                                    <div
                                      className="edit-user p-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-user"
                                    >
                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                    </div>
                                    <div className="delete-user p-2">
                                      <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    </div>
                                  </td>
                                </tr>
                                <tr className="table-content">
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">003</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Title here</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Image</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">
                                      Content here
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">
                                      6/8/2024
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 d-flex justify-content-center">
                                    <div
                                      className="edit-user p-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-user"
                                    >
                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                    </div>
                                    <div className="delete-user p-2">
                                      <FontAwesomeIcon icon="fa-solid fa-trash" />
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
      </div>
    </>
  );
}

// <div className="row">
// <div className="col-md-12">
//   <h2 className="text-white">Manage Blogs</h2>

//   <table className="table table-dark">
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Title</th>
//         <th>Banner</th>
//         <th>Content</th>
//         <th>Date</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {blogs.map((blog) => (
//         <tr key={blog.id}>
//           <td>{blog.id}</td>
//           <td>{blog.title}</td>
//           <td><img src={blog.banner} alt={blog.title} style={{ width: '50px' }} /></td>
//           <td>{blog.content}</td>
//           <td>{blog.date}</td>
//           <td>
//             <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditBlog(blog)}>
//               <FontAwesomeIcon icon={faEdit} />
//             </button>
//             <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBlog(blog.id)}>
//               <FontAwesomeIcon icon={faTrashAlt} />
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// </div>
