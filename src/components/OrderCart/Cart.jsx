import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import similac from "../../assets/img/similac.png";
import "../../assets/css/stylecart.css";
import cartImg from "../../assets/img/cart.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toLocaleString('de-DE');
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(p => p.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const handleDecrease = async (productId) => {
    const product = cart.find(p => p.id === productId);
    if (product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleIncrease = async (productId) => {
    const product = cart.find(p => p.id === productId);
    const productData = await fetchProductById(productId);

    if (productData) {
      const maxQuantity = productData.quantity;
      const totalQuantityInCart = getCartTotalQuantity(productId);

      if (totalQuantityInCart < maxQuantity) {
        updateQuantity(productId, product.quantity + 1);
      } else {
        toast.error(`Số lượng ${product.productName} đã đạt giới hạn tồn kho`);
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const productData = await fetchProductById(productId);

    if (productData) {
      const maxQuantity = productData.quantity;
      //const totalQuantityInCart = getCartTotalQuantity(productId);

      if (newQuantity <= maxQuantity) {
        const updatedCart = cart.map(product =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        toast.error(`Số lượng ${productData.productName} đã đạt giới hạn tồn kho`);
      }
    }
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/product/${productId}`);
      if (!response.ok) {
      }
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const getCartTotalQuantity = (productId) => {
    const productInCart = cart.find(p => p.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  //NAVIGATE CHECKOUT
  const navigateCheckout = () => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (userRole == 'STAFF' || userRole == 'ADMIN') {
      return;
    }
    if (userId) {
      navigate('/checkout');
    }
    else {
      toast.error('Vui lòng đăng nhập trước khi thanh toán');
    }
  }

  return (
    <>
    <ToastContainer 
      position="bottom-left"
    />
      <section>
        <div>
          <div className="banner container-fluid pb-5 mb-5">
            <h1
              className="pt-5"
              style={{
                color: "#3C75A6",
                fontWeight: "600",
              }}
            >
              Giỏ Hàng
            </h1>
            <p className="myhome pt-2">
              <Link to="/">Trang chủ</Link>
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-angles-right"
                  className="px-4"
                />
              </span>
              <Link to="/cart">Giỏ hàng</Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid my-5 roboto">
          <div className="container my-5 py-5">
            <div className="row py-5">
              <div className="col-md-12">
                <form action="#">
                  {cart.length > 0 ? (
                  <table className="w-100">
                    <tbody>
                      <tr className="a">
                        <td className="text-center Dongle p-3" style={{width: '15%'}}>Sản Phẩm</td>
                        <td className="text-center p-3" style={{width: '20%'}}></td>
                        <td className="text-center Dongle p-3" style={{width: '15%'}}>Đơn Giá</td>
                        <td className="text-center Dongle p-3" style={{width: '20%'}}>Số Lượng</td>
                        <td className="text-center Dongle p-3" style={{width: '15%'}}>Số Tiền</td>
                        <td className="text-center Dongle p-3" style={{width: '15%'}}>Thao Tác</td>
                      </tr>
                      {cart.map((p) => (
                      <tr key={p.id} className="py-table">
                        <td className="text-center p-1">
                          <img src={p.image} alt="" className="w-50" />
                        </td>
                        <td className="textbody">
                          <span className="mb-0" style={{fontSize: '21px'}}><ProductName title={p.productName} maxLength={20} /></span>
                        </td>
                        <td className="text-center textbody ">
                          <p className="mb-0" style={{fontSize: '20px'}}>VND {(p.price).toLocaleString('de-DE')}</p>
                        </td>
                        <td className="">
                          <div className="btn-quantity w-100 d-flex justify-content-center">
                            <div
                              className="rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED", cursor: 'pointer' }}
                              id="quantity-down"
                              onClick={() => handleDecrease(p.id)}
                            >
                              <span>-</span>
                            </div>
                            <div className="button w-15">
                              <input
                                type="number"
                                className="text-center w-100 p-2"
                                id="quantity1"
                                style={{
                                  border: "none",
                                  background: "#F7F7F7",
                                }}
                                value={p.quantity}
                                onChange={(e) => {
                                  const value = e.target.value.trim(); 
                                  const newValue = value === "" ? 0 : parseInt(value);
                                  updateQuantity(p.id, newValue);
                                }}
                                onBlur={(e) => {
                                  const value = e.target.value.trim();
                                  if (value === "" || parseInt(value) <= 0) {
                                    updateQuantity(p.id, 1);
                                  }
                                }}min="1"
                              ></input>
                            </div>
                            <div
                              className=" rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED", cursor: 'pointer' }}
                              id="quantity-up"
                              onClick={() => handleIncrease(p.id)}
                            >
                              <span>+</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center textbody">
                          <p className="mb-0" style={{fontSize: '20px'}}>VND {(p.price * p.quantity).toLocaleString('de-DE')}</p>
                        </td>
                        <td className="text-center ">
                          <div className="trash" style={{color: 'red'}}>
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={() => removeFromCart(p.id)}/>
                          </div>
                        </td>
                      </tr>
                      ))}
                      {/* <tr className="py-table">
                        <td className="text-center p-1">
                          <img src={similac} alt="" />
                        </td>
                        <td className="textbody">
                          <p className="mb-0">Sữa Abbott Grow 4 1,7kg...</p>
                        </td>
                        <td className="text-center textbody ">
                          <p className="mb-0">VND 299.000</p>
                        </td>
                        <td className="">
                          <div className="btn-quantity w-100 d-flex justify-content-center">
                            <div
                              className="rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED" }}
                              id="quantity-down"
                              onclick="sub('quantity2')"
                            >
                              <span>-</span>
                            </div>
                            <div className="button w-15">
                              <input
                                type="number"
                                className="text-center w-100 p-2"
                                id="quantity2"
                                style={{
                                  border: "none",
                                  background: "#F7F7F7",
                                }}
                                value="5"
                              ></input>
                            </div>
                            <div
                              className="rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED" }}
                              id="quantity-up"
                              onclick="add('quantity2')"
                            >
                              <span>+</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center textbody">
                          <p className="mb-0">VND 1.495.000</p>
                        </td>
                        <td className="text-center ">
                          <div className="trash">
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                          </div>
                        </td>
                      </tr>
                      <tr className="py-table">
                        <td className="text-center p-1">
                          <img src={similac} alt="" />
                        </td>
                        <td className="textbody">
                          <p className="mb-0">Sữa Abbott Grow 4 1,7kg...</p>
                        </td>
                        <td className="text-center textbody ">
                          <p className="mb-0">VND 299.000</p>
                        </td>
                        <td className="">
                          <div className="btn-quantity w-100 d-flex justify-content-center">
                            <div
                              className="rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED" }}
                              id="quantity-down"
                              onclick="sub('quantity3')"
                            >
                              <span>-</span>
                            </div>
                            <div className="button w-15">
                              <input
                                type="number"
                                className="text-center w-100 p-2"
                                id="quantity3"
                                style={{
                                  border: "none",
                                  background: "#F7F7F7",
                                }}
                                value="5"
                              ></input>
                            </div>
                            <div
                              className="rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED" }}
                              id="quantity-up"
                              onclick="add('quantity3')"
                            >
                              <span>+</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center textbody">
                          <p className="mb-0">VND 1.495.000</p>
                        </td>
                        <td className="text-center ">
                          <div className="trash">
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                          </div>
                        </td>
                      </tr> */}
                      <tr className="a">
                        <td className="text-center">
                          <span className="ps-3 fw-bold" style={{fontSize: '22px'}}>Tổng tiền: </span>
                        </td>
                        <td className="p-3 ">
                          <p className="mb-0 fw-bold" style={{fontSize: '22px'}}>VND {calculateTotal()}</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-center  ">
                          <div className="">
                            <div
                              className="textbody checkout-input py-1"
                              type="submit"
                              value=""
                            >
                              <span style={{fontSize: '20px'}} onClick={navigateCheckout}>Thanh toán</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                    <img src={cartImg} alt="" className="w-25" />
                    <span
                      className="text-center fs-4 pt-3"
                      style={{
                        fontFamily: "sans-serif",
                      }}
                    >
                      Hiện chưa có sản phẩm nào trong giỏ hàng
                    </span>
                  </div>
                </div>
              </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Cart;
