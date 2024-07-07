import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleproduct.css";
import productImg from "../../assets/img/product.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import feedback from "../../assets/img/feedback.png";
import avtunknow from "../../assets/img/avatarUnknown.jpg";
//import { SideBySideMagnifier } from "@datobs/react-image-magnifiers";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [ratingA, setRatingA] = useState(5);
  const { pathname } = useLocation();
  const [originName, setOriginName] = useState("");
  const [ageName, setAgeName] = useState("");
  const [cateName, setCateName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [similarP, setSimilarP] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [numberOfFeedback, setNumberOfFeedback] = useState(0);
  const [checkAdd, setCheckAdd] = useState(false);
  const [idFeedbackToDelete, setIdFeedbackToDelete] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState({});

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product/${id}`
      );

      const dataResponse = await response.json();
      if (dataResponse.price) {
        dataResponse.price = formatPrice(dataResponse.price);
      }
      setProduct(dataResponse);

      const resOriginId = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/origin/${dataResponse.originId}`
      );
      const dataOriginName = await resOriginId.json();
      setOriginName(dataOriginName);

      const resCateId = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/category/${dataResponse.cateId}`
      );
      const dataCateName = await resCateId.json();
      setCateName(dataCateName);

      const resBrandId = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/brand/${dataResponse.brandId}`
      );
      const dataBrandName = await resBrandId.json();
      setBrandName(dataBrandName);

      const resAgeId = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/age-group-product/${dataResponse.ageId}`
      );
      const dataAgeName = await resAgeId.json();
      setAgeName(dataAgeName);

      const resSimilarProduct = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product/get-product-related/${id}`
      );
      const dataSimilarP = await resSimilarProduct.json();
      if (resSimilarProduct.ok) {
        const formattedSimilarP = dataSimilarP.map((product) => ({
          ...product,
          price: formatPrice(product.price),
        }));
        setSimilarP(formattedSimilarP);
      }

      const responseNumberFeedback = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/feedback/count-feedback-by-product/${id}`
      );
      const dataNumberOfFeedback = await responseNumberFeedback.json();
      if (responseNumberFeedback.ok) {
        setNumberOfFeedback(dataNumberOfFeedback);
      } else {
        setNumberOfFeedback(0);
      }

      const userId = localStorage.getItem("userId");
      if (userId != null) {
        const responseCheckAdd = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/feedback/check-add-feedback?productId=${id}&userID=${userId}`
        );
        const dataCheckAdd = await responseCheckAdd.json();
        if (responseCheckAdd.ok) {
          setCheckAdd(dataCheckAdd);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchFeedback = async (pageIndex) => {
    setLoading(true);
    try {
      const resFeedbacks = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/feedback/feed-back-by-product/${id}?PageIndex=${pageIndex}&PageSize=5`
      );
      const dataFeedbacks = await resFeedbacks.json();
      if (!resFeedbacks.ok) {
        if (resFeedbacks.status === 404 || resFeedbacks.status === 400) {
          setFeedbacks([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          setFeedbacks([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }
      const userIds = [
        ...new Set(dataFeedbacks.map((feedback) => feedback.userId)),
      ];

      const userInfo = {};
      await Promise.all(
        userIds.map(async (userId) => {
          const userResponse = await fetch(
            `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
          );
          const userData = await userResponse.json();
          userInfo[userId] = userData;
        })
      );

      const feedbacksWithUserNames = await dataFeedbacks.map((feedback) => {
        const dateParts = feedback.date.split("T")[0].split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        return {
          ...feedback,
          userName: userInfo[feedback.userId]?.userName || "Unknown User",
          avatar: userInfo[feedback.userId]?.avatar || avtunknow,
          date: formattedDate,
        };
      });

      const paginationData = JSON.parse(
        resFeedbacks.headers.get("X-Pagination")
      );
      setPaging(paginationData);

      const previous = document.getElementById("fb-pre");
      const next = document.getElementById("fb-next");

      if (paginationData.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationData.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationData.CurrentPage === paginationData.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }

      setFeedbacks(feedbacksWithUserNames);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (paging.CurrentPage > 1) {
      setPaging((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNext = () => {
    if (paging.CurrentPage < paging.TotalPages) {
      setPaging((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchFeedback(paging.CurrentPage);
  }, [paging.CurrentPage, paging.TotalCount, id]);

  const formatPrice = (price) => {
    return price.toLocaleString("de-DE");
  };

  const handleCopyLink = (event) => {
    event.preventDefault();

    const link = window.location.href;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link đã được sao chép!");
      })
      .catch((err) => {
        console.error("Không thể sao chép link: ", err);
      });
  };

  const ProductName = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return <>{truncateTitle(title, maxLength)}</>;
  };

  const stars = [1, 2, 3, 4, 5].map((star) => (
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      color={star <= product.ratingAver ? "gold" : "lightgrey"}
    />
  ));

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  //FEEDBACK
  //ADD FEEDBACK
  const handleSendFeedback = async () => {
    if (selectedRating === "") {
      notify();
      return;
    }
    const newFeedback = {
      userId: localStorage.getItem("userId"),
      productId: id,
      comment: comment,
      rating: selectedRating,
    };
    const sendFeedback = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newFeedback),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setSelectedRating("");
          setComment("");
          await fetchData();
          await fetchFeedback(1);
        }
      } catch (error) {
        console.error("Lỗi tạo blog:", error);
      } finally {
        setLoading(false);
      }
    };
    sendFeedback();
  };

  //DELETE FEEDBACK
  const handleDeleteFeedback = async (feedbackId) => {
    setIdFeedbackToDelete(feedbackId);
  };
  const handleConfirmDeleteFeedback = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId != null) {
        const response = await fetch(
          `https://littlejoyapi.azurewebsites.net/api/feedback?Id=${idFeedbackToDelete}&UserId=${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          await fetchData();
          await fetchFeedback(paging.CurrentPage);
          toast.success("Bình luận được xóa thành công!");
        } else {
          toast.error("Xóa bình luận thất bại!");
        }
      }
    } catch (error) {
      console.error(error.message);
    } finally {
    }
  };

  //EDIT FEEDBACK
  const handleEditFeedback = (feedbackId) => {
    fetchFeedbackById(feedbackId);
  };

  const fetchFeedbackById = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/feedback/${feedbackId}`
      );
      const data = await response.json();
      setSelectedFeedback(data);
      setSelectedRating(data.rating);
      setComment(data.comment);
    } catch (error) {
      console.error("Lỗi fetch product details", error);
    }
  };

  const handleUpdateFeedback = async () => {
    if (selectedRating === "") {
      notify();
      return;
    }
    const updateFeedback = {
      userId: localStorage.getItem("userId"),
      id: selectedFeedback.id,
      comment: comment,
      rating: selectedRating,
    };
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/feedback`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateFeedback),
        }
      );
      if (response.ok) {
        toast.success("Bình luận được sửa thành công!");
        await fetchData();
        await fetchFeedback(paging.CurrentPage);
      } else {
        toast.error("Bình luận được sửa thất bại!");
      }
    } catch (error) {}
  };

  //xử lý tăng giảm quantity của product
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    const totalQuantityInCart = getCartTotalQuantity(product.id);
    if (totalQuantityInCart + quantity < product.quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Số lượng ${product.productName} đã đạt giới hạn tồn kho`);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setQuantity(1);
    } else if (
      !isNaN(value) &&
      parseInt(value) >= 1 &&
      parseInt(value) <= product.quantity
    ) {
      const totalQuantityInCart = getCartTotalQuantity(product.id);
      if (totalQuantityInCart + parseInt(value) <= product.quantity) {
        setQuantity(parseInt(value));
      } else {
        toast.error(`Số lượng ${product.productName} đã đạt giới hạn tồn kho`);
      }
    } else {
      toast.error(`Số lượng ${product.productName} đã đạt giới hạn tồn kho`);
      setQuantity(1);
    }
  };

  const getCartTotalQuantity = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find((p) => p.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  //ADD TO CART
  const addToCart = async (product, quantity) => {
    const maxQuantity = product.quantity;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    const convertPrice = parseInt(product.price.replace(/\./g, ""), 10);

    let newQuantity;
    if (existingProductIndex > -1) {
      newQuantity = cart[existingProductIndex].quantity + quantity;
    } else {
      newQuantity = quantity;
    }

    if (newQuantity > maxQuantity) {
      toast.error(`Số lượng ${product.productName} đã đạt giới hạn tồn kho`);
      return;
    }

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = newQuantity;
    } else {
      cart.push({ ...product, price: convertPrice, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(1);
    toast.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 banner py-5 text-center">
            <h1
              className="text-center"
              style={{
                color: "#3C75A6",
                fontWeight: "600",
                fontFamily: "sans-serif",
              }}
            >
              Shop
            </h1>
            <div className="d-inline-block">
              <div className="d-flex align-content-between">
                <p className="px-2">
                  <Link
                    to="/"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </p>
                <p className="px-2">
                  <FontAwesomeIcon
                    icon="fa-solid fa-angles-right"
                    style={{ color: "#3c75a6" }}
                  />
                </p>
                <p className="px-2">
                  <Link
                    to="/shop"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Shop
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid body-content">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-12">
              <div
                className="w-100"
                style={{ backgroundColor: "white", borderRadius: "15px" }}
              >
                <div className="row p-5">
                  <div
                    className="col-md-4 d-flex justify-content-center py-3"
                    style={{
                      backgroundColor: "rgba(155, 155, 155, 0.15)",
                      borderRadius: "15px",
                      border: "2px solid black",
                    }}
                  >
                    <div className="w-75">
                      {/* <SideBySideMagnifier
                        imageSrc={product.image}
                        imageAlt="Sample Image"
                        alwaysInPlace={true}
                        fillAvailableSpace={false}
                        className="w-100"
                      /> */}
                      <img src={product.image} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-md-8 px-5 py-3">
                    <div className="title-product-info ms-3 fw-bold">
                      <span style={{ fontSize: "30px" }}>
                        {product.productName}
                      </span>
                    </div>
                    <div className="ms-3 mt-2">
                      <span
                        className="fw-bold"
                        style={{ textDecoration: "underline" }}
                      >
                        {product.ratingAver}.0
                      </span>
                      <div className="rank-product d-inline-block ms-2">
                        {stars}
                      </div>
                      <div className="vertical-line d-inline-block ms-2">
                        &nbsp;
                      </div>
                      <span
                        className="fw-bold ms-2"
                        style={{ textDecoration: "underline" }}
                      >
                        {numberOfFeedback}
                      </span>
                      <span> đánh giá</span>
                    </div>
                    <div className="w-100 ps-3 mt-5">
                      <div
                        className="p-4"
                        style={{
                          backgroundColor: "rgba(245, 251, 253, 1)",
                          borderRadius: "15px",
                        }}
                      >
                        <div className="title-price-product fw-bold">
                          <span style={{ fontSize: "26px" }}>
                            {product.price} VNĐ
                          </span>
                        </div>
                        <div className="info-cart-product w-75 mt-3">
                          <table className="w-100">
                            <tbody>
                              <tr>
                                <td className="w-30">
                                  <div className="btn-quantity w-100 d-flex align-content-center px-2">
                                    <div
                                      className="btn btn-secondary rounded-0 w-25 text-center p-2"
                                      id="quantity-down"
                                      onClick={handleDecrease}
                                    >
                                      <span>-</span>
                                    </div>
                                    <div className="button w-40">
                                      <input
                                        type="number"
                                        className="text-center w-100 p-2"
                                        id="quantity"
                                        min="1"
                                        max="5"
                                        value={quantity}
                                        onChange={handleChange}
                                      ></input>
                                    </div>
                                    <div
                                      className="btn btn-secondary rounded-0 w-25 text-center p-2"
                                      id="quantity-up"
                                      onClick={handleIncrease}
                                    >
                                      <span>+</span>
                                    </div>
                                  </div>
                                </td>

                                {product.quantity > 0 ? (
                                  <td className="w-50 text-center">
                                    <Link to="#" className="">
                                      <p
                                        className=" p-2 m-0 add-cart"
                                        style={{
                                          fontSize: "16px",
                                          fontFamily: "system-ui",
                                        }}
                                        onClick={() =>
                                          addToCart(product, quantity)
                                        }
                                      >
                                        Thêm Giỏ Hàng
                                      </p>
                                    </Link>
                                  </td>
                                ) : (
                                  <td className="w-50 text-center">
                                    <Link to="#" className="">
                                      <p
                                        className=" p-2 m-0 add-cart"
                                        style={{
                                          fontSize: "16px",
                                          fontFamily: "system-ui",
                                          cursor: "not-allowed",
                                          opacity: "0.6",
                                        }}
                                      >
                                        Hết Hàng
                                      </p>
                                    </Link>
                                  </td>
                                )}

                                <td className="w-30 text-center">
                                  <Link
                                    to=""
                                    className="btn-share py-1 px-3"
                                    onClick={handleCopyLink}
                                  >
                                    <FontAwesomeIcon icon="fa-solid fa-share-nodes" />
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-5 mb-5">
              <div
                className="w-100 p-3"
                style={{ backgroundColor: "white", borderRadius: "15px" }}
              >
                <div className="title-info-product px-3 py-2">
                  <span className="fw-bold fs-4" style={{ color: "#091E3E" }}>
                    Chi tiết sản phẩm
                  </span>
                </div>
                <div className="main-info-product w-100 px-3 py-2">
                  <table
                    className="w-75"
                    style={{ borderCollapse: "collapse" }}
                  >
                    <tbody>
                      <tr>
                        <td className="w-25 px-4 py-3 fw-bold">
                          Tên sản phẩm:
                        </td>
                        <td className="w-75 px-4">{product.productName}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 fw-bold">Loại sữa:</td>
                        <td className="px-4">{cateName.categoryName}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 fw-bold">Thương hiệu:</td>
                        <td className="px-4">{brandName.brandName}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 fw-bold">Xuất xứ:</td>
                        <td className="px-4">{originName.originName}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 fw-bold">Đối tượng:</td>
                        <td className="px-4">{ageName.ageRange}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="title-info-product px-3 py-2">
                  <span className="fw-bold fs-4" style={{ color: "#091E3E" }}>
                    Mô tả sản phẩm
                  </span>
                </div>
                <div className="px-3 py-2">
                  <span>{product.description}</span>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-5 mb-5">
              <div className="w-100 p-3 pt-5">
                <div className="title-related-product text-center pt-5">
                  <span className="fw-bold fs-3" style={{ color: "#103A71" }}>
                    Sản Phẩm Tương Tự
                  </span>
                </div>
              </div>
              <div className="row">
                {similarP.map((p) => (
                  <div key={p.id} className="col-md-3 p-3 mt-3">
                    <div className="product-image text-center px-3 py-2 position-relative">
                      <Link to={{ pathname: `/product/${p.id}` }}>
                        <img src={p.image} alt="" className="w-75" />
                      </Link>
                    </div>
                    <Link
                      to={{ pathname: `/product/${p.id}` }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="product-content mt-3 px-3 py-2">
                        <span className="Roboto" style={{ fontSize: "1.2em" }}>
                          <ProductName title={p.productName} maxLength={20} />
                        </span>
                        <div className="rank-product mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesomeIcon
                              key={star}
                              icon={faStar}
                              color={
                                star <= p.ratingAver ? "gold" : "lightgrey"
                              }
                            />
                          ))}
                        </div>
                        <div className="mt-2 fs-5">
                          <span
                            className="Opensans"
                            style={{ fontWeight: "600" }}
                          >
                            VND {p.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* <!-- Đánh giá sản phẩm --> */}

            <div className="col-md-12 mt-5 mb-5">
              <div
                className="content-feedback"
                style={{ border: "1px solid black", borderRadius: "10px" }}
              >
                <div className="title-info-product px-4 py-3">
                  <span className="fw-bold fs-4" style={{ color: "#091E3E" }}>
                    Đánh giá
                  </span>
                </div>
                {checkAdd == true && (
                  <>
                    <div className="feedback-sao w-40 ps-4 d-flex justify-content-between">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div
                          key={rating}
                          data-value={rating}
                          className={`voting-feedback d-inline-block px-4 py-2 ${
                            selectedRating === rating
                              ? "voting-feedback-active"
                              : ""
                          }`}
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRatingClick(rating)}
                        >
                          {rating}{" "}
                          <FontAwesomeIcon icon="fa-solid fa-star"></FontAwesomeIcon>
                        </div>
                      ))}
                      <input
                        type="hidden"
                        id="star-rating"
                        name="rating"
                        value={selectedRating || ""}
                      />
                    </div>
                    <div className="w-75 p-4">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        name=""
                        id=""
                        placeholder="Nhập phản hồi của bạn"
                        className="w-100 p-2"
                        rows="5"
                        style={{ resize: "none" }}
                      ></textarea>
                    </div>
                    <div className="ps-4">
                      <div
                        className="text-center px-3 py-2 d-inline-block"
                        style={{
                          backgroundColor: "#005B96",
                          borderRadius: "10px",
                        }}
                      >
                        <span
                          className="fw-bold"
                          style={{ color: "white", cursor: "pointer" }}
                          onClick={handleSendFeedback}
                        >
                          Gửi đánh giá
                        </span>
                      </div>
                    </div>
                    <div
                      className="mt-3"
                      style={{ borderTop: "1px solid black" }}
                    >
                      &nbsp;
                    </div>
                  </>
                )}
                <div className="w-100 ps-5 pe-5">
                  {feedbacks.length > 0 ? (
                    feedbacks.map((fb) => (
                      <div
                        key={fb.id}
                        className="item-feedback p-3"
                        style={{ borderBottom: "1px solid black" }}
                      >
                        <table className="w-75">
                          <tbody>
                            <tr>
                              <td className="w-15">
                                <div className="w-100 d-flex">
                                  <div
                                    className="d-inline-block w-30"
                                    style={{
                                      borderRadius: "50%",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={fb.avatar || avtunknow}
                                      alt=""
                                      className="w-100"
                                    />
                                  </div>
                                  <div className="d-flex justify-content-center flex-column">
                                    <span className="fw-bold ps-3">
                                      {fb.userName}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="w-15">
                                <span
                                  className="ps-3"
                                  style={{ color: "#97999D" }}
                                >
                                  {fb.date}
                                </span>
                              </td>
                              {localStorage.getItem("userId") == fb.userId ? (
                                <td className="w-70 fs-5" rowSpan="2">
                                  <span className="px-2">
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-pen-to-square"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-feedback"
                                      onClick={() => handleEditFeedback(fb.id)}
                                    />
                                  </span>
                                  <span style={{ color: "red" }}>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete-fb"
                                      onClick={() =>
                                        handleDeleteFeedback(fb.id)
                                      }
                                    />
                                  </span>
                                </td>
                              ) : (
                                <td className="w-70 fs-5" rowSpan="2"></td>
                              )}
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <span
                                  className="fw-bold py-1"
                                  style={{ textDecoration: "underline" }}
                                >
                                  {fb.rating}.0
                                </span>
                                <div
                                  className="d-inline-block py-1"
                                  style={{ color: "#FFC626" }}
                                >
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <FontAwesomeIcon
                                      key={star}
                                      icon={faStar}
                                      color={
                                        star <= fb.rating ? "gold" : "lightgrey"
                                      }
                                    />
                                  ))}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="3">
                                <span>{fb.comment}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))
                  ) : (
                    <div className="col-md-12 text-center">
                      <div
                        className="my-5 py-5 px-5"
                        style={{
                          border: "1px dotted black",
                          borderRadius: "15px",
                        }}
                      >
                        <img src={feedback} alt="" className="w-15" />
                        <span className="fs-5 d-block">
                          Hiện tại chưa có đánh giá, mua sản phẩm để đánh giá
                          ngay
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {paging.TotalCount != 0 && (
                  <div className="w-100 p-3">
                    <div className="fs-5 d-flex justify-content-end">
                      <Link
                        className="px-3"
                        href="#"
                        style={{ color: "#3c75a6" }}
                      >
                        <FontAwesomeIcon
                          id="fb-pre"
                          icon="fa-solid fa-circle-chevron-left"
                          className=""
                          onClick={handlePrevious}
                        />
                      </Link>
                      <span style={{ fontFamily: "Poppins" }}>
                        Trang {paging.CurrentPage}
                      </span>
                      <Link
                        className="px-3"
                        href="#"
                        style={{ color: "#3c75a6" }}
                      >
                        <FontAwesomeIcon
                          id="fb-next"
                          icon="fa-solid fa-circle-chevron-right"
                          onClick={handleNext}
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal delete feedback --> */}
      <div className="modal" id="delete-fb">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div
              className="py-2 d-flex justify-content-between"
              style={{ backgroundColor: "rgba(60, 117, 166, 1)" }}
            >
              <h4 className="modal-title inter ms-3" style={{ color: "white" }}>
                Xác nhận xóa bình luận của bạn
              </h4>
              <div
                className="btn-close-modal me-3"
                style={{ color: "white" }}
                data-bs-dismiss="modal"
              >
                <FontAwesomeIcon icon={faX} />
              </div>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body" style={{ backgroundColor: "white" }}>
              <div className="p-2">
                <table className="w-100 table-modal">
                  <tbody>
                    <tr>
                      <td className="w-20">
                        <span className="py-2" style={{ color: "#3C75A6" }}>
                          Bạn có chắc chắn muốn xóa bình luận này không?
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div
              className="footer-modal py-4 d-flex justify-content-end"
              style={{ backgroundColor: "white" }}
            >
              <div className="close me-4">
                <div
                  className="modal-btn-close p-2 px-4"
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "rgb(60, 117, 166)" }}
                >
                  <span>Hủy</span>
                </div>
              </div>
              <div className="save-modal me-4">
                <input
                  onClick={handleConfirmDeleteFeedback}
                  type="submit"
                  data-bs-dismiss="modal"
                  value="Xác nhận"
                  style={{ backgroundColor: "#E33539" }}
                  className="input-submit modal-btn-close p-2 px-4 inter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal edit feedback --> */}
      <div className="modal" id="edit-feedback">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div
              className="py-2 d-flex justify-content-between"
              style={{ backgroundColor: "rgba(60, 117, 166, 1)" }}
            >
              <h4 className="modal-title inter ms-3" style={{ color: "white" }}>
                Đánh giá
              </h4>
              <div
                className="btn-close-modal me-3"
                style={{ color: "white" }}
                data-bs-dismiss="modal"
              >
                <FontAwesomeIcon icon={faX} />
              </div>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body" style={{ backgroundColor: "white" }}>
              <div className="p-2">
                <table className="w-100 table-modal">
                  <tbody>
                    <tr>
                      <td className="w-20">
                        <span className="py-2" style={{ color: "#3C75A6" }}>
                          Rating:
                        </span>
                      </td>
                      <td className="py-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <FontAwesomeIcon
                            key={rating}
                            icon={faStar}
                            className={`star ${
                              selectedRating >= rating ? "star-active" : ""
                            }`}
                            onClick={() => handleRatingClick(rating)}
                            style={{
                              cursor: "pointer",
                              color: selectedRating >= rating ? "gold" : "gray",
                            }}
                          />
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-20">
                        <span className="py-2" style={{ color: "#3C75A6" }}>
                          Phản hồi:
                        </span>
                      </td>
                      <td>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          name=""
                          id=""
                          placeholder="Nhập phản hồi của bạn"
                          className="w-100 p-2"
                          rows="3"
                          style={{ resize: "none" }}
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div
              className="footer-modal py-4 d-flex justify-content-end"
              style={{ backgroundColor: "white" }}
            >
              <div className="close me-4">
                <div
                  className="modal-btn-close p-2 px-4"
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "rgb(60, 117, 166)" }}
                >
                  <span>Hủy</span>
                </div>
              </div>
              <div className="save-modal me-4">
                <input
                  onClick={handleUpdateFeedback}
                  type="submit"
                  data-bs-dismiss="modal"
                  value="Lưu"
                  style={{ backgroundColor: "#E33539" }}
                  className="input-submit modal-btn-close p-2 px-4 inter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
