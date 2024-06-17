import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleshop.css";
import product from "../../assets/img/product.png";
import { Link, useLocation } from "react-router-dom";
import sorry from "../../assets/img/sorry.png";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [cateIds, setCateIds] = useState([]);
  const [ageIds, setAgeIds] = useState([]);
  const [originIds, setOriginIds] = useState([]);
  const [brandIds, setBrandIds] = useState([]);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 12,
    TotalPages: 1,
    TotalCount: 0,
  });
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchData = async (pageIndex, pageSize) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('PageIndex', pageIndex);
      searchParams.append('PageSize', pageSize);
      searchParams.append('sortOrder', sortOrder);
      
      if (keyword) searchParams.append('keyword', keyword);
      if (cateIds.length) searchParams.append('cateId', cateIds);
      if (ageIds.length) searchParams.append('ageId', ageIds);
      if (originIds.length) searchParams.append('originId', originIds);
      if (brandIds.length) searchParams.append('brandId', brandIds);
  
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product/filter?${searchParams.toString()}`
      );
  
      if (!response.ok) {
        if (response.status === 404) {
          setProducts([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 12,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          console.log('Lỗi fetch data...');
          setProducts([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 12,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }
  
      const paginationData = JSON.parse(response.headers.get("X-Pagination"));
      setPaging(paginationData);
  
      const previous = document.getElementById("blog-pre");
      const next = document.getElementById("blog-next");
  
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
  
      const dataProducts = await response.json();
      const formattedProducts = dataProducts.map(product => ({
        ...product,
        price: formatPrice(product.price)
      }));
      setProducts(formattedProducts);
      
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchData(paging.CurrentPage, paging.PageSize);
  }, [paging.CurrentPage, sortOrder, keyword, cateIds, ageIds, originIds, brandIds]);

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

  const handleFilterChange = (filterType, value) => {
    const updateFilter = (prevArray, value) => {
      if (prevArray.includes(value)) {
        return prevArray.filter(item => item !== value);
      } else {
        return [...prevArray, value];
      }
    };

    switch (filterType) {
      case 'keyword':
        setKeyword(value);
        break;
      case 'cateId':
        setCateIds(prevState => updateFilter(prevState, value));
        break;
      case 'ageId':
        setAgeIds(prevState => updateFilter(prevState, value));
        break;
      case 'originId':
        setOriginIds(prevState => updateFilter(prevState, value));
        break;
      case 'brandId':
        setBrandIds(prevState => updateFilter(prevState, value));
        break;
      default:
        break;
    }
    
    setPaging((prevState) => ({
      ...prevState,
      CurrentPage: 1,
    }));
  };

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

  const handleClickSortOrder = (event, id) => {
    event.preventDefault();
    setSortOrder(id);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('de-DE');
  };


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
            <div className="col-md-4">
              <div
                className="content px-4 py-3"
                style={{ backgroundColor: "#FAFAFA", borderRadius: "15px" }}
              >
                <span style={{ color: "#67686C" }} className="fw-bold">
                  Tìm kiếm
                </span>
                <input
                  value={keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
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
                      onClick={(e) => handleClickSortOrder(e, 1)}
                    >
                      <div className={`px-3 py-2 ms-3 item-filter-top  ${sortOrder == 1 ? 'item-filter-top-active' : ''} `}>
                        <span>Hàng Mới</span>
                      </div>
                    </a>
                    <a
                      href=""
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={(e) => handleClickSortOrder(e, 2)}
                    >
                      <div className={`px-3 py-2 ms-3 item-filter-top  ${sortOrder == 2 ? 'item-filter-top-active' : ''} `}>
                        <span>Giá Cao - Thấp</span>
                      </div>
                    </a>
                    <a
                      href=""
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={(e) => handleClickSortOrder(e, 3)}
                    >
                      <div className={`px-3 py-2 ms-3 item-filter-top  ${sortOrder == 3 ? 'item-filter-top-active' : ''} `}>
                        <span>Giá Thấp - Cao</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 align-content-center">
                  <div className="fs-5 d-flex justify-content-end">
                    <Link
                      className="px-3"
                      href="#"
                      style={{ color: "#3c75a6" }}
                    >
                      <FontAwesomeIcon
                        id="blog-pre"
                        icon="fa-solid fa-circle-chevron-left"
                        className=""
                        onClick={handlePrevious}
                      />
                    </Link>
                    <span style={{ fontFamily: "Poppins" }}>Trang {paging.CurrentPage}</span>
                    <Link className="px-3" href="#" style={{ color: "#3c75a6" }}>
                      <FontAwesomeIcon id="blog-next" icon="fa-solid fa-circle-chevron-right" onClick={handleNext} />
                    </Link>
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
                        <input type="checkbox" id='suabot' onChange={() => handleFilterChange('cateId', 2)} />
                      </td>
                      <td className="w-85"><label htmlFor="suabot" >Sữa bột</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suatuoi' onChange={() => handleFilterChange('cateId', 3)} />
                      </td>
                      <td><label htmlFor="suatuoi" >Sữa tươi</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suabau' onChange={() => handleFilterChange('cateId', 4)} />
                      </td>
                      <td><label htmlFor="suabau">Sữa bầu</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suachua' onChange={() => handleFilterChange('cateId', 5)} />
                      </td>
                      <td><label htmlFor="suachua">Sữa chua</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='suahat' onChange={() => handleFilterChange('cateId', 6)} />
                      </td>
                      <td><label htmlFor="suahat">Sữa hạt</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='sualuamach' onChange={() => handleFilterChange('cateId', 7)} />
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
                        <input type="checkbox" id='meji' onChange={() => handleFilterChange('brandId', 2)} />
                      </td>
                      <td className="w-85"><label htmlFor="meji">Meji</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='ensure' onChange={() => handleFilterChange('brandId', 3)} />
                      </td>
                      <td><label htmlFor="ensure">Ensure</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='kidsboost' onChange={() => handleFilterChange('brandId', 4)} />
                      </td>
                      <td><label htmlFor="kidsboost">Kids Boost</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='abbottgrow' onChange={() => handleFilterChange('brandId', 1)} />
                      </td>
                      <td><label htmlFor="abbottgrow">Abbott Grow</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='vinamilk' onChange={() => handleFilterChange('brandId', 7)} />
                      </td>
                      <td><label htmlFor="vinamilk">Vinamilk</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='similac' onChange={() => handleFilterChange('brandId', 6)} />
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
                        <input type="checkbox" id='duoi6thang' onChange={() => handleFilterChange('ageId', 2)} />
                      </td>
                      <td className="w-85"><label htmlFor="duoi6thang">Dưới 6 tháng</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='6-12thang' onChange={() => handleFilterChange('ageId', 3)} />
                      </td>
                      <td><label htmlFor="6-12thang">6 - 12 tháng</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='1-2tuoi' onChange={() => handleFilterChange('ageId', 1)} />
                      </td>
                      <td><label htmlFor="1-2tuoi">1 - 2 tuổi</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1"> 
                        <input type="checkbox" id="2-6tuoi" onChange={() => handleFilterChange('ageId', 6)} />
                      </td>
                      <td><label htmlFor="2-6tuoi">2 - 6 tuổi</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='tu6tuoi' onChange={() => handleFilterChange('ageId', 5)} />
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
                        <input type="checkbox" id='vietnam' onChange={() => handleFilterChange('originId', 2)} />
                      </td>
                      <td className="w-85"><label htmlFor="vietnam">Việt Nam</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='chauau' onChange={() => handleFilterChange('originId', 3)} />
                      </td>
                      <td><label htmlFor="chauau">Châu Âu</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='nuocmy' onChange={() => handleFilterChange('originId', 4)} />
                      </td>
                      <td><label htmlFor="nuocmy">Mỹ</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='nhat' onChange={() => handleFilterChange('originId', 5)} />
                      </td>
                      <td><label htmlFor="nhat">Nhật</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id="uc" onChange={() => handleFilterChange('originId', 6)} />
                      </td>
                      <td><label htmlFor="uc">Úc</label></td>
                    </tr>
                    <tr>
                      <td className="w-15 py-1">
                        <input type="checkbox" id='nuockhac' onChange={() => handleFilterChange('originId', 7)} />
                      </td>
                      <td><label htmlFor="nuockhac">Khác</label></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {products !== null && products.length > 0 ? (
            <div className="col-md-10">
              <div className="row">
                {products.map((p) => (
                <div key={p.id} className="col-md-3 p-3 mt-3">
                  <div className="product-image text-center px-3 py-2 position-relative">
                    <Link to={{pathname: `/product/${p.id}`}}>
                      <img
                        src={p.image}
                        alt=""
                        className="w-75"
                        style={{ height: "13em" }}
                      />
                    </Link>
                    <a
                      href="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </a>
                  </div>
                  <Link
                    to="#"
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
                            color={star <= p.ratingAver ? 'gold' : 'lightgrey'}
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
                

                {/* <div className="col-md-3 p-3 mt-3">
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
                </div> */}

              </div>
            </div>
            ) : (
              <div className="col-md-10 text-center">
          
                <div
                  className="d-inline-block p-5"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px dotted black",
                    borderRadius: "15px",
                  }}
                >
                  <div className="d-flex flex-column align-items-center p-3">
                    <img src={sorry} alt="" className="w-50" />
                    <span
                      className="text-center fs-4 pt-3"
                      style={{
                        fontFamily: "sans-serif",
                      }}
                    >
                      Không tìm thấy sản phẩm
                    </span>
                  </div>
                </div>
        </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;