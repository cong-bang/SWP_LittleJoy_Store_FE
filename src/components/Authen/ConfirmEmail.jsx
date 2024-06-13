import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ConfirmEmail = () => {
  const { id } = useParams();
  const [mess, setMess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/authen/confirm-email?token=${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(id);
        if (response.ok) {
          setMess('Xác thực tài khoản thành công');
        } 
      } catch (error) {
        console.error("Fetch error:", error.message);
        setMess(error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div
          className="container-fluid py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(60, 117, 166, 0.2) 0%, rgba(255, 255, 255, 0.15) 53%, #fff 68%, #fff 100%)",
              minHeight: '80vh'
          }}
        >
            {mess !== '' && (
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 my-5 text-center">
                <div
                  className="d-inline-block p-5"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px dotted black",
                    borderRadius: "15px",
                  }}
                >
                  <div className="d-flex flex-column align-items-center p-3">
                    
                    <span
                      className="text-center fs-4 pt-3"
                      style={{
                        fontFamily: "sans-serif",
                      }}
                    >
                      {mess}
                    </span>
                    <Link to="/login">Quay lại trang Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}
        
        </div>
    </>
  );
};

export default ConfirmEmail;
