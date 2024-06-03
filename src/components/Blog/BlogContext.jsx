import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  const saveBlogsToLocalStorage = (blogs) => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  };

  const addBlog = (blog) => {
    const updatedBlogs = [...blogs, blog];
    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

