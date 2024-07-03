
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
            <h1 className="pt-5" style={{color: 'rgb(60, 117, 166)'}}>Thông tin</h1>
            <p className="myhome pt-2">
              <Link to="/">Trang chủ</Link>
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-angles-right"
                  className="px-4"
                />
              </span>
              <Link to="/profile">Thông tin</Link>
            </p>
          </div>
        </div>
      </section>
    
      {/* <!-- User Info--> */}
      <div className="container mt-5 py-5">
        <div className="row py-5">
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
