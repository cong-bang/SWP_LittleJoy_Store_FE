import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleshop.css";
import product from "../../assets/img/product.png";
import { Link } from "react-router-dom";

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
                  <tbody>
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
                        <input type="checkbox" id='suabot' />
                      </td>
                      <td className="w-85"><label htmlFor="suabot">Sữa bột</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suatuoi' />
                      </td>
                      <td><label htmlFor="suatuoi">Sữa tươi</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suabau' />
                      </td>
                      <td><label htmlFor="suabau">Sữa bầu</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suachua' />
                      </td>
                      <td><label htmlFor="suachua">Sữa chua</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suahat' />
                      </td>
                      <td><label htmlFor="suahat">Sữa hạt</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='sualuamach' />
                      </td>
                      <td><label htmlFor="sualuamach">Sữa lúa mạch</label></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-5">
                <table className="w-75">
                  <tbody>
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
                        <input type="checkbox" id='meji' />
                      </td>
                      <td className="w-85"><label htmlFor="meji">Meji</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='ensure' />
                      </td>
                      <td><label htmlFor="ensure">Ensure</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='kidsboost' />
                      </td>
                      <td><label htmlFor="kidsboost">Kids Boost</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='abbottgrow' />
                      </td>
                      <td><label htmlFor="abbottgrow">Abbott Grow</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='vinamilk' />
                      </td>
                      <td><label htmlFor="vinamilk">Vinamilk</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='similac' />
                      </td>
                      <td><label htmlFor="similac">Similac</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='khac' />
                      </td>
                      <td><label htmlFor="khac">Khác</label></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-5">
                <table className="w-75">
                  <tbody>
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
                        <input type="checkbox" id='duoi6thang' />
                      </td>
                      <td className="w-85"><label htmlFor="duoi6thang">Dưới 6 tháng</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='6-12thang' />
                      </td>
                      <td><label htmlFor="6-12thang">6 - 12 tháng</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='1-2tuoi' />
                      </td>
                      <td><label htmlFor="1-2tuoi">1 - 2 tuổi</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id="2-6tuoi" />
                      </td>
                      <td><label htmlFor="2-6tuoi">2 - 6 tuổi</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='tu6tuoi' />
                      </td>
                      <td><label htmlFor="tu6tuoi">Từ 6 tuổi</label></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-4">
                <table className="w-75">
                  <tbody>
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
                        <input type="checkbox" id='vietnam' />
                      </td>
                      <td className="w-85"><label htmlFor="vietnam">Việt Nam</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='chauau' />
                      </td>
                      <td><label htmlFor="chauau">Châu Âu</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='nuocmy' />
                      </td>
                      <td><label htmlFor="nuocmy">Mỹ</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='nhat' />
                      </td>
                      <td><label htmlFor="nhat">Nhật</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id="uc" />
                      </td>
                      <td><label htmlFor="uc">Úc</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='nuockhac' />
                      </td>
                      <td><label htmlFor="nuockhac">Khác</label></td>
                    </tr>
                  </tbody>
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
                  <Link
                    to="/product/1"
                    style={{ textDecoration: "none", color: "black" }}
                  >
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
                  </Link>
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
