import React, { useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center" style={{color: 'rgba(60, 117, 166, 1)'}}>Chào mừng đến với Little Joy Store</h1>
            <p className="mt-4">
              Điểm đến tuyệt vời cho các bà mẹ và trẻ em để tìm thấy những sản
              phẩm sữa tốt nhất! Cửa hàng của chúng tôi được thiết kế theo nhu
              cầu của gia đình bạn, cung cấp nhiều loại sữa bổ dưỡng và thơm
              ngon để hỗ trợ sức khỏe và sự phát triển của trẻ nhỏ. Chúng tôi
              hiểu tầm quan trọng của chất lượng và sự tiện lợi đối với các bà
              mẹ bận rộn. Đó là lý do tại sao chúng tôi cẩn thận tuyển chọn các
              sản phẩm của mình để đảm bảo chúng đáp ứng các tiêu chuẩn cao nhất
              về dinh dưỡng và hương vị. Đội ngũ nhân viên thân thiện và hiểu
              biết của chúng tôi luôn ở đây để hỗ trợ bạn đưa ra những lựa chọn
              tốt nhất cho sức khỏe và hạnh phúc của gia đình bạn.
            </p>
            <h2 className="mt-5">Team Member</h2>
            <ul>
              <li>Phạm Văn Tuấn Hiếu - SE171097 (Leader)</li>
              <li>Nguyễn Kiến Minh - SE171069</li>
              <li>Lương Công Bằng - SE171033</li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default About;
