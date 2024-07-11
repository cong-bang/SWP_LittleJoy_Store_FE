import React, { useEffect, useState } from 'react'
import '../../assets/css/styleadminuser.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faBoxOpen, faRightFromBracket, faHouse, faPowerOff, faDollarSign, faClipboardList, faUsers, faBan } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import UploadImage from "../UploadImage/UploadImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirmDelete from "../ManageCategory/ModalConfirmDeleteCate";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [paging, setPaging] = useState({
    CurrentPage: 1,
    PageSize: 9,
    TotalPages: 1,
    TotalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const { pathname } = useLocation();
  const [myAccount, setMyAccount] = useState("");
  const [searchRole, setSearchRole] = useState(null);
  const [statusAcc, setStatusAcc] = useState(null);
  const [rolesLoaded, setRolesLoaded] = useState(false);
  const [mess, setMess] = useState(''); 
  const [searchUserName, setSearchUserName] = useState(null);
  const [searchFullName, setSearchFullName] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState(null);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mainAddress, setMainAddress] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpenUser, setIsModalOpenUser] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState(null);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const roleFromLocalStorage = localStorage.getItem("userRole");
    const usernameFromLocalStorage = localStorage.getItem("userName");
    if (
      roleFromLocalStorage === "ADMIN" ||
      roleFromLocalStorage === "STAFF" ||
      (roleFromLocalStorage === "USER" && usernameFromLocalStorage)
    ) {
      setMyAccount(usernameFromLocalStorage);
      setRoleName(roleFromLocalStorage);
    }
  }, [pathname]);

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
    setLoading(true);
    const fetchRole = async () => {
        try {
          const responseRole = await fetch(
            "https://littlejoyapi.azurewebsites.net/api/role"
          );
          if (!responseRole.ok) {
            return;
          }
          const roleData = await responseRole.json();
          setRoles(roleData);
          setRolesLoaded(true);
          
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
    };
    fetchRole();
  }, [])

  const fetchAddress = async (userId) => {
    try {
      const response = await fetch(`https://littlejoyapi.azurewebsites.net/api/address/main-address-by-user-id/${userId}`);
      if (response.ok) {
        const address = await response.json();
        return address;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const fetchData = async (pageIndex, pageSize) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (searchRole != null) searchParams.append("roleId", searchRole);
      if (statusAcc != null) searchParams.append("status", statusAcc);
      if (searchUserName) searchParams.append("userName", searchUserName);
      if (searchFullName) searchParams.append("fullName", searchFullName);
      // searchParams.append("PageIndex", pageIndex);
      // searchParams.append("PageSize", pageSize);

      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user?PageIndex=${pageIndex}&PageSize=9&${searchParams.toString()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setUsers([]);
          setPaging({
            CurrentPage: 1,
            PageSize: 9,
            TotalPages: 1,
            TotalCount: 0,
          });
        } else {
          setUsers([]);
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

      const dataUsers = await response.json();
      const formattedUsers = await Promise.all(dataUsers.map(async (user) => {
        const role = roles.find((r) => r.id == user.roleId);
        const address = await fetchAddress(user.id);
        return {
          ...user,
          roleName: role ? role.roleName : "USER",
          addressName: address ? address.address1 : "Chưa có địa chỉ"
        };
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(rolesLoaded) {
      fetchData(paging.CurrentPage, paging.PageSize);
    }
  }, [paging.CurrentPage, searchRole, statusAcc, rolesLoaded, searchUserName, searchFullName]);

  const handlePageChange = (newPage) => {
    setPaging((prev) => ({
      ...prev,
      CurrentPage: newPage,
    }));
  };
  
  //ADD NEW USER
  const handleUploadComplete = (url) => {
    setAvatar(url);
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

  const handleAddUser = async () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      notify();
      return;
    }

    const newUser = {
      username: username,
      password: password,
      fullname: fullname,
      roleId: roleId,
      email: email,
      avatar: avatar,
      phoneNumber: phoneNumber,
      mainAddress: mainAddress
    };
    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      const result = await response.json();
      
      if (response.ok) {
        toast.success("Người dùng mới được tạo thành công!");
        fetchData(paging.CurrentPage, paging.PageSize);
        setUsername('');
        setPassword('');
        setFullname('');
        setAvatar('');
        setRoleId(null);
        setPhoneNumber('');
        setMainAddress('');
        setEmail('');
      } else {
        
        toast.error(result.message);
      }
      
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const refreshFieldAddUser = () => {
    setUsername('');
    setPassword('');
    setFullname('');
    setAvatar('');
    setRoleId('');
    setPhoneNumber('');
    setMainAddress('');
    setEmail('');
    
  }

  //EDIT USER
  const handleEditUser = (userId) => {
    fetchUserById(userId);
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user/${userId}`
      );
      const responseMainAddress = await fetch(`https://littlejoyapi.azurewebsites.net/api/address/main-address-by-user-id/${userId}`)
      const data = await response.json();
      const dataMainAddress = await responseMainAddress.json();
      if (response.ok) {
        setSelectedUser(data);
        setUsername(data.userName);
        setFullname(data.fullname);
        setAvatar(data.avatar);
        setRoleId(data.roleId);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
        setStatus(data.status)
      }
      if (responseMainAddress.ok) {
        setMainAddress(dataMainAddress.address1);
      } 

      if(!responseMainAddress.ok) {
        setMainAddress('');
      }
    } catch (error) {
      console.error("Lỗi fetch user by id", error);
    }
  };

  const handleSaveUpdateUser = async () => {
    if (
      username.trim() === "" ||
      email.trim() === ""
    ) {
      notify();
      return;
    }

    const userId = localStorage.getItem('userId');
    const id = selectedUser.id;
    if (id == userId) {
      toast.error('Không thể sửa tài khoản này');
      return;
    }

    const updatedUser = {
      id: selectedUser.id,
      fullname: fullname,
      phoneNumber: phoneNumber,
      status: status,
      avatar: avatar,
      mainAddress: mainAddress,
      roleId: roleId,
    };
    try {
      const response = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/user/update-user-for-admin",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        toast.success("Người dùng được sửa thành công!");
        fetchData(paging.CurrentPage, paging.PageSize);
      } else {
        const errorData = await response.json();
        toast.error("Người dùng được sửa thất bại!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //DELETE USER
  const handleDeleteUser = async (userId) => {
    setIdUserToDelete(userId);
    setIsModalOpenUser(true);
  };

  const handleCloseModalUser = () => {
    setIsModalOpenUser(false);
  };

  const handleConfirmDeleteUser = async () => {
    try {
      const response = await fetch(
        `https://littlejoyapi.azurewebsites.net/api/user?Id=${idUserToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchData(paging.CurrentPage, paging.PageSize);
        toast.success('Người dùng được xóa thành công!')
      } else {
        toast.error("Xóa người dùng thất bại!");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsModalOpenUser(false);
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
        <div className="container-fluid  ">
        <div className="row">
        <div className="col-md-2 nav-admin-left">
              <div className="logo-admin d-flex justify-content-center w-100 mt-3">
                <a href="">
                  <p className="logo-admin-left d-inline-block p-1 m-0" style={{ fontFamily: 'sans-serif' }}>
                    LITTLE JOY
                  </p>
                  <p className="d-inline-block logo-admin-right ms-2" style={{ fontFamily: 'sans-serif' }}>ADMIN</p>
                </a>
              </div>
              <div className="nav-admin mt-5 w-100">
                <table className="w-100">
                  <tbody>
                    {roleName == "ADMIN" && (
                    <>
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span className="nav-admin-title" style={{ fontFamily: 'sans-serif' }}>Main</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 hover-dashboard ps-3">
                        <Link to="/dashboard">
                          <span style={{ fontFamily: 'sans-serif' }}>Dashboard</span>
                        </Link>
                      </td>
                    </tr>
                    </>)}
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span className="nav-admin-title" style={{ fontFamily: 'sans-serif' }}>Shop</span>
                      </td>
                    </tr>
                    {roleName == "ADMIN" && (
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 active-admin">
                        <Link to="/manageuser">
                          <FontAwesomeIcon icon={faUser} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Quản lý người dùng</span>
                        </Link>
                      </td>
                    </tr>
                    )}
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageorder">
                          <FontAwesomeIcon icon={faCartShopping} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Quản lý đơn hàng</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <Link to="/manageproduct">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Quản lý sản phẩm</span>
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
                      <Link to="/" style={{textDecoration: 'none'}} className="text-white" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                        </Link>
                      </td>
                      <td>
                      <Link to="/" style={{textDecoration: 'none'}} className="text-white" onClick={handleLogout}>
                        <span >Logout</span>
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
                                <p className="m-0" style={{ fontFamily: 'sans-serif', fontSize: '16px' }}>Dashboard</p>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-content-center">
                        <div className="icon-nav p-2 py-3">
                            <FontAwesomeIcon icon="fa-solid fa-house" className="text-white"></FontAwesomeIcon>
                        </div>
                        <div className="pos-nav d-flex align-content-center p-2 py-3">
                            <p className="m-0" style={{ fontFamily: 'sans-serif', fontSize: '16px' }}>Home</p><span style={{ fontFamily: 'sans-serif' }}>/User Management</span>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex align-content-center justify-content-center">
                        <div className="pos-nav d-flex align-content-center p-2 py-3">
                            <p className="m-0" style={{fontFamily: "sans-serif", fontSize: '16px'}}>{myAccount}</p>
                        </div>
                        <div className="icon-nav-log p-2 py-3 text-white">
                            <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} style={{cursor: 'pointer'}} />
                        </div>
                    </div>
                    <div className="col-md-12 p-0">
                        <div className="flex-content text-center w-100">
                            <div className="body-top w-100">
                                <div className="body-title d-flex justify-content-between align-items-center w-100">
                                    <span className="ms-3" style={{ color: '#F8B940', fontSize: '16px', fontFamily: 'sans-serif' }}>Users</span>
                                    <div className="add-user px-3 py-1 me-3" data-bs-toggle="modal" data-bs-target="#add-user">
                                        <a href="#"><p className="m-0 inter" style={{fontSize: '16px', fontFamily: 'system-ui'}} onClick={refreshFieldAddUser}>+ Add User</p></a>
                                    </div>
                                </div>
                            </div>
                            <div className="body-center">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-start">
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search user" value={searchUserName} onChange={(e) => setSearchUserName(e.target.value)}/></div>
                                            <div className="search-user float-start p-3"><input type="text" className="p-1 ps-3" placeholder="Search fulname" value={searchFullName} onChange={(e) => setSearchFullName(e.target.value)}/></div>
                                            <div className="filter-status p-3">
                                              <select
                                                name=""
                                                id=""
                                                className="p-1"
                                                defaultValue=""
                                                value={searchRole}
                                                onChange={(e) => setSearchRole(e.target.value)}
                                              >
                                                <option value="" selected disabled>
                                                  Role
                                                </option>
                                                {roles.map((role) => (
                                                  <option key={role.id} value={role.id}>
                                                    {role.roleName}
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
                                                value={statusAcc}
                                                onChange={(e) => setStatusAcc(e.target.value)}
                                              >
                                                <option value="" selected disabled>
                                                  Trạng thái tài khoản
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
                                                    <td className="p-3 px-4"><span className="float-start">Tên tài khoản</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Họ & tên</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Email</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Số điện thoại</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Địa chỉ</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Role</span></td>
                                                    <td className="p-3 px-4 "><span>Action</span></td>
                                                </tr>
                                                {loading ? (
                                                  <>
                                                    <tr>
                                                      <td colSpan="7" className="px-3">
                                                        <TableLoading />
                                                      </td>
                                                    </tr>
                                                  </>
                                                ) : (
                                                users.map((user) => (
                                                <tr key={user.id} className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">{user.userName}</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">{user.fullname}</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">{user.email}</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">{user.phoneNumber}</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">{user.addressName}</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">{user.roleName}</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={() => handleEditUser(user.id)}/>
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" onClick={() => handleDeleteUser(user.id)} /></div>
                                                    </td>
                                                </tr>
                                                  ))
                                                )}
                                                {/* <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr>
                                                <tr className="table-content">
                                                    <td className="p-3 px-4 "><span className="float-start">Taile03</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Le Thanh Tai</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">taile03@gmail.com</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">0909 113 114</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Thu Duc</span></td>
                                                    <td className="p-3 px-4 "><span className="float-start">Admin</span></td>
                                                    <td className="p-3 px-4 d-flex justify-content-center">
                                                        <div className="edit-user p-2" data-bs-toggle="modal" data-bs-target="#edit-user">
                                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                                                        </div>
                                                        <div className="delete-user p-2"><FontAwesomeIcon icon="fa-solid fa-trash" /></div>
                                                    </td>
                                                </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-end paging p-2">
                                        {Array.from(
                                          { length: paging.TotalPages },
                                          (_, index) => (
                                            <Link
                                              key={index + 1}
                                              to="#"
                                              className={`p-2 me-3 ${
                                                paging.CurrentPage === index + 1
                                                  ? "active-paging"
                                                  : ""
                                              }`}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(index + 1);
                                              }}
                                            >
                                              {index + 1}
                                            </Link>
                                          )
                                        )}
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

    {/* <!-- Modal add user --> */}
    <div className="modal" id="add-user">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
      
            {/* <!-- Modal Header --> */}
            <div className="py-2 header-modal d-flex justify-content-between">
              <h4 className="modal-title inter ms-3" style={{fontFamily: 'system-ui'}}>Add new user</h4>
              <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon="fa-solid fa-x" /></div>
            </div>
      
            {/* <!-- Modal body --> */}
            <div className="modal-body">
                <table className="w-100 table-modal">
                    <tbody>
                    <tr>
                        <td colSpan="2" className="py-2"><span className="inter">Tên tài khoản</span></td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><input type="text" placeholder="" className="w-100 p-1" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                        <td></td>
                    </tr>
                    <tr className="row-error">
                        <td colSpan="2"><span className="error-text">User name is already exist</span></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2"><span className="inter">Mật khẩu</span></td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><input type="text" placeholder="" className="w-100 p-1" value={password} onChange={(e) => setPassword(e.target.value)}/></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Họ & tên</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={fullname} onChange={(e) => setFullname(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Số điện thoại</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>
                          <span colSpan="2" className="py-2">Hình ảnh:</span>
                        </td>
                        </tr>
                        <tr>
                        <td colSpan="2" className="py-2">
                          <UploadImage
                            aspectRatio={1 / 1}
                            onUploadComplete={handleUploadComplete}
                            maxWidth={10000}
                            maxHeight={10000}
                            minWidth={126}
                            minHeight={126}
                          />
                          <div colSpan="2">
                            <img src={avatar} alt="" className="w-25"></img>
                          </div>
                        </td>
                        </tr>
                      
                    <tr>
                        <td className="py-2">Role</td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1">
                          <select className="w-50 p-1" value={roleId} onChange={(e) => setRoleId(parseInt(e.target.value))}>
                          <option value="" selected disabled>
                              Choose
                            </option>
                            {roles.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.roleName}
                              </option>
                            ))}
                          </select></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Email</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Địa chỉ</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={mainAddress} onChange={(e) => setMainAddress(e.target.value)}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
      
            {/* <!-- Modal footer --> */}
            <div className="footer-modal py-4 d-flex justify-content-end">
              <div className="close me-4">
                <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
              </div>
              <div className="save-modal me-4">
                <input type="submit" value="Add user" className="input-submit p-2 px-3 inter modal-btn-close" onClick={handleAddUser}/>
              </div>
            </div>
      
          </div>
        </div>
      </div>
      {/* <!-- Modal edit user --> */}
      <div className="modal" id="edit-user">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
      
            {/* <!-- Modal Header --> */}
            <div className="py-2 header-modal d-flex justify-content-between">
              <h4 className="modal-title inter ms-3" style={{fontFamily: 'system-ui'}}>Edit user</h4>
              <div className="btn-close-modal me-3" data-bs-dismiss="modal"><FontAwesomeIcon icon="fa-solid fa-x" /></div>
            </div>
      
            {/* <!-- Modal body --> */}
            <div className="modal-body">
            <table className="w-100 table-modal">
                    <tbody>
                    <tr>
                        <td colSpan="2" className="py-2"><span className="inter">Tên tài khoản</span></td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1"><input type="text" placeholder="" className="w-100 p-1" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                        <td></td>
                    </tr>
                    <tr className="row-error">
                        <td colSpan="2"><span className="error-text">User name is already exist</span></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Họ & tên</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={fullname} onChange={(e) => setFullname(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Số điện thoại</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>
                          <span colSpan="2" className="py-2">Hình ảnh:</span>
                        </td>
                        </tr>
                        <tr>
                        <td colSpan="2" className="py-2">
                          <UploadImage
                            aspectRatio={1 / 1}
                            onUploadComplete={handleUploadComplete}
                            maxWidth={10000}
                            maxHeight={10000}
                            minWidth={126}
                            minHeight={126}
                          />
                          <div colSpan="2">
                            <img src={avatar} alt="" className="w-25"></img>
                          </div>
                        </td>
                        </tr>
                      
                    <tr>
                        <td className="py-2">Role</td>
                        <td className="py-2">Status</td>
                    </tr>
                    <tr>
                        <td className="pe-1 py-1">
                          <select className="w-100 p-1" value={roleId} onChange={(e) => setRoleId(parseInt(e.target.value))}>
                          <option value="" selected disabled>
                              Choose
                            </option>
                            {roles.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.roleName}
                              </option>
                            ))}
                          </select></td>
                          <td className="py-2">
                          <select
                            className="w-100 ps-2 p-1 w-50"
                            value={status}
                            onChange={(e) =>
                              setStatus(e.target.value === "true")
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

                    <tr>
                        <td colSpan="2" className="py-2">Email</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="py-2">Địa chỉ</td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="pe-1 py-1"><input type="text" className="w-100 p-1" value={mainAddress} onChange={(e) => setMainAddress(e.target.value)}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
      
            {/* <!-- Modal footer --> */}
            <div className="footer-modal py-4 d-flex justify-content-end">
              <div className="close me-4">
                <div className="modal-btn-close p-2 px-4" data-bs-dismiss="modal"><span>Close</span></div>
              </div>
              <div className="save-modal me-4">
                <input type="submit" value="Save" data-bs-dismiss="modal" className="input-submit modal-btn-close p-2 px-4 inter"  onClick={handleSaveUpdateUser}/>
              </div>
            </div>
      
          </div>
        </div>
      </div>
      </div>
      <ModalConfirmDelete
        isOpen={isModalOpenUser}
        onClose={handleCloseModalUser}
        onConfirm={handleConfirmDeleteUser}
        title="Xác nhận xóa người dùng"
        message="Bạn có chắc chắn muốn xóa người dùng này không?"
      />
    </>
  )
}
export default ManageUser;
