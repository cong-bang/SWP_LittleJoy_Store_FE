import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from './BlogContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = blogs.find((blog) => blog.id === parseInt(id));
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [blogs, id]);

  if (!blog) {
    return null;
  }

  return (
    <div className="container-fluid" style={{ background: 'linear-gradient(180deg, rgba(60, 117, 166, 0.2) 0%, rgba(255, 255, 255, 0.15) 53%, #fff 68%, #fff 100%)'}}>
      <div className="container pt-5">
        <div className='p-5 my-4' style={{backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
          <div className='text-center fw-bold my-5' style={{ fontSize: '2rem' }}>{blog.title}</div>
          <div className='text-center'>
            <img src={blog.img} alt='' style={{ width: '80%', maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }} className='my-5' />
          </div>
          <div className='px-4' style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
          <div className='px-4 mt-4' style={{ textAlign: 'right', color: "#97999D", fontSize: '0.8rem' }}>
            <span>Author: {blog.author}</span><br />
            <span>{blog.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;


















// import React from "react";
// import { useParams } from "react-router-dom";

// const BlogDetail = ({ blogs }) => {
//   const { id } = useParams();
//   console.log(blogs);
  
//   // Kiểm tra xem danh sách blogs có tồn tại không
//   if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
//     return <div>No blogs found</div>;
//   }

//   // Tìm bài blog tương ứng với id
//   const blog = blogs.find(blog => blog.id === parseInt(id));

//   // Kiểm tra xem bài blog có tồn tại không
//   if (!blog) {
//     return <div>Blog not found</div>;
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="text-center">
//             <h2>{blog.title}</h2>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-8">
//           <div>{blog.content}</div>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <p>Author: {blog.author}</p>
//             <p>Date: {blog.date}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetail;

