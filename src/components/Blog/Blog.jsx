import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/styleblog.css";
import { useAuth } from "../../context/AuthContext";
import no_found from "../../assets/img/404.jpg";
import { apiFetch } from "../../services/api";
import ContentLoader from 'react-content-loader';


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const BlogContentLoader = () => (
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="20" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="40" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="60" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="80" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="100" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="120" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="140" rx="5" ry="5" width="100%" height="10" />
    </ContentLoader>
  );

  const fetchBlogs = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/blog?PageIndex=${pageIndex}&PageSize=9`
      );

      const paginationData = JSON.parse(response.headers.get("X-Pagination"));
      setPaging(paginationData);

      const previous = document.getElementById("blog-pre");
      const next = document.getElementById("blog-next");

      if (paginationData.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationData.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationData.CurrentPage === paginationData.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }

      const data = await response.json();
      const updatedData = data.map((blog) => {
        const dateParts = blog.date.split("T")[0].split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        return {
          ...blog,
          banner:
            blog.banner == null || blog.banner === "" ? no_found : blog.banner,
          date: formattedDate,
        };
      });
      setBlogs(updatedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blog:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(paging.CurrentPage, paging.PageSize);
  }, [paging.CurrentPage, refresh]);

  const handleDeleteBlog = async (id) => {
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
  };
  

  const handlePrevious = () => {
    if (paging.CurrentPage > 1) {
      setPaging((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNext = () => {
    if (paging.CurrentPage < paging.TotalPages) {
      setPaging((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  const BlogTitle = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return (
      <>
        <span className="fs-5 fw-bold">{truncateTitle(title, maxLength)}</span>
      </>
    );
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12 banner py-5 text-center">
            <h1
              className="text-center"
              style={{
                color: "#3C75A6",
                fontWeight: "600",
                fontFamily: "sans-serif",
              }}
            >
              Blog
            </h1>
            <div className="d-inline-block roboto">
              <div className="d-flex align-content-between">
                <p className="px-2">
                  <Link
                    to="/"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </p>
                <p className="px-2">
                  <FontAwesomeIcon
                    icon="fa-solid fa-angles-right"
                    style={{ color: "#3c75a6" }}
                  />
                </p>
                <p className="px-2">
                  <Link
                    to="/blog"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Blog
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid body-content roboto">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-12 mt-5 mb-5 d-flex justify-content-end">
              {user && user.role !== "USER" && (
                <Link
                  to="/createblog"
                  className="btn-create-blog d-inline-block px-4 py-2"
                  style={{
                    backgroundColor: "rgba(60, 117, 166, 1)",
                    color: "white",
                    borderRadius: "15px",
                    textDecoration: "none",
                  }}
                >
                  <span>Tạo mới</span>
                </Link>
              )}
            </div>
            {loading ? (
              <>
                <div className="col-md-4 p-3"><BlogContentLoader /></div>
                <div className="col-md-4 p-3"><BlogContentLoader /></div>
                <div className="col-md-4 p-3"><BlogContentLoader /></div>
              </>
            ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="col-md-4 p-3">
                <div className="w-100" style={{ position: "relative" }}>
                  <Link
                    to={{ pathname: `/blogdetail/${blog.id}`, state: { blog } }}
                    className="w-100"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className="blog-content-main w-100 p-4"
                      style={{
                        backgroundColor: "#ededed",
                        borderRadius: "15px",
                      }}
                    >
                      <div className="blog-image">
                        <img
                          src={blog.banner}
                          alt=""
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "15px",
                            aspectRatio: "2/1",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      </div>

                      <div className="mt-3">
                        <BlogTitle title={blog.title} maxLength={30} />
                      </div>
                      <div className="blog-date mt-3 w-100 d-flex justify-content-end">
                        {user && user.role !== "USER" && (
                          <Link className="me-2 px-3 py-2" style={{backgroundColor: 'rgb(60, 117, 166)', borderRadius: '15px'}}
                            to={{
                              pathname: `/updateblog/${blog.id}`,
                              state: { blog },
                            }}
                          >
                              <span style={{color: 'white'}}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{color: 'white'}}/></span>
                          </Link>
                        )}
                        <div className="d-inline-block p-2">
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {user && user.role !== "USER" && (
                    <div
                      className="delete-blog"
                      onClick={() => handleDeleteBlog(blog.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          </div>
        </div>
      </div>
      <div className="mt-3 mb-5 py-5 roboto" style={{ fontSize: "25px" }}>
        <div className="d-inline-block float-end">
          <div className="fs-5 px-5">
            <Link className="pe-2 fs-3" to="#" style={{ color: "#3C75A6" }}>
              <FontAwesomeIcon
                id="blog-pre"
                icon={faSquareCaretLeft}
                onClick={handlePrevious}
              />
            </Link>
            <span className="px-2 fs-4" style={{ fontFamily: "Roboto" }}>
              Trang {paging.CurrentPage}
            </span>
            <Link className="ps-2 fs-3" to="#" style={{ color: "#3C75A6" }}>
              <FontAwesomeIcon
                id="blog-next"
                icon={faSquareCaretRight}
                className="pe-3"
                onClick={handleNext}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
