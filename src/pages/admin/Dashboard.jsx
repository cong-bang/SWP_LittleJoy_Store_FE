// eslint-disable-next-line no-unused-vars
import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { Line, Pie, Bar } from "react-chartjs-2";
import "../../assets/css/styleadmin.css";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const revenueData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: [
          10000000, 20000000, 15000000, 30000000, 25000000, 40000000, 32000000,
          29000000, 22500000, 50000000, 67000000, 12300000
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const categoryData = {
    labels: ["Sữa cao cấp", "Sữa cho mẹ bầu", "Sữa Châu Âu", "Khác"],
    datasets: [
      {
        data: [35, 40, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#EED2EE"],
      },
    ],
  };

  const topProducts = [
    { name: "Sữa cao cấp", percentage: 60, color: "bg-success" },
    { name: "Sữa cho mẹ bầu", percentage: 40, color: "bg-info" },
    { name: "Sữa Châu Âu", percentage: 30, color: "bg-warning" },
    { name: "Sữa Mỹ", percentage: 20, color: "bg-danger" },
    { name: "Khác", percentage: 10, color: "bg-secondary" },
  ];

  const salesReport = [
    { product: "Sữa cao cấp", units: 50, revenue: "50,000,000 VND" },
    { product: "Sữa cho mẹ bầu", units: 30, revenue: "30,000,000 VND" },
    { product: "Sữa Châu Âu", units: 20, revenue: "25,000,000 VND" },
    { product: "Sữa Mỹ", units: 15, revenue: "18,000,000 VND" },
    { product: "Khác", units: 10, revenue: "12,000,000 VND" },
  ];

  const optionLine = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        bodyFont: {
          color: "white",
        },
        titleFont: {
          color: "white",
        },
      },
    },
  };

  const optionPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const data = tooltipItem.dataset.data;
            const currentValue = data[tooltipItem.dataIndex];
            const total = data.reduce((acc, value) => acc + value, 0);
            const percentage = ((currentValue / total) * 100).toFixed(0);
            return `${currentValue} (${percentage}%)`;
          },
        },
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  const topProductsMonthly = [
    { name: "Product A", revenue: 25000000 },
    { name: "Product B", revenue: 22000000 },
    { name: "Product C", revenue: 13000000 },
    { name: "Product D", revenue: 12000000 },
    { name: "Product E", revenue: 10000000 },
  ];

  const chartDataBar = {
    labels: topProductsMonthly.map((product) => product.name),
    datasets: [
      {
        label: "Revenue (VND)",
        data: topProductsMonthly.map((product) => product.revenue),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const topPoints = [
    { name: "User A", points: 25000 },
    { name: "User B", points: 20000 },
    { name: "User C", points: 17000 },
    { name: "User D", points: 13000 },
    { name: "User E", points: 9999 },
  ];

  const chartBarPoints = {
    labels: topPoints.map((point) => point.name),
    datasets: [
      {
        label: "Point",
        data: topPoints.map((point) => point.points),
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        borderColor: "rgb(255, 205, 86)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const optionsBar = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        bodyFont: {
          color: "white",
        },
        titleFont: {
          color: "white",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div style={{ background: "#151C2C" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 nav-admin-left">
              <div className="logo-admin d-flex justify-content-center w-100 mt-3">
                <a href="">
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
                </a>
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
                      <td className="py-1 active-admin ps-3">
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
                      <td className="py-1 ps-3 hover-dashboard">
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
              <div className="row top-admin-nav">
                <div className="col-md-2 text-center">
                  <div className="dashboard p-2 py-3">
                    <a href="">
                      <p
                        className="m-0"
                        style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                      >
                        Dashboard
                      </p>
                    </a>
                  </div>
                </div>
                <div className="col-md-8 d-flex align-content-center">
                  <div className="icon-admin-nav p-2 py-3">
                    <FontAwesomeIcon icon={faHouse} />
                  </div>
                  <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      Home
                    </p>
                    <span style={{ fontFamily: "sans-serif" }}>/Dashboard</span>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-content-center justify-content-center">
                  <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
                    <p
                      className="m-0"
                      style={{ fontFamily: "sans-serif", fontSize: "16px" }}
                    >
                      phamhieu
                    </p>
                  </div>
                  <div className="icon-admin-nav-log p-2 py-3 text-white">
                    <FontAwesomeIcon icon={faPowerOff} />
                  </div>
                </div>
                <div className="col-md-12 p-0">
                  <div className="flex-admin-content text-center w-100">
                    <div className="body-admin-top w-100">
                      <div className="body-admin-title d-flex justify-content-between align-items-center w-100">
                        <span
                          className="ms-3"
                          style={{
                            color: "#F8B940",
                            fontSize: "16px",
                            fontFamily: "sans-serif",
                          }}
                        >
                          Dashboard
                        </span>
                      </div>
                    </div>
                    <div className="body-admin-center">
                      <div className="container-fluid">
                        <div className="row">
                          {/* <!-- Total Revenue Card --> */}
                          <div className="col-md-3 mb-5">
                            <div
                              className="card text-white h-100"
                              style={{
                                backgroundColor: "#222B40",
                                borderRadius: "15px",
                              }}
                            >
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon
                                    icon={faDollarSign}
                                    className="fa-2x"
                                    style={{ color: "#00CC66" }}
                                  />
                                </div>
                                <div
                                  className="pt-1 fw-bold"
                                  style={{ fontSize: "25px" }}
                                >
                                  4,500,000 VND
                                </div>
                                <span
                                  className="card-title"
                                  style={{ opacity: "0.6", fontSize: "20px" }}
                                >
                                  Doanh thu (hôm nay)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Orders Card --> */}
                          <div className="col-md-3 mb-5">
                            <div
                              className="card text-white h-100"
                              style={{
                                backgroundColor: "#222B40",
                                borderRadius: "15px",
                              }}
                            >
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon
                                    icon={faClipboardList}
                                    className="fa-2x "
                                    style={{ color: "#FFFF66" }}
                                  />
                                </div>
                                <div
                                  className="pt-1 fw-bold"
                                  style={{ fontSize: "25px" }}
                                >
                                  215
                                </div>
                                <span
                                  className="card-title"
                                  style={{ opacity: "0.6", fontSize: "20px" }}
                                >
                                  Đơn hàng (tháng này)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <!-- New Customers Card --> */}
                          <div className="col-md-3 mb-5">
                            <div
                              className="card text-white h-100"
                              style={{
                                backgroundColor: "#222B40",
                                borderRadius: "15px",
                              }}
                            >
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon
                                    icon={faUsers}
                                    className="fa-2x"
                                    style={{ color: "#0099FF" }}
                                  />
                                </div>
                                <div
                                  className="pt-1 fw-bold"
                                  style={{ fontSize: "25px" }}
                                >
                                  50
                                </div>
                                <span
                                  className="card-title"
                                  style={{ opacity: "0.6", fontSize: "20px" }}
                                >
                                  Người dùng mới (tháng này)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Order Cancelled Card --> */}

                          <div className="col-md-3 mb-5">
                            <div
                              className="card text-white h-100"
                              style={{
                                backgroundColor: "#222B40",
                                borderRadius: "15px",
                              }}
                            >
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon
                                    icon={faBan}
                                    className="fa-2x"
                                    style={{ color: "#FF3333" }}
                                  />
                                </div>
                                <div
                                  className="pt-1 fw-bold"
                                  style={{ fontSize: "25px" }}
                                >
                                  19
                                </div>
                                <span
                                  className="card-title"
                                  style={{ opacity: "0.6", fontSize: "20px" }}
                                >
                                  Đơn hàng bị hủy (tháng này)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-5">
                            <div
                              className="col-md-8 mb-5 h-100"
                              style={{ color: "white" }}
                            >
                              <div
                                className="card h-100"
                                style={{ backgroundColor: "#222B40" }}
                              >
                                <div className="card-body">
                                  <div className="fw-bold mb-3 fs-3" style={{}}>
                                    Tổng quan doanh thu
                                  </div>
                                  <div className="px-3">
                                    <Line
                                      data={revenueData}
                                      options={optionLine}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="col-md-4 mb-5"
                              style={{ color: "white" }}
                            >
                              <div
                                className="card h-100"
                                style={{ backgroundColor: "#222B40" }}
                              >
                                <div className="card-body">
                                  <div
                                    className="fw-bold mb-3 fs-4"
                                    style={{ fontSize: "20px" }}
                                  >
                                    Sản phẩm sắp hết hàng
                                  </div>
                                  <div
                                    className="w-100"
                                    style={{ height: "85%" }}
                                  >
                                    <div
                                      className="w-100 pt-2 px-1"
                                      style={{
                                        overflowY: "auto",
                                        height: "23em",
                                      }}
                                    >
                                      <table
                                        style={{
                                          width: "100%",
                                          borderCollapse: "collapse",
                                        }}
                                      >
                                        <thead
                                          className=""
                                          style={{ fontSize: "18px" }}
                                        >
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              Id
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Tên sản phẩm
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-25"
                                            >
                                              Số lượng còn lại
                                            </td>
                                          </tr>
                                        </thead>
                                      </table>
                                      <table className="w-100">
                                        <tbody>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="p-2"
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                            >
                                              1
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                              }}
                                              className="w-50"
                                            >
                                              Sữa cho mẹ
                                            </td>
                                            <td
                                              style={{
                                                border: "1px solid #CCCCCC",
                                                color: "red",
                                                fontSize: "20px",
                                              }}
                                              className="w-25 fw-bold"
                                            >
                                              5
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Sản phẩm có doanh thu cao trong tháng */}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div
                            className="col-md-6 mb-5"
                            style={{ color: "white" }}
                          >
                            <div
                              className="card"
                              style={{ backgroundColor: "#222B40" }}
                            >
                              <div className="card-body">
                                <div
                                  className="fw-bold mb-2"
                                  style={{ fontSize: "20px" }}
                                >
                                  Sản phẩm có doanh thu cao trong tháng
                                </div>
                                <div className="p-2">
                                  <Bar
                                    data={chartDataBar}
                                    options={optionsBar}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="col-md-6 mb-5"
                            style={{ color: "white" }}
                          >
                            <div
                              className="card"
                              style={{ backgroundColor: "#222B40" }}
                            >
                              <div className="card-body">
                                <div
                                  className="fw-bold mb-2"
                                  style={{ fontSize: "20px" }}
                                >
                                  Top 5 người dùng có số điểm cao nhất
                                </div>
                                <div className="p-2">
                                  <Bar
                                    data={chartBarPoints}
                                    options={optionsBar}
                                  />
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
