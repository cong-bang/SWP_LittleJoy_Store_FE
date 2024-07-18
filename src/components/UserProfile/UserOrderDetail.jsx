import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/styleUserOrderDetail.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import Abott from "../../assets/img/Abott.png";
import UploadImage from "../UploadImage/UploadImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserOrderDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [image, setImage] = useState("");
  const [inforOrder, setInforOrder] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [mainAddress, setMainAddress] = useState("");
  const [listProduct, setListProduct] = useState([{}]);
  const { pathname } = useLocation();
  const [checkCancel, setCheckCancel] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleUploadComplete = (url) => {
    setImage(url);
  };

  //Refresh field cancel order
  const refreshFieldCancelOrder = () => {
    setReason("");
    setComments("");
    setImage("");
  };

  //Fetch order by orderCode
  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const responseUser = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
      );
      const responseOrder = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/order/get-order-by-orderCode/${id}`
      );
      const responseMainAddress = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/address/main-address-by-user-id/${userId}`
      );
      const reponseCheckCancel = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/order/check-cancel-order/${id}`
      );

      const dataUser = await responseUser.json();
      if (responseUser.ok) {
        setUser(dataUser);
      }

      const dataMainAddress = await responseMainAddress.json();
      if (responseMainAddress.ok) {
        setMainAddress(dataMainAddress.address1);
      }

      const dataOrder = await responseOrder.json();
      if (responseOrder.ok) {
        // Format the date in dataOrder
        if (dataOrder.date) {
          const dateObj = new Date(dataOrder.date);
          const formattedDate = `${("0" + dateObj.getDate()).slice(-2)}/${(
            "0" +
            (dateObj.getMonth() + 1)
          ).slice(-2)}/${dateObj.getFullYear()} ${(
            "0" + dateObj.getHours()
          ).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`;
          dataOrder.date = formattedDate;
        }

        if (dataOrder.totalPrice) {
          const formattedPrice = dataOrder.totalPrice;
          dataOrder.totalPrice = formattedPrice.toLocaleString("de-DE");
        }
        if (dataOrder.amountDiscount) {
          const formattedAmountDiscount = dataOrder.amountDiscount;
          dataOrder.amountDiscount = formattedAmountDiscount.toLocaleString("de-DE");
        }
        setInforOrder(dataOrder);
        setListProduct(dataOrder.productOrders);
      }

      const dataCheckCancel = await reponseCheckCancel.json();
      if (reponseCheckCancel.ok) {
        setCheckCancel(dataCheckCancel);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  //CANCEL ORDER

  const handleConfirmCancelOrder = async () => {
    const order = {
      orderCode: id,
      status: 2,
    };
    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/order/update-order-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (response.ok) {
        toast.success("Đơn hàng đã hủy thành công");
        await fetchData();
      } else {
        toast.error("Hủy đơn hàng thất bại");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="w-100 robotto">
        <ToastContainer />
        <div className="py-3 mb-3">
          <Link to="/userordermanagement" style={{ textDecoration: "none", color: "black" }}>
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" />
            <span className="ps-2" style={{ color: "black" }}>
              Quay lại
            </span>
          </Link>
        </div>
        <div style={{ borderTop: "1px solid #CCCCCC" }}>&nbsp;</div>
        <div className="d-flex justify-content-center py-2">
          <div className="d-inline-block p-3" style={{ width: "45%" }}>
            <table className="w-100">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <span className="fw-bold fs-5" style={{}}>
                      THÔNG TIN KHÁCH HÀNG
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="w-40">
                    <div className="pt-3">
                      <span>Tên khách hàng : </span>
                    </div>
                  </td>
                  <td className="w-60">
                    <div className="pt-3">
                      <span>{user.fullname}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Địa chỉ giao hàng : </span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{mainAddress}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Số điện thoại :</span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{inforOrder.phoneNumber}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Email : </span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{user.email}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Ngày tạo hóa đơn : </span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{inforOrder.date}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-inline-block p-3" style={{ width: "45%" }}>
            <table className="w-100">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <span className="fw-bold fs-5" style={{}}>
                      THÔNG TIN ĐƠN HÀNG
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="w-40">
                    <div className="pt-3">
                      <span>Mã đơn hàng : </span>
                    </div>
                  </td>
                  <td className="w-60">
                    <div className="pt-3">
                      <span>#{inforOrder.orderCode}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Tổng tiền : </span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{inforOrder.totalPrice}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Tình trạng đơn hàng : </span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3" style={{color: inforOrder.status === "Đặt Hàng Thành Công" ? "rgba(48, 207, 35, 1)" : inforOrder.status === "Đã Hủy" ? "red" : "#9AA14B"}}>
                      <span>{inforOrder.status}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Thanh toán :</span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{inforOrder.paymentStatus}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3">
                      <span>Giao hàng :</span>
                    </div>
                  </td>
                  <td>
                    <div className="pt-3">
                      <span>{inforOrder.deliveryStatus || "Chưa Có"}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ borderBottom: "1px solid #CCCCCC" }}>&nbsp;</div>
        {inforOrder.note != "" && (
          <>
        <div className="p-3 d-flex justify-content-center mt-3">
          <div className="pe-3 pt-2">
            <span>Ghi Chú :</span>
          </div>
          <div
            className="w-80 px-3 py-2"
            style={{
              backgroundColor: "rgba(155, 155, 155, 0.05)",
              borderRadius: "10px",
            }}
          >
            {inforOrder.note}
          </div>
        </div>
        <div style={{ borderBottom: "1px solid #CCCCCC" }}>&nbsp;</div>
        </>
        )}
        <div>&nbsp;</div>
        <div>
          <table
            style={{ width: "100%", border: "1px solid gray", color: "#000" }}
          >
            <tbody>
              <tr className="text-center fw-bold" style={{ backgroundColor: "#3C75A6", color: "white" }}>
                <td className="py-2" style={{ width: "9%", border: "1px solid gray" }}>STT</td>
                <td style={{ width: "28%", border: "1px solid gray" }}>
                  MẶT HÀNG
                </td>
                <td style={{ width: "20%", border: "1px solid gray" }}>
                  SỐ LƯỢNG
                </td>
                <td style={{ width: "15%", border: "1px solid gray" }}>
                  ĐƠN GIÁ
                </td>
                <td style={{ width: "28%", border: "1px solid gray" }}>
                  THÀNH TIỀN (VNĐ)
                </td>
              </tr>
              {listProduct.map((p, index) => (
              <tr key={p.id}>
                <td className="px-2 py-2" style={{ border: "1px solid gray" }}>{index + 1}</td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <Link to='#' style={{color: 'black', textDecoration: 'none'}}>
                    <span>{p.productName}</span>
                  </Link>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}>{p.quantity}</span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}>{p.price / p.quantity ? (p.price / p.quantity).toLocaleString('de-DE') : 'N/A'}</span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}>{p.price ? (p.price).toLocaleString('de-DE') : "N/A" }</span>
                </td>
              </tr>
              ))}
              <tr>
                <td className="px-2 py-2" style={{ border: "1px solid gray" }}>{listProduct.length + 1}</td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span>Shipping</span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}></span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}></span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}>30.000</span>
                </td>
              </tr>
              {inforOrder.amountDiscount !== 0 && (
              <tr>
                <td className="px-2 py-2" style={{ border: "1px solid gray" }}>{listProduct.length + 2}</td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span>Giảm giá</span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}></span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}></span>
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}>- {inforOrder.amountDiscount}</span>
                </td>
              </tr>
              )}
              
              <tr style={{ backgroundColor: "#3C75A6", color: "white" }}>
                <td className="px-2 py-2" colSpan="4" style={{ border: "1px solid gray" }}>
                  TỔNG TIỀN (VNĐ)
                </td>
                <td className="px-2" style={{ border: "1px solid gray" }}>
                  <span style={{ float: "inline-end" }}>{inforOrder.totalPrice}</span>
                </td>
              </tr>      
            </tbody>
          </table>
        </div>
        <div>
        {checkCancel == true && (
          <>
            <div className="pt-4 d-flex justify-content-end">
              <div className="w-25 px-4 ">
                <button
                  className="w-100 Borderall-CancelOrder px-4 py-1 text-center text-white"
                  data-bs-toggle="modal" data-bs-target="#cancel-order" onClick={refreshFieldCancelOrder}
                >
                Hủy đơn hàng
                </button>
              </div>
            </div>
          </>
          )}
        </div>
      </div>

      {/* <!-- Modal cancel --> */}
    <div className="modal" id="cancel-order">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 d-flex justify-content-between" style={{backgroundColor: 'rgba(60, 117, 166, 1)'}}>
                    <h4 className="modal-title inter ms-3" style={{color: 'white'}}>Hủy đơn</h4>
                    <div className="btn-close-modal me-3" style={{color: 'white'}} data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{backgroundColor: 'white'}}>
                <div className="p-2" >
                    <table className="w-100 table-modal" >
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2" style={{color: '#3C75A6'}}>Bạn có chắc muốn hủy đơn hàng hay không?</span></td>
                       </tr>
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end" style={{backgroundColor: 'white'}}>
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal" style={{backgroundColor: 'rgb(60, 117, 166)'}}><span>Thoát</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleConfirmCancelOrder} type="submit" data-bs-dismiss="modal" value="Xác nhận hủy" style={{backgroundColor: '#E33539'}} className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  );
};
export default UserOrderDetail;
