import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserAddress.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
  faX
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { current } from "@reduxjs/toolkit";

const UserAddress = () => {
  const [mainAddress, setMainAddress] = useState({});
  const [addressList, setAddressList] = useState([]);
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [error, setError] = useState('');
  const [currentAddress, setCurrentAddress] = useState({ id: null, address1: '', isMainAddress: false });
  const [addressName, setAddressName] = useState('');
  const [statusAddress, setStatusAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({});

  const fetchMainAddress = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/address/main-address-by-user-id/${userId}`)

      const data = await response.json();
      if (response.ok) {
        setMainAddress(data);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchMainAddress();
  }, []);

  const fetchAddressList = async (pageIndex) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/address/user-id/${userId}?PageIndex=${pageIndex}&PageSize=5`)

      const paginationData = JSON.parse(response.headers.get("X-Pagination"));
      setPaging(paginationData);
  
      const previous = document.getElementById("address-pre");
      const next = document.getElementById("address-next");
  
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

      const data = await response.json();
      if (response.ok) {
        setAddressList(data);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAddressList(paging.CurrentPage);
  }, [paging.CurrentPage]);

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

  //UPDATE ADDRESS
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

      const handleEditAdress = (addressId) => {
        fetchAddressById(addressId);
      };
    
      const fetchAddressById = async (addressId) => {
        try {
          const response = await fetch(
            `https://littlejoyapi.azurewebsites.net/api/address/${addressId}`
          );
          const data = await response.json();
          setSelectedAddress(data);
          setAddressName(data.address1);
          setStatusAddress(data.isMainAddress);
        } catch (error) {
          console.error("Lỗi fetch product details", error);
        } 
      };

  const handleUpdateAdress = async () => {
    if (addressName.trim() === "") {
      notify();
      return;
    }
    
    const updateAddress = {
      id: selectedAddress.id,
      newAddress: addressName.trim(),
      isMainAddress: statusAddress
  };
    try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateAddress)
      });
      if (response.ok) {
        toast.success('Địa chỉ được sửa thành công!');
        fetchAddressList(paging.CurrentPage);
      } else {
          toast.error('Địa chỉ được sửa thất bại!');
      }
      

    } catch (error) {
      console.log(error.message)
    }
  }

  //ADD NEW ADDRESS
  const handleAddAddress = async () => {
    if (
        addressName.trim() === ""
      ) {
        notify();
        return;
      }

    const newAddress = {
      userId: localStorage.getItem('userId'),
      address1: addressName
    };

    try {
      const response = await fetch('https://littlejoyapi.azurewebsites.net/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });
      
      if (response.ok) {
        toast.success('Địa chỉ mới được tạo thành công!');
        fetchAddressList(paging.CurrentPage);
        setAddressName('');
      } else {
        toast.error('Thêm địa chỉ mới thất bại');
      }
      const result = await response.json();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const refreshFiledAddAddress = () => {
    setAddressName('');
  }

  // DELETE ADDRESS 
  const handleDeleteAdress = (addressId) => {
    fetchAddressById(addressId);
  };

  const handleConfirmDeleteAddress = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/address?Id=${selectedAddress.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchAddressList(paging.CurrentPage, paging.PageSize);
        toast.success('Địa chỉ được xóa thành công!')
      } else {
        toast.error("Xóa địa chỉ thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <>
      <ToastContainer />

      {/* <!-- User Info--> */}
      
          {/* <!-- User Info Side Bar--> */}
          

          {/* <!-- Address info --> */}
          
            <table className="w-100 mt-5">
              <tbody>
                <tr>
                  <td colSpan="5">
                    <span className="fs-4">Địa chỉ nhận hàng</span>
                  </td>
                  <td className="w-15 pe-4">
                    <div className="w-75" data-bs-toggle="modal" data-bs-target="#add-address">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value="Thêm địa chỉ mới"
                        onClick={refreshFiledAddAddress}
                        className="px-4 py-1"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-2" colSpan="6">
                    <div
                      className="w-100 h-100 d-flex justify-content-center"
                      style={{ borderBottom: "1px solid black" }}
                    ></div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-3" colSpan="6">
                    <span className="fs-5">Địa chỉ</span>
                  </td>
                </tr>
                {addressList.map((a) => (
                <tr key={a.id}>
                  <td className="pt-4" colSpan="3">
                    <input
                      type="text"
                      name=""
                      id="inputAddress"
                      value={a.address1}
                      className="w-90 px-2 py-1"
                    />
                  </td>

                  <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value="Cập nhật"
                        data-bs-toggle="modal" data-bs-target="#edit-address"
                        onClick={() => handleEditAdress(a.id)}
                        className="px-3 py-1"
                      />
                    </div>
                  </td>
                  <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value="Xóa địa chỉ"
                        onClick={() => handleDeleteAdress(a.id)}
                        data-bs-toggle="modal" data-bs-target="#delete-address"
                        className="px-3 py-1"
                      />
                    </div>
                  </td>
                  {a.isMainAddress == true && (
                  <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAddSpecial"
                        type="submit"
                        value="Mặc định"
                        
                        className="px-3 py-1"
                      />
                    </div>
                  </td>
                 
                  )}
                  <td></td>
                </tr>
                ))}
                {/* <tr className="pt-2">
                  <td className="pt-4" colSpan="3">
                    <input
                      type="text"
                      name=""
                      id="inputAddress"
                      value="S1.02 vinhomes grandpark, Long Thạnh Mỹ"
                      className="w-90 px-2 py-1"
                    />
                  </td>

                  <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value="Cập nhật"
                        className="px-3 py-1"
                      />
                    </div>
                  </td>

                  <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value=" Đặc làm mặc định"
                        className="px-3 py-1"
                      />
                    </div>
                  </td>

                  <td></td>
                </tr> */}
              </tbody>
            </table>
          
          <div className="mt-3 mb-5 py-5 roboto" style={{ fontSize: "25px" }}>
            <div className="d-inline-block float-end">
              <div className="fs-5 px-5">
                <Link className="pe-2 fs-3" to="#" style={{ color: "#3C75A6" }}>
                  <FontAwesomeIcon
                    id="address-pre"
                    icon={faSquareCaretLeft}
                    onClick={handlePrevious}
                  />
                </Link>
                <span className="px-2 fs-4" style={{ fontFamily: "Roboto" }}>
                  Trang {paging.CurrentPage}
                </span>
                <Link className="ps-2 fs-3" to="#" style={{ color: "#3C75A6" }}>
                  <FontAwesomeIcon
                    id="address-next"
                    icon={faSquareCaretRight}
                    className="pe-3"
                    onClick={handleNext}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Modal add address --> */}
    <div className="modal" id="add-address">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 d-flex justify-content-between" style={{backgroundColor: 'rgba(60, 117, 166, 1)'}}>
                    <h4 className="modal-title inter ms-3" style={{color: 'white'}}>Thêm địa chỉ mới</h4>
                    <div className="btn-close-modal me-3" style={{color: 'white'}} data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{backgroundColor: 'white'}}>
                <div className="p-2" >
                    <table className="w-100 table-modal" >
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2" style={{color: '#3C75A6'}}>Địa chỉ mới:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={addressName}
                            onChange={(e) => setAddressName(e.target.value)}
                            style={{backgroundColor: 'white', color:'black'}}
                            />
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end" style={{backgroundColor: 'white'}}>
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal" style={{backgroundColor: 'rgb(60, 117, 166)'}}><span>Hủy</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleAddAddress} type="submit" data-bs-dismiss="modal" value="Lưu" style={{backgroundColor: '#E33539'}} className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>

    {/* <!-- Modal edit address --> */}
    <div className="modal" id="edit-address">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 d-flex justify-content-between" style={{backgroundColor: 'rgba(60, 117, 166, 1)'}}>
                    <h4 className="modal-title inter ms-3" style={{color: 'white'}}>Cập nhật địa chỉ </h4>
                    <div className="btn-close-modal me-3" style={{color: 'white'}} data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{backgroundColor: 'white'}}>
                <div className="p-2" >
                    <table className="w-100 table-modal" >
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2" style={{color: '#3C75A6'}}>Địa chỉ:</span></td>
                        <td className="py-2">
                            <input
                            type="text"
                            className="ps-2 p-1 w-100"
                            value={addressName}
                            onChange={(e) => setAddressName(e.target.value)}
                            style={{backgroundColor: 'white', color:'black'}}
                            />
                        </td>
                        </tr>
                        <tr>
                        <td>
                          <span className="py-2" style={{color: '#3C75A6'}}>Địa chỉ mặc định:</span>
                        </td>
                        <td className="py-2">
                          <select
                            className="ps-2 p-1 w-50"
                            value={statusAddress}
                            onChange={(e) => setStatusAddress(e.target.value === "true")}
                            style={{backgroundColor: 'white', color:'black'}}
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            <option value="true">Mặc định</option>
                            <option value="false">Không mặc định</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end" style={{backgroundColor: 'white'}}>
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal" style={{backgroundColor: 'rgb(60, 117, 166)'}}><span>Hủy</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleUpdateAdress} type="submit" data-bs-dismiss="modal" value="Lưu" style={{backgroundColor: '#E33539'}} className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>

    {/* <!-- Modal delete address --> */}
    <div className="modal" id="delete-address">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="py-2 d-flex justify-content-between" style={{backgroundColor: 'rgba(60, 117, 166, 1)'}}>
                    <h4 className="modal-title inter ms-3" style={{color: 'white'}}>Xác nhận xóa địa chỉ </h4>
                    <div className="btn-close-modal me-3" style={{color: 'white'}} data-bs-dismiss="modal"><FontAwesomeIcon icon={faX} /></div>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body" style={{backgroundColor: 'white'}}>
                <div className="p-2" >
                    <table className="w-100 table-modal" >
                    <tbody>
                        <tr>
                        <td className="w-20"><span className="py-2" style={{color: '#3C75A6'}}>Bạn có chắc chắn muốn xóa địa chỉ này không?</span></td>
                      </tr>
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="footer-modal py-4 d-flex justify-content-end" style={{backgroundColor: 'white'}}>
                    <div className="close me-4">
                        <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal" style={{backgroundColor: 'rgb(60, 117, 166)'}}><span>Hủy</span></div>
                    </div>
                    <div className="save-modal me-4">
                        <input onClick={handleConfirmDeleteAddress} type="submit" data-bs-dismiss="modal" value="Xác nhận" style={{backgroundColor: '#E33539'}} className="input-submit modal-btn-close p-2 px-4 inter"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  );
}
export default UserAddress;
