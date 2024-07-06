import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
  faX
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
  const [image, setImage] = useState('');
  const [inforOrder, setInforOrder] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [mainAddress, setMainAddress] = useState('');
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
    setReason('');
    setComments('');
    setImage('');
  }
  

  //Fetch order by orderCode
  const fetchData = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const responseUser = await fetch(`https://littlejoyapi.azurewebsites.net/api/user/${userId}`);
        const responseOrder = await fetch(`https://littlejoyapi.azurewebsites.net/api/order/get-order-by-orderCode/${id}`);
        const responseMainAddress = await fetch(`https://littlejoyapi.azurewebsites.net/api/address/main-address-by-user-id/${userId}`)
        const reponseCheckCancel = await fetch(`https://littlejoyapi.azurewebsites.net/api/order/check-cancel-order/${id}`)

        const dataUser = await responseUser.json();
        if (responseUser.ok) {
            setUser(dataUser)
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
                const formattedDate = `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()} ${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
                dataOrder.date = formattedDate;
            }

            if (dataOrder.totalPrice) {
                const formattedPrice = dataOrder.totalPrice;
                dataOrder.totalPrice = formattedPrice.toLocaleString('de-DE');
            }
            setInforOrder(dataOrder);
            setListProduct(dataOrder.productOrders);
          }

          const dataCheckCancel = await reponseCheckCancel.json();
          if (reponseCheckCancel.ok) {
            setCheckCancel(dataCheckCancel);
          }
      
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //CANCEL ORDER 

  const handleConfirmCancelOrder = async () => {
    const order = {
      orderCode: id,
      status: 2
    }
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
  }

  return (
    <>
      <ToastContainer />
    
          {/* <!-- User Info Side Bar--> */}
             
            <div className="row">
              {/* <!-- Return Button --> */}
              <div className="col-md-12">
                <div className="w-100">
                  <div className="w-100 mt-4 pt-3">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/userordermanagement"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                      <span className="px-2">Trở lại</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Page Function --> */}
              <div className="col-md-12">
                <div className="w-100">
                  <div className="w-100 mt-4">
                    <p
                      className="fs-3 pb-3"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Chi tiết đơn hàng
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              {/* <!-- User info in order --> */}
              <div className="col-md-6 pb-5">
                <div className="background w-100">
                  <table className="w-100 pb-5 ps-2 pe-3">
                    <tbody>
                      <tr>
                        <td className="ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>
                            Tên khách hàng:
                          </span>
                        </td>
                        <td className="ps-3 pt-3">
                          <span style={{ fontSize: "20px" }}>
                            {user.fullname}
                          </span>
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                      <tr>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>
                            Số điện thoại:
                          </span>
                        </td>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>{user.phoneNumber}</span>
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                      <tr>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>Email:</span>
                        </td>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>
                            {user.email}
                          </span>
                          <td colSpan="2"></td>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-3 pt-4">
                          <span style={{ fontSize: "20px" }}>Địa chỉ:</span>
                        </td>
                        <td className="pt-4 ps-3">
                          <span style={{ fontSize: "20px" }}>
                            {" "}
                            {mainAddress}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <!-- Overview global Order info --> */}
              <div className="col-md-6 pb-5 mb">
                <div
                  className="w-100 h-100 d-flex justify-content-center"
                  style={{ borderLeft: "1px solid black" }}
                >
                  <div className="w-100 ms-4">
                    <div className="background">
                      <table className="w-100 pb-5 ps-2 pe-2">
                        <tbody>
                          <tr>
                            <td className="ps-3 pt-3">
                              <span style={{ fontSize: "20px" }}>
                                Mã đơn hàng:
                              </span>
                            </td>
                            <td className="ps-3 pt-3">
                              <div className="d-flex">
                                <span
                                  className="pe-3"
                                  style={{ fontSize: "20px" }}
                                >
                                  #{inforOrder.orderCode}
                                </span>
                                <div
                                  style={{ borderLeft: "1px solid black" }}
                                ></div>
                                <span
                                  className="ps-3"
                                  style={{
                                    fontSize: "20px",
                                    color: inforOrder.status === "Đặt Hàng Thành Công" ? "rgba(48, 207, 35, 1)" : inforOrder.status === "Đã Hủy" ? "red" : "black"
                                  }}
                                >
                                  {" "}
                                  {inforOrder.status}
                                </span>
                              </div>
                            </td>

                          </tr>

                          <tr>
                            <td className="ps-3 pt-4">
                              <span style={{ fontSize: "20px" }}>
                                Ngày đặt:
                              </span>
                            </td>
                            <td className="pt-4 ps-3">
                              <span style={{ fontSize: "20px" }}>
                                {inforOrder.date}
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="ps-3 pt-4">
                              <span style={{ fontSize: "20px" }}>
                                Trạng thái giao hàng:
                              </span>
                            </td>
                            <td className="pt-4 ps-3">
                              <span style={{ fontSize: "20px" }}>
                                {inforOrder.deliveryStatus || 'Đang chờ xác nhận'}
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td className="ps-3 pt-4 pb-4">
                              <span style={{ fontSize: "20px" }}>
                                Hình thức thanh toán:
                              </span>
                            </td>
                            <td className="pt-4 ps-3 pb-4">
                              <span style={{ fontSize: "20px" }}>{inforOrder.paymentMethod}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Note --> */}
            <div className="col-md-12">
              <div className="pb-4 w-105">
                <form action="#">
                  <textarea
                    className="w-100 background form-control-lg"
                    readOnly
                  >
                    Hàng dễ vỡ, đắt tiền, gọi điện rồi xuống nhận hàng
                  </textarea>
                </form>
              </div>
            </div>

            {/* <!-- Product Detail --> */}
            <div className="col-md-12 w-105">
              <table className="w-100">
                <tbody>
                  <tr>
                    <td className="FieldALl w-100 pe-5" colSpan="5">
                      <div className="w-75">
                        <div className="w-25 borderAll-ProductDetailUser">
                          <div className="text-center">
                            <span className="fs-5 py-2 w-100  Black">
                              Chi tiết sản phẩm
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {listProduct.map((p) => (
                  <tr key={p.id}>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={p.image} alt="Product" style={{height: '60px', width: '60px'}}/>
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>{p.productName}</span>
                      </div>

                      <div>
                        <span>x{p.quantity}</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">{p.price ? p.price.toLocaleString('de-DE') : 'N/A'} đ</span>
                      </div>
                    </td>
                  </tr>
                  ))}
                  {/* <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-10 pt-3 pb-3">
                      <div id="ProductImg">
                        <img src={Abott} alt="Product" />
                      </div>
                    </td>

                    <td className="pb-3" colSpan="3">
                      <div>
                        <span>Sữa Abbott Grow 4 1,7kg (trên 2 tuổi)</span>
                      </div>

                      <div>
                        <span>x1</span>
                      </div>
                    </td>

                    <td className="w-20 pb-3">
                      <div className="ms-4 ps-3">
                        <span className="ps-3">575.000 đ</span>
                      </div>
                    </td>
                  </tr> */}

                  <tr>
                    <td className="pt-2" colSpan="5">
                      <div
                        className="w-100 h-100 d-flex justify-content-center"
                        style={{ borderBottom: "1px solid #CCCCCC" }}
                      ></div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-100 mt-4">
                <tbody>

                  {inforOrder.amountDiscount > 0 && (
                    <tr>
                      <td className="w-75 pt-3 posButton-SummaryOrder">
                        <span className="pe-3">Giảm giá:</span>
                      </td>

                      <td className="w-20 pt-3 me-4 posButton-SummaryOrder">
                        <div className="pe-5">
                          <span className="pe-4">-{inforOrder.amountDiscount.toLocaleString('de-DE')} đ</span>
                        </div>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className="w-75 pt-3 posButton-SummaryOrder">
                      <span className="pe-3">Tổng tiền:</span>
                    </td>

                    <td className="w-20 pt-3 posButton-SummaryOrder">
                      <div className="pe-5">
                        <span className="pe-4">{inforOrder.totalPrice} đ</span>
                      </div>
                    </td>
                  </tr>
                  {checkCancel == true && (
                  <tr>
                    <td></td>
                    <td className="pt-4">
                      <div className="w-100 pe-5">
                        <button
                          className="w-100 Borderall-CancelOrder px-4 py-1 text-center text-white"
                          data-bs-toggle="modal" data-bs-target="#cancel-order" onClick={refreshFieldCancelOrder}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
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
}
export default UserOrderDetail;
