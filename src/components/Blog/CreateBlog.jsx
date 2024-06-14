import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/styleblog.css";
import UploadImage from "../UploadImage/UploadImage";
import { apiFetch } from "../../services/api";
import Editor from "../Quill/Editor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const notify = () =>
    toast.error('Vui lòng nhập đủ thông tin', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleSaveBlog = () => {
    if (
      title.trim() === "" ||
      banner.trim() === "" ||
      editorContent.trim() === ""
    ) {
      notify();
      return;
    }

    const newBlog = {
      userId: localStorage.getItem("userId"),
      title: title,
      banner: banner,
      content: editorContent,
    };
    console.log(newBlog);

    const fetchData = async () => {
      try {
        const response = await apiFetch(
          `https://littlejoyapi.azurewebsites.net/api/blog`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBlog),
          }
        );
        const data = await response.json();
        navigate("/blog");
      } catch (error) {
        console.error("Lỗi tạo blog:", error);
      }
    };
    fetchData();
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleUploadComplete = (url) => {
    setBanner(url);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container-fluid roboto">
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

      <div className="container-fluid roboto mb-5 pb-5">
        <div className="container pt-5">
          <div
            className="mt-5 p-3"
            style={{
              backgroundColor: "#6692b8",
              borderRadius: "5px",
              border: "1px solid black",
            }}
          >
            <div
              className="text-center fw-bold mb-3"
              style={{ fontSize: "24px", color: "white" }}
            >
              Tạo Mới Blog
            </div>
            <div>
              <input
                className="create-blog-title"
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  border: "2px solid white",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="mb-3">
              <div
                className="d-inline-block ps-3 pe-3"
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <span>Banner: </span>
                <UploadImage
                  aspectRatio={16 / 9}
                  onUploadComplete={handleUploadComplete}
                  maxWidth={1024}
                  maxHeight={1024}
                  minWidth={126}
                  minHeight={126}
                />
              </div>
              {banner && (
                <div className="mt-2">
                  <img src={banner} alt="" className="w-25" />
                </div>
              )}
            </div>
            <div
              className="text-xemtrc"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                style={{backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden'}}
              /> */}
              <Editor value={editorContent} onChange={handleEditorChange} />
              {showPreview && (
                <div
                  className="mt-5 p-3"
                  style={{ backgroundColor: "#f7f7f7", borderRadius: "10px" }}
                >
                  <div
                    className="text-center fw-bold"
                    style={{
                      fontSize: "24px",
                      color: "#333333",
                      marginBottom: "20px",
                    }}
                  >
                    Xem trước
                  </div>
                  <div
                    className="p-2 text-xemtrc"
                    style={{
                      border: "1px solid #cccccc",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: editorContent }}
                    ></div>
                  </div>
                </div>
              )}

              <div
                className="mt-3"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={togglePreview}
                  style={{
                    backgroundColor: "#3c75a6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  {showPreview ? (
                    <span>
                      <FontAwesomeIcon
                        icon="fa-solid fa-eye-slash"
                        style={{ paddingRight: "5px" }}
                      />
                      Xem trước
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon
                        icon="fa-solid fa-eye"
                        style={{ paddingRight: "5px" }}
                      />
                      Xem trước
                    </span>
                  )}
                </button>
                <button
                  onClick={handleSaveBlog}
                  style={{
                    backgroundColor: "#3c75a6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Lưu
                </button>
                <button
                  onClick={() => navigate("/blog")}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
