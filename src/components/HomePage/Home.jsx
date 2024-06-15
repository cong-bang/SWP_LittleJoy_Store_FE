import React, { useState, useEffect } from "react";
import logoshop from "../../assets/img/logoshop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import "../../assets/css/stylehome.css";
import product from "../../assets/img/product.png";
import abbottgrow from "../../assets/img/abbottgrow.png";
import ensure from "../../assets/img/ensure.png";
import meji from "../../assets/img/meji.png";
import similaclogo from "../../assets/img/similaclogo.png";
import vinamilk from "../../assets/img/vinamilk.png";
import kidboost from "../../assets/img/kidboost.png";
import avatar1 from "../../assets/img/avatar1.png";
import blog1 from "../../assets/img/blog1.png";
import blog2 from "../../assets/img/blog2.png";
import blog3 from "../../assets/img/blog3.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const responseBlogRelated = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/blog/related`
        );
        const dataRelatedBlog = await responseBlogRelated.json();
        if (dataRelatedBlog.httpCode != 404) {
          const updatedData = dataRelatedBlog.map((blog) => {
            const dateParts = blog.date.split("T")[0].split("-");
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
            return {
              ...blog,
              banner:
                blog.banner == null || blog.banner === "" ? no_found : blog.banner,
              date: formattedDate,
            };
          });
          console.log(dataRelatedBlog);
          setRelatedBlogs(updatedData);
        }

      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const BlogTitle = ({ title, maxLength }) => {
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


  return (
    <>
      <div className="banner container-fluid py-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <table>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <p className="text-center banner-title fs-1 roboto">
                      Little Joy Store
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="text-center banner-subtitle fs-4 A7DCFE">
                      Sự lựa chọn tốt nhất cho mẹ và bé
                    </p>
                  </td>
                </tr>
                <tr className="">
                  <td className="width-btn-banner">
                    <div className="d-flex justify-content-center">
                      <div className="btn-banner text-center w-75">
                        <a className=" text-white px-4 py-1" href="">
                          MUA NGAY
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="width-btn-banner">
                    <div className="d-flex justify-content-center">
                      <div className="btn-banner text-center w-75">
                        <a
                          className=" text-white px-4 py-1"
                          href="#bestseller"
                        >
                          MỚI RA MẮT
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container-fluid body-home pt-5">
        <div className="container pt-5 pb-5">
          <div className="row pt-lg-5">
            <div className="col-md-12 text-center">
              <p className="fs-1 title-arrival roboto">Sản Phẩm Mới</p>
              <span
                className="d-inline-block w-50 text-center roboto"
                style={{ color: "#103A71", fontSize: "1.1em" }}
              >
                Hãy khám phá những loại sữa mới nhất và tốt nhất từ chúng tôi.
                Các sản phẩm của chúng tôi ưu tiên sức khỏe cho cả mẹ và bé
              </span>
            </div>
            <div className="col-md-12 d-flex justify-content-between mt-5">
              <a
                href=""
                className="w-18 d-inline-block"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="w-100 text-center px-2 py-3 arrival-item roboto">
                  <span>Sữa cho mẹ bầu</span>
                </div>
              </a>
              <a
                href=""
                className="w-18 d-inline-block"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="w-100 text-center px-2 py-3 arrival-item arrival-active roboto">
                  <span>Sữa bột cao cấp</span>
                </div>
              </a>
              <a
                href=""
                className="w-18 d-inline-block"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="w-100 text-center px-2 py-3 arrival-item roboto">
                  <span>Sữa Mỹ</span>
                </div>
              </a>
              <a
                href=""
                className="w-18 d-inline-block"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="w-100 text-center px-2 py-3 arrival-item roboto">
                  <span>Sữa Nhật</span>
                </div>
              </a>
              <a
                href=""
                className="w-18 d-inline-block"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="w-100 text-center px-2 py-3 arrival-item roboto">
                  <span>Châu Âu</span>
                </div>
              </a>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle roboto"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <a href="" style={{ textDecoration: "none", color: "black" }}>
                    <div className="product-content mt-3 px-3 py-2">
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 p-3 mt-4">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={product}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
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
                      <span className="roboto" style={{ fontSize: "1.2em" }}>
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
                        <span className="roboto" style={{ fontWeight: 600 }}>
                          VND 249.000
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-3">
                  <a href="" style={{ textDecoration: "none", color: "white" }}>
                    <div
                      className="px-5 py-2 d-inline-block"
                      style={{
                        backgroundColor: "#016AAD",
                        borderRadius: "15px",
                      }}
                    >
                      <span className="roboto">Xem thêm</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 text-center pt-5">
              <p className="fs-1 title-arrival roboto">Thương Hiệu</p>
            </div>
            <div
              className="col-md-12 d-flex justify-content-evenly p-4"
              style={{
                backgroundColor: "rgba(155, 155, 155, 0.05)",
                borderRadius: "15px",
              }}
            >
              <div className="w-15 overflow-hidden">
                <a href="">
                  <img
                    src={meji}
                    alt=""
                    className="w-100"
                    style={{ height: "6em" }}
                  />
                </a>
              </div>
              <div className="w-15 overflow-hidden">
                <a href="">
                  <img
                    src={ensure}
                    alt=""
                    className="w-100"
                    style={{ height: "6em" }}
                  />
                </a>
              </div>
              <div className="w-15 overflow-hidden">
                <a href="">
                  <img
                    src={kidboost}
                    alt=""
                    className="w-100"
                    style={{ height: "6em" }}
                  />
                </a>
              </div>
              <div className="w-15 overflow-hidden">
                <a href="">
                  <img
                    src={abbottgrow}
                    alt=""
                    className="w-100"
                    style={{ height: "6em" }}
                  />
                </a>
              </div>
              <div className="w-15 overflow-hidden">
                <a href="">
                  <img
                    src={vinamilk}
                    alt=""
                    className="w-100"
                    style={{ height: "6em" }}
                  />
                </a>
              </div>
              <div className="w-15 overflow-hidden">
                <a href="">
                  <img
                    src={similaclogo}
                    alt=""
                    className="w-100"
                    style={{ height: "6em" }}
                  />
                </a>
              </div>
            </div>
            <div
              className="col-md-12 mt-5 mb-5 position-relative p-2"
              style={{
                backgroundColor: "rgba(155, 155, 155, 0.05)",
                borderRadius: "15px",
                height: "15em",
              }}
            >
              <div className="title-brand d-flex justify-content-start fs-3 px-2 pt-3">
                <span className="pe-2 m-0 roboto">Thương hiệu:</span>{" "}
                <span className="fw-bold roboto" style={{ color: "#103A71" }}>
                  Meji
                </span>
              </div>
              <div className="content-brand mt-2 px-2 w-90">
                <span className="fs-6 roboto">
                  Meiji từ lâu được biết đến là một trong những thương hiệu sản
                  xuất sữa bột cho bé lâu đời bậc nhất tại Nhật Bản và châu Á.
                  Được thành lập năm 1917, sau hơn 100 năm hình thành và phát
                  triển, Meiji đã khẳng định được giá trị thương hiệu số 1 với
                  dây chuyền sản xuất hiện đại, cho ra những sản phẩm chất lượng
                  cao nhất. Tất cả sản phẩm Meiji dù ở các thị trường nước ngoài
                  hay thị trường trong nước đều được sản xuất tại cùng một nhà
                  máy ở tỉnh Saitama, Nhật Bản.
                </span>
              </div>
              <a href="#" className="" style={{ textDecoration: "none" }}>
                <div className="xemthem position-absolute w-15 text-center px-3 py-2">
                  <span className="roboto" style={{ color: "white" }}>Xem sản phẩm</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12 text-center">
                <p className="fs-1 title-arrival roboto">
                  Phản Hồi Từ Khách Hàng
                </p>
                <span
                  className="d-inline-block w-50 text-center roboto"
                  style={{ color: "#103A71", fontSize: "1em" }}
                >
                  Hơn 1000 khách hàng tin tưởng và lựa chọn sữa được cung cấp
                  bởi Little Joy Store
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Carousel --> */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 p-3">
                        <div
                          className="content-feedback-main"
                          style={{
                            backgroundColor: "rgba(155, 155, 155, 0.05)",
                            height: "14em",
                          }}
                        >
                          <div className="info-user-feedback py-3 px-2">
                            <table className="w-100">
                              <tbody>
                                <tr>
                                  <td rowSpan="2">
                                    <div className="d-flex justify-content-center align-content-center w-100">
                                      <div className="avatar-user-feedback w-75">
                                        <img
                                          src={avatar1}
                                          alt=""
                                          className="w-100 avatar-user-feedback-img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="w-80 fw-bold roboto">
                                    Nguyễn Thanh Hùng
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="voting-feedback roboto">
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="content-feedback p-3">
                            <span className="roboto">
                              Tôi rất ấn tượng với sự đa dạng của các loại sữa
                              tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu, cửa
                              hàng đều có đủ. Dịch vụ giao hàng cũng rất nhanh
                              chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 p-3">
                        <div
                          className="content-feedback-main"
                          style={{
                            backgroundColor: "rgba(155, 155, 155, 0.05)",
                            height: "14em",
                          }}
                        >
                          <div className="info-user-feedback py-3 px-2">
                            <table className="w-100">
                              <tbody>
                                <tr>
                                  <td rowSpan="2">
                                    <div className="d-flex justify-content-center align-content-center w-100">
                                      <div className="avatar-user-feedback w-75">
                                        <img
                                          src={avatar1}
                                          alt=""
                                          className="w-100 avatar-user-feedback-img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="w-80 fw-bold roboto">
                                    Nguyễn Thanh Hùng
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="voting-feedback roboto">
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="content-feedback p-3 roboto">
                            <span>
                              Tôi rất ấn tượng với sự đa dạng của các loại sữa
                              tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu, cửa
                              hàng đều có đủ. Dịch vụ giao hàng cũng rất nhanh
                              chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 p-3">
                        <div
                          className="content-feedback-main"
                          style={{
                            backgroundColor: "rgba(155, 155, 155, 0.05)",
                            height: "14em",
                          }}
                        >
                          <div className="info-user-feedback py-3 px-2">
                            <table className="w-100">
                              <tbody>
                                <tr>
                                  <td rowSpan="2">
                                    <div className="d-flex justify-content-center align-content-center w-100">
                                      <div className="avatar-user-feedback w-75">
                                        <img
                                          src={avatar1}
                                          alt=""
                                          className="w-100 avatar-user-feedback-img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="w-80 fw-bold roboto">
                                    Nguyễn Thanh Hùng
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="voting-feedback roboto">
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="content-feedback p-3 roboto">
                            <span>
                              Tôi rất ấn tượng với sự đa dạng của các loại sữa
                              tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu, cửa
                              hàng đều có đủ. Dịch vụ giao hàng cũng rất nhanh
                              chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 p-3">
                        <div
                          className="content-feedback-main"
                          style={{
                            backgroundColor: "rgba(155, 155, 155, 0.05)",
                            height: "14em",
                          }}
                        >
                          <div className="info-user-feedback py-3 px-2">
                            <table className="w-100">
                              <tbody>
                                <tr>
                                  <td rowSpan="2">
                                    <div className="d-flex justify-content-center align-content-center w-100">
                                      <div className="avatar-user-feedback w-75">
                                        <img
                                          src={avatar1}
                                          alt=""
                                          className="w-100 avatar-user-feedback-img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="w-80 fw-bold roboto">
                                    Nguyễn Thanh Hùng
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="voting-feedback roboto">
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="content-feedback p-3 roboto">
                            <span>
                              Tôi rất ấn tượng với sự đa dạng của các loại sữa
                              tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu, cửa
                              hàng đều có đủ. Dịch vụ giao hàng cũng rất nhanh
                              chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 p-3">
                        <div
                          className="content-feedback-main"
                          style={{
                            backgroundColor: "rgba(155, 155, 155, 0.05)",
                            height: "14em",
                          }}
                        >
                          <div className="info-user-feedback py-3 px-2">
                            <table className="w-100">
                              <tbody>
                                <tr>
                                  <td rowSpan="2">
                                    <div className="d-flex justify-content-center align-content-center w-100">
                                      <div className="avatar-user-feedback w-75">
                                        <img
                                          src={avatar1}
                                          alt=""
                                          className="w-100 avatar-user-feedback-img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="w-80 fw-bold roboto">
                                    Nguyễn Thanh Hùng
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="voting-feedback roboto">
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="content-feedback p-3 roboto">
                            <span>
                              Tôi rất ấn tượng với sự đa dạng của các loại sữa
                              tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu, cửa
                              hàng đều có đủ. Dịch vụ giao hàng cũng rất nhanh
                              chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 p-3">
                        <div
                          className="content-feedback-main"
                          style={{
                            backgroundColor: "rgba(155, 155, 155, 0.05)",
                            height: "14em",
                          }}
                        >
                          <div className="info-user-feedback py-3 px-2">
                            <table className="w-100">
                              <tbody>
                                <tr>
                                  <td rowSpan="2">
                                    <div className="d-flex justify-content-center align-content-center w-100">
                                      <div className="avatar-user-feedback w-75">
                                        <img
                                          src={avatar1}
                                          alt=""
                                          className="w-100 avatar-user-feedback-img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="w-80 fw-bold roboto">
                                    Nguyễn Thanh Hùng
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="voting-feedback roboto">
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                      <FontAwesomeIcon icon="fa-solid fa-star" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="content-feedback p-3 roboto">
                            <span>
                              Tôi rất ấn tượng với sự đa dạng của các loại sữa
                              tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu, cửa
                              hàng đều có đủ. Dịch vụ giao hàng cũng rất nhanh
                              chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
                            </span>
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

      {/* BLOG */}
      <div className="container mt-5 mb-5">
        <div className="row pb-5">
          <div className="col-md-12">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <Link to="/blog" style={{ textDecoration: "none", color: "#3C75A6" }}>
                <span className="fs-3 fw-bold roboto">BLOG</span>
              </Link>
              <Link to="/blog" style={{ textDecoration: "none", color: "#3C75A6" }}>
                <span className="fw-bold roboto">
                  Xem thêm <FontAwesomeIcon icon="fa-solid fa-angles-right" />
                </span>
              </Link>
            </div>
          </div>
          {relatedBlogs.map((blog) => (
          <div key={blog.id} className="col-md-4 mt-4">
            <Link to={{ pathname: `/blogdetail/${blog.id}`}} >
              <div className="blog-content position-relative">
                <div className="image-blog text-center">
                  <img
                    src={blog.banner}
                    alt=""
                    className="w-100"
                    style={{ height: "18em" }}
                  />
                </div>
                <div className="position-absolute blog-title w-100">
                  <span className="blog-span fs-5 roboto">
                      <BlogTitle title={blog.title} maxLength={30} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          ))}
          {/* <div className="col-md-4 mt-4">
            <a href="">
              <div className="blog-content position-relative">
                <div className="image-blog text-center">
                  <img
                    src={blog2}
                    alt=""
                    className="w-100"
                    style={{ height: "18em" }}
                  />
                </div>
                <div className="position-absolute blog-title w-100">
                  <span className="blog-span fs-5 roboto">
                    Cách cho bé ăn dặm đúng chuẩn và dễ dàng áp dụng
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className="col-md-4 mt-4">
            <a href="">
              <div className="blog-content position-relative">
                <div className="image-blog text-center">
                  <img
                    src={blog3}
                    alt=""
                    className="w-100"
                    style={{ height: "18em" }}
                  />
                </div>
                <div className="position-absolute blog-title w-100">
                  <span className="blog-span fs-5 roboto">
                    Cách cho bé ăn dặm đúng chuẩn và dễ dàng áp dụng
                  </span>
                </div>
              </div>
            </a>
          </div> */}
        </div>
      </div>

    </>
  );
}
export default Home;
