import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBoxOpen,
  faRightFromBracket,
  faHouse,
  faPowerOff,
  faDollarSign,
  faClipboardList,
  faUsers,
  faBan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/styleadminproduct.css";
import similac from "../../assets/img/similac.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentLoader from "react-content-loader";
import UploadImage from "../UploadImage/UploadImage";
import ModalConfirmDelete from "./ModalConfirmDeleteProduct";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [inventoryPaging, setInventoryPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState(null);
  const [quantity, setQuantity] = useState(5);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [ageId, setAgeId] = useState(null);
  const [originId, setOriginId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [cateId, setCateId] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [username, setUsername] = useState("");
  const [searchCate, setSearchCate] = useState(null);
  const [searchOrigin, setSearchOrigin] = useState(null);
  const [searchIsActive, setSearchIsActive] = useState(null);
  const [searchBrand, setSearchBrand] = useState(null);
  const [searchAge, setSearchAge] = useState(null);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [statusProduct, setStatusProduct] = useState(null);
 
  const TableLoading = () => (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={160}
      backgroundColor="#C0C0C0"
      foregroundColor="#d9d9d9"
    >
      <rect x="0" y="20" rx="3" ry="3" width="100%" height="10" />
      <rect x="0" y="40" rx="3" ry="3" width="100%" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="100%" height="10" />
    </ContentLoader>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const roleFromLocalStorage = localStorage.getItem("userRole");
    const usernameFromLocalStorage = localStorage.getItem("userName");
    if (
      roleFromLocalStorage === "ADMIN" ||
      roleFromLocalStorage === "STAFF" ||
      (roleFromLocalStorage === "USER" && usernameFromLocalStorage)
    ) {
      setUsername(usernameFromLocalStorage);
      setRoleName(roleFromLocalStorage);
    }
  }, [pathname]);

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
        try {
          const responseCate = await fetch(
            "https://littlejoyapi.azurewebsites.net/api/category?PageIndex=1&PageSize=9"
          );
          if (!responseCate.ok) {
            return;
          }
          const categoryData = await responseCate.json();
          setCategories(categoryData);
          setCategoriesLoaded(true);

          const responseOrigin = await fetch(
            "https://littlejoyapi.azurewebsites.net/api/origin?PageIndex=1&PageSize=9"
          );
          if (!responseOrigin.ok) {
            return;
          }
          const originData = await responseOrigin.json();
          setOrigins(originData);

          const responseAge = await fetch(
            "https://littlejoyapi.azurewebsites.net/api/age-group-product?PageIndex=1&PageSize=9"
          );
          if (!responseAge.ok) {
            return;
          }
          const ageData = await responseAge.json();
          setAgeGroups(ageData);

          const responseBrand = await fetch(
            "https://littlejoyapi.azurewebsites.net/api/brand?PageIndex=1&PageSize=9"
          );
          if (!responseBrand.ok) {
            return;
          }
          const brandData = await responseBrand.json();
          setBrands(brandData);
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      
    };

    fetchCategories();
  }, []);

  const fetchData = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (searchCate != null) searchParams.append("cateId", searchCate);
      if (searchOrigin != null) searchParams.append("originId", searchOrigin);
      if (searchAge != null) searchParams.append("ageId", searchAge);
      if (searchBrand != null) searchParams.append("brandId", searchBrand);
      if (statusProduct != null) searchParams.append("IsActive", statusProduct);
      searchParams.append("PageIndex", pageIndex);
      searchParams.append("PageSize", pageSize);

      if (keyword) searchParams.append("keyword", keyword);

      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product/filter?PageIndex=${pageIndex}&PageSize=9&${searchParams.toString()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setProducts([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          setProducts([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationData = await JSON.parse(
        response.headers.get("X-Pagination")
      );
      setPaging(paginationData);

      const dataProducts = await response.json();
      const formattedProducts = await dataProducts.map((product) => {
        const category = categories.find((c) => c.id == product.cateId);
        return {
          ...product,
          price: formatPrice(product.price),
          categoryName: category ? category.categoryName : "Khác",
        };
      });
      setProducts(formattedProducts);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoriesLoaded) {
      fetchData(paging.CurrentPage, paging.PageSize);
    }
  }, [
    categoriesLoaded,
    paging.CurrentPage,
    keyword,
    searchCate,
    searchAge,
    searchBrand,
    searchOrigin,
    statusProduct
  ]);

  const formatPrice = (price) => {
    return price.toLocaleString("de-DE");
  };

  const ProductName = ({ title, maxLength }) => {
    const truncateTitle = (title, maxLength) => {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + "...";
    };
    return <>{truncateTitle(title, maxLength)}</>;
  };

  const handlePageChange = (newPage) => {
    setPaging((prev) => ({
      ...prev,
      CurrentPage: newPage,
    }));
  };

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

  const refreshFieldAddProduct = () => {
    setProductName("");
    setPrice("");
    setDescription("");
    setWeight("");
    setQuantity(1);
    setImage("");
    setIsActive("");
    setAgeId("");
    setBrandId("");
    setCateId("");
    setOriginId("");
  };

  const handleAddProduct = async () => {
    if (
      productName.trim() === "" ||
      price.trim() === "" ||
      description.trim() === "" ||
      weight.trim() === "" ||
      image.trim() === ""
    ) {
      notify();
      return;
    }

    const newProduct = {
      productName: productName,
      price: parseFloat(price),
      description: description,
      weight: parseInt(weight),
      quantity: quantity,
      image: image,
      isActive: isActive,
      ageId: ageId,
      originId: originId,
      brandId: brandId,
      cateId: cateId,
    };

    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (response.ok) {
        toast.success("Sản phẩm được tạo thành công!");
        fetchData(paging.CurrentPage, paging.PageSize);
        setProductName("");
        setPrice("");
        setDescription("");
        setWeight("");
        setQuantity(1);
        setImage("");
        setIsActive("");
        setAgeId("");
        setBrandId("");
        setCateId("");
        setOriginId("");
      } else {
      }
      const result = await response.json();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleUploadComplete = (url) => {
    setImage(url);
  };

  const handleEditProduct = (productId) => {
    fetchProductDetails(productId);
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product/${productId}`
      );
      const data = await response.json();
      setSelectedProduct(data);
      setProductName(data.productName);
      setType(data.type);
      setPrice(data.price);
      setWeight(data.weight);
      setQuantity(data.quantity);
      setDescription(data.description);
      setImage(data.image);
      setIsActive(data.isActive);
      setAgeId(data.ageId);
      setOriginId(data.originId);
      setBrandId(data.brandId);
      setCateId(data.cateId);
    } catch (error) {
      console.error("Lỗi fetch product details", error);
    } finally {
    }
  };

  const handleSaveUpdateProduct = async () => {
    if (
      productName === "" ||
      price === "" ||
      description === "" ||
      weight === "" ||
      image === ""
    ) {
      notify();
      return;
    }
    const updatedProduct = {
      id: selectedProduct.id,
      productName,
      type,
      price,
      weight,
      quantity,
      description,
      image,
      isActive,
      ageId,
      originId,
      brandId,
      cateId,
    };

    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/product",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        toast.success("Sản phẩm được sửa thành công!");
        fetchData(paging.CurrentPage, paging.PageSize);
      } else {
        const errorData = await response.json();
        toast.error("Sản phẩm được sửa thất bại!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/product?Id=${idToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchData(paging.CurrentPage, paging.PageSize);
        toast.success("Sản phẩm được xóa thành công!");
      } else {
        toast.error("Xóa sản phẩm thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalOpen(false);
    }
  };


  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div style={{ background: "#151C2C" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 nav-admin-left">
              <div className="logo-admin d-flex justify-content-center w-100 mt-3">
                <Link to="/">
                  <p
                    className="logo-admin-left d-inline-block p-1 m-0"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    LITTLE JOY
                  </p>
                  <p
                    className="d-inline-block logo-admin-right ms-2"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    ADMIN
                  </p>
                </Link>
              </div>
              <div className="nav-admin mt-5 w-100">
                <table className="w-100">
                  <tbody>
                    {roleName == "ADMIN" && (
                    <>
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span
                          className="nav-admin-title"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          Main
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 hover-dashboard ps-3">
                        <Link to="/dashboard">
                          <span style={{ fontFamily: "sans-serif" }}>
                            Dashboard
                          </span>
                        </Link>
                      </td>
                    </tr>
                    </>)}
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span
                          className="nav-admin-title"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          Shop
                        </span>
                      </td>
                    </tr>
                    {roleName == "ADMIN" && (
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageuser">
                          <FontAwesomeIcon icon={faUser} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý người dùng
                          </span>
                        </Link>
                      </td>
                    </tr>
                    )}
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageorder">
                          <FontAwesomeIcon icon={faCartShopping} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý đơn hàng
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 active-admin ">
                        <Link to="/manageproduct">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý sản phẩm
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/managecategory">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý danh mục
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageblog">
                          <FontAwesomeIcon icon="fa-solid fa-paste" />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Quản lý bài viết
                          </span>
                        </Link>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="py-2">
                        <Link
                          to="/"
                          style={{ textDecoration: "none" }}
                          className="text-white"
                          onClick={handleLogout}
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to="/"
                          style={{ textDecoration: "none" }}
                          className="text-white"
                          onClick={handleLogout}
                        >
                          <span>Logout</span>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-10">
              <div className="row top-nav">
                <div className="col-md-2 text-center">
                  <div className="dashboard p-2 py-3">
                    <span  className="text-white">
                      <p
                        className="m-0"
                        style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                      >
                        Dashboard
                      </p>
                    </span>
                  </div>
                </div>
                <div className="col-md-8 d-flex align-content-center">
                  <div className="icon-nav p-2 py-3">
                    <FontAwesomeIcon icon="fa-solid fa-house" className="text-white"></FontAwesomeIcon>
                  </div>
                  <div className="pos-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Home
                    </p>
                    <span style={{ fontFamily: "sans-serif" }}>
                      /Product Management
                    </span>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-content-center justify-content-center">
                  <div className="pos-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      {username}
                    </p>
                  </div>
                  <div className="icon-nav-log p-2 py-3 text-white">
                    <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} style={{cursor: 'pointer'}}  />
                  </div>
                </div>
                <div className="col-md-12 p-0">
                  <div className="flex-content text-center w-100">
                    <div className="body-top w-100">
                      <div className="body-title d-flex justify-content-between align-items-center w-100">
                        <span
                          className="ms-3"
                          style={{
                            color: "#F8B940",
                            fontSize: "16px",
                            fontFamily: "sans-serif",
                          }}
                        >
                          Product Management
                        </span>
                        <div
                          className="add-product px-3 py-1 me-3"
                          data-bs-toggle="modal"
                          data-bs-target="#add-product"
                        >
                          <Link to="#">
                            <p
                              className="m-0 inter"
                              onClick={refreshFieldAddProduct}
                              style={{
                                fontSize: "16px",
                                fontFamily: "system-ui",
                              }}
                            >
                              + Add Product
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="body-center">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content-start">
                            <div className="search-user p-3">
                              <input
                                type="text"
                                className="p-1 ps-3"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search Product"
                              />
                            </div>
                            <div className="filter-status p-3">
                              <select
                                name=""
                                id=""
                                className="p-1"
                                defaultValue=""
                                value={searchCate}
                                onChange={(e) => setSearchCate(e.target.value)}
                              >
                                <option value="" selected disabled>
                                  Category
                                </option>
                                {categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.categoryName}
                                  </option>
                                ))}
                                <option value="">Không</option>
                              </select>
                            </div>
                            <div className="filter-status p-3">
                              <select
                                name=""
                                id=""
                                className="p-1"
                                defaultValue=""
                                value={searchOrigin}
                                onChange={(e) =>
                                  setSearchOrigin(e.target.value)
                                }
                              >
                                <option value="" selected disabled>
                                  Origin
                                </option>
                                {origins.map((o) => (
                                  <option key={o.id} value={o.id}>
                                    {o.originName}
                                  </option>
                                ))}
                                <option value="">Không</option>
                              </select>
                            </div>
                            <div className="filter-status p-3">
                              <select
                                name=""
                                id=""
                                className="p-1"
                                defaultValue=""
                                value={searchBrand}
                                onChange={(e) => setSearchBrand(e.target.value)}
                              >
                                <option value="" selected disabled>
                                  Brand
                                </option>
                                {brands.map((b) => (
                                  <option key={b.id} value={b.id}>
                                    {b.brandName}
                                  </option>
                                ))}
                                <option value="">Không</option>
                              </select>
                            </div>
                            <div className="filter-status p-3">
                              <select
                                name=""
                                id=""
                                className="p-1"
                                defaultValue=""
                                value={searchAge}
                                onChange={(e) => setSearchAge(e.target.value)}
                              >
                                <option value="" selected disabled>
                                  Age Group
                                </option>
                                {ageGroups.map((ag) => (
                                  <option key={ag.id} value={ag.id}>
                                    {ag.ageRange}
                                  </option>
                                ))}
                                <option value="">Không</option>
                              </select>
                            </div>
                            <div className="filter-status p-3">
                              <select
                                name=""
                                id=""
                                className="p-1"
                                defaultValue=""
                                value={statusProduct}
                                onChange={(e) => setStatusProduct(e.target.value)}
                                >
                                <option value="" selected disabled>
                                  Trạng thái sản phẩm
                                </option>
                                <option value="1">
                                  Đang hoạt động
                                </option>
                                <option value="0">
                                  Không hoạt động
                                </option>
                                <option value="">Không</option>
                                  </select>
                                </div>
                            
                          </div>
                          <div className="col-md-12 p-0">
                            <table className="w-100 table-body">
                              <tbody>
                                <tr className="table-header">
                                  <td className="p-3 px-4">
                                    <span className="float-start">
                                      ProductID
                                    </span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Name</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Type</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span>Quantity</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span className="float-start">Price</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span>Rating</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span>Image</span>
                                  </td>
                                  <td className="p-3 px-4 description-product">
                                    <span>Description</span>
                                  </td>
                                  <td className="p-3 px-4 ">
                                    <span>Action</span>
                                  </td>
                                </tr>
                                {loading ? (
                                  <>
                                    <tr>
                                      <td colSpan="8" className="px-3">
                                        <TableLoading />
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  products.map((p) => (
                                    <tr key={p.id} className="table-content">
                                      <td className="p-3 px-4 ">
                                        <span className="float-start">
                                          {p.id}
                                        </span>
                                      </td>
                                      <td className="p-3 px-4 ">
                                        <span className="float-start">
                                          <Link
                                            to={{
                                              pathname: `/product/${p.id}`,
                                            }}
                                            style={{
                                              textDecoration: "none",
                                              color: "inherit",
                                            }}
                                          >
                                            <ProductName
                                              title={p.productName}
                                              maxLength={20}
                                            />
                                          </Link>
                                        </span>
                                      </td>
                                      <td className="p-3 px-4 ">
                                        <span className="float-start">
                                          {p.categoryName}
                                        </span>
                                      </td>
                                      <td className="p-3 px-4 ">
                                        <span>{p.quantity}</span>
                                      </td>
                                      <td className="p-3 px-4 ">
                                        <span className="float-start">
                                          {p.price} VND
                                        </span>
                                      </td>
                                      <td className="p-3 px-4 ">
                                        <span>{p.ratingAver}.0</span>
                                      </td>
                                      <td className="w-10">
                                        <div className="img-product">
                                          <img src={p.image} alt="" />
                                        </div>
                                      </td>
                                      <td className="p-3 px-4 description-product">
                                        <span>{p.description}</span>
                                      </td>
                                      <td className="p-3 px-4 d-flex justify-content-center">
                                        <div
                                          className="edit-product p-2"
                                          style={{ cursor: "pointer" }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit-product"
                                          onClick={() =>
                                            handleEditProduct(p.id)
                                          }
                                        >
                                          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                        </div>
                                        <div
                                          className="delete-product p-2"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-trash"
                                            onClick={() =>
                                              handleDeleteProduct(p.id)
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>

                          <div>
                           
                            {/* Paging for data */}
                            <div className="col-md-12 d-flex justify-content-end paging p-2">
                              {Array.from({ length: paging.TotalPages }, (_, index) => (
                                <Link
                                  key={index + 1}
                                  to="#"
                                  className={`p-2 me-3 ${
                                    paging.CurrentPage === index + 1 ? "active-paging" : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(index + 1);
                                  }}
                                >
                                  {index + 1}
                                </Link>
                              ))}
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

        {/* <!-- Modal add product --> */}
        <div className="modal" id="add-product">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="py-2 header-modal d-flex justify-content-between">
                <h4 className="modal-title inter ms-3">Product Add</h4>
                <div className="btn-close-modal me-3" data-bs-dismiss="modal">
                  <FontAwesomeIcon icon={faX} />
                </div>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <div className="p-2">
                  <table className="w-100 table-modal">
                    <tbody>
                      <tr>
                        <td className="w-20">
                          <span className="py-2">Name:</span>
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Type:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={cateId}
                            onChange={(e) =>
                              setCateId(parseInt(e.target.value))
                            }
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Price:</span>
                        </td>
                        <td className="py-2">
                          <input
                            type="number"
                            className="ps-2 p-1 w-100"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Quantity:</span>
                        </td>
                        <td>
                          <div className="btn-quantity w-100 d-flex justify-content-start p-2">
                            <div
                              className="btn btn-secondary rounded-0 w-10 text-center p-2"
                              id="quantity-down"
                              onClick={() =>
                                setQuantity(quantity > 0 ? quantity - 1 : 0)
                              }
                            >
                              <span>-</span>
                            </div>
                            <div className="button w-15">
                              <input
                                type="number"
                                className="text-center w-100 p-2"
                                id="quantity1"
                                value={quantity === "" ? 1 : quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  setQuantity(value >= 0 ? value : 0);
                                }}
                              />
                            </div>
                            <div
                              className="btn btn-secondary rounded-0 w-10 text-center p-2"
                              id="quantity-up"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <span>+</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Description:</span>
                        </td>
                        <td className="py-2">
                          <textarea
                            style={{ background: "#151C2C", color: "white" }}
                            rows="4"
                            className="w-100 p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Weight:</span>
                        </td>
                        <td className="py-2">
                          <input
                            type="number"
                            style={{ background: "#151C2C", color: "white" }}
                            className="w-100 p-2"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">URL image:</span>
                        </td>
                        <td className="py-2">
                          <UploadImage
                            aspectRatio={4 / 5}
                            onUploadComplete={handleUploadComplete}
                            maxWidth={10000}
                            maxHeight={10000}
                            minWidth={126}
                            minHeight={126}
                          />
                          <div>
                            <img src={image} alt="" className="w-50"></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Age:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={ageId}
                            onChange={(e) => setAgeId(parseInt(e.target.value))}
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            {ageGroups.map((ag) => (
                              <option key={ag.id} value={ag.id}>
                                {ag.ageRange}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Origin:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={originId}
                            onChange={(e) =>
                              setOriginId(parseInt(e.target.value))
                            }
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            {origins.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.originName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Brand:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={brandId}
                            onChange={(e) =>
                              setBrandId(parseInt(e.target.value))
                            }
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            {brands.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.brandName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">IsActive:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-50"
                            value={isActive}
                            onChange={(e) =>
                              setIsActive(e.target.value === "true")
                            }
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="footer-modal py-4 d-flex justify-content-end">
                <div className="close me-4">
                  <div
                    className="modal-btn-close p-2 px-4"
                    data-bs-dismiss="modal"
                  >
                    <span>Close</span>
                  </div>
                </div>
                <div className="save-modal me-4">
                  <input
                    onClick={handleAddProduct}
                    type="submit"
                    data-bs-dismiss="modal"
                    value="Save"
                    className="input-submit modal-btn-close p-2 px-4 inter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- modal edit product --> */}
        <div className="modal" id="edit-product">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="py-2 header-modal d-flex justify-content-between">
                <h4 className="modal-title inter ms-3">Product Modify</h4>
                <div className="btn-close-modal me-3" data-bs-dismiss="modal">
                  <FontAwesomeIcon icon={faX} />
                </div>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <div className="p-2">
                  <table className="w-100 table-modal">
                    <tbody>
                      <tr>
                        <td className="w-20">
                          <span className="py-2">Name:</span>
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Type:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={cateId}
                            onChange={(e) =>
                              setCateId(parseInt(e.target.value))
                            }
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Price:</span>
                        </td>
                        <td className="py-2">
                          <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Quantity:</span>
                        </td>
                        <td>
                          <div className="btn-quantity w-100 d-flex justify-content-start p-2">
                            <div
                              className="btn btn-secondary rounded-0 w-10 text-center p-2"
                              id="quantity-down"
                              onClick={() =>
                                setQuantity(quantity > 0 ? quantity - 1 : 0)
                              }
                            >
                              <span>-</span>
                            </div>
                            <div className="button w-15">
                              <input
                                type="number"
                                className="text-center w-100 p-2"
                                id="quantity1"
                                value={quantity === "" ? 1 : quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  setQuantity(value >= 0 ? value : 0);
                                }}
                              />
                            </div>
                            <div
                              className="btn btn-secondary rounded-0 w-10 text-center p-2"
                              id="quantity-up"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <span>+</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Description:</span>
                        </td>
                        <td className="py-2">
                          <textarea
                            style={{ background: "#151C2C", color: "white" }}
                            rows="4"
                            className="w-100 p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Weight:</span>
                        </td>
                        <td className="py-2">
                          <input
                            style={{ background: "#151C2C", color: "white" }}
                            className="w-100 p-2"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">URL image:</span>
                        </td>
                        <td className="py-2">
                          <UploadImage
                            aspectRatio={4 / 5}
                            onUploadComplete={handleUploadComplete}
                            maxWidth={2048}
                            maxHeight={2048}
                            minWidth={126}
                            minHeight={126}
                            value={image}
                          />
                          <div>
                            <img
                              src={image}
                              alt=""
                              style={{ weight: "70px", height: "105px" }}
                            ></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Age:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={ageId}
                            onChange={(e) => setAgeId(parseInt(e.target.value))}
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            {ageGroups.map((ag) => (
                              <option key={ag.id} value={ag.id}>
                                {ag.ageRange}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Origin:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={originId}
                            onChange={(e) =>
                              setOriginId(parseInt(e.target.value))
                            }
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            {origins.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.originName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">Brand:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-100"
                            value={brandId}
                            onChange={(e) =>
                              setBrandId(parseInt(e.target.value))
                            }
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            {brands.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.brandName}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="py-2">IsActive:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-50"
                            value={isActive}
                            onChange={(e) =>
                              setIsActive(e.target.value === "true")
                            }
                          >
                            <option value="" selected disabled>
                              Choose
                            </option>
                            <option value="true">Đang hoạt động</option>
                            <option value="false">Không hoạt động</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="footer-modal py-4 d-flex justify-content-end">
                <div className="close me-4">
                  <div
                    className="modal-btn-close p-2 px-4"
                    data-bs-dismiss="modal"
                  >
                    <span>Close</span>
                  </div>
                </div>
                <div className="save-modal me-4">
                  <input
                    onClick={handleSaveUpdateProduct}
                    type="submit"
                    value="Save"
                    data-bs-dismiss="modal"
                    className="input-submit modal-btn-close p-2 px-4 inter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalConfirmDelete
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
};
export default ManageProduct;
