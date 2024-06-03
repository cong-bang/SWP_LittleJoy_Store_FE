import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


Modal.setAppElement("#root");

const Blog = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [nextId, setNextId] = useState(1);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [blogs, setBlogs] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      const parsedBlogs = JSON.parse(savedBlogs);
      setBlogs(parsedBlogs);
      const maxId = Math.max(0, ...parsedBlogs.map(blog => blog.id));
      setNextId(maxId + 1);
    }
  }, []);

  const saveBlogsToLocalStorage = (blogs) => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  };

  const showModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleSaveBlog = () => {
    if (title.trim() === "" || img.trim() === "" || editorContent.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }
    const newBlog = {
      id: nextId,
      title: title,
      date: new Date().toLocaleDateString(),
      content: editorContent,
      img: img,
      author: "littlejoystore",
    };
    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);
    setNextId(nextId + 1);
    setTitle("");
    setEditorContent("");
    setImg("");
    closeModal();

  };

  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);
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
          <div className="row">
            <div className="col-md-12 mt-5 mb-5 d-flex justify-content-end">
              <div onClick={showModal} className="btn-create-blog d-inline-block px-4 py-2" 
                   style={{ backgroundColor: 'rgba(60, 117, 166, 1)', color: 'white', borderRadius: '15px' }}>
                <span>Tạo mới</span>
              </div>
            </div>
            {blogs.map((blog) => (
              <div key={blog.id} className="col-md-4 p-3">
                <div className="w-100" style={{ position: "relative" }}>
                  <Link
                    to={{
                      pathname: `/blogdetail/${blog.id}`,
                      state: {
                        id: blog.id,
                        title: blog.title,
                        img: blog.img,
                        author: blog.author,
                        content: blog.content,
                        date: blog.date,
                      },
                    }}
                    className="w-100"
                    style={{ textDecoration: "none", color: "black" }}
                    
                  >
                    <div
                      className="blog-content-main w-100 p-4"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "15px" }}
                    >
                      <div className="blog-image">
                        <img
                          src={blog.img}
                          alt={""}
                          style={{ width: "100%", height: "auto", borderRadius: "15px", aspectRatio: '2/1',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat' }}
                        />
                      </div>
                      <div className="mt-3">
                        <span className="fs-5 fw-bold">{blog.title}</span>
                      </div>
                      <div className="blog-date mt-3 w-100 d-flex justify-content-end">
                        <span style={{ color: "#97999D" }}>{blog.date}</span>
                      </div>
                    </div>
                  </Link>
                  <div
                    className="delete-blog"
                    onClick={() => handleDeleteBlog(blog.id)}
                    style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Blog Modal"
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 },
              content: {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#f7f7f7",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                maxWidth: "90%",
                minWidth: "300px",
                width: "50%",
                fontFamily: "Arial, sans-serif",
                position: "fixed",
                margin: "auto",
                maxHeight: "90vh",
                overflowY: "auto",
              },
            }}
          >
            <div className="text-center" style={{ fontSize: "24px", color: "#333333", marginBottom: "20px" }}>
              Create a new blog
            </div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "10px", border: "1px solid #cccccc", borderRadius: "5px" }}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "10px", border: "1px solid #cccccc", borderRadius: "5px" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                style={{ width: "100%", height: "auto", marginBottom: "10px", padding: "10px", border: "1px solid #cccccc", borderRadius: "5px" }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                <button
                  onClick={handleSaveBlog}
                  style={{ backgroundColor: "#3c75a6", color: "#ffffff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", marginLeft: "10px" }}
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  style={{ backgroundColor: "#e74c3c", color: "#ffffff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", marginLeft: "10px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Blog;


// import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import './styleblog.css'
// import { Link } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Modal from 'react-modal';

// const Blog = () => {

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [editorContent, setEditorContent] = useState('');

//     const showModal = () => {
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//     };

//     const handleEditorChange = (content) => {
//         setEditorContent(content);
//     };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//             <div className="col-md-12 banner py-5 text-center">
//                 <h1 className="text-center" style={{color: '#3C75A6', fontWeight: '600', fontFamily: 'sans-serif'}}>Blog</h1>
//                 <div className="d-inline-block">
//                     <div className="d-flex align-content-between">
//                         <p className="px-2">
//                             <Link to="/" style={{color: '#103A71', textDecoration: 'none'}}>Home</Link>
//                         </p>
//                         <p className="px-2">
//                           <FontAwesomeIcon icon="fa-solid fa-angles-right" style={{color: '#3c75a6'}} />
//                         </p>
//                         <p className="px-2">
//                             <Link to="/blog" style={{color: '#103A71', textDecoration: 'none'}}>Blog</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <div className="container-fluid body-content">
//         <div className="container pt-5">
//             <div className="row">
//                 <div className="col-md-12 mt-5 mb-5 d-flex justify-content-end" style={{display: 'none !important'}}>
//                     <a href="">
//                         <div onClick={showModal} className="btn-create-blog d-inline-block px-4 py-2">
//                             <span>Tạo mới</span>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <a href="" className="w-100" style={{textDecoration: 'none', color: 'black' }}>
//                         <div className="blog-content-main w-100 p-4"
//                             style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px' }}>
//                             <div className="blog-image">
//                             </div>
//                             <div className="mt-3">
//                                 <span className="fs-5 fw-bold">Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên
//                                     dùng</span>
//                             </div>
//                             <div className="blog-date mt-3 w-100 d-flex justify-content-end">
//                                 <span style={{color: '#97999D' }}>07/12/2003</span>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//                 <div className="col-md-12 mt-5">
//                     <div className="fs-5 d-flex justify-content-end">
//                         <a className="px-3 inconCursor" href="#" style={{color: '#3C75A6' }}>
//                         <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" className="opacity-50" /></a>
//                         <span style={{fontFamily: 'Poppins'}}>Trang 1</span>
//                         <a className="px-3" href="#" style={{color: '#3C75A6' }}>
//                         <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right"/></a>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Create Blog Modal"
//                 style={{
//                     content: {
//                         top: '50%',
//                         left: '50%',
//                         right: 'auto',
//                         bottom: 'auto',
//                         marginRight: '-50%',
//                         transform: 'translate(-50%, -50%)'
//                     }
//                 }}
//             >
//                 <h2>Create a New Blog Post</h2>
//                 <button onClick={closeModal}>Close</button>
//                 <ReactQuill value={editorContent} onChange={handleEditorChange} />
//             </Modal>

//     </div>
//     </>
//   )
// }

// export default Blog;

/*
export default function Blog() {
  const totalBlogs = 12;
  const blogsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const blogList = Array.from({ length: totalBlogs }, (_, i) => ({
    id: i + 1,
    title: `Top 5 sản phẩm canxi cho bà bầu được các bác sĩ khuyên dùng ${i + 1}`,
    date: '10/05/2024'
  }));

  const currentBlogs = blogList.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  // Xử lý khi nhấn nút next (chuyển trang)
  const handleNextPage = () => {
    if (currentPage * blogsPerPage < totalBlogs) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Xử lý khi nhấn nút previous (trở lại trang trước)
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div classNameName="banner my-1">
        <img src={Banner} alt="Banner" />
        <div classNameName="title-page">
          <div classNameName="title">
            <h1>Blog</h1>
          </div>
          <div classNameName="navigation">
            <Link to="/">Home</Link>
            <span classNameName="separator">
              <FontAwesomeIcon icon={faAnglesRight} classNameName="px-4" />
            </span>
            <Link to="/blog">Blog</Link>
          </div>
        </div>
      </div>

      <div classNameName="py-2"></div>

      <div classNameName="container ctn">
        <div classNameName="row">
          {currentBlogs.map((blog, index) => (
            <div classNameName="col-md-4 mb-4" key={index}>
              <div classNameName="blog-card">
                <div><img src={blogimage} alt="Blog" classNameName="img-fluid" /></div>
                <div>{blog.title}</div>
                <div classNameName="text-end">{blog.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div classNameName="my-5" style={{ paddingRight: '5rem' }}>
        <div classNameName="w-80" style={{ textAlign: 'right' }}>
          <div classNameName="fs-5 my-xl-5 mx-xl-4 px-xl-5">
            <a classNameName="pe-2 fs-4" href="#" style={{ color: '#3C75A6' }} onClick={handlePreviousPage}>
              <FontAwesomeIcon icon={faSquareCaretLeft} classNameName="opacity-50" />
            </a>
            <span style={{ fontFamily: 'Roboto' }}> Trang {currentPage} </span>
            <a classNameName="ps-2 fs-4" href="#" style={{ color: '#3C75A6' }} onClick={handleNextPage}>
              <FontAwesomeIcon icon={faSquareCaretRight} classNameName="pe-3" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
*/
