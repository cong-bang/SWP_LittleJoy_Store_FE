import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleblogdetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import no_found from "../../assets/img/404.jpg";
import sorry from "../../assets/img/sorry.png";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [user, setUser] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/blog/${id}`
        );
        const responseBlogRelated = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/blog/related`
        );
        const data = await response.json();
        const dataRelatedBlog = await responseBlogRelated.json();
        if (data.httpCode != 404) {
          const dateParts = data.date.split("T")[0].split("-");
          const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
          data.date = formattedDate;
          data.banner =
            data.banner == null || data.banner == "" ? no_found : data.banner;
        }
        if (dataRelatedBlog.httpCode != 404) {
          const updatedData = dataRelatedBlog.map((blog) => {
            const dateParts = blog.date.split("T")[0].split("-");
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
            return {
              ...blog,
              banner:
                blog.banner == null || blog.banner === "" ? no_found : blog.banner,
              date: formattedDate,
            };
          });
          setRelatedBlogs(updatedData);
        }
        setBlog(data);
        

        const resUserId = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/user/${data.userId}`
        );
        const dataUser = await resUserId.json();
        setUser(dataUser);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id]);

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
      <div className="container-fluid">
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
            <div className="d-inline-block">
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
      {blog.httpCode != 404 ? (
        <div
          className="container-fluid"
          style={{
            background:
              "linear-gradient(180deg, rgba(60, 117, 166, 0.2) 0%, rgba(255, 255, 255, 0.15) 53%, #fff 68%, #fff 100%)",
            padding: "2rem 0",
          }}
        >
          <div
            className="container"
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
          >
            <div className="row">
              <div className="col-md-12">
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                    padding: "3rem",
                    margin: "2rem 0",
                    width: '100%'
                  }}
                >
                  <div className="w-100">
                    <FontAwesomeIcon icon="fa-solid fa-angles-left" />
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/blog"
                    >
                      <span className="px-2">Trở lại</span>
                    </Link>
                  </div>
                  <div
                    className="title"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      margin: "2rem 0",
                      textAlign: "center",
                      color: "#3c75a6",
                    }}
                  >
                    {blog.title}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={blog.banner}
                      className="mt-3, w-50"
                      alt="Morinaga Milk"
                      style={{
                        width: "100%",
                        maxWidth: "800px",
                        maxHeight: "400px",
                      }}
                    />
                  </div>
                  <div
                    className="mt-3 fs-5"
                    style={{
                      color: "#555",
                      padding: "0 1rem",
                      textAlign: "justify",
                    }}
                  ></div>
                  <div
                    className="details-blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  <div
                    style={{
                      textAlign: "right",
                      color: "#97999D",
                      fontSize: "0.875rem",
                      marginTop: "2rem",
                      padding: "0 1rem",
                    }}
                  >
                    <span
                      className="roboto"
                      style={{ display: "block", fontSize: "16px" }}
                    >
                      Tác giả: {user.userName}
                    </span>
                    <span
                      className="roboto"
                      style={{ display: "block", fontSize: "16px" }}
                    >
                      {blog.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog có liên quan */}
          <div
            className="mt-5"
            style={{
              fontSize: "2rem",
              fontWeight: "500",

              textAlign: "center",
              color: "#00000089",
            }}
          >
            Bài viết mới
          </div>

          <div className="container-fluid">
            <div className="container">
              <div className="row">
              {relatedBlogs.map((blog) => (
                <div key={blog.id} className="col-md-4 p-3">
                  <Link
                    to={{ pathname: `/blogdetail/${blog.id}`, state: { blog } }}
                    className="w-100"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className="blog-content-main w-100 p-4"
                      style={{
                        backgroundColor: "rgba(155, 155, 155, 0.05)",
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
                        <span style={{ color: "#97999D" }}>{blog.date}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                ))}

                {/* <div className="col-md-4 p-3">
                  <a
                    href=""
                    className="w-100"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className="blog-content-main w-100 p-4"
                      style={{
                        backgroundColor: "rgba(155, 155, 155, 0.05)",
                        borderRadius: "15px",
                      }}
                    >
                      <div className="blog-image"></div>
                      <div className="mt-3">
                        <span className="fs-5 fw-bold">
                          Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
                          dùng
                        </span>
                      </div>
                      <div className="blog-date mt-3 w-100 d-flex justify-content-end">
                        <span style={{ color: "#97999D" }}>07/12/2003</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="col-md-4 p-3">
                  <a
                    href=""
                    className="w-100"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className="blog-content-main w-100 p-4"
                      style={{
                        backgroundColor: "rgba(155, 155, 155, 0.05)",
                        borderRadius: "15px",
                      }}
                    >
                      <div className="blog-image"></div>
                      <div className="mt-3">
                        <span className="fs-5 fw-bold">
                          Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
                          dùng
                        </span>
                      </div>
                      <div className="blog-date mt-3 w-100 d-flex justify-content-end">
                        <span style={{ color: "#97999D" }}>07/12/2003</span>
                      </div>
                    </div>
                  </a>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container-fluid py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(60, 117, 166, 0.2) 0%, rgba(255, 255, 255, 0.15) 53%, #fff 68%, #fff 100%)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 my-5 text-center">
                <div
                  className="d-inline-block p-5"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px dotted black",
                    borderRadius: "15px",
                  }}
                >
                  <div className="d-flex flex-column align-items-center p-3">
                    <img src={sorry} alt="" className="w-50" />
                    <span
                      className="text-center fs-4 pt-3"
                      style={{
                        fontFamily: "sans-serif",
                      }}
                    >
                      Không tìm thấy blog
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
