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
        return "#4DC95A";
      case "Thất Bại":
        return "#DF0029";
      default:
        return "#9AA14B";
    }
  };

  return (
    <>
      <div className="w-100">
        <div className="mt-5">
          <span className="fs-5">Quản lí đơn hàng</span>
        </div>
        <div className="mt-3" style={{ borderBottom: "1px solid black" }}>
          <span></span>
        </div>
        <div className="py-3"></div>
        {orderList.length > 0 ? (
        <>
        {orderList.map((o) => (
        <div key={o.id} className="p-2 py-3">
          <table className="w-100">
            <tbody>
              <tr>
                <td className="w-10">
                  <Link to={{ pathname: `/userorderdetail/${o.orderCode}` }} style={{textDecoration: 'none'}}>
                    <span className="fw-bold" style={{color: '#3C75A6', fontSize: '18px'}}>#{o.orderCode}</span>
                  </Link>
                </td>
                <td></td>
                <td className="w-40">
                  <div className="float-end pe-3">
                    <span className="pe-3" style={{fontSize: '18px'}}>Tình trạng thanh toán: </span>
                    <div
                      className="d-inline-block py-1 px-3"
                      style={{
                        backgroundColor: getStatusColor(o.paymentStatus),
                        color: "white",
                        borderRadius: "10px",
                        fontSize: '18px'
                      }}
                    >
                      {o.paymentStatus}
                    </div>
                  </div>
                </td>
                <td className="w-20">
                  <div
                    className="h-100 d-inline-block"
                    style={{ borderLeft: "1px solid black" }}
                  >
                    &nbsp;
                  </div>
                  <div className="d-inline-block ps-3">
                    <span className="" style={{color: '#757575'}}>{o.deliveryStatus || "Chưa có"}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="py-2">
                  <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
                </td>
              </tr>
              {o.productOrders.map((p) => (
              <tr>
                <td className="py-2">
                  <Link to={{ pathname: `/product/${p.id}` }}>
                  <div className="w-100 text-center">
                    <img
                      src={p.image}
                      alt=""
                      className="w-60"
                    />
                  </div>
                  </Link>
                </td>
                <td>
                  <Link to={{ pathname: `/product/${p.id}` }} style={{textDecoration: 'none', color: 'black'}}>
                    <div className="d-flex flex-column" style={{textDecoration: 'none', color: 'black'}}>
                      <span>{p.productName}</span>
                      <span>x{p.quantity}</span>
                    </div>
                  </Link>
                </td>
                <td></td>
                <td><div className="float-end"><span>{p.price.toLocaleString("de-DE")} VNĐ</span></div></td>
              </tr>
              ))}
              <tr>
                <td colSpan="4" className="py-2">
                  <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
                </td>
              </tr>
              <tr>
                <td colSpan='2'>
                {o.status === "Đặt Hàng Thành Công" && (
                    <div>
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-check"
                        className="ps-2"
                        style={{ color: "rgb(60, 117, 166)" }}
                      />
                      <span className="ps-3" style={{ color: "#3C75A6" }}>
                        {o.status}
                      </span>
                    </div>
                  )}
                  {o.status === "Đã Hủy" && (
                    <div>
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-xmark"
                        className="ps-2"
                        style={{ color: "#E74646" }}
                      />
                      <span className="ps-3" style={{ color: "#E74646" }}>
                        {o.status}
                      </span>
                    </div>
                  )}
                  {o.status === "Đang Chờ" && (
                    <div>
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-check"
                        className="ps-2"
                        style={{ color: "#9aa14ba1" }}
                      />
                      <span className="ps-3" style={{ color: "#9aa14ba1" }}>
                        {o.status}
                      </span>
                    </div>
                  )}
                </td>
                <td colSpan='2'>
                  <div>
                    <span className="float-end" style={{fontSize: '18px'}}>Tổng cộng: <span className="ps-2 fw-bold" style={{color: '#3C75A6'}}>{o.totalPrice.toLocaleString("de-DE")} VNĐ</span></span>
                  </div>
                </td>
              </tr>
            </tbody>          
          </table>
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

        {/* <div className="p-2 py-3">
          <table className="w-100">
            <tbody>
              <tr>
                <td className="w-10">
                  <Link to='#' style={{textDecoration: 'none'}}>
                    <span className="fw-bold" style={{color: '#3C75A6', fontSize: '18px'}}>#123456</span>
                  </Link>
                </td>
                <td></td>
                <td className="w-40">
                  <div className="float-end pe-3">
                    <span className="pe-3" style={{fontSize: '18px'}}>Tình trạng thanh toán: </span>
                    <div
                      className="d-inline-block py-1 px-3"
                      style={{
                        backgroundColor: "#4DC95A",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: '18px'
                      }}
                    >
                      Thành Công
                    </div>
                  </div>
                </td>
                <td className="w-20">
                  <div
                    className="h-100 d-inline-block"
                    style={{ borderLeft: "1px solid black" }}
                  >
                    &nbsp;
                  </div>
                  <div className="d-inline-block ps-3">
                    <span className="" style={{color: '#757575'}}>Giao hàng thành công</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="py-2">
                  <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link>
                  <div className="w-100 text-center">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/images%2F1719031349579.jpg?alt=media&token=cf6e00a3-bf57-4b5d-b0f9-c1ab19ad35b9"
                      alt=""
                      className="w-60"
                    />
                  </div>
                  </Link>
                </td>
                <td>
                  <Link style={{textDecoration: 'none', color: 'black'}}>
                    <div className="d-flex flex-column" style={{textDecoration: 'none', color: 'black'}}>
                      <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      <span>x1</span>
                    </div>
                  </Link>
                </td>
                <td></td>
                <td><div className="float-end"><span>100.000 VNĐ</span></div></td>
              </tr>
              <tr>
                <td className="py-2">
                  <Link>
                  <div className="w-100 text-center">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/images%2F1719031349579.jpg?alt=media&token=cf6e00a3-bf57-4b5d-b0f9-c1ab19ad35b9"
                      alt=""
                      className="w-60"
                    />
                  </div>
                  </Link>
                </td>
                <td>
                  <Link style={{textDecoration: 'none', color: 'black'}}>
                    <div className="d-flex flex-column" style={{textDecoration: 'none', color: 'black'}}>
                      <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      <span>x1</span>
                    </div>
                  </Link>
                </td>
                <td></td>
                <td><div className="float-end"><span>100.000 VNĐ</span></div></td>
              </tr>
              <tr>
                <td colSpan="4" className="py-2">
                  <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
                </td>
              </tr>
              <tr>
                <td colSpan='2'>
                  <div>
                  <FontAwesomeIcon
                        icon="fa-solid fa-circle-xmark"
                        className="ps-2"
                        style={{ color: "#E74646" }}
                      />
                    <span className="ps-3" style={{color: '#E74646'}}>Đã Hủy</span>
                  </div>
                </td>
                <td colSpan='2'>
                  <div>
                    <span className="float-end" style={{fontSize: '18px'}}>Tổng cộng: <span className="ps-2 fw-bold" style={{color: '#3C75A6'}}>100.000 VNĐ</span></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}

      </div>
      <div className="w-100 mt-4 py-2">
      <div className="d-inline-block float-end">
          <div className="fs-5">
            <Link className="pe-2" to="#" style={{ color: "#3C75A6" }}>
              <FontAwesomeIcon
                id="order-pre"
                icon="fa-solid fa-circle-chevron-left"
                onClick={handlePrevious}
              />
            </Link>
            <span className="px-2" style={{ fontFamily: "Roboto" }}>
              Trang {paging.CurrentPage}
            </span>
            <Link className="ps-2" to="#" style={{ color: "#3C75A6" }}>
              <FontAwesomeIcon
                id="order-next"
                icon="fa-solid fa-circle-chevron-right"
                className="pe-3"
                onClick={handleNext}
              />
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};
export default UserOrderManagement;
