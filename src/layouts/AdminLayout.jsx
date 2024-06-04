import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Thêm bất kỳ header/sidebar cho trang quản trị ở đây */}
      <div className="admin-content">
        <Outlet />
      </div>
      {/* Thêm bất kỳ footer cho trang quản trị ở đây */}
    </div>
  );
};

export default AdminLayout;