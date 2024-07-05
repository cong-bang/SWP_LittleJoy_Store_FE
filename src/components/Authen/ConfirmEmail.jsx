import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "react-js-loader";

const ConfirmEmail = () => {
  const { id } = useParams();
  const [mess, setMess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/authen/confirm-email?token=${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMess("Xác thực tài khoản thành công");
        } else {
          setMess("Xác thực tài khoản thất bại");
        }
      } catch (error) {
        setMess("Xác thực tài khoản thất bại: " + error.message);
      } finally {
        setLoading(false);
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
          minHeight: "80vh",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 my-5 text-center">
              {loading ? (
                <div className="text-center pt-5 mt-5">
                  <Loader
                    type="spinner-default"
                    bgColor={"#000"}
                    color={{ color: "#000" }}
                    title={"Đang xác thực..."}
                    size={100}
                  />
                </div>
              ) : (
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
                    <span
                      className="p-2 mt-3 px-3"
                      style={{
                        color: "white",
                        backgroundColor: "rgb(60, 117, 166)",
                        borderRadius: "15px",
                      }}
                    >
                      <Link
                        to="/login"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Quay lại trang Login
                      </Link>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
