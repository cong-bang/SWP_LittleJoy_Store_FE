import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserOrderManagement.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import Abott from "../../assets/img/Abott.png";
import similac from "../../assets/img/similac.png";
import notfound from "../../assets/img/404.jpg";
const UserOrderManagement = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });

  //FETCH LIST ORDER
  const fetchOrderList = async (pageIndex) => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/order/get-orders/${userId}?PageIndex=${pageIndex}&PageSize=5`
      );

      if (!response.ok) {
        if (response.status == 400 || response.status == 404) {
          setOrderList([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          setOrderList([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationCate = await JSON.parse(
        response.headers.get("X-Pagination")
      );
      const previous = document.getElementById("order-pre");
      const next = document.getElementById("order-next");

      if (paginationCate.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationCate.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationCate.CurrentPage === paginationCate.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }
      setPaging(paginationCate);

      const dataOrder = await response.json();
      const formattedDataOrder = dataOrder.map((order) => ({
        ...order,
        date: formatDate(order.date),
      }));

      setOrderList(formattedDataOrder);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    fetchOrderList(paging.CurrentPage);
  }, [paging.CurrentPage]);

  const handlePrevious = () => {
    if (paging.CurrentPage > 1) {
      setPaging((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNext = () => {
    if (paging.CurrentPage < paging.TotalPages) {
      setPaging((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  //Check bg-status payment
  const getStatusColor = (status) => {
    switch (status) {
      case "Đang chờ":
        return "#9AA14B";
      case "Thành Công":
        return "#5D9C59";
      case "Thất Bại":
        return "#DF0029";
      default:
        return "#9AA14B";
    }
  };

  return (
    <>
      {/* <!-- User Info Side Bar--> */}

      {/* <!-- User Order Management --> */}

      <table className="w-100 mt-4">
        <tbody>
          <tr>
            <td className="pb-4 textMenu" colSpan="5">
              <span className="fs-3">Quản lí đơn hàng</span>
            </td>
          </tr>

          <tr>
            <td className="FieldAll" colSpan="5">
              <div className="d-flex w-100 pt-2">
                <div className="w-20 borderAll">
                  <div className="w-100 text-center">
                    <span className="fs-5 py-2 text-center w-100">Tất cả</span>
                  </div>
                </div>
                <div className="w-80" style={{ textAlign: "right" }}>
                  <div className="fs-5 d-flex justify-content-end">
                    <Link
                      className="px-3"
                      href="#"
                      style={{ color: "#3c75a6" }}
                    >
                      <FontAwesomeIcon
                        id="order-pre"
                        icon="fa-solid fa-circle-chevron-left"
                        className=""
                        onClick={handlePrevious}
                      />
                    </Link>
                    <span style={{ fontFamily: "Poppins" }}>
                      Trang {paging.CurrentPage}
                    </span>
                    <Link
                      className="px-3"
                      href="#"
                      style={{ color: "#3c75a6" }}
                    >
                      <FontAwesomeIcon
                        id="order-next"
                        icon="fa-solid fa-circle-chevron-right"
                        onClick={handleNext}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {orderList.length > 0 ? (
            <>
              {orderList.map((o) => (
                <div key={o.id} className="py-3">
                  <tr>
                    <td className="pt-4" colSpan="3">
                      <Link
                        to={{ pathname: `/userorderdetail/${o.orderCode}` }}
                        style={{ textDecoration: "none" }}
                      >
                        <span className="textBlue fs-5" style={{fontWeight: '600'}}>#{o.orderCode}</span>
                      </Link>
                    </td>

                    <td className="w-40 pt-4 ps-4">
                      <div className="d-flex ps-5">
                        <div
                          className="py-1"
                        >
                          <span className="fw-semibold textGray pe-2">
                            Tình trạng thanh toán:
                          </span>
                        </div>

                        <div
                          className="py-1 px-3"
                          style={{
                            backgroundColor: getStatusColor(o.paymentStatus),
                            borderRadius: '10px'
                          }}
                        >
                            <span style={{ color: "white" }}>
                              {o.paymentStatus}
                            </span>
                        </div>
                      </div>
                    </td>

                    <td className="w-10 ps-3 pt-4">
                      <div
                        className="w-100 h-100 d-flex"
                        style={{
                          borderLeft: "1px solid #757575",
                          color: "#757575",
                        }}
                      >
                        <span className="w-50 fs-6 py-1 me-4"></span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="pt-2" colSpan="6">
                      <div
                        className="w-100 h-100 d-flex justify-content-center"
                        style={{ borderBottom: "1px solid #CCCCCC" }}
                      ></div>
                    </td>
                  </tr>

                  {o.productOrders.map((p) => (
                    <tr key={p.id}>
                      <td className="w-10 pt-3 pb-3">
                        <Link to={{ pathname: `/product/${p.id}` }}>
                          <div id="ProductImg">
                            <img
                              src={p.image}
                              alt="Product"
                              style={{ height: "60px", width: "60px" }}
                            />
                          </div>
                        </Link>
                      </td>

                      <td className="pb-3" colSpan="3">
                        <Link
                          to={{ pathname: `/product/${p.id}` }}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <div>
                            <span>{p.productName}</span>
                          </div>
                        </Link>

                        <div>
                          <span>x{p.quantity}</span>
                        </div>
                      </td>

                      <td className="w-15 ps-4 pb-3">
                        <div className="ms-4">
                          <span className="ps-3">
                            {p.price.toLocaleString("de-DE")} đ
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td className="pt-2" colSpan="6">
                      <div
                        className="w-100 h-100 d-flex justify-content-center"
                        style={{ borderBottom: "1px solid #CCCCCC" }}
                      ></div>
                    </td>
                  </tr>

                  <tr>
                    <td className="pt-3" colSpan="4">
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-check"
                        className="ps-2"
                        style={{ color: "#9aa14ba1" }}
                      />
                      <span className="ps-3" style={{ color: "#9aa14ba1" }}>
                        Đơn hàng đang chờ xác nhận
                      </span>
                    </td>

                    <td className="w-10 pt-3">
                      <span className="ps-1">Total:</span>
                      <span
                        className="ps-2 fw-bold"
                        style={{ color: "#3C75A6" }}
                      >
                        {o.totalPrice.toLocaleString("de-DE")} đ
                      </span>
                    </td>
                  </tr>
                </div>
              ))}
            </>
          ) : (
            <div className="col-md-12 text-center my-5 py-5">
              <div
                className="d-inline-block p-5"
                style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px dotted black",
                  borderRadius: "15px",
                }}
              >
                <div className="d-flex flex-column align-items-center p-3">
                  <img src={notfound} alt="" className="w-50" />
                  <span
                    className="text-center fs-4 pt-3"
                    style={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Hiện chưa có đơn hàng nào
                  </span>
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </>
  );
};
export default UserOrderManagement;
