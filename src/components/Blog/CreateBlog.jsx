import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-quill/dist/quill.snow.css";
import '../../assets/css/styleblog.css';
import UploadImage from "../UploadImage/UploadImage";

const CreateBlog = () => {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleSaveBlog = () => {
    if (title.trim() === "" || banner.trim() === "" || editorContent.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }

    const newBlog = {
      title: title,
      banner: banner,
      content: editorContent,
    };

    fetch('https://littlejoyapi.azurewebsites.net/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Tạo blog mới thất bại');
        }
        return response.json();
      })
      .then(data => {
        console.log('Tạo blog thành công', data);
        navigate("/blog");
      })
      .catch(error => {
        console.error('Lỗi tạo blog:', error);
      });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleUploadComplete = (url) => {
    setBanner(url);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 banner py-5 text-center">
            <h1 className="text-center" style={{ color: "#3C75A6", fontWeight: "600", fontFamily: "sans-serif" }}>
              Blog
            </h1>
            <div className="d-inline-block">
              <div className="d-flex align-content-between">
                <p className="px-2">
                  <Link to="/" style={{ color: "#103A71", textDecoration: "none" }}>
                    Home
                  </Link>
                </p>
                <p className="px-2">
                  <FontAwesomeIcon icon="fa-solid fa-angles-right" style={{ color: "#3c75a6" }} />
                </p>
                <p className="px-2">
                  <Link to="/blog" style={{ color: "#103A71", textDecoration: "none" }}>
                    Blog
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid body-content">
        <div className="container pt-5">
          <div className="mt-5 p-3" style={{backgroundColor: '#D3D3D3', borderRadius: '10px'}}>
            <div className="text-center fw-bold" style={{ fontSize: "24px", color: "#333333", marginBottom: "20px" }}>
              Create a new blog
            </div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "10px", border: "1px solid #cccccc", borderRadius: "5px" }}
            />
            <div style={{ marginBottom: '10px'}}>
            <UploadImage
              aspectRatio={3/2}
              onUploadComplete={handleUploadComplete}
              maxWidth={10000}
              maxHeight={10000}
              minWidth={300}
              minHeight={300}
            />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                style={{ width: "100%", height: "auto", marginBottom: "10px", padding: "10px", border: "1px solid #cccccc", borderRadius: "5px", backgroundColor: 'white' }}
              />

              {showPreview && (
                <div className="mt-5 p-3" style={{ backgroundColor: "#f7f7f7", borderRadius: "10px" }}>
                  <div className="text-center fw-bold" style={{ fontSize: "24px", color: "#333333", marginBottom: "20px" }}>
                    Xem trước
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: editorContent }} style={{ padding: "10px", border: "1px solid #cccccc", borderRadius: "5px", backgroundColor: 'white' }}></div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                <button
                  onClick={togglePreview}
                  style={{ backgroundColor: "#3c75a6", color: "#ffffff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", marginLeft: "10px" }}
                >
                  {showPreview ? <span><FontAwesomeIcon icon="fa-solid fa-eye-slash" style={{paddingRight: '5px'}} />Preview</span> : <span><FontAwesomeIcon icon="fa-solid fa-eye" style={{paddingRight: '5px'}} />Preview</span>}
                </button>
                <button
                  onClick={handleSaveBlog}
                  style={{ backgroundColor: "#3c75a6", color: "#ffffff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", marginLeft: "10px" }}
                >
                  Save
                </button>
                <button
                  onClick={() => navigate("/blog")}
                  style={{ backgroundColor: "#e74c3c", color: "#ffffff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", marginLeft: "10px" }}
                >
                  Cancel
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


