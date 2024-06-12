import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import similac from "../../assets/img/similac.png";
import "../../assets/css/stylecart.css";

export default function Cart() {
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
        <div className="container-fluid my-xl-5 roboto">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form action="#">
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
                              onclick="sub('quantity1')"
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
                                value="5"
                              ></input>
                            </div>
                            <div
                              className=" rounded-0 w-10 text-center p-2"
                              style={{ backgroundColor: "#EDEDED" }}
                              id="quantity-up"
                              onclick="add('quantity1')"
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
                      </tr>
                      <tr className="a">
                        <td className="text-center Dongle">
                          <span className="ps-3">Tổng tiền: </span>
                        </td>
                        <td className="Dongle p-3 ">
                          <p className="mb-0">VND 4.603.000</p>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

{
  /* 

export default function Cart() {
  const [quantities, setQuantities] = useState([1, 1, 1]);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;

    console.log(newQuantities);
    setQuantities(newQuantities);
  };

  const increaseQuantity = (index) => {
    handleQuantityChange(index, quantities[index] + 1);
  };

  const decreaseQuantity = (index) => {
    if (quantities[index] > 1) {
      handleQuantityChange(index, quantities[index] - 1);
    }
  };

  return (
    <>
      <div>
        <div classNameName="banner my-1">
          <img src={Banner} alt="Banner" />
          <div classNameName="title-page">
            <div classNameName="title">
              <h1>Shopping Cart</h1>
            </div>
            <div classNameName="navigation">
              <Link to="/">Home</Link>
              <span classNameName="separator">
                <FontAwesomeIcon icon={faAnglesRight} classNameName="px-4" />
              </span>
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </div>

        <div classNameName="list-cart table-responsive">
          <table classNameName="table table-borderless">
            <thead>
              <tr>
                <th classNameName="col-1 text-center align-middle">Product</th>
                <th classNameName="col-3 text-center align-middle"></th>
                <th classNameName="col-2 text-center align-middle">Price</th>
                <th classNameName="col-1 text-center align-middle">Quantity</th>
                <th classNameName="col-2 text-center align-middle">Total</th>
                <th classNameName="col-1 text-center align-middle">Remove</th>
              </tr>
            </thead>
            <tbody>
              {quantities.map((quantity, index) => (
                <tr key={index}>
                  <td classNameName="text-center align-middle">
                    <img src={similac} alt="Similac" />
                  </td>
                  <td classNameName="text-center align-middle">Sữa Abbott Grow...</td>
                  <td classNameName="text-center align-middle">VND 299.000</td>
                  <td classNameName="text-center align-middle">
                    <div classNameName="d-flex justify-content-center align-items-center">
                      <button classNameName="w-25" onClick={() => decreaseQuantity(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          classNameName="size-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        classNameName="text-center"
                        style={{ width: 30 }}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                      />
                      <button classNameName="w-25" onClick={() => increaseQuantity(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          classNameName="size-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td classNameName="text-center align-middle">VND {quantity * 299000}</td>
                  <td classNameName="text-center align-middle">
                    <Link to="#" classNameName="text-black">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="4">Total payment: VND {quantities.reduce((total, quantity) => total + quantity * 299000, 0)}</th>
                <th></th>
                <th classNameName="text-center align-middle">
                  <button
                    type="button"
                    classNameName="btn btn-danger btn-lg text-center align-middle w-100"
                  >
                    Checkout
                  </button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
} */
}
