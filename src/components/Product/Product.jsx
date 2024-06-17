import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleproduct.css";
import productImg from "../../assets/img/product.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(5);
  const { pathname } = useLocation();
  const [originName, setOriginName] = useState('');
  const [ageName, setAgeName] = useState('');
  const [cateName, setCateName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
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
        console.log(dataResponse);

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
        
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id]);

  const formatPrice = (price) => {
    return price.toLocaleString('de-DE');
  };

  const handleCopyLink = (event) => {
    event.preventDefault();
    
    const link = window.location.href;

    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link đã được sao chép!');
    }).catch(err => {
      console.error('Không thể sao chép link: ', err);
    });
  };

  //xử lý tăng giảm quantity của product
  const handleDecrease = () => {
    if (quantity > 1)
      setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === '') {
      setQuantity('');
    } else if (!isNaN(value) && parseInt(value) >= 1 && parseInt(value) <= 99) {
      setQuantity(parseInt(value));
    }
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
                      border: "2px solid black"
                    }}
                  >
                    <div className="w-75">
                      <img src={product.image} alt="" className="w-100" />
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
                        5.0
                      </span>
                      <div className="rank-product d-inline-block ms-2">
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                      </div>
                      <div className="vertical-line d-inline-block ms-2">
                        &nbsp;
                      </div>
                      <span
                        className="fw-bold ms-2"
                        style={{ textDecoration: "underline" }}
                      >
                        123
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
                          <span style={{ fontSize: "26px" }}>{product.price} VNĐ</span>
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
                                <td className="w-50 text-center">
                                  <a href="" className="">
                                    <p className=" p-2 m-0 add-cart" style={{fontSize: '16px', fontFamily: 'system-ui'}}>
                                      Thêm Giỏ Hàng
                                    </p>
                                  </a>
                                </td>
                                <td className="w-30 text-center">
                                  <Link to="" className="btn-share py-1 px-3" onClick={handleCopyLink}>
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
                        <td className="w-75 px-4">
                          {product.productName}
                        </td>
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
                <div className="description-product px-3 py-2">
                  <span>
                    {product.description}
                  </span>
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
                <div className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <a href="#">
                      <img
                        src={productImg}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
                      />
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
                        src={productImg}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
                      />
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
                        src={productImg}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
                      />
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
                        src={productImg}
                        alt=""
                        className="w-75"
                        style={{ height: "15em" }}
                      />
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

            {/* <!-- Đánh giá sản phẩm --> */}

                <div className="col-md-12 mt-5 mb-5">
                    <div className="content-feedback" style={{border: '1px solid black', borderRadius: '10px'}}>
                        <div className="title-info-product px-4 py-3">
                            <span className="fw-bold fs-4" style={{color: '#091E3E'}}>Đánh giá</span>
                        </div>
                        <div className="feedback-sao w-40 ps-4 d-flex justify-content-between">
                            <div data-value="5" className="voting-feedback d-inline-block px-4 py-2"
                                style={{border: '1px solid black', borderRadius: '10px'}}><span style={{color: '#212529', fontFamily:'system-ui'}}>5 </span> <FontAwesomeIcon icon="fa-solid fa-star" />
                            </div>
                            <div data-value="4" className="voting-feedback d-inline-block px-4 py-2"
                                style={{border: '1px solid black', borderRadius: '10px'}}><span style={{color: '#212529', fontFamily:'system-ui'}}>4 </span> <FontAwesomeIcon icon="fa-solid fa-star" />
                            </div>
                            <div data-value="3" className="voting-feedback d-inline-block px-4 py-2"
                                style={{border: '1px solid black', borderRadius: '10px'}}><span style={{color: '#212529', fontFamily:'system-ui'}}>3 </span> <FontAwesomeIcon icon="fa-solid fa-star" />
                            </div>
                            <div data-value="2" className="voting-feedback d-inline-block px-4 py-2"
                                style={{border: '1px solid black', borderRadius: '10px'}}><span style={{color: '#212529', fontFamily:'system-ui'}}>2 </span> <FontAwesomeIcon icon="fa-solid fa-star" />
                            </div>
                            <div data-value="1" className="voting-feedback d-inline-block px-4 py-2"
                                style={{border: '1px solid black', borderRadius: '10px'}}><span style={{color: '#212529', fontFamily:'system-ui'}}>1 </span> <FontAwesomeIcon icon="fa-solid fa-star" />
                            </div>
                            <input type="hidden" id="star-rating" name="rating" value=""/>
                        </div>
                        <div className="w-75 p-4">
                            <textarea name="" id="" className="w-100 p-2" rows="5" style={{resize: 'none' }}></textarea>
                        </div>
                        <div className="ps-4">
                            <div className="text-center px-3 py-2 d-inline-block"
                                style={{backgroundColor: '#005B96', borderRadius: '10px'}}>
                                <span className="fw-bold" style={{color: 'white'}}>Gửi đánh giá</span>
                            </div>
                        </div>
                        <div className="mt-3" style={{borderTop: '1px solid black'}}>
                            &nbsp;
                        </div>
                        <div className="w-100 ps-5 pe-5">
                            <div className="item-feedback p-3" style={{borderBottom: '1px solid black'}}>
                                <table className="w-75">
                                  <tbody>
                                    <tr>
                                        <td className="w-15"><span className="fw-bold">phamhieu2k3</span></td>
                                        <td className="w-15"><span className="ps-3" style={{color: '#97999D'}}>22-01-2024</span></td>
                                        <td className="w-70 fs-5" rowSpan="2"><span className="px-2"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></span><a href="#" style={{color: 'red'}}><FontAwesomeIcon icon="fa-solid fa-trash" /></a></td> 
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><span className="fw-bold py-1"
                                                style={{textDecoration: 'underline'}}>5.0</span>
                                            <div className="d-inline-block py-1" style={{color: '#FFC626'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nisi eius voluptate quas perspiciatis aliquid molestiae animi quam, inventore est asperiores, accusantium voluptatem, minima eaque explicabo saepe. Facilis, eius accusamus.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="item-feedback p-3" style={{borderBottom: '1px solid black'}}>
                                <table className="w-75">
                                  <tbody>
                                    <tr>
                                        <td className="w-15"><span className="fw-bold">phamhieu2k3</span></td>
                                        <td className="w-15"><span className="ps-3" style={{color: '#97999D'}}>22-01-2024</span></td>
                                        <td className="w-70 fs-5" rowSpan="2"><span className="px-2"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></span><a href="#" style={{color: 'red'}}><FontAwesomeIcon icon="fa-solid fa-trash" /></a></td> 
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><span className="fw-bold py-1"
                                                style={{textDecoration: 'underline'}}>5.0</span>
                                            <div className="d-inline-block py-1" style={{color: '#FFC626'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nisi eius voluptate quas perspiciatis aliquid molestiae animi quam, inventore est asperiores, accusantium voluptatem, minima eaque explicabo saepe. Facilis, eius accusamus.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="item-feedback p-3" style={{borderBottom: '1px solid black'}}>
                                <table className="w-75">
                                  <tbody>
                                    <tr>
                                        <td className="w-15"><span className="fw-bold">phamhieu2k3</span></td>
                                        <td className="w-15"><span className="ps-3" style={{color: '#97999D'}}>22-01-2024</span></td>
                                        <td className="w-70 fs-5" rowSpan="2"><span className="px-2"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></span><a href="#" style={{color: 'red'}}><FontAwesomeIcon icon="fa-solid fa-trash" /></a></td> 
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><span className="fw-bold py-1"
                                                style={{textDecoration: 'underline'}}>5.0</span>
                                            <div className="d-inline-block py-1" style={{color: '#FFC626'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nisi eius voluptate quas perspiciatis aliquid molestiae animi quam, inventore est asperiores, accusantium voluptatem, minima eaque explicabo saepe. Facilis, eius accusamus.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="item-feedback p-3" style={{borderBottom: '1px solid black'}}>
                                <table className="w-75">
                                  <tbody>
                                    <tr>
                                        <td className="w-15"><span className="fw-bold">phamhieu2k3</span></td>
                                        <td className="w-15"><span className="ps-3" style={{color: '#97999D'}}>22-01-2024</span></td>
                                        <td className="w-70 fs-5" rowSpan="2"><span className="px-2"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></span><a href="#" style={{color: 'red'}}><FontAwesomeIcon icon="fa-solid fa-trash" /></a></td> 
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><span className="fw-bold py-1"
                                                style={{textDecoration: 'underline'}}>5.0</span>
                                            <div className="d-inline-block py-1" style={{color: '#FFC626'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nisi eius voluptate quas perspiciatis aliquid molestiae animi quam, inventore est asperiores, accusantium voluptatem, minima eaque explicabo saepe. Facilis, eius accusamus.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="item-feedback p-3" style={{borderBottom: '1px solid black'}}>
                                <table className="w-75">
                                  <tbody>
                                    <tr>
                                        <td className="w-15"><span className="fw-bold">phamhieu2k3</span></td>
                                        <td className="w-15"><span className="ps-3" style={{color: '#97999D'}}>22-01-2024</span></td>
                                        <td className="w-70 fs-5" rowSpan="2"><span className="px-2"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></span><a href="#" style={{color: 'red'}}><FontAwesomeIcon icon="fa-solid fa-trash" /></a></td> 
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><span className="fw-bold py-1"
                                                style={{textDecoration: 'underline'}}>5.0</span>
                                            <div className="d-inline-block py-1" style={{color: '#FFC626'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nisi eius voluptate quas perspiciatis aliquid molestiae animi quam, inventore est asperiores, accusantium voluptatem, minima eaque explicabo saepe. Facilis, eius accusamus.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="item-feedback p-3">
                                <table className="w-75">
                                  <tbody>
                                    <tr>
                                        <td className="w-15"><span className="fw-bold">phamhieu2k3</span></td>
                                        <td className="w-15"><span className="ps-3" style={{color: '#97999D'}}>22-01-2024</span></td>
                                        <td className="w-70 fs-5" rowSpan="2"><span className="px-2"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></span><a href="#" style={{color: 'red'}}><FontAwesomeIcon icon="fa-solid fa-trash" /></a></td> 
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><span className="fw-bold py-1"
                                                style={{textDecoration: 'underline'}}>5.0</span>
                                            <div className="d-inline-block py-1" style={{color: '#FFC626'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nisi eius voluptate quas perspiciatis aliquid molestiae animi quam, inventore est asperiores, accusantium voluptatem, minima eaque explicabo saepe. Facilis, eius accusamus.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-100 p-3">
                            <div className="fs-5 d-flex justify-content-end">
                                <a className="px-3 inconCursor" href="#" style={{color: '#3C75A6'}}>
                                <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" className="opacity-50" /></a>
                                <span style={{fontFamily: 'Poppins'}}>Trang 1</span>
                                <a className="px-3" href="#" style={{color: '#3C75A6'}}>
                                <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right"/></a>
                            </div>
                        </div>
                    </div>
                </div>


          </div>
        </div>
      </div>
    </>
  );
}
export default Product;