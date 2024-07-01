import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import similac from "../../assets/img/similac.png";
import vnpay from "../../assets/img/vnpay.png";
import icon_payondelivery from "../../assets/img/icon_payondelivery.png";
import "../../assets/css/stylecheckout.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [selectedDiscountPoints, setSelectedDiscountPoints] = useState(0);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [mess, setMess] = useState([]);
  const [responseOrder, setResponseOrder] = useState({});
  const [addressList, setAddressList] = useState([{}]);
  const [addressName, setAddressName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const ProductName = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return (
      <>
        {truncateTitle(title, maxLength)}
      </>
    );
  };

  const calculateTotalCart = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  //FETCH INFO USER
  const fetchUserById = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
      );
      const responseAddress = await fetch(`https://littlejoyapi.azurewebsites.net/api/address/user-id/${userId}`);
      
      const dataUser = await response.json();
      if (response.ok) {
        setUser(dataUser);
        setPhoneNumber(dataUser.phoneNumber)
      }
      const dataAddress = await responseAddress.json();
      if(responseAddress.ok) {
        setAddressList(dataAddress);
      }

      // const mainAddr = dataAddress.find(address => address.isMainAddress === true);
      //     if (mainAddr) {
      //       setAddress(mainAddr.id);
      //     }
      
    } catch (error) {
      console.error("Lỗi fetch user by id", error);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  //CHECK POINTS
  const discounts = [
    { points: 1000, value: 10000, label: '10.000 VNĐ (1000 điểm)' },
    { points: 5000, value: 50000, label: '50.000 VNĐ (5000 điểm)' },
    { points: 10000, value: 100000, label: '100.000 VNĐ (10000 điểm)' },
    { points: 50000, value: 1000000, label: '1.000.000 VNĐ (50000 điểm)' },
    { points: 100000, value: 5000000, label: '5.000.000 VNĐ (100000 điểm)' },
  ];

  const shippingCost = 30000;
  const totalCartCost = calculateTotalCart();
  const isOptionEnabled = (pointsRequired, discountValue) => {
    return user.points >= pointsRequired && (totalCartCost + shippingCost) >= discountValue;
  };

  //TOTAL COST OF ORDER
  const handleDiscountChange = (event) => {
    const selectedPoints = parseInt(event.target.value, 10);
    const selectedDiscountValue = discounts.find(discount => discount.points === selectedPoints)?.value || 0;
    
    if ((totalCartCost + shippingCost) >= selectedDiscountValue) {
      setSelectedDiscountPoints(selectedPoints);
    } else {
      toast.error('Giảm giá đang vượt quá tổng giá trị đơn hàng');
    }
  };

  const selectedDiscount = discounts.find(discount => discount.points === selectedDiscountPoints)?.value || 0;
  const totalCost = calculateTotalCart() + shippingCost - selectedDiscount;

  //HANDLE PAYMENT
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

  const handleCreateOrder = async () => {
    if (!termsAccepted) {
      toast.error('Bạn phải chấp nhận các điều khoản trước khi tiếp tục.');
      return;
    }

    if (Object.values(user).length === 0) {
      toast.error('Vui lòng đăng nhập trước khi thanh toán');
      return;
    }

    if (!(phoneNumber && /^0\d{9}$/.test(phoneNumber))) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }
    if (
      address === "" ||
      phoneNumber === "" ||
      paymentMethod === 0
    ) {
      notify();
      return;
    }

    const productOrders = cart.map(product => ({
      id: product.id,
      quantity: product.quantity,
    }));

    const newOrder = {
      userId: localStorage.getItem('userId'),
      totalPrice: totalCost,
      address: address,
      note: note,
      phoneNumber: phoneNumber,
      amountDiscount: selectedDiscount,
      paymentMethod: paymentMethod,
      productOrders: productOrders
    };
    try {
      const responseCheckProduct = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/product/check-product-can-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productOrders),
        }
      );
      const resultCheck = await responseCheckProduct.json();
      
      if (responseCheckProduct.ok) {
        setMess(resultCheck);
        if (resultCheck.length == 0) {
          if(paymentMethod === 1) {
            const responseCreateOrder = await fetch(
              "https://littlejoyapi.azurewebsites.net/api/order/create-order",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
              }
            );
            const data = await responseCreateOrder.json();
            if(responseCreateOrder.ok) {
              setResponseOrder(data);
              localStorage.removeItem('cart');
              localStorage.setItem('orderCode', data.orderCode);
              navigate(`/paymentpending`);
            }
          }
          if(paymentMethod === 2) {
            const responseCreateOrder = await fetch(
              "https://littlejoyapi.azurewebsites.net/api/order/create-order",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
              }
            );
            const data = await responseCreateOrder.json();
            if(responseCreateOrder.ok) {
              setResponseOrder(data);
              localStorage.removeItem('cart');
              window.location.href = data.urlPayment;
            }
          }

          
        }
        else {
          toast.error('Đặt hàng thất bại');
        }
      } 
      
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

    //ADD NEW ADDRESS
    const handleAddAddress = async () => {
      if (
          addressName.trim() === ""
        ) {
          notify();
          return;
        }
  
      const newAddress = {
        userId: localStorage.getItem('userId'),
        address1: addressName
      };
  
      try {
        const response = await fetch('https://littlejoyapi.azurewebsites.net/api/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAddress),
        });
        
        if (response.ok) {
          toast.success('Địa chỉ mới được tạo thành công!');
          fetchUserById();
          setAddressName('');
        } else {
          toast.error('Thêm địa chỉ mới thất bại');
        }
        const result = await response.json();
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };
  
    const refreshFiledAddAddress = () => {
      setAddressName('');
    }

  


  return (
    <>
    <ToastContainer />
      <section>
        <div className="banner container-fluid mb-5 pb-5">
          <h1 className="pt-5">Checkout</h1>
          <p className="myhome">
            <Link to="/">Home</Link>
            <span>
              <FontAwesomeIcon
                icon="fa-solid fa-angles-right"
                className="px-4"
              />
            </span>
            <Link to="/cart">Cart</Link>
            <span>
              <FontAwesomeIcon
                icon="fa-solid fa-angles-right"
                className="px-4"
              />
            </span>
            <Link to="/checkout">Checkout</Link>
          </p>
        </div>
      </section>

      <div className="background-container">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="w-100">
                <div className="profile-info w-100 d-flex justify-content-center">
                  <table className="w-75">
                    <tbody>
                      <tr>
                        <td className="py-2">
                          <span
                            className="Vidaloka"
                            style={{ fontSize: "25px" }}
                          >
                            Thông tin giao hàng
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="Fullname"
                            id=""
                            placeholder="Fullname"
                            value={user.fullname}
                            className="w-100 p-1 ps-2 nochange"
                            readOnly
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="Email"
                            id=""
                            placeholder="Email"
                            value={user.email}
                            className="w-100 p-1 ps-2 nochange"
                            readOnly
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="phoneNumber"
                            id=""
                            placeholder="Mobile Phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-100 p-1 ps-2"
                            required
                          />
                        </td>
                      </tr>

                      {/* <tr>
                        <td className="py-1">
                          <input
                            type="text"
                            name="address"
                            id=""
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-75 p-1 ps-2"
                            required
                          />
                        </td>
                      </tr> */}
                      <tr>
                        <td className="py-1 ">
                              <select
                                name=""
                                id=""
                                className="p-1 w-75"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              >
                                <option value="" disabled>
                                  Address
                                </option>
                                {addressList.map((a) => (
                                  <option key={a.id} value={a.id}>
                                    {a.address1}
                                  </option>
                                ))}
                              </select>

                          <div className="w-25 d-inline-block" data-bs-toggle="modal" data-bs-target="#add-address">
                            <input
                              id="ButtonAdd"
                              type="submit"
                              value="Thêm địa chỉ mới"
                              onClick={refreshFiledAddAddress}
                              className="px-4 py-1"
                            />
                          </div>
                        
                        </td>
                        
                      </tr>

                      <tr>
                        <td className="py-1">
                          <textarea
                            name="note"
                            id=""
                            cols="30"
                            rows="3"
                            placeholder="Note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={{ resize: "none" }}
                            className="w-100 p-1 ps-2"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="product-info w-100 mt-3">
                  <table className="w-100">
                    <tbody>
                      <tr style={{ borderBottom: "1px solid black" }}>
                        <td className="w-20 py-1 text-center fw-bold">
                          <span>Sản Phẩm</span>
                        </td>
                        <td className="py-1">
                          <span></span>
                        </td>
                        <td className="py-1 text-center fw-bold">
                          <span>Giá</span>
                        </td>
                        <td className="py-1 text-center fw-bold">
                          <span>Số lượng</span>
                        </td>
                        <td className="py-1 text-center fw-bold">
                          <span>Tổng cộng</span>
                        </td>
                      </tr>
                      {cart.map((p) => (
                      <tr>
                        <td className="w-5 py-1">
                          <div className="item w-100 text-center">
                            <img
                              src={p.image}
                              alt="product-img"
                              className="w-50"
                            />
                          </div>
                        </td>
                        <td className="py-1 text-center">
                          <span><ProductName title={p.productName} maxLength={20} /></span>
                        </td>
                        <td className="py-1 text-center">
                          <span>{(p.price).toLocaleString('de-DE')} VND</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>{p.quantity}</span>
                        </td>
                        <td className="py-1 text-center">
                          <span>{(p.price * p.quantity).toLocaleString('de-DE')} VND</span>
                        </td>
                        <td className="py-1 text-center w-15">
                          <span
                            className="text-center fw-bold"
                            style={{ color: "#FF0000" }}
                          >
                            {mess.find((c) => c.id === p.id)?.message || "" }
                          </span>
                        </td>
                      </tr>
                        ))}

                      <tr style={{ borderTop: "1px solid black" }}>
                        <td className="w-20 py-3">
                          <div
                            className="p-3 text-center"
                            style={{
                              backgroundColor: "rgb(245, 245, 245)",
                              borderRadius: "10px",
                            }}
                          >
                            <Link
                              to="/cart"
                              style={{
                                textDecoration: "none",
                                color: "#FF0000",
                                fontWeight: "600",
                              }}
                            >
                              Quay về Cart
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="w-100 d-flex justify-content-center">
                <div className="w-80">
                  <table
                    className="w-100"
                    style={{ border: "1px solid black" }}
                  >
                    <tbody>
                      <tr>
                        <td className="pt-3 ps-3 fw-semibold fs-5 w-75">
                          <span>Điểm của bạn: {user.points}</span>
                        </td>
                        <td className="pt-3 ps-3 fw-semibold fs-5 w-25 text-center">
                          <div
                            className="d-inline-block"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <FontAwesomeIcon
                              icon={faCircleQuestion}
                              data-bs-toggle="modal"
                              data-bs-target="#pointsModal"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="p-3">
                          <select
                            name="Discount"
                            id=""
                            className="w-100 py-2 px-2"
                            style={{ borderRadius: "15px" }}
                            value={selectedDiscountPoints}
                            onChange={handleDiscountChange}
                          >
                            <option value="0" selected>
                              Chọn điểm để giảm giá
                            </option>
                            {discounts.map((discount) => (
                              <option 
                                key={discount.points} 
                                value={discount.points} 
                                disabled={!isOptionEnabled(discount.points, discount.value)}
                              >
                                {discount.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-100 mt-5">
                <div className="w-100 d-flex justify-content-center">
                  <div className="w-80 table-money px-4 py-3">
                    <table className="w-100">
                      <tbody>
                        <tr>
                          <td
                            colSpan="2"
                            className="py-2 w-50 fw-semibold fs-5"
                          >
                            <span style={{ fontSize: "25px" }}>
                              Tóm tắt đơn hàng
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 w-50 text-center">
                            <span
                              style={{ color: "#757575" }}
                              className="float-start"
                            >
                              Tổng tiền:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ fontWeight: "600" }}
                            >
                              VND {calculateTotalCart().toLocaleString('de-DE')}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 w-50 text-center">
                            <span
                              style={{ color: "#757575" }}
                              className="float-start"
                            >
                              Shipping:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ fontWeight: "600" }}
                            >
                              VND {shippingCost.toLocaleString('de-DE')}
                            </span>
                          </td>
                        </tr>
                        {selectedDiscount > 0 && (
                        <tr>
                          <td className="py-2 w-50 text-center">
                            <span
                              style={{ color: "#757575" }}
                              className="float-start"
                            >
                              Điểm thưởng:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ fontWeight: "600" }}
                            >
                              VND -{selectedDiscount.toLocaleString('de-DE')}
                            </span>
                          </td>
                        </tr>
                      )}
                        <tr style={{ borderTop: "1px solid black" }}>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-start"
                              style={{ fontWeight: "600" }}
                            >
                              Tổng cộng:
                            </span>
                          </td>
                          <td className="py-2 w-50 text-center">
                            <span
                              className="float-end"
                              style={{ color: "#FF0000", fontWeight: "600" }}
                            >
                              VND {totalCost.toLocaleString('de-DE')}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-100 mt-5 d-flex justify-content-center">
                <div className="w-80 px-4 py-3 d-flex flex-column justify-content-center payment-choose">
                  <span
                    className="m-2 fw-semibold fs-5"
                    style={{ fontSize: "25px" }}
                  >
                    Phương thức thanh toán
                  </span>
                  <div className="w-100 d-flex flex-column justify-content-center">
                    <div
                      className="payment w-100 d-flex justify-content-between pe-2"
                      onClick={() => setPaymentMethod(2)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="w-75">
                        <img src={vnpay} alt="" className="w-25" />
                        <span className="ps-2">VNPAY</span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value="2"
                        id="vnpay"
                        className="float-end"
                        required
                      />
                    </div>
                    <div
                      className="mt-3 payment w-100 d-flex justify-content-between pe-2"
                      onClick={() => setPaymentMethod(1)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="w-75">
                        <img src={icon_payondelivery} alt="" className="w-25" />
                        <span className="ps-2">Thanh toán khi nhận hàng</span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value="1"
                        id="cod"
                        className="float-end"
                        required
                      />
                    </div>
                  </div>
                  <div className="terms d-flex justify-content-center mt-3">
                    <input type="checkbox" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}/>
                    <p
                      className="m-0 ps-3"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Tôi đã đọc và chấp nhận các điều khoản
                    </p>
                  </div>
                  <div className="w-100 d-flex justify-content-center mt-3">
                    <input
                      type="submit"
                      value="Payment"
                      onClick={handleCreateOrder}
                      className="w-90 submit-checkout py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="pointsModal"
        tabIndex="-1"
        aria-labelledby="pointsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ fontFamily: "Open Sans" }}>
            <div
              className="modal-header"
              style={{ backgroundColor: "#3C75A6", color: "white" }}
            >
              <h5 className="modal-title" id="pointsModalLabel">
                Points Information
              </h5>
              <button
                type="button"
                className="btn-close btn-outline-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body table-responsive mx-2" style={{backgroundColor: 'white'}}>
              <p>Quy trình tích điểm:</p>
              <div className="mx-4">
                <span>
                  Với <span className="fw-bold">1.000 VND / hóa đơn</span> mua
                  hàng thành công bạn sẽ tích ngay cho mình được{" "}
                  <span className="fw-bold">1 điểm</span> tương ứng.
                </span>
              </div>

              <p>Quá trình đổi điểm:</p>
              <div className="mx-4">
                <span>
                  Khi mua hàng, bạn sẽ được chọn các mốc đổi điểm như sau:
                </span>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Point</th>
                    <th className="text-center">Money Discount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1000</td>
                    <td className="text-center">10.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">5000</td>
                    <td className="text-center">50.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">10000</td>
                    <td className="text-center">100.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">50000</td>
                    <td className="text-center">1.000.000 VND</td>
                  </tr>
                  <tr>
                    <td className="text-center">100000</td>
                    <td className="text-center">5.000.000 VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer border-black">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal add address --> */}
    <div className="modal" id="add-address">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 d-flex justify-content-between" style={{backgroundColor: 'rgba(60, 117, 166, 1)'}}>
                    <h4 className="modal-title inter ms-3" style={{color: 'white'}}>Thêm địa chỉ mới</h4>
                    <div className="btn-close-modal me-3" style={{color: 'white'}} data-bs-dismiss="modal"></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{backgroundColor: 'white'}}>
                <div className="p-2" >
                    <table className="w-100 table-modal" >
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2" style={{color: '#3C75A6'}}>Địa chỉ mới:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={addressName}
                            onChange={(e) => setAddressName(e.target.value)}
                            style={{backgroundColor: 'white', color:'black'}}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end" style={{backgroundColor: 'white'}}>
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal" style={{backgroundColor: 'rgb(60, 117, 166)'}}><span>Hủy</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleAddAddress} type="submit" data-bs-dismiss="modal" value="Lưu" style={{backgroundColor: '#E33539'}} className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  );
}
export default Checkout;
