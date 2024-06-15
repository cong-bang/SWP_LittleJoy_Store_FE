import React, { useState, useEffect } from "react";
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
import no_found from "../../assets/img/404.jpg";
import ContentLoader from 'react-content-loader';
import { apiFetch } from "../../services/api";

const ManageBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [searchTitle, setSearchTitle] = useState('');
  const [sortDate, setSortDate] = useState();
  const [userId, setUserId] = useState();

  const TableLoading = () => (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={160}
      // viewBox="0 0 100% 160"
      backgroundColor="#C0C0C0"
      foregroundColor="#d9d9d9" 
    >
      <rect x="0" y="20" rx="3" ry="3" width="100%" height="10" />
      <rect x="0" y="40" rx="3" ry="3" width="100%" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="100%" height="10" />
    </ContentLoader>
  );

  const fetchBlogs = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/blog?PageIndex=${pageIndex}&PageSize=${pageSize}`
      );

      const paginationData = JSON.parse(response.headers.get("X-Pagination"));
      setPaging(paginationData);

      const data = await response.json();
      const updatedData = data.map((blog) => ({
        ...blog,
        banner: blog.banner == null || blog.banner === "" ? no_found : blog.banner,
        date: formatDateString(blog.date),
      }));

      setBlogs(updatedData);
      console.log(blogs);

    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blog:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilter = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (searchTitle) searchParams.append("search", searchTitle);
      if (sortDate !== undefined) searchParams.append("sortDate", sortDate);
      if (userId) searchParams.append("UserId", userId);
      searchParams.append("PageIndex", pageIndex);
      searchParams.append("PageSize", pageSize);

      const response = await apiFetch(`https://littlejoyapi.azurewebsites.net/api/blog/filter?${searchParams.toString()}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch filtered data');
      }
      
      const paginationData = JSON.parse(response.headers.get("X-Pagination"));
      setPaging(paginationData);
  
      const data = await response.json();
      const updatedData = data.map((blog) => ({
        ...blog,
        banner: blog.banner == null || blog.banner === "" ? no_found : blog.banner,
        date: formatDateString(blog.date),
      }));
  
      setBlogs(updatedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blog:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilter(paging.CurrentPage, paging.PageSize);
  }, [paging.CurrentPage, refresh, searchTitle, sortDate, userId]);

  useEffect(() => {
    fetchBlogs(paging.CurrentPage, paging.PageSize);
  }, [paging.CurrentPage, refresh]);

  const formatDateString = (dateString) => {
    const dateParts = dateString.split("T")[0].split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };



  const BlogTitle = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return <>{truncateTitle(title, maxLength)}</>;
  };

  const BlogContent = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return (
      <>
        <span
          dangerouslySetInnerHTML={{ __html: truncateTitle(title, maxLength) }}
        />
      </>
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paging.TotalPages) {
      setPaging((prev) => ({
        ...prev,
        CurrentPage: newPage,
      }));
    }
  };

  const handleDeleteBlog = async (id) => {
  const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?");
  
  if (isConfirmed) {
    try {
      const response = await apiFetch(
        `https://littlejoyapi.azurewebsites.net/api/blog?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchBlogs(paging.CurrentPage, paging.PageSize);
        if (blogs.length < paging.PageSize) {
          const nextPage = paging.CurrentPage + 1;
          if (nextPage <= paging.TotalPages) {
            await fetchBlogs(nextPage, paging.PageSize);
          }
        }
      } else {
        console.error("Failed to delete the blog");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
};

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
                      <div className="container-fluid ">
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content">
                            <div className="search-user float-start p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                placeholder="Search title"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                              />
                            </div>
                            <div className="search-user float-start p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                placeholder="Search userid"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                              />
                            </div>
                            <div
                              className=" d-flex align-items-center ps-3"
                              style={{ width: "10%" }}
                            >
                              <select
                                className="w-100 p-1 "
                                style={{
                                  borderRadius: "5px",
                                  background: "#151C2C",
                                  color: "#888888",
                                  border: 'none'
                                }}
                                value={sortDate}
                                onChange={(e) => setSortDate(e.target.value)}
                              >
                                <option disabled value="" selected>
                                  Ngày
                                </option>
                                <option value="1">Tăng Dần</option>
                                <option value="0">Giảm Dần</option>
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
                                {loading ? (
                                  <>
                                    <tr>
                                      <td colSpan="6" className="px-3">
                                        <TableLoading /> 
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                blogs.map((blog) => (
                                  <tr key={blog.id} className="table-content">
                                    <td className="p-3 px-4 ">
                                      <span className="float-start">
                                        {blog.id}
                                      </span>
                                    </td>
                                    <td className="p-3 px-4 ">
                                      <Link
                                        to={{
                                          pathname: `/blogdetail/${blog.id}`,
                                        }}
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                        }}
                                      >
                                        <span className="float-start">
                                          <BlogTitle
                                            title={blog.title}
                                            maxLength={15}
                                          />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className="p-3 px-4 ">
                                      <span className="float-start">
                                        <img
                                          src={blog.banner}
                                          alt={""}
                                          style={{
                                            width: "100px",
                                            height: "auto",
                                          }}
                                        />
                                      </span>
                                    </td>
                                    <td className="p-3 px-4 ">
                                      <span className="float-start">
                                        <BlogContent
                                          title={blog.content}
                                          maxLength={15}
                                        />
                                      </span>
                                    </td>
                                    <td className="p-3 px-4 ">
                                      <span className="float-start">
                                        {blog.date}
                                      </span>
                                    </td>
                                    <td className="p-3 px-4 d-flex justify-content-center">
                                      <Link to={{pathname: `/updateblog/${blog.id}`}}>
                                      <div
                                        className="edit-user p-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-user"
                                      >
                                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                      </div>
                                      </Link>

                                      <div className="delete-user p-2">
                                        <span style={{cursor: 'pointer'}} onClick={() => handleDeleteBlog(blog.id)}><FontAwesomeIcon icon="fa-solid fa-trash" /></span>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                                {/* <tr className="table-content">
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
                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                          {/* <div className="col-md-12 d-flex justify-content-end paging p-2">
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
                          </div> */}

                          <div className="col-md-12 d-flex justify-content-end paging p-2">
                            {Array.from({ length: paging.TotalPages }, (_, index) => (
                                <a
                                  key={index + 1}
                                  href="#"
                                  className={`p-2 me-3 ${
                                    paging.CurrentPage === index + 1 ? "active-paging" : "" }`}
                                  onClick={(e) => { e.preventDefault();
                                    handlePageChange(index + 1);
                                  }}
                                >
                                  {index + 1}
                                </a>
                              )
                            )}
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
};
export default ManageBlog;
