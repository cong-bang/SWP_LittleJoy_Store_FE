import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/HomePage/Home'
import Login from './components/Authen/Login'
import About from './components/AboutUs/About'
import Shop from './components/Shop/Shop'

import Register from './components/Authen/Register'
import Forgotpass1 from './components/Authen/Forgotpass1'
import Product from './components/Product/Product'
import Blog from './components/Blog/Blog'
import Cart from './components/OrderCart/Cart'
import Checkout from './components/OrderCart/Checkout'
import UserProfile from './components/UserProfile/UserProfile'
import UserChangePassword from './components/UserProfile/UserChangePassword'
import UserOrderManagement from './components/UserProfile/UserOrderManagement'
import UserAddress from './components/UserProfile/UserAddress'
import UserOrderDetail from './components/UserProfile/UserOrderDetail'
import BlogDetail from './components/Blog/BlogDetail'

import { BlogProvider } from './components/Blog/BlogContext';

import Admindashboard from './pages/admin/Admindashboard';
// import AdminLayout from './layouts/AdminLayout';




// Nếu bạn cài thêm các gói khác, bạn có thể import chúng như sau:
// import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';

// Thêm các icon cần sử dụng vào thư viện
library.add(fas);

function App() {
  

  return (
    <>
    <BlogProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/forgotpass1" element={<Forgotpass1 />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userchangepassword" element={<UserChangePassword />} />
        <Route path="/userordermanagement" element={<UserOrderManagement />} />
        <Route path="/useraddress" element={<UserAddress />} />
        <Route path="/userorderdetail" element={<UserOrderDetail />} />
        {/* <Route path="/dashboard" element={<Admindashboard />} /> */}

      </Routes>
      <Footer />
      </BlogProvider>

    </>
  )
}

export default App



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// import Admindashboard from './pages/admin/Admindashboard';
// // import AdminLayout from './layouts/AdminLayout';




// // Nếu bạn cài thêm các gói khác, bạn có thể import chúng như sau:
// // import { far } from '@fortawesome/free-regular-svg-icons';
// // import { fab } from '@fortawesome/free-brands-svg-icons';

// // Thêm các icon cần sử dụng vào thư viện
// library.add(fas);

// function App() {
  

//   return (
//     <>
    
//       <Routes>
        
//         <Route path="/dashboard" element={<Admindashboard />} />

//       </Routes>
      

//     </>
//   )
// }

// export default App