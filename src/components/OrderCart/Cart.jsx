import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import similac from "../../assets/img/similac.png";
import "../../assets/css/stylecart.css";
import cartImg from "../../assets/img/cart.jpg";

const Cart = () => {
  const [cart, setCart] = useState([]);

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
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const handleDecrease = (productId) => {
    const product = cart.find(product => product.id === productId);
    if (product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  const handleIncrease = (productId) => {
    const product = cart.find(product => product.id === productId);
    updateQuantity(productId, product.quantity + 1);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(product => 
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
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
              Shopping Cart
            </h1>
            <p className="myhome pt-2">
              <Link to="/">Home</Link>
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-angles-right"
                  className="px-4"
                />
              </span>
              <Link to="/cart">Cart</Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid my-5 roboto">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form action="#">
                  {cart.length > 0 ? (
                  <table className="w-100">
                    <tbody>
                      <tr className="a">
                        <td className="text-center Dongle p-3">Product</td>
                        <td className="text-center p-3"></td>
                        <td className="text-center Dongle p-3">Price</td>
                        <td className="text-center Dongle p-3">Quatity</td>
                        <td className="text-center Dongle p-3">Total</td>
                        <td className="text-center Dongle p-3">Remove</td>
                      </tr>
                      {cart.map((p) => (
                      <tr key={p.id} className="py-table">
                        <td className="text-center p-1">
                          <img src={p.image} alt="" style={{height: '60px', width: '60px'}} />
                        </td>
                        <td className="textbody">
                          <p className="mb-0"><ProductName title={p.productName} maxLength={20} /></p>
                        </td>
                        <td className="text-center textbody ">
                          <p className="mb-0">VND {p.price}</p>
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
                                  const newValue = value === "" ? 1 : parseInt(value);
                                  updateQuantity(p.id, newValue);
                                }}
                                min="1"
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
                          <p className="mb-0">VND {(p.price * p.quantity).toLocaleString('de-DE')}</p>
                        </td>
                        <td className="text-center ">
                          <div className="trash">
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
                        <td className="text-center Dongle">
                          <span className="ps-3">Tổng tiền: </span>
                        </td>
                        <td className="Dongle p-3 ">
                          <p className="mb-0">VND {calculateTotal()}</p>
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
                              <span>Thanh toán</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  ) : (
                    <div className="col-md-12 text-center">
          
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
