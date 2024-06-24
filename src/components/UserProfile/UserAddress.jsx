import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserAddress.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
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

      const handleAddressChange = (e, id, oldAddress) => {
        const updatedAddress = e.target.value;
      
        if (updatedAddress === null || updatedAddress.trim() === "") {
          setCurrentAddress({ id, address1: oldAddress, isMainAddress: currentAddress.isMainAddress });
        } else {
          setCurrentAddress({ id, address1: updatedAddress, isMainAddress: currentAddress.isMainAddress });
          setAddressList(addressList.map(a => a.id === id ? { ...a, address1: updatedAddress } : a));
        }
      };
      
      
      

      const handleMainAddressChange = (id) => {
        setCurrentAddress((prevState) => ({
          ...prevState,
          id,
          isMainAddress: true,
        }));
    
        setAddressList(addressList.map(a => ({
          ...a,
          isMainAddress: a.id === id
        })));
      };

  const handleUpdateAdress = async () => {
    
    if (!currentAddress || !currentAddress.id || !currentAddress.address1) return;
    if ((currentAddress.address1).trim() === "") {
      notify();
      return;
    }
    
    const updateAddress = {
      id: currentAddress.id,
      newAddress: currentAddress.address1,
      isMainAddress: currentAddress.isMainAddress
  };
  console.log(updateAddress)
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
                    <div className="w-75">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value="Thêm địa chỉ mới"
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
                      onChange={(e) => handleAddressChange(e, a.id, a.inputAddress)}
                      className="w-90 px-2 py-1"
                    />
                  </td>

                  <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value="Cập nhật"
                        onClick={handleUpdateAdress}
                        className="px-3 py-1"
                      />
                    </div>
                  </td>
                  {a.isMainAddress == true ? (
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
                  ) : (
                    <td className="w-15 pe-4 pt-2">
                    <div className="w-75 pt-3">
                      <input
                        id="ButtonAdd"
                        type="submit"
                        value=" Đặc làm mặc định"
                        onClick={() => handleMainAddressChange(a.id)}
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
    </>
  );
}
export default UserAddress;
