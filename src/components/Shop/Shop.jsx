import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleshop.css";
import product from "../../assets/img/product.png";
import { Link, useLocation } from "react-router-dom";
import sorry from "../../assets/img/sorry.png";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentLoader from "react-content-loader";

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
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const location = useLocation();
  const [brandId, setBrandId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [checkedBrands, setCheckedBrands] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchData = async (pageIndex, pageSize) => {
    setLoading(true);
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
  
      const previous = document.getElementById("p-pre");
      const next = document.getElementById("p-next");
  
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
      const activeProducts = dataProducts.filter(product => product.isActive);
      const formattedProducts = activeProducts.map(product => ({
        ...product,
        price: formatPrice(product.price)
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataAndSetBrandId = async () => {
      const savedBrandId = localStorage.getItem('brandId');
      if (savedBrandId) {
        setBrandIds([parseInt(savedBrandId)]);
        await fetchData(paging.CurrentPage, paging.PageSize);
        localStorage.removeItem('brandId');
      } else {
        await fetchData(paging.CurrentPage, paging.PageSize);
      }
    };
    
    fetchDataAndSetBrandId();
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

  
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCate = await fetch(
          'https://littlejoyapi.azurewebsites.net/api/category'
        );
        if (!responseCate.ok) {
          return;
        }
        const categoryData = await responseCate.json();
        setCategories(categoryData);

        const responseOrigin = await fetch(
          'https://littlejoyapi.azurewebsites.net/api/origin'
        );
        if (!responseOrigin.ok) {
          return;
        }
        const originData = await responseOrigin.json();
        setOrigins(originData);

        const responseAge = await fetch(
          'https://littlejoyapi.azurewebsites.net/api/age-group-product'
        );
        if (!responseAge.ok) {
          return;
        }
        const ageData = await responseAge.json();
        setAgeGroups(ageData);

        const responseBrand = await fetch(
          'https://littlejoyapi.azurewebsites.net/api/brand'
        );
        if (!responseBrand.ok) {
          return;
        }
        const brandData = await responseBrand.json();
        setBrands(brandData);
        
      } catch (error) {
        console.error(error.message);
      } finally {
        
      }
    };

    fetchCategories();
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

  const handleClickSortOrder = (event, id) => {
    event.preventDefault();
    setSortOrder(id);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('de-DE');
  };

  //ADD TO CART
  const addToCart = async  (product) => {
    const productData = await fetchProductById(product.id);
    if (!productData) {
      toast.error('Thêm vào giỏ hàng thất bại');
      return;
    }

    const maxQuantity = productData.quantity - 1;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(p => p.id === product.id);

    const convertPrice = parseInt(product.price.replace(/\./g, ''), 10);

    if (existingProductIndex > -1) {
      if (cart[existingProductIndex].quantity + 1 > maxQuantity) {
        toast.error(`Số lượng ${productData.productName} đã đạt giới hạn tồn kho`);
        return;
      }
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, price: convertPrice, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Sản phẩm đã được thêm vào giỏ hàng');
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
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              Sản Phẩm
            </h1>
            <div className="d-inline-block">
              <div className="d-flex align-content-between">
                <p className="px-2">
                  <Link
                    to="/"
                    style={{ color: "#103A71", textDecoration: "none" }}
                  >
                    Trang Chủ
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
                    Sản Phẩm
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
                        id="p-pre"
                        icon="fa-solid fa-circle-chevron-left"
                        className=""
                        onClick={handlePrevious}
                      />
                    </Link>
                    <span style={{ fontFamily: "Poppins" }}>Trang {paging.CurrentPage}</span>
                    <Link className="px-3" href="#" style={{ color: "#3c75a6" }}>
                      <FontAwesomeIcon id="p-next" icon="fa-solid fa-circle-chevron-right" onClick={handleNext} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-2">
              {/* FILTER CATEGORY */}
              <div className="w-100 d-flex justify-content-center item-filter-left py-4 mb-4 scroll-filter-left">
                <table className="w-75" style={{ display: 'block', maxHeight: '15em', overflowY: 'auto' }}>
                  <tbody style={{ display: 'block' }}>
                    <tr>
                      <td colSpan="2" className="pb-3 fs-5" style={{ color: "#67686C" }}>
                        <span>Loại sữa</span>
                      </td>
                    </tr>
                    {categories.map(category => (
                      <tr key={category.id} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                        <td className="w-15 py-1">
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            onChange={() => handleFilterChange('cateId', category.id)}
                          />
                        </td>
                        <td className="w-85">
                          <label htmlFor={`category-${category.id}`}>{category.categoryName}</label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FILTER BRAND */}
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-5">
                <table className="w-75" style={{ display: 'block', maxHeight: '15em', overflowY: 'auto' }}>
                  <tbody style={{ display: 'block' }}>
                    <tr>
                      <td colSpan="2" className="pb-3 fs-5" style={{ color: "#67686C" }}>
                        <span>Thương hiệu</span>
                      </td>
                    </tr>
                    {brands.map(brand => (
                      <tr key={brand.id} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                        <td className="w-15 py-1">
                          <input
                            type="checkbox"
                            id={`brand-${brand.id}`}
                            checked={brandIds.includes(brand.id)}
                            onChange={() => handleFilterChange('brandId', brand.id)}
                          />
                        </td>
                        <td className="w-85">
                          <label htmlFor={`brand-${brand.id}`}>{brand.brandName}</label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* FILTER AGE */}
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-5">
                <table className="w-75" style={{ display: 'block', maxHeight: '15em', overflowY: 'auto' }}>
                  <tbody style={{ display: 'block' }}>
                    <tr>
                      <td colSpan="2" className="pb-3 fs-5" style={{ color: "#67686C" }}>
                        <span>Theo tuổi</span>
                      </td>
                    </tr>
                    {ageGroups.map(ageGroup => (
                      <tr key={ageGroup.id} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                        <td className="w-15 py-1">
                          <input
                            type="checkbox"
                            id={`age-${ageGroup.id}`}
                            onChange={() => handleFilterChange('ageId', ageGroup.id)}
                          />
                        </td>
                        <td className="w-85">
                          <label htmlFor={`age-${ageGroup.id}`}>{ageGroup.ageRange}</label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FILTER ORIGIN */}
              <div className="w-100 d-flex justify-content-center item-filter-left py-3 mb-4">
                <table className="w-75" style={{ display: 'block', maxHeight: '15em', overflowY: 'auto' }}>
                  <tbody style={{ display: 'block' }}>
                    <tr>
                      <td colSpan="2" className="pb-3 fs-5" style={{ color: "#67686C" }}>
                        <span>Xuất xứ</span>
                      </td>
                    </tr>
                    {origins.map(origin => (
                      <tr key={origin.id} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                        <td className="w-15 py-1">
                          <input
                            type="checkbox"
                            id={`origin-${origin.id}`}
                            onChange={() => handleFilterChange('originId', origin.id)}
                          />
                        </td>
                        <td className="w-85">
                          <label htmlFor={`origin-${origin.id}`}>{origin.originName}</label>
                        </td>
                      </tr>
                    ))}
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
                        
                      />
                    </Link>
                    {p.quantity > 0 ? (
                    <Link
                      to="#"
                      className="addcart-item position-absolute start-50 translate-middle"
                      onClick={() => addToCart(p)}
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
                    to={{pathname: `/product/${p.id}`}}
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
                

              </div>
            </div>
            ) : (
              <div className="col-md-10 text-center">
          
                <div
                  className="w-100 p-5"
                  style={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "15px",
                  }}
                >
                  <div className="d-flex flex-column align-items-center p-3" style={{border: '1px dotted #1A4CA2', borderRadius: '15px'}}>
                    <img src={sorry} alt="" className="w-10" />
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