
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserProfileSidebar from './UserProfileSideBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserLayout = () => {
  return (
    <>
    <section>
        <div>
          <div className="banner container-fluid pb-5 mb-5">
            <h1 className="pt-5">My Profile</h1>
            <p className="myhome pt-2">
              <Link to="/">Home</Link>
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-angles-right"
                  className="px-4"
                />
              </span>
              <Link to="/profile">Profile</Link>
            </p>
          </div>
        </div>
      </section>
    
      {/* <!-- User Info--> */}
      <div className="container mt-5">
        <div className="row">
          {/* <!-- User Info Side Bar--> */}
        <UserProfileSidebar />
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default UserLayout;
