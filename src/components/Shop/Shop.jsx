import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleshop.css";
import product from "../../assets/img/product.png";

export default function Shop() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 banner py-5 text-center">
            <h1
              className="text-center"
              style={{
                color: "#3C75A6",
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              Shop
            </h1>
            <div className="d-inline-block">
              <div className="d-flex align-content-between">
                <p className="px-2">
                  <a
                    href="#"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Home
                  </a>
                </p>
                <p className="px-2">
                  <FontAwesomeIcon
                    icon="fa-solid fa-angles-right"
                    style={{ color: "#3c75a6" }}
                  />
                </p>
                <p className="px-2">
                  <a
                    href="#"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Shop
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid body-content">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-4">
              <div
                className="content px-4 py-3"
                style={{ backgroundColor: "#FAFAFA", borderRadius: "15px" }}
              >
                <span style={{ color: "#67686C" }} className="fw-bold">
                  Tìm kiếm
                </span>
                <input
                  type="text"
                  className="w-100 ps-2 py-1 mt-1"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "#D9D9D9",
                    color: "black",
                    border: "none",
                  }}
                />
              </div>
            </div>
            <div
              className="col-md-8"
              style={{ backgroundColor: "#FAFAFA", borderRadius: "15px" }}
            >
              <div className="row h-100">
                <div className="col-md-8 align-content-center">
                  <div className="d-flex justify-content-start">
                    <a
                      href=""
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <div className="px-3 py-2 ms-3 item-filter-top">
                        <span>Hàng Mới</span>
                      </div>
                    </a>
                    <a
                      href=""
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <div className="px-3 py-2 ms-3 item-filter-top item-filter-top-active">
                        <span>Giá Cao - Thấp</span>
                      </div>
                    </a>
                    <a
                      href=""
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <div className="px-3 py-2 ms-3 item-filter-top">
                        <span>Giá Thấp - Cao</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 align-content-center">
                  <div className="fs-5 d-flex justify-content-end">
                    <a
                      className="px-3 inconCursor"
                      href="#"
                      style={{ color: "#3c75a6" }}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-chevron-left"
                        className="opacity-50"
                      />
                    </a>
                    <span style={{ fontFamily: "Poppins" }}>Trang 1</span>
                    <a className="px-3" href="#" style={{ color: "#3c75a6" }}>
                      <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-2">
              <div className="w-100 d-flex justify-content-center item-filter-left py-4 mb-4 scroll-filter-left">
                <table className="w-75">
                  <tr>
                    <td
                      colSpan="2"
                      className="pb-3 fs-5"
                      style={{ color: "#67686C" }}
                    >
                      <span>Loại sữa</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td className="w-85">Sữa bột</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Sữa tươi</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Sữa bầu</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Sữa chua</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Sữa hạt</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Sữa lúa mạch</td>
                  </tr>
                </table>
              </div>
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-5">
                <table className="w-75">
                  <tr>
                    <td
                      colSpan="2"
                      className="pb-3 fs-5"
                      style={{ color: "#67686C" }}
                    >
                      <span>Thương hiệu</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td className="w-85">Meji</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Ensure</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Kids Boost</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Abbott Grow</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Vinamilk</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Similac</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Khác</td>
                  </tr>
                </table>
              </div>
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-5">
                <table className="w-75">
                  <tr>
                    <td
                      colSpan="2"
                      className="pb-3 fs-5"
                      style={{ color: "#67686C" }}
                    >
                      <span>Theo tuổi</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td className="w-85">Dưới 6 tháng</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>6 - 12 tháng</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>1 - 2 tuổi</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>2 - 6 tuổi</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Từ 6 tuổi</td>
                  </tr>
                </table>
              </div>
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-4">
                <table className="w-75">
                  <tr>
                    <td
                      colSpan="2"
                      className="pb-3 fs-5"
                      style={{ color: "#67686C" }}
                    >
                      <span>Xuất xứ</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td className="w-85">Việt Nam</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Châu Âu</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Mỹ</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Nhật</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Úc</td>
                  </tr>
                  <tr>
                    <td className="w-15 py-1">
                      <input type="checkbox" />
                    </td>
                    <td>Khác</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="Roboto" style={{ fontSize: "1.2em" }}>
                        Sữa bầu Friso Mum Gold 900g hương cam
                      </span>
                      <div className="rank-product mt-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="mt-2 fs-5">
                        <span
                          className="Opensans"
                          style={{ fontWeight: "600" }}
                        >
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
