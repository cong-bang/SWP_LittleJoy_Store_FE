import React, { useEffect, useState } from "react";
import "../../assets/css/styleadminorder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBoxOpen,
  faRightFromBracket,
  faHouse,
  faPowerOff,
  faDollarSign,
  faClipboardList,
  faUsers,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrder = () => {
  const [orderList, setOrderList] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchOrderCode, setSearchOrderCode] = useState(null);
  const [searchUsername, setSearchUsername] = useState(null);
  const [searchStatus, setSearchStatus] = useState(0);
  const [searchDeliveryStatus, setSearchDeliveryStatus] = useState(0);
  const [searchSortDate, setSearchSortDate] = useState(0);
  const [searchSortPrice, setSearchSortPrice] = useState(0);
  const [searchPaymentStatus, setSearchPaymentStatus] = useState(0);
  const [searchPaymentMethod, setSearchPaymentMethod] = useState(0);
  const [userLoaded, setUserLoaded] = useState(false);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [myAccount, setMyAccount] = useState('');
  const { pathname } = useLocation();
  const [selectedOrder, setSelectedOrder] = useState({});
  const [listProduct, setListProduct] = useState([{}])
  const [status, setStatus] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [checkCancel, setCheckCancel] = useState(false);
  const [statusName, setStatusName] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const roleFromLocalStorage = localStorage.getItem("userRole");
    const usernameFromLocalStorage = localStorage.getItem("userName");
    if (
      roleFromLocalStorage === "ADMIN" ||
      roleFromLocalStorage === "STAFF" ||
      (roleFromLocalStorage === "USER" && usernameFromLocalStorage)
    ) {
      setMyAccount(usernameFromLocalStorage);
      setRoleName(roleFromLocalStorage);
    }
  }, [pathname]);

  //FETCH ORDERS
  const fetchUserNameById = async (userId) => {
    try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/user/${userId}`);
      if (!response.ok) {
      }
      const data = await response.json();
      return data.userName;
    } catch (error) {
      return 'Unknown User';
    }
  };

  const fetchData = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (searchStatus != 0) searchParams.append("Status", searchStatus);
      if (searchDeliveryStatus != 0) searchParams.append("DeliveryStatus", searchDeliveryStatus);
      if (searchSortDate != 0) searchParams.append("SortDate", searchSortDate);
      if (searchSortPrice != 0) searchParams.append("SortPrice", searchSortPrice);
      if (searchPaymentStatus != 0) searchParams.append("PaymentStatus", searchPaymentStatus);
      if (searchPaymentMethod != 0) searchParams.append("PaymentMethod", searchPaymentMethod);
      searchParams.append("PageIndex", pageIndex);
      searchParams.append("PageSize", pageSize);

      if (searchOrderCode) searchParams.append("OrderCode", searchOrderCode);
      if (searchUsername) searchParams.append("UserName", searchUsername);

      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/order/get-orders-filter?PageIndex=${pageIndex}&PageSize=9&${searchParams.toString()}`
      );

      if (!response.ok) {
        if (response.status === 404 || response.status === 400) {
          setOrderList([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          setOrderList([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationData = await JSON.parse(
        response.headers.get("X-Pagination")
      );
      setPaging(paginationData);

      const dataOrderList = await response.json();
      const updatedData = await Promise.all(
        dataOrderList.map(async (order) => {
          const userName = await fetchUserNameById(order.userId);
          return {
            ...order,
            userName: userName,
            totalPrice: formatPrice(order.totalPrice),
            date: formatDate(order.date),
          };
        })
      );
      setOrderList(updatedData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("de-DE");
  };

  useEffect(() => {
    fetchData(paging.CurrentPage, paging.PageSize);
  }, [
    paging.CurrentPage,
    searchOrderCode,
    searchUsername,
    searchStatus,
    searchDeliveryStatus,
    searchSortDate,
    searchSortPrice,
    searchPaymentStatus,
    searchPaymentMethod
  ]);

  const handlePageChange = (newPage) => {
    setPaging((prev) => ({
      ...prev,
      CurrentPage: newPage,
    }));
  };

  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleChangeOrderCode = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSearchOrderCode(value);
    }
  };

  //EDIT ORDER
  const handleEditOrder = (orderCode) => {
    fetchOrderByCode(orderCode);
  };

  const fetchOrderByCode = async (orderCode) => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/order/get-order-by-orderCode/${orderCode}`
      );

      const data = await response.json();

      if (response.ok) {
        const userId = data.userId;
      const userResponse = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
      );

      const userData = await userResponse.json();
      if (userResponse.ok) {
        // Add userName to the order data
        data.userName = userData.userName;
      }

        if (data.date) {
          const dateObj = new Date(data.date);
          const formattedDate = `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()} ${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
          data.date = formattedDate;
      }

      if (data.totalPrice) {
          const formattedPrice = data.totalPrice;
          data.totalPrice = formattedPrice.toLocaleString('de-DE');
      }
        setSelectedOrder(data);
        setStatusName(data.status);
        setListProduct(data.productOrders);
        if (data.status == "Đang Chờ") {
          setStatus("0");
        } else if (data.status == "Đặt Hàng Thành Công") {
          setStatus("1");
        } else if (data.status == "Đã Hủy") {
          setStatus("2");
        }

        if (data.deliveryStatus == "Đang Chuẩn Bị") {
            setDeliveryStatus("1");
        } else if (data.deliveryStatus == "Đang Giao Hàng") {
            setDeliveryStatus("2");
        } else if (data.deliveryStatus == "Giao Hàng Thất Bại") {
            setDeliveryStatus("3");
        } else if (data.deliveryStatus == "Giao Hàng Thành Công") {
            setDeliveryStatus("4");
        } else {
          setDeliveryStatus("");
        }
      }

      const reponseCheckCancel = await fetch(`https://littlejoyapi.azurewebsites.net/api/order/check-cancel-order/${orderCode}`);
      const dataCheckCancel = await reponseCheckCancel.json();
        if (reponseCheckCancel.ok) {
          setCheckCancel(dataCheckCancel);
        }
      
      
    } catch (error) {
      console.error("Lỗi fetch data", error);
    } finally {
    }
  };

  //UPDATE ORDER
  const notify = () =>
    toast.error("Vui lòng nhập đủ thông tin", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const UserName = ({ title = '', maxLength }) => {
      const truncateTitle = (title, maxLength) => {
        if (title.length <= maxLength) return title;
        return title.substring(0, maxLength) + "...";
      };
      return <>{truncateTitle(title, maxLength)}</>;
    };

  const handleUpdateOrder = async () => {
    
    try {
      if (status === 1 || status === 2 ) {
        const updateStatus = {
          orderCode: selectedOrder.orderCode,
          status: status
        }
        const response = await fetch(
          "https://littlejoyapi.azurewebsites.net/api/order/update-order-status",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateStatus),
          }
        );
  
        if (response.ok) {
          toast.success("Đơn hàng được sửa thành công!");
          fetchData(paging.CurrentPage, paging.PageSize);
        } else {
          const errorData = await response.json();
          toast.error("Đơn hàng được sửa thất bại!");
        }
      }

      if (deliveryStatus === 1 || deliveryStatus === 2 || deliveryStatus === 3 || deliveryStatus === 4 ) {
        const updateDeliveryStatus = {
          orderCode: selectedOrder.orderCode,
          status: deliveryStatus
        }
        const response = await fetch(
          "https://littlejoyapi.azurewebsites.net/api/order/update-order-delivery",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateDeliveryStatus),
          }
        );
  
        if (response.ok) {
          toast.success("Đơn hàng được sửa thành công!");
          fetchData(paging.CurrentPage, paging.PageSize);
        } else {
          const errorData = await response.json();
          toast.error("Đơn hàng được sửa thất bại!");
        }
      }
      
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
    <ToastContainer />
    <div style={{ background: "#151C2C" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 nav-admin-left">
            <div className="logo-admin d-flex justify-content-center w-100 mt-3">
              <a href="">
                <p
                  className="logo-admin-left d-inline-block p-1 m-0"
                  style={{ fontFamily: "sans-serif" }}
                >
                  LITTLE JOY
                </p>
                <p
                  className="d-inline-block logo-admin-right ms-2"
                  style={{ fontFamily: "sans-serif" }}
                >
                  ADMIN
                </p>
              </a>
            </div>
            <div className="nav-admin mt-5 w-100">
              <table className="w-100">
                <tbody>
                  {roleName == "ADMIN" &&(
                  <>
                  <tr>
                    <td colSpan="2" className="py-1">
                      <span
                        className="nav-admin-title"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        Main
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1 hover-dashboard ps-3">
                      <Link to="/dashboard">
                        <span style={{ fontFamily: "sans-serif" }}>
                          Dashboard
                        </span>
                      </Link>
                    </td>
                  </tr>
                  </>)}
                  <tr>
                    <td colSpan="2" className="py-1">
                      <span
                        className="nav-admin-title"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        Shop
                      </span>
                    </td>
                  </tr>
                  {roleName == "ADMIN" &&(
                  <tr>
                    <td></td>
                    <td className="py-1 ps-3 hover-dashboard">
                      <Link to="/manageuser">
                        <FontAwesomeIcon icon={faUser} />{" "}
                        <span style={{ fontFamily: "sans-serif" }}>
                          Quản lý người dùng
                        </span>
                      </Link>
                    </td>
                  </tr>
                  )}
                  <tr>
                    <td></td>
                    <td className="py-1 ps-3 active-admin">
                      <Link to="/manageorder">
                        <FontAwesomeIcon icon={faCartShopping} />{" "}
                        <span style={{ fontFamily: "sans-serif" }}>
                          Quản lý đơn hàng
                        </span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="py-1 ps-3 hover-dashboard">
                      <Link to="/manageproduct">
                        <FontAwesomeIcon icon={faBoxOpen} />{" "}
                        <span style={{ fontFamily: "sans-serif" }}>
                          Quản lý sản phẩm
                        </span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/managecategory">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý danh mục
                          </span>
                        </Link>
                      </td>
                    </tr>
                  <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageblog">
                        <FontAwesomeIcon icon="fa-solid fa-paste" />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý bài viết
                          </span>
                        </Link>
                      </td>
                    </tr>
                    
                  <tr>
                  <td className="py-2">
                      <Link to="/" style={{textDecoration: 'none'}} className="text-white" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                        </Link>
                      </td>
                      <td>
                      <Link to="/" style={{textDecoration: 'none'}} className="text-white" onClick={handleLogout}>
                        <span >Logout</span>
                        </Link>
                      </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-10">
            <div className="row top-nav">
              <div className="col-md-2 text-center">
                <div className="dashboard p-2 py-3">
                  <span className="">
                    <p className="m-0" style={{ fontFamily: "sans-serif", fontSize: '16px', color:'white' }}>
                      Dashboard
                    </p>
                  </span>
                </div>
              </div>
              <div className="col-md-8 d-flex align-content-center">
                <div className="icon-nav p-2 py-3">
                  <FontAwesomeIcon icon="fa-solid fa-house" className="text-white"></FontAwesomeIcon>
                </div>
                <div className="pos-nav d-flex align-content-center p-2 py-3">
                  <p className="m-0" style={{ fontFamily: "sans-serif", fontSize: '16px' }}>
                    Home
                  </p>
                  <span style={{ fontFamily: "sans-serif" }}>
                    /User Order
                  </span>
                </div>
              </div>
              <div className="col-md-2 d-flex align-content-center justify-content-center">
                <div className="pos-nav d-flex align-content-center p-2 py-3">
                  <p className="m-0" style={{fontFamily: "sans-serif", fontSize: '16px'}}>{myAccount}</p>
                </div>
                <div className="icon-nav-log p-2 py-3 text-white">
                  <FontAwesomeIcon icon={faPowerOff} />
                </div>
              </div>
              <div className="col-md-12 p-0">
                <div className="flex-content text-center w-100">
                  <div className="body-top w-100">
                    <div className="body-title d-flex justify-content-between align-items-center w-100">
                      <span
                        className="ms-3"
                        style={{
                          color: "#F8B940",
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Order Management
                      </span>
                    </div>
                  </div>
                  <div className="body-center">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12 d-flex justify-content-start">
                          <div className="search-user p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                value={searchOrderCode}
                                onChange={handleChangeOrderCode}
                                placeholder="Search OrderCode"
                              />
                            </div>
                            <div className="search-user p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                value={searchUsername}
                                onChange={(e) => setSearchUsername(e.target.value)}
                                placeholder="Search user"
                              />
                            </div>
                          
                        </div>
                        <div className="col-md-12 d-flex justify-content-start">
                          <div className="filter-status p-3" >
                            <select name="" id="" className="p-1" defaultValue="" value={searchStatus} onChange={(e) => setSearchStatus(parseInt(e.target.value))}>
                              <option value="0" selected disabled>
                                Status
                              </option>
                              <option value="1">Đang chờ</option>
                              <option value="2">Đặt hàng thành công</option>
                              <option value="3">Đã hủy</option>
                              <option value="0">Không</option>
                            </select>
                          </div>
                          <div className="filter-status p-3" >
                            <select name="" id="" className="p-1" defaultValue="" value={searchPaymentStatus} onChange={(e) => setSearchPaymentStatus(parseInt(e.target.value))}>
                              <option value="0" selected disabled>
                                Payment Status
                              </option>
                              <option value="1">Đang chờ</option>
                              <option value="2">Thành công</option>
                              <option value="3">Thất bại</option>
                              <option value="0">Không</option>
                            </select>
                          </div>
                          <div className="filter-status p-3" >
                            <select name="" id="" className="p-1" defaultValue="" value={searchDeliveryStatus} onChange={(e) => setSearchDeliveryStatus(parseInt(e.target.value))}>
                              <option value="0" selected disabled>
                                Delivery Status
                              </option>
                              <option value="1">Đang chuẩn bị</option>
                              <option value="2">Đang giao hàng</option>
                              <option value="3">Giao hàng thất bại</option>
                              <option value="4">Giao hàng thành công</option>
                              <option value="0">Không</option>
                            </select>
                          </div>
                          <div className="filter-status p-3" >
                              <select name="" id="" className="p-1" defaultValue="" value={searchSortDate} onChange={(e) => setSearchSortDate(parseInt(e.target.value))}>
                                <option value="0" selected disabled>
                                  Sort Date
                                </option>
                                <option value="1">Tăng dần</option>
                                <option value="2">Giảm dần</option>
                                <option value="0">Không</option>
                              </select>
                            </div>
                            <div className="filter-status p-3" >
                              <select name="" id="" className="p-1" defaultValue="" value={searchSortPrice} onChange={(e) => setSearchSortPrice(parseInt(e.target.value))}>
                                <option value="0" selected disabled>
                                  Sort Price
                                </option>
                                <option value="1">Tăng dần</option>
                                <option value="2">Giảm dần</option>
                                <option value="0">Không</option>
                              </select>
                            </div>
                            <div className="filter-status p-3" >
                              <select name="" id="" className="p-1" defaultValue="" value={searchPaymentMethod} onChange={(e) => setSearchPaymentMethod(parseInt(e.target.value))}>
                                <option value="0" selected disabled>
                                  Payment method
                                </option>
                                <option value="1">COD</option>
                                <option value="2">VNPAY</option>
                                <option value="0">Không</option>
                              </select>
                            </div>
                        </div>
                        <div className="col-md-12 p-0">
                          <table className="w-100 table-body">
                            <tbody>
                            <tr className="table-header">
                              <td className="p-3 px-4">
                                <span className="float-start">OrderCode</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">User</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Price</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Method</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Date</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Status</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="">Delivery status</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span>Action</span>
                              </td>
                            </tr>
                            {orderList.map((o) => (
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">{o.orderCode}</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start"><UserName title={o.userName} maxLength={8}/></span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">{o.totalPrice}</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">{o.paymentMethod}</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  {o.date}
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">{o.deliveryStatus || "Chưa có"}</span>
                              </td>
                              <td className="p-3 px-4 ">
                              {o.paymentStatus === "Thành Công" && (
                                <div className="status-order-complete px-1 py-2">
                                  <span className="inter">COMPLETED</span>
                                </div>
                              )}
                              {o.paymentStatus === "Thất Bại" && (
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              )}
                              {o.paymentStatus === "Đang chờ" && (
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              )}
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2" onClick={() => handleEditOrder(o.orderCode)}>
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1" onClick={() => handleEditOrder(o.orderCode)}>
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            ))}
                            {/* <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-complete px-1 py-2">
                                  <span className="inter">COMPLETED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-cancelled px-1 py-2">
                                  <span className="inter">CANCELLED</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="table-content">
                              <td className="p-3 px-4 ">
                                <span className="float-start">200803</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">taile03</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">
                                  2024-1-2 13:23:44
                                </span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">Thu Duc</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">0903112345</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">VNPAY</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <span className="float-start">250.000</span>
                              </td>
                              <td className="p-3 px-4 ">
                                <div className="status-order-pending px-1 py-2">
                                  <span className="inter">PENDING</span>
                                </div>
                              </td>
                              <td className="p-3 px-4">
                                <div
                                  className="view-details d-flex justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#details-order"
                                >
                                  <div className="edit-order p-2">
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                  </div>
                                  <div className="edit-user-2 p-2 ps-1">
                                    <span>View Details</span>
                                  </div>
                                </div>
                              </td>
                            </tr> */}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end paging p-2">
                        <div>
                           
                           {/* Paging for data */}
                           <div className="col-md-12 d-flex justify-content-end paging p-2">
                             {Array.from({ length: paging.TotalPages }, (_, index) => (
                               <Link
                                 key={index + 1}
                                 to="#"
                                 className={`p-2 me-3 ${
                                   paging.CurrentPage === index + 1 ? "active-paging" : ""
                                 }`}
                                 onClick={(e) => {
                                   e.preventDefault();
                                   handlePageChange(index + 1);
                                 }}
                               >
                                 {index + 1}
                               </Link>
                             ))}
                           </div>
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal details order --> */}
      <div className="modal" id="details-order">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="py-2 header-modal d-flex justify-content-between">
              <h4 className="modal-title inter ms-3">Thông tin đơn hàng</h4>
              <div className="btn-close-modal me-3" data-bs-dismiss="modal">
                <i className="fa-solid fa-x"></i>
              </div>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <table className="w-100 table-modal">
                <tbody>
                <tr>
                  <td className="p-2">
                    <span>Order Code:</span>
                  </td>
                  <td className="p-2">
                    <span>{selectedOrder.orderCode}</span>
                  </td>
                  <td className="p-2">
                    <span>Customer:</span>
                  </td>
                  <td className="p-2">
                    <span>{selectedOrder.userName}</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Date:</td>
                  <td className="p-2">{selectedOrder.date}</td>
                  <td className="p-2">Method:</td>
                  <td className="p-2">{selectedOrder.paymentMethod}</td>
                </tr>
                <tr>
                  <td className="p-2">Address</td>
                  <td colSpan="3" className="p-2">
                    {selectedOrder.address}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Phone Number: </td>
                  <td colSpan="3" className="p-2">
                    {selectedOrder.phoneNumber}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Payment Status: </td>
                  <td colSpan="3" className="p-2">
                    {selectedOrder.paymentStatus}
                  </td>
                </tr>
                </tbody>
              </table>
              <div className="title-product-modal p-2 my-1">
                <span className="w-100">Product:</span>
              </div>
              <div className="p-2">
                <table className="w-100 text-center table-product-modal">
                    <tbody>
                  <tr className="product-modal-title">
                    <td>
                      <span className="py-2">Name</span>
                    </td>
                    <td>
                      <span className="py-2">Quantity</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">Price</span>
                    </td>
                  </tr>
                  {listProduct.map((p) => (
                  <tr key={p.id} className="product-modal-list">
                    <td>
                      <span className="py-2">{p.productName}</span>
                    </td>
                    <td>
                      <span className="py-2">{p.quantity}</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">{p.price ? p.price.toLocaleString('de-DE') : 'N/A'}</span>
                    </td>
                  </tr>
                  ))}
                  {/* <tr className="product-modal-list">
                    <td>
                      <span className="py-2">Stylish</span>
                    </td>
                    <td>
                      <span className="py-2">7</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">750.000</span>
                    </td>
                  </tr>
                  <tr className="product-modal-title">
                    <td>
                      <span className="py-2">Total</span>
                    </td>
                    <td>
                      <span className="py-2">12</span>
                    </td>
                    <td className="w-25">
                      <span className="float-start py-2">1.500.500</span>
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
              <div className="p-2 mt-2">
                <table className="w-100 table-option-modal">
                    <tbody>
                    <tr>
                  <td className="p-2">Total: </td>
                  <td colSpan="" className="p-2">
                    {selectedOrder.totalPrice} VNĐ
                  </td>
                </tr>
                  <tr>
                    <td className="py-2 w-20">
                      <span>Status:</span>
                    </td>
                    <td className="py-2 w-80">
                      {checkCancel == true ? (
                        <select
                            className="ps-2 p-1 w-50"
                            value={status}
                            onChange={(e) =>
                              setStatus(parseInt(e.target.value))
                            }
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            <option value="0">Đang chờ</option>
                            <option value="1">Đặt hàng thành công</option>
                            <option value="2">Đã hủy</option>
                        </select>
                        ) : (
                          <span>{statusName}</span>
                        )}

                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 w-20">
                      <span>Delivery Status:</span>
                    </td>
                    <td className="py-2 w-80">
                    <select
                            className="ps-2 p-1 w-50"
                            value={deliveryStatus}
                            onChange={(e) =>
                              setDeliveryStatus(parseInt(e.target.value))
                            }
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            <option value="1">Chuẩn bị</option>
                            <option value="2">Đang giao hàng</option>
                            <option value="3">Giao hàng thất bại</option>
                            <option value="4">Giao hàng thành công</option>
                          </select>
                    </td>
                  </tr>
                  
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="footer-modal py-4 d-flex justify-content-end">
              <div className="close me-4">
                <div
                  className="modal-btn-close p-2 px-4"
                  data-bs-dismiss="modal"
                >
                  <span>Close</span>
                </div>
              </div>
              <div className="save-modal me-4">
                <input
                  type="submit"
                  value="Save"
                  className="input-submit modal-btn-close p-2 px-4 inter"
                  onClick={handleUpdateOrder}
                  data-bs-dismiss="modal" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ManageOrder;
