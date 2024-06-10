// import React, { createContext, useContext, useState } from "react";

// const BlogContext = createContext();

// export const useBlogs = () => useContext(BlogContext);

// export const BlogProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState([]);

//   const addBlog = (newBlog) => {
//     setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
//   };

//   const handleDeleteBlog = (id) => {
//     setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
//   };

//   return (
//     <BlogContext.Provider value={{ blogs, addBlog, handleDeleteBlog }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };


