import React, { Suspense, useState, useEffect } from "react";
import { Outlet, Route, Routes, useRoutes, Navigate } from "react-router-dom";
import Home from "../components/HomePage/Home";
import Login from "../components/Authen/Login";
import Shop from "../components/Shop/Shop";
import About from "../components/AboutUs/About";
import Forgotpass1 from "../components/Authen/Forgotpass1";
import Register from "../components/Authen/Register";
import Blog from "../components/Blog/Blog";
import BlogDetail from "../components/Blog/BlogDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Cart from "../components/OrderCart/Cart";
import Checkout from "../components/OrderCart/Checkout";
import Product from "../components/Product/Product";
import UserProfile from "../components/UserProfile/UserProfile";
import UserAddress from "../components/UserProfile/UserAddress";
import UserChangePassword from "../components/UserProfile/UserChangePassword";
import UserOrderDetail from "../components/UserProfile/UserOrderDetail";
import UserOrderManagement from "../components/UserProfile/UserOrderManagement";
import ManageUser from "../components/ManageUser/ManageUser";
import ManageOrder from "../components/ManageOrder/ManageOrder";
import Dashboard from "../pages/admin/Dashboard";
import ManageProduct from "../components/ManageProduct/ManageProduct";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import ManageBlog from "../components/ManageBlog/ManageBlog";
import CreateBlog from "../components/Blog/CreateBlog";
import RequestRefund from "../components/Refund/RequestRefund";
import UpdateBlog from "../components/Blog/UpdateBlog";
import ConfirmEmail from "../components/Authen/ConfirmEmail";
import ManageCategory from "../components/ManageCategory/ManageCategory";
import UserLayout from "../components/UserProfile/ProfileLayout";
import PaymentPending from "../components/Payment/PaymentPending";
import PaymentInfo from "../components/Payment/PaymentInfo";


const UserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAdminOrStaff = user && (user.role === "ADMIN" || user.role === "STAFF");

  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    if (!isAdminOrStaff) {
      setShowHeaderFooter(true);
    }
  }, [isAdminOrStaff]);

  useEffect(() => {
    if (user && user.role === "USER") {
      setShowHeaderFooter(true);
    }
  }, [user]);

  // Ẩn Header và Footer khi vào Dashboard
  useEffect(() => {
    if (location.pathname === "/dashboard" || 
      location.pathname === "/manageuser" || 
      location.pathname === "/manageorder" || 
      location.pathname === "/manageproduct" || 
      location.pathname === "/manageblog" || 
      location.pathname === "/requestrefund" ||
      location.pathname === "/managecategory"  && isAdminOrStaff) {
      setShowHeaderFooter(false);
    } else {
      setShowHeaderFooter(true);
    }
  }, [location.pathname, isAdminOrStaff]);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {isAdminOrStaff && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {isAdminOrStaff && (
          <>
            <Route path="/manageuser" element={<ManageUser />} />
            <Route path="/manageorder" element={<ManageOrder />} />
            <Route path="/manageproduct" element={<ManageProduct />} />
            <Route path="/manageblog" element={<ManageBlog />} />
            <Route path="/managecategory" element={<ManageCategory />} />
            <Route path="/requestrefund" element={<RequestRefund />} />
          </>
        )}
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpass" element={<Forgotpass1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/updateblog/:id" element={<UpdateBlog />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<Product />} />

        <Route element={<UserLayout />}>
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/useraddress" element={<UserAddress />} />
          <Route path="/userchangepassword" element={<UserChangePassword />} />
          <Route path="/userordermanagement" element={<UserOrderManagement />} />
          <Route path="/userorderdetail/:id" element={<UserOrderDetail />} />
        </Route>

        <Route path="/paymentpending" element={<PaymentPending />} />
        <Route path="/payment/info" element={<PaymentInfo />} />
        
        <Route path="/confirm/:id" element={<ConfirmEmail />} />
        <Route path="/forgotpass1" element={<Forgotpass1 />} />
        
        {/* Logout */}
        <Route
          path="/logout"
          element={
            <Navigate
              to="/"
              replace
              state={{ from: location.pathname }}
              onClick={logout}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default AppRoutes;




