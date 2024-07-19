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
import ContentLoader from "react-content-loader";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatarUnknown from "../../assets/img/avatarUnknown.jpg"
import avatar2 from "../../assets/img/avatar2.png";
import avatar3 from "../../assets/img/avatar3.jpg";

const Home = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [cateId, setCateId] = useState(null);
  const [originId, setOriginId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [origins, setOrigins] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [brandId, setBrandId] = useState('');

  const NewProductLoader = () => (
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="20" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="40" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="60" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="80" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="100" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="120" rx="5" ry="5" width="80%" height="10" />
      <rect x="0" y="140" rx="5" ry="5" width="80%" height="10" />
    </ContentLoader>
  );

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
                blog.banner == null || blog.banner === ""
                  ? no_found
                  : blog.banner,
              date: formattedDate,
            };
          });

          setRelatedBlogs(updatedData);
        }

        const responseNewProductCate = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/product/filter?PageIndex=1&PageSize=8&sortOrder=1`
        );
        const dataNewProducts = await responseNewProductCate.json();
        const activeProducts = dataNewProducts.filter(
          (product) => product.isActive
        );
        const formattedProducts = activeProducts.map((product) => ({
          ...product,
          price: formatPrice(product.price),
        }));
        setNewProducts(formattedProducts);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("de-DE");
  };

  useEffect(() => {
    setLoading(true);
    const fetchOriginBrand = async () => {
      try {
        const responseOrigin = await fetch(
          "https://littlejoyapi.azurewebsites.net/api/origin?PageIndex=1&PageSize=5"
        );
        if (!responseOrigin.ok) {
          return;
        }
        const originData = await responseOrigin.json();
        setOrigins(originData);

        const responseBrand = await fetch(
          "https://littlejoyapi.azurewebsites.net/api/brand"
        );
        if (!responseBrand.ok) {
          return;
        }
        const brandData = await responseBrand.json();
        setBrands(brandData);
        setBrandId(brandData[0].id);
        setBrandName(brandData[0].brandName);
        setBrandDescription(brandData[0].brandDescription);
        

      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchOriginBrand();
  }, [])

  useEffect(() => {
    setLoading(true);
    if (originId !== null) {
      const fetchData = async () => {
        try {
          const responseNewProductCate = await fetch(
            `https://littlejoyapi.azurewebsites.net/api/product/filter?PageIndex=1&PageSize=8&sortOrder=1&originId=${originId}`
          );

          if (!responseNewProductCate.ok) {
            if (responseNewProductCate.status === 404) {
              setNewProducts([]);
              setPaging({
                CurrentPage: 1,
                PageSize: 8,
                TotalPages: 1,
                TotalCount: 0,
              });
            } else {
              setNewProducts([]);
              setPaging({
                CurrentPage: 1,
                PageSize: 8,
                TotalPages: 1,
                TotalCount: 0,
              });
            }
            return;
          }

          const dataNewProductsOrigin = await responseNewProductCate.json();
          const activeProducts = dataNewProductsOrigin.filter(
            (product) => product.isActive
          );
          const formattedProducts = activeProducts.map((product) => ({
            ...product,
            price: formatPrice(product.price),
          }));
          setNewProducts(formattedProducts);

        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [originId]);

  const handleClickOrigin = (event, id) => {
    event.preventDefault();
    setOriginId(id);
  };

  const BlogTitle = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return <>{truncateTitle(title, maxLength)}</>;
  };

  const ProductName = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return <>{truncateTitle(title, maxLength)}</>;
  };

  //ADD TO CART
  const addToCart = async (product) => {
    const productData = await fetchProductById(product.id);
    if (!productData) {
      toast.error("Thêm vào giỏ hàng thất bại");
      return;
    }

    const maxQuantity = productData.quantity;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    const convertPrice = parseInt(product.price.replace(/\./g, ""), 10);

    if (existingProductIndex > -1) {
      if (cart[existingProductIndex].quantity + 1 > maxQuantity) {
        toast.error(
          `Số lượng ${productData.productName} đã đạt giới hạn tồn kho. Chỉ còn ${maxQuantity} sản phẩm trong kho.`
        );
        return;
      }
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, price: convertPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product/${productId}`
      );
      if (!response.ok) {
      }
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  //FETCH BRAND
  const handleDisplayBrand = async (brandId) => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/brand/${brandId}`
      );
      if (!response.ok) {
      }
      const brandData = await response.json();
      setBrandId(brandData.id);
      setBrandName(brandData.brandName);
      setBrandDescription(brandData.brandDescription);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const handleClick = () => {
    localStorage.setItem('brandId', brandId);
  };


  return (
    <>
      <ToastContainer position="bottom-left" />
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
                        <Link
                          to="/shop"
                          className=" text-white px-4 py-1"
                          href=""
                        >
                          MUA NGAY
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="width-btn-banner">
                    <div className="d-flex justify-content-center">
                      <div className="btn-banner text-center w-75">
                        <a
                          href="#new-arrivals"
                          className=" text-white px-4 py-1"
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
        <section id="new-arrivals">
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
                {origins.map((o) => (
                <Link
                key={o.id}
                  to=""
                  className="w-18 d-inline-block"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={(e) => handleClickOrigin(e, o.id)}
                >
                  <div
                    className={`w-100 text-center px-2 py-3 arrival-item roboto ${
                      originId === o.id ? "arrival-active" : ""
                    }`}
                  >
                    <span>{o.originName}</span>
                  </div>
                </Link>
                ))}
                {/* <a
                  href=""
                  className="w-18 d-inline-block"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={(e) => handleClickOrigin(e, 6)}
                >
                  <div
                    className={`w-100 text-center px-2 py-3 arrival-item roboto ${
                      originId === 6 ? "arrival-active" : ""
                    }`}
                  >
                    <span>Sữa Úc</span>
                  </div>
                </a>
                <a
                  href=""
                  className="w-18 d-inline-block"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={(e) => handleClickOrigin(e, 1)}
                >
                  <div
                    className={`w-100 text-center px-2 py-3 arrival-item roboto ${
                      originId === 1 ? "arrival-active" : ""
                    }`}
                  >
                    <span>Sữa Mỹ</span>
                  </div>
                </a>
                <a
                  href=""
                  className="w-18 d-inline-block"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={(e) => handleClickOrigin(e, 5)}
                >
                  <div
                    className={`w-100 text-center px-2 py-3 arrival-item roboto ${
                      originId === 5 ? "arrival-active" : ""
                    }`}
                  >
                    <span>Sữa Nhật</span>
                  </div>
                </a>
                <a
                  href=""
                  className="w-18 d-inline-block"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={(e) => handleClickOrigin(e, 3)}
                >
                  <div
                    className={`w-100 text-center px-2 py-3 arrival-item roboto ${
                      originId === 3 ? "arrival-active" : ""
                    }`}
                  >
                    <span>Sữa Châu Âu</span>
                  </div>
                </a> */}
              </div>

              {loading ? (
                <>
                  <div className="col-md-3 p-3 mt-4">
                    <NewProductLoader />
                  </div>
                  <div className="col-md-3 p-3 mt-4">
                    <NewProductLoader />
                  </div>
                  <div className="col-md-3 p-3 mt-4">
                    <NewProductLoader />
                  </div>
                  <div className="col-md-3 p-3 mt-4">
                    <NewProductLoader />
                  </div>
                </>
              ) : (
                <div className="col-md-12">
                  <div className="row">
                    {newProducts.map((newP) => (
                      <div key={newP.id} className="col-md-3 p-3 mt-4">
                        <div className="product-image text-center px-3 py-2 position-relative">
                          <Link to={{ pathname: `/product/${newP.id}` }}>
                            <img src={newP.image} alt="" className="w-75" />
                          </Link>
                          {newP.quantity > 0 ? (
                          <Link
                            to="#"
                            className="addcart-item position-absolute start-50 translate-middle roboto"
                            onClick={() => addToCart(newP)}
                          >
                            THÊM VÀO GIỎ HÀNG
                          </Link>
                          ) : (
                          <div className="sold-out position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center">
                            <p className="m-0">SOLD OUT</p>
                            </div>
                          )}
                        </div>
                        <Link
                          to={{ pathname: `/product/${newP.id}` }}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="product-content mt-3 px-3 py-2">
                            <span
                              className="roboto"
                              style={{ fontSize: "1.2em" }}
                            >
                              <ProductName
                                title={newP.productName}
                                maxLength={20}
                              />
                            </span>
                            <div className="rank-product mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FontAwesomeIcon
                                  key={star}
                                  icon={faStar}
                                  color={
                                    star <= newP.ratingAver
                                      ? "gold"
                                      : "lightgrey"
                                  }
                                />
                              ))}
                            </div>
                            <div className="mt-2 fs-5">
                              <span
                                className="roboto"
                                style={{ fontWeight: 600 }}
                              >
                                VND {newP.price}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                    <div className="col-md-12 d-flex justify-content-center mt-3">
                      <Link
                        to="/shop"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <div
                          className="px-5 py-2 d-inline-block"
                          style={{
                            backgroundColor: "#016AAD",
                            borderRadius: "15px",
                          }}
                        >
                          <span className="roboto">Xem thêm</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 text-center pt-5">
              <p className="fs-1 title-arrival roboto">Thương Hiệu</p>
            </div>
            <div
              className="col-md-12 d-flex flex-md-wrap justify-content-evenly p-4"
              style={{
                backgroundColor: "rgba(155, 155, 155, 0.05)",
                borderRadius: "15px",
              }}
            >
            {brands.map((b) => (
              <div key={b.id} className="w-15 py-2 ">
                <Link to="" onClick={() => handleDisplayBrand(b.id)} className="w-100">
                  <img
                    src={b.logo}
                    alt=""
                    className="w-100"
                    
                  />
                </Link>
              </div>
              ))}
              {/* <div className="w-15 overflow-hidden">
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
              </div> */}
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
                  {brandName}
                </span>
              </div>
              <div className="content-brand mt-2 px-2 w-90">
                <span className="fs-6 roboto">
                  {brandDescription}
                </span>
              </div>
              <Link to="/shop" onClick={handleClick} className="" style={{ textDecoration: "none" }}>
                <div className="xemthem position-absolute w-15 text-center px-3 py-2">
                  <span className="roboto" style={{ color: "white" }}>
                    Xem sản phẩm
                  </span>
                </div>
              </Link>
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
                                      Phạm Văn Tuấn Hiếu
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
                                tại cửa hàng. Từ sữa tươi, sữa bột cho mẹ bầu,
                                cửa hàng đều có đủ. Dịch vụ giao hàng cũng rất
                                nhanh chóng và tiện lợi. Tôi sẽ tiếp tục ủng hộ!
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
                                            src={avatar2}
                                            alt=""
                                            className="w-100 avatar-user-feedback-img"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="w-80 fw-bold roboto">
                                      Nguyễn Kiến Minh
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
                              Sữa có vị ngọt tự nhiên, không quá ngọt gắt, rất dễ uống.
                              Hương vị của sữa thật sự tuyệt vời, sữa có mùi thơm dễ chịu, 
                              không hề bị nồng hay khó chịu.
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
                                            src={avatar3}
                                            alt=""
                                            className="w-100 avatar-user-feedback-img"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="w-80 fw-bold roboto">
                                      Lương Công Bằng
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
                                Sữa này chứa nhiều vitamin và khoáng chất, rất tốt 
                                cho sức khỏe của tôi. Sữa giúp tôi cung 
                                cấp đầy đủ dưỡng chất cần thiết hàng ngày.                           
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
                                            src={avatarUnknown}
                                            alt=""
                                            className="w-100 avatar-user-feedback-img"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="w-80 fw-bold roboto">
                                      Trần Đại Dương
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
                                Sản phẩm có nhiều loại và hương vị để lựa chọn, 
                                rất đa dạng, tôi rất thích sự phong phú của các 
                                loại sữa, từ sữa tươi đến sữa chua, sữa hạt.
                                Có nhiều dung tích khác nhau để phù hợp với nhu cầu 
                                của mọi người.
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
                                            src={avatarUnknown}
                                            alt=""
                                            className="w-100 avatar-user-feedback-img"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="w-80 fw-bold roboto">
                                      Nguyễn Văn An
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
                                Sản phẩm có nguồn gốc rõ ràng, đảm bảo an toàn 
                                vệ sinh thực phẩm. Tôi yên tâm khi sử dụng sản 
                                phẩm vì biết rằng nó đã qua kiểm định chất lượng 
                                nghiêm ngặt.
                                
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
                                            src={avatarUnknown}
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
                                Sữa dễ dàng bảo quản trong tủ lạnh mà không bị 
                                hỏng nhanh. Sản phẩm có hạn sử dụng dài, giúp 
                                tôi tiết kiệm chi phí và thời gian mua sắm.
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
                <Link
                  to="/blog"
                  style={{ textDecoration: "none", color: "#3C75A6" }}
                >
                  <span className="fs-3 fw-bold roboto">BLOG</span>
                </Link>
                <Link
                  to="/blog"
                  style={{ textDecoration: "none", color: "#3C75A6" }}
                >
                  <span className="fw-bold roboto">
                    Xem thêm <FontAwesomeIcon icon="fa-solid fa-angles-right" />
                  </span>
                </Link>
              </div>
            </div>
            {relatedBlogs.map((blog) => (
              <div key={blog.id} className="col-md-4 mt-4">
                <Link to={{ pathname: `/blogdetail/${blog.id}` }}>
                  <div className="blog-content position-relative">
                    <div className="image-blog text-center">
                      <img
                        src={blog.banner}
                        alt=""
                        className="w-100"
                        
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
