import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  faX
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalConfirmDelete from "./ModalConfirmDeleteCate";
import UploadImage from "../UploadImage/UploadImage";
import ContentLoader from "react-content-loader";

const ManageCategory = () => {
  const navigate = useNavigate();
  const [manage, setManage] = useState(null);
  const [username, setUsername] = useState("");
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pagingCate, setPagingCate] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [pagingOrigin, setPagingOrigin] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [pagingAge, setPagingAge] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [pagingBrand, setPagingBrand] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [loadingCate, setLoadingCate] = useState(false);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [loadingAge, setLoadingAge] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(false);
  const totalRows = 5;
  const placeholdersCate = totalRows - categories.length;
  const placeholdersOrigin = totalRows - origins.length;
  const placeholdersAge = totalRows - ageGroups.length;
  const placeholdersBrand = totalRows - brands.length;

  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isModalOpenCate, setIsModalOpenCate] = useState(false);
  const [idCateToDelete, setIdCateToDelete] = useState(null);
  const [originName, setOriginName] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState({});
  const [isModalOpenOrigin, setIsModalOpenOrigin] = useState(false);
  const [idOriginToDelete, setIdOriginToDelete] = useState(null);
  const [ageGroup, setAgeGroup] = useState('');
  const [selectedAge, setSelectedAge] = useState({});
  const [isModalOpenAge, setIsModalOpenAge] = useState(false);
  const [idAgeToDelete, setIdAgeToDelete] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedBrand, setSelectedBrand] = useState({});
  const [isModalOpenBrand, setIsModalOpenBrand] = useState(false);
  const [idBrandToDelete, setIdBrandToDelete] = useState(null);

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
    }
  }, [pathname]);

  const fetchCategories = async (pageIndex) => {
    setLoadingCate(true);
    try {
      const responseCate = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/category?PageIndex=${pageIndex}&PageSize=5`
      );

      if (!responseCate.ok) {
        if (responseCate.status == 400 || responseCate.status == 404) {
          setCategories([]);
          setPagingCate({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          console.log("Lỗi fetch data...");
          setCategories([]);
          setPagingCate({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationCate = await JSON.parse(
        responseCate.headers.get("X-Pagination")
      );
      const previous = document.getElementById("cate-pre");
      const next = document.getElementById("cate-next");
  
      if (paginationCate.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationCate.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationCate.CurrentPage === paginationCate.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }
      setPagingCate(paginationCate);

      const dataCategories = await responseCate.json();
      setCategories(dataCategories);
      
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingCate(false);
    }
  };

  const fetchOrigins = async (pageIndex) => {
    setLoadingOrigin(true);
    try {
      const responseOrigin = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/origin?PageIndex=${pageIndex}&PageSize=5`
      );

      if (!responseOrigin.ok) {
        if (responseOrigin.status === 400 || responseOrigin.status === 404) {
          setOrigins([]);
          setPagingOrigin({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          console.log("Lỗi fetch data...");
          setOrigins([]);
          setPagingOrigin({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationOrigin = await JSON.parse(
        responseOrigin.headers.get("X-Pagination")
      );
      const previous = document.getElementById("origin-pre");
      const next = document.getElementById("origin-next");
  
      if (paginationOrigin.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationOrigin.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationOrigin.CurrentPage === paginationOrigin.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }
      setPagingOrigin(paginationOrigin);

      const dataOrigins = await responseOrigin.json();
      setOrigins(dataOrigins);
      
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingOrigin(false);
    }
  };

  const fetchAgeGroups = async (pageIndex) => {
    setLoadingAge(true);
    try {
      const responseAge = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/age-group-product?PageIndex=${pageIndex}&PageSize=5`
      );

      if (!responseAge.ok) {
        if (responseAge.status === 400 || responseAge.status === 404) {
          setAgeGroups([]);
          setPagingAge({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          console.log("Lỗi fetch data...");
          setAgeGroups([]);
          setPagingAge({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationAge = await JSON.parse(
        responseAge.headers.get("X-Pagination")
      );
      const previous = document.getElementById("age-pre");
      const next = document.getElementById("age-next");
  
      if (paginationAge.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationAge.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationAge.CurrentPage === paginationAge.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }
      setPagingAge(paginationAge);

      const dataAgeGroups = await responseAge.json();
      setAgeGroups(dataAgeGroups);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingAge(false);
    }
  };

  const fetchBrands = async (pageIndex) => {
    setLoadingBrand(true);
    try {
      const responseBrand = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/brand?PageIndex=${pageIndex}&PageSize=5`
      );

      if (!responseBrand.ok) {
        if (responseBrand.status === 400 || responseBrand.status === 404) {
          setBrands([]);
          setPagingBrand({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          console.log("Lỗi fetch data...");
          setBrands([]);
          setPagingBrand({
            CurrentPage: 1,
            PageSize: 5,
            TotalPages: 1,
            TotalCount: 0,
          });
        }
        return;
      }

      const paginationBrand = await JSON.parse(
        responseBrand.headers.get("X-Pagination")
      );
      const previous = document.getElementById("brand-pre");
      const next = document.getElementById("brand-next");
  
      if (paginationBrand.CurrentPage === 1) {
        previous.style.opacity = "0.5";
        next.style.opacity = paginationBrand.TotalPages > 1 ? "1" : "0.5";
      } else if (paginationBrand.CurrentPage === paginationBrand.TotalPages) {
        previous.style.opacity = "1";
        next.style.opacity = "0.5";
      } else {
        previous.style.opacity = "1";
        next.style.opacity = "1";
      }
      setPagingBrand(paginationBrand);

      const dataBrands = await responseBrand.json();
      setBrands(dataBrands);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingBrand(false);
    }
  };

  useEffect(() => {
    fetchCategories(pagingCate.CurrentPage);
  }, [pagingCate.CurrentPage]);

  useEffect(() => {
    fetchOrigins(pagingOrigin.CurrentPage);
  }, [pagingOrigin.CurrentPage]);

  useEffect(() => {
    fetchAgeGroups(pagingAge.CurrentPage);
  }, [pagingAge.CurrentPage]);

  useEffect(() => {
    fetchBrands(pagingBrand.CurrentPage);
  }, [pagingBrand.CurrentPage]);

  const handlePreviousCate = () => {
    if (pagingCate.CurrentPage > 1) {
      setPagingCate((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNextCate = () => {
    if (pagingCate.CurrentPage < pagingCate.TotalPages) {
      setPagingCate((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  const handlePreviousOrigin = () => {
    if (pagingOrigin.CurrentPage > 1) {
      setPagingOrigin((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNextOrigin = () => {
    if (pagingOrigin.CurrentPage < pagingOrigin.TotalPages) {
      setPagingOrigin((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  const handlePreviousAge = () => {
    if (pagingAge.CurrentPage > 1) {
      setPagingAge((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNextAge = () => {
    if (pagingAge.CurrentPage < pagingAge.TotalPages) {
      setPagingAge((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  const handlePreviousBrand = () => {
    if (pagingBrand.CurrentPage > 1) {
      setPagingBrand((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage - 1,
      }));
    }
  };

  const handleNextBrand = () => {
    if (pagingBrand.CurrentPage < pagingBrand.TotalPages) {
      setPagingBrand((prevState) => ({
        ...prevState,
        CurrentPage: prevState.CurrentPage + 1,
      }));
    }
  };

  const notify = () =>
    toast.error('Vui lòng nhập đủ thông tin', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  //Thêm xóa sửa Category
  const handleAddCategory = async () => {
    if (
        categoryName.trim() === ""
      ) {
        notify();
        return;
      }

    const newCategory = {
      categoryName: categoryName
    };

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      
      if (response.ok) {
        toast.success('Loại mới được tạo thành công!');
        fetchCategories(pagingCate.CurrentPage, pagingCate.PageSize);
        setCategoryName(null);
      } else {
        console.log('Lỗi khi tạo category mới');
      }
      const result = await response.json();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleEditCate = (cateId) => {
    fetchCateId(cateId);
};

const fetchCateId = async (cateId) => {
  try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/category/${cateId}`);
      const data = await response.json();
      setSelectedCategory(data);
      setCategoryName(data.categoryName);
  } catch (error) {
      console.error("Lỗi fetch  dữ liệu", error);
  } finally {
      
  }
};

  const handleEditCategory = async () => {
    if ( categoryName === "") {
      notify();
      return;
    }
    const updateCategory = {
      id: selectedCategory.id,
      categoryName: categoryName 
  };

  try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/category', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateCategory)
      });

      if (response.ok) {
        toast.success('Loại sản phẩm được sửa thành công!');
        fetchCategories(pagingCate.CurrentPage, pagingCate.PageSize);
      } else {
          toast.error('Loại sản phẩm được sửa thất bại!');
      }
  } catch (error) {
      console.error('Error updating category:', error);
  }}

  const handleDeleteCate = async (cateId) => {
    setIdCateToDelete(cateId);
    setIsModalOpenCate(true);
  };

  const handleCloseModalCate = () => {
    setIsModalOpenCate(false);
  };

  const handleConfirmDeleteCate = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/category?Id=${idCateToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchCategories(pagingCate.CurrentPage, pagingCate.PageSize);
        toast.success('Loại sản phẩm được xóa thành công!')
      } else {
        toast.error("Xóa loại sản phẩm thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalOpenCate(false);
    }
  };

  // Thêm xóa sửa Origin
  const handleAddOrigin = async () => {
    if (
        originName.trim() === ""
      ) {
        notify();
        return;
      }

    const newOrigin = {
      originName: originName
    };

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/origin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrigin),
      });
      
      if (response.ok) {
        toast.success('Xuất xứ mới được tạo thành công!');
        fetchOrigins(pagingOrigin.CurrentPage, pagingOrigin.PageSize);
        setOriginName(null);
      } else {
        console.log('Lỗi khi tạo origin mới');
      }
      const result = await response.json();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleEditOrigin = (originId) => {
    fetchOriginId(originId);
};

const fetchOriginId = async (originId) => {
  try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/origin/${originId}`);
      const data = await response.json();
      setSelectedOrigin(data);
      setOriginName(data.originName);
  } catch (error) {
      console.error("Lỗi fetch dữ liệu", error);
  } finally {
      
  }
};

  const handleSubmitEditCategory = async () => {
    if ( originName === "") {
      notify();
      return;
    }
    const updateOrigin = {
      id: selectedOrigin.id,
      originName: originName 
  };

  try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/origin', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateOrigin)
      });

      if (response.ok) {
        toast.success('Xuất xứ được sửa thành công!');
        fetchOrigins(pagingOrigin.CurrentPage, pagingOrigin.PageSize);
      } else {
          toast.error('Xuất xứ được sửa thất bại!');
      }
  } catch (error) {
      console.error('Error updating origin:', error);
  }}

  const handleDeleteOrigin = async (originId) => {
    setIdOriginToDelete(originId);
    setIsModalOpenOrigin(true);
  };

  const handleCloseModalOrigin = () => {
    setIsModalOpenOrigin(false);
  };

  const handleConfirmDeleteOrigin = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/origin?Id=${idOriginToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchOrigins(pagingOrigin.CurrentPage, pagingOrigin.PageSize);
        toast.success('Xuất xứ được xóa thành công!')
      } else {
        toast.error("Xóa xuất xứ thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalOpenOrigin(false);
    }
  };

  // Thêm xóa sửa AgeGroup
  const handleAddAge = async () => {
    if (
        ageGroup.trim() === ""
      ) {
        notify();
        return;
      }

    const newAge = {
      ageRange: ageGroup
    };

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/age-group-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAge),
      });
      
      if (response.ok) {
        toast.success('Nhóm tuổi mới được tạo thành công!');
        fetchAgeGroups(pagingAge.CurrentPage, pagingAge.PageSize);
        setAgeGroup(null);
      } else {
        console.log('Lỗi khi tạo ageGroup mới');
      }
      const result = await response.json();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleEditAge = (ageId) => {
    fetchAgeId(ageId);
};

const fetchAgeId = async (ageId) => {
  try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/age-group-product/${ageId}`);
      const data = await response.json();
      setSelectedAge(data);
      setAgeGroup(data.ageRange);
  } catch (error) {
      console.error("Lỗi fetch dữ liệu", error);
  } finally {
      
  }
};

  const handleSubmitEditAge = async () => {
    if ( ageGroup === "") {
      notify();
      return;
    }
    const updateAge = {
      id: selectedAge.id,
      ageRange: ageGroup 
  };

  try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/age-group-product', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateAge)
      });

      if (response.ok) {
        toast.success('Nhóm tuổi được sửa thành công!');
        fetchAgeGroups(pagingAge.CurrentPage, pagingAge.PageSize);
      } else {
          toast.error('Nhóm tuổi được sửa thất bại!');
      }
  } catch (error) {
      console.error('Error updating ageGroup:', error);
  }}

  const handleDeleteAge = async (ageId) => {
    setIdAgeToDelete(ageId);
    setIsModalOpenAge(true);
  };

  const handleCloseModalAge = () => {
    setIsModalOpenAge(false);
  };

  const handleConfirmDeleteAge = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/age-group-product?Id=${idAgeToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchAgeGroups(pagingAge.CurrentPage, pagingAge.PageSize);
        toast.success('Nhóm tuổi được xóa thành công!')
      } else {
        toast.error("Xóa nhóm tuổi thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalOpenAge(false);
    }
  };

  // Thêm xóa sửa Brand
  const handleUploadComplete = (url) => {
    setLogo(url);
  };
  const handleAddBrand = async () => {
    if (
        brandName.trim() === "" ||
        logo == null ||
        description.trim() === ""
      ) {
        notify();
        return;
      }

    const newBrand = {
      brandName: brandName,
      logo: logo,
      brandDescription: description
    };

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBrand),
      });
      
      if (response.ok) {
        toast.success('Thương hiệu mới được tạo thành công!');
        fetchBrands(pagingBrand.CurrentPage, pagingBrand.PageSize);
        setBrandName('');
        setLogo(null);
        setDescription('');
      } else {
        console.log('Lỗi khi tạo brand mới');
      }
      const result = await response.json();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleEditBrand = (brandId) => {
    fetchBrandId(brandId);
};

const fetchBrandId = async (brandId) => {
  try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/brand/${brandId}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedBrand(data);
        setBrandName(data.brandName);
        setLogo(data.logo);
        setDescription(data.brandDescription);
      }
      
  } catch (error) {
      console.error("Lỗi fetch dữ liệu", error);
  } finally {
      
  }
};

  const handleSubmitEditBrand = async () => {
    if ( brandName === "" || logo == null || description === "") {
      notify();
      return;
    }
    const updateBrand = {
      id: selectedBrand.id,
      brandName: brandName,
      logo: logo,
      brandDescription: description 
  };

  try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/brand', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateBrand)
      });

      if (response.ok) {
        toast.success('Thương hiệu được sửa thành công!');
        fetchAgeGroups(pagingAge.CurrentPage, pagingAge.PageSize);
      } else {
          toast.error('Thương hiệu được sửa thất bại!');
      }
  } catch (error) {
      console.error('Error updating ageGroup:', error);
  }}

  const handleDeleteBrand = async (brandId) => {
    setIdBrandToDelete(brandId);
    setIsModalOpenBrand(true);
  };

  const handleCloseModalBrand = () => {
    setIsModalOpenBrand(false);
  };

  const handleConfirmDeleteBrand = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/brand?Id=${idBrandToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchBrands(pagingBrand.CurrentPage, pagingBrand.PageSize);
        toast.success('Thương hiệu được xóa thành công!')
      } else {
        toast.error("Xóa thương hiệu thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalOpenBrand(false);
    }
  };


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
                      <td className="py-1 ps-3 hover-dashboard  ">
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
                      <td className="py-1 ps-3 active-admin ">
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
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/requestrefund">
                          <FontAwesomeIcon icon="fa-solid fa-credit-card" />{" "}
                          <span style={{ fontFamily: "sans-serif" }}>
                            Yêu cầu hoàn tiền
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
                    <Link to="/dashboard" className="">
                      <p
                        className="m-0"
                        style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                      >
                        Dashboard
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="col-md-8 d-flex align-content-center">
                  <div className="icon-nav p-2 py-3">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <div className="pos-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Home
                    </p>
                    <span style={{ fontFamily: "sans-serif" }}>
                      /Categories Management
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
                    <FontAwesomeIcon icon={faPowerOff} />
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
                          Categories Management
                        </span>
                      </div>
                    </div>
                    {/* Body quản lý danh mục */}
                    <div className="">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6 mb-5 ">
                            <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Category</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-category">
                                        <Link to="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Category</p></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search"/></div>
                                            <div className=" p-3 float-end">
                                              <Link
                                                className="px-3"
                                                href="#"
                                                style={{ color: "white" }}
                                              >
                                                <FontAwesomeIcon
                                                  id="cate-pre"
                                                  icon="fa-solid fa-circle-chevron-left"
                                                  className=""
                                                  onClick={handlePreviousCate}
                                                />
                                              </Link>
                                              <span style={{ fontFamily: "Poppins", color: 'white' }}>Trang {pagingCate.CurrentPage}</span>
                                              <Link className="px-3" href="#" style={{ color: "white" }}>
                                                <FontAwesomeIcon id="cate-next" icon="fa-solid fa-circle-chevron-right" onClick={handleNextCate} />
                                              </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-12 p-0">
                                            <table className="w-100 table-body">
                                                <tbody>
                                                <tr className="table-header">
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Category Name</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                {loadingCate ? (
                                                    <>
                                                        <tr>
                                                        <td colSpan="3" className="p-3 px-4">
                                                            <TableLoading />
                                                        </td>
                                                        </tr>
                                                    </>
                                                    ) : (
                                                categories.map((category) => (
                                                <tr key={category.id} className="table-content">
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{category.id}</span>
                                                  </td>
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{category.categoryName}</span>
                                                  </td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">
                                                    <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-category" onClick={() => handleEditCate(category.id)}>
                                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} />
                                                    </div>
                                                    <div className="delete-user p-2">
                                                      <FontAwesomeIcon icon="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => handleDeleteCate(category.id)} />
                                                    </div>
                                                  </td>
                                                </tr>
                                              ))
                                            )}
                                              {placeholdersCate > 0 && Array.from({ length: placeholdersCate }).map((_, index) => (
                                                <tr key={`placeholder-${index}`} className="table-content" style={{height: '72px'}}>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">&nbsp;</td>
                                                </tr>
                                              ))}
                                              
                                            
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>

                          <div className="col-md-6 mb-5 ">
                          <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Origin</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-origin">
                                        <Link to="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Origin</p></Link>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search"/></div>
                                            <div className=" p-3 float-end">
                                              <Link
                                                className="px-3"
                                                href="#"
                                                style={{ color: "white" }}
                                              >
                                                <FontAwesomeIcon
                                                  id="origin-pre"
                                                  icon="fa-solid fa-circle-chevron-left"
                                                  className=""
                                                  onClick={handlePreviousOrigin}
                                                />
                                              </Link>
                                              <span style={{ fontFamily: "Poppins", color: 'white' }}>Trang {pagingOrigin.CurrentPage}</span>
                                              <Link className="px-3" href="#" style={{ color: "white" }}>
                                                <FontAwesomeIcon id="origin-next" icon="fa-solid fa-circle-chevron-right" onClick={handleNextOrigin} />
                                              </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-12 p-0">
                                            <table className="w-100 table-body">
                                                <tbody>
                                                <tr className="table-header">
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Origin Name</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                {loadingOrigin ? (
                                                    <>
                                                        <tr>
                                                        <td colSpan="3" className="p-3 px-4">
                                                            <TableLoading />
                                                        </td>
                                                        </tr>
                                                    </>
                                                    ) : (
                                                origins.map((o) => (
                                                <tr key={o.id} className="table-content">
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{o.id}</span>
                                                  </td>
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{o.originName}</span>
                                                  </td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">
                                                    <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-origin">
                                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} onClick={() => handleEditOrigin(o.id)} />
                                                    </div>
                                                    <div className="delete-user p-2">
                                                      <FontAwesomeIcon icon="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => handleDeleteOrigin(o.id)} />
                                                    </div>
                                                  </td>
                                                </tr>
                                              ))
                                            )}
                                              {placeholdersOrigin > 0 && Array.from({ length: placeholdersOrigin }).map((_, index) => (
                                                <tr key={`placeholder-${index}`} className="table-content" style={{height: '72px'}}>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">&nbsp;</td>
                                                </tr>
                                              ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-5 ">
                          <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Age Group</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-age">
                                        <Link to="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Age Group</p></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search"/></div>
                                            <div className=" p-3 float-end">
                                              <Link
                                                className="px-3"
                                                href="#"
                                                style={{ color: "white" }}
                                              >
                                                <FontAwesomeIcon
                                                  id="age-pre"
                                                  icon="fa-solid fa-circle-chevron-left"
                                                  className=""
                                                  onClick={handlePreviousAge}
                                                />
                                              </Link>
                                              <span style={{ fontFamily: "Poppins", color: 'white' }}>Trang {pagingAge.CurrentPage}</span>
                                              <Link className="px-3" href="#" style={{ color: "white" }}>
                                                <FontAwesomeIcon id="age-next" icon="fa-solid fa-circle-chevron-right" onClick={handleNextAge} />
                                              </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-12 p-0">
                                            <table className="w-100 table-body">
                                                <tbody>
                                                <tr className="table-header">
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Age Range</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                {loadingAge ? (
                                                    <>
                                                        <tr>
                                                        <td colSpan="3" className="p-3 px-4">
                                                            <TableLoading />
                                                        </td>
                                                        </tr>
                                                    </>
                                                    ) : (
                                                ageGroups.map((ag) => (
                                                <tr key={ag.id} className="table-content">
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{ag.id}</span>
                                                  </td>
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{ag.ageRange}</span>
                                                  </td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">
                                                    <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-age">
                                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} onClick={() => handleEditAge(ag.id)} />
                                                    </div>
                                                    <div className="delete-user p-2">
                                                      <FontAwesomeIcon icon="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => handleDeleteAge(ag.id)} />
                                                    </div>
                                                  </td>
                                                </tr>
                                              ))
                                            )}
                                              {placeholdersAge > 0 && Array.from({ length: placeholdersAge }).map((_, index) => (
                                                <tr key={`placeholder-${index}`} className="table-content" style={{height: '72px'}}>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">&nbsp;</td>
                                                </tr>
                                              ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>

                          <div className="col-md-6 mb-5 ">
                          <div>
                            <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Brand</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-brand">
                                        <Link to="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}}>+ Add Brand</p></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search"/></div>
                                            <div className=" p-3 float-end">
                                              <Link
                                                className="px-3"
                                                href="#"
                                                style={{ color: "white" }}
                                              >
                                                <FontAwesomeIcon
                                                  id="brand-pre"
                                                  icon="fa-solid fa-circle-chevron-left"
                                                  className=""
                                                  onClick={handlePreviousBrand}
                                                />
                                              </Link>
                                              <span style={{ fontFamily: "Poppins", color: 'white' }}>Trang {pagingBrand.CurrentPage}</span>
                                              <Link className="px-3" href="#" style={{ color: "white" }}>
                                                <FontAwesomeIcon id="brand-next" icon="fa-solid fa-circle-chevron-right" onClick={handleNextBrand} />
                                              </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-12 p-0">
                                            <table className="w-100 table-body">
                                                <tbody>
                                                <tr className="table-header">
                                                    <td className="p-3 px-4"><span className="float-start">ID</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Brand</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Logo</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Decription</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                {loadingBrand ? (
                                                    <>
                                                        <tr>
                                                        <td colSpan="5" className="p-3 px-4">
                                                            <TableLoading />
                                                        </td>
                                                        </tr>
                                                    </>
                                                    ) : (
                                                brands.map((b) => (
                                                <tr key={b.id} className="table-content">
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{b.id}</span>
                                                  </td>
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">{b.brandName}</span>
                                                  </td>
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start"><img className="w-50" src={b.logo} alt="" ></img></span>
                                                  </td>
                                                  <td className="p-3 px-4 ">
                                                    <span className="float-start">...</span>
                                                  </td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">
                                                    <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-brand">
                                                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} onClick={() => handleEditBrand(b.id)} />
                                                    </div>
                                                    <div className="delete-user p-2">
                                                      <FontAwesomeIcon icon="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => handleDeleteBrand(b.id)} />
                                                    </div>
                                                  </td>
                                                </tr>
                                              ))
                                            )}
                                              {placeholdersBrand > 0 && Array.from({ length: placeholdersBrand }).map((_, index) => (
                                                <tr key={`placeholder-${index}`} className="table-content" style={{height: '72px'}}>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 ">&nbsp;</td>
                                                  <td className="p-3 px-4 d-flex justify-content-center">&nbsp;</td>
                                                </tr>
                                              ))}
                                                </tbody>
                                            </table>
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
                    {/*end: body-quản lý danh mục */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <!-- Modal add category --> */}
    <div className="modal" id="add-category">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Add Category</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Category Name:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleAddCategory} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {/* <!-- Modal edit category --> */}
    <div className="modal" id="edit-category">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Modify Category</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Category Name:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={categoryName}
                            onChange={(e) => setOriginName(e.target.value)}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleEditCategory} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <ModalConfirmDelete
        isOpen={isModalOpenCate}
        onClose={handleCloseModalCate}
        onConfirm={handleConfirmDeleteCate}
        title="Xác nhận xóa loại sản phẩm"
        message="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
      />

      {/* <!-- Modal add origin --> */}
    <div className="modal" id="add-origin">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Add Origin</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Origin Name:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={originName}
                            onChange={(e) => setOriginName(e.target.value)}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleAddOrigin} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {/* <!-- Modal edit origin --> */}
    <div className="modal" id="edit-origin">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Modify Origin</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Origin Name:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={originName}
                            onChange={(e) => setOriginName(e.target.value)}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleSubmitEditCategory} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <ModalConfirmDelete
        isOpen={isModalOpenOrigin}
        onClose={handleCloseModalOrigin}
        onConfirm={handleConfirmDeleteOrigin}
        title="Xác nhận xóa xuất xứ"
        message="Bạn có chắc chắn muốn xóa xuất xứ này không?"
      />

      {/* <!-- Modal add age --> */}
    <div className="modal" id="add-age">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Add Age Group</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Age Range:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleAddAge} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {/* <!-- Modal edit age --> */}
    <div className="modal" id="edit-age">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Modify Age Group</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Age Range:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleSubmitEditAge} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <ModalConfirmDelete
        isOpen={isModalOpenAge}
        onClose={handleCloseModalAge}
        onConfirm={handleConfirmDeleteAge}
        title="Xác nhận xóa nhóm tuổi"
        message="Bạn có chắc chắn muốn xóa nhóm tuổi này không?"
      />

        {/* <!-- Modal add brand --> */}
    <div className="modal" id="add-brand">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Add Brand</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Brand:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            />
                        </td>
                        </tr>
                        <tr>
                        <td><span className="py-2">Logo:</span></td>
                        <td className="py-2">
                        <UploadImage
                            aspectRatio={2 / 1}
                            onUploadComplete={handleUploadComplete}
                            maxWidth={2048}
                            maxHeight={2048}
                            minWidth={126}
                            minHeight={126}
                            value={logo}
                            />
                            <div>
                            <img src={logo} alt='' style={{weight: '70px', height: '105px'}}></img></div>
                        </td>
                        </tr>
                        <tr>
                        <td><span className="py-2">Description:</span></td>
                        <td className="py-2">
                            <textarea
                            style={{background: '#151C2C', color: 'white'}}
                            rows="4"
                            className="w-100 p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleAddBrand} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    {/* <!-- Modal edit brand --> */}
    <div className="modal" id="edit-brand">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 header-modal d-flex justify-content-between">
                    <h4 className="modal-title inter ms-3">Modify Brand</h4>
                    <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                <div className="p-2">
                    <table className="w-100 table-modal">
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2">Brand:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            />
                        </td>
                        </tr>
                        <tr>
                        <td><span className="py-2">Logo:</span></td>
                        <td className="py-2">
                        <UploadImage
                            aspectRatio={2 / 1}
                            onUploadComplete={handleUploadComplete}
                            maxWidth={2048}
                            maxHeight={2048}
                            minWidth={126}
                            minHeight={126}
                            value={logo}
                            />
                            <div>
                            <img src={logo} alt='' style={{weight: '70px', height: '105px'}}></img></div>
                        </td>
                        </tr>
                        <tr>
                        <td><span className="py-2">Description:</span></td>
                        <td className="py-2">
                            <textarea
                            style={{background: '#151C2C', color: 'white'}}
                            rows="4"
                            className="w-100 p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end">
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleSubmitEditBrand} type="submit" data-bs-dismiss="modal" value="Save" className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <ModalConfirmDelete
        isOpen={isModalOpenBrand}
        onClose={handleCloseModalBrand}
        onConfirm={handleConfirmDeleteBrand}
        title="Xác nhận xóa thương hiệu"
        message="Bạn có chắc chắn muốn xóa thương hiệu này không?"
      />

    </>
  );
};

export default ManageCategory;
