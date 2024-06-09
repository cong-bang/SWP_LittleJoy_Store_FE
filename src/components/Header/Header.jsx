import React, { useEffect, useState } from "react";
import "../../assets/css/styleheader.css";
import logoshop from "../../assets/img/logoshop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem("role");
    const usernameFromLocalStorage = localStorage.getItem("username");
    if (roleFromLocalStorage === "ADMIN" || roleFromLocalStorage === "STAFF" || roleFromLocalStorage === "USER" && usernameFromLocalStorage) {
      setUsername(usernameFromLocalStorage);
    }

    if (!roleFromLocalStorage) {
      const profileLink = document.getElementById("profile-link");
      const dashboardLink = document.getElementById("dashboard-link");
      if (profileLink) profileLink.style.display = "none";
      if (dashboardLink) dashboardLink.style.display = "none";
    }
  }, []);

  return (
    <>
      <div className="container-fluid header-content sticky-top" style={{zIndex: '1000'}}>
        <div className="row">
          <div className="col-md-3 text-center">
            <Link to="#" className="w-100">
              <img src={logoshop} alt="Logo Shop" className="w-25" />
            </Link>
          </div>
          <div className="col-md-6 align-content-center d-flex justify-content-center">
            <div className="w-75 align-content-center">
              <ul className="nav justify-content-around">
                <li className="nav-item header-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item header-item">
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                </li>
                <li className="nav-item header-item">
                  <Link to="/blog" className="nav-link">
                    Blog
                  </Link>
                </li>
                <li className="nav-item header-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item header-item" id="dashboard-link">
                  {user && user.role !== "USER" && (
                    <Link to="/dashboard" className="nav-link">
                      Admin Dashboard
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 align-content-center">
            <div className="header-right d-flex justify-content-center">
              <Link to="/cart" className="px-3">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
              </Link>
              <Link to="/login" className="px-3">
                <FontAwesomeIcon icon="fa-solid fa-user" />
                {username ? (
                  <Link to='/userprofile'>
                  <span className="px-1">{username}</span></Link>
                ) : (
                  <span className="px-1">Login</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
