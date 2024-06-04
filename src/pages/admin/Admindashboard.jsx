import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faBoxOpen, faRightFromBracket, faHouse, faPowerOff, faDollarSign, faClipboardList, faUsers, faBan } from "@fortawesome/free-solid-svg-icons";
import { Line, Pie } from 'react-chartjs-2';
import '../../assets/css/styleadmin.css';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    ArcElement,
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend,
    Filler
);

export default function Admindashboard() {
  // Mock data
  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [1000, 2000, 1500, 3000, 2500, 4000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)"
      }
    ]
  };

  const categoryData = {
    labels: ["Sữa cao cấp", "Sữa cho mẹ bầu", "Sữa Châu Âu", "Khác"],
    datasets: [
      {
        data: [30, 40, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#EED2EE"]
      }
    ]
  };

  const topProducts = [
    { name: "Product A", percentage: 60, color: "bg-success" },
    { name: "Product B", percentage: 40, color: "bg-info" },
    { name: "Product C", percentage: 30, color: "bg-warning" },
    { name: "Product D", percentage: 20, color: "bg-danger" },
    { name: "Product E", percentage: 10, color: "bg-secondary" }
  ];

  const salesReport = [
    { product: "Product A", units: 50, revenue: "$500" },
    { product: "Product B", units: 30, revenue: "$300" },
    { product: "Product C", units: 20, revenue: "$200" },
    { product: "Product D", units: 15, revenue: "$150" },
    { product: "Product E", units: 10, revenue: "$100" }
  ];

  return (
    <>
      <div style={{ background: '#151C2C' }}>
        <div className="container-fluid">
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
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span className="nav-admin-title" style={{ fontFamily: 'sans-serif' }}>Main</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 active-admin ps-3">
                        <a href="">
                          <span style={{ fontFamily: 'sans-serif' }}>Dashboard</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="py-1">
                        <span className="nav-admin-title" style={{ fontFamily: 'sans-serif' }}>Shop</span>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <a href="">
                          <FontAwesomeIcon icon={faUser} />
                          <span style={{ fontFamily: 'sans-serif' }}>User Management</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <a href="">
                          <FontAwesomeIcon icon={faCartShopping} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Order Management</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="py-1 ps-3 hover-dashboard">
                        <a href="">
                          <FontAwesomeIcon icon={faBoxOpen} />{" "}
                          <span style={{ fontFamily: 'sans-serif' }}>Product Management</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </td>
                      <td>
                        <span>Logout</span>
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
                      <p className="m-0" style={{ fontFamily: 'sans-serif' }}>Dashboard</p>
                    </a>
                  </div>
                </div>
                <div className="col-md-8 d-flex align-content-center">
                  <div className="icon-admin-nav p-2 py-3">
                    <FontAwesomeIcon icon={faHouse} />
                  </div>
                  <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
                    <p className="m-0" style={{ fontFamily: 'sans-serif' }}>Home</p>
                    <span style={{ fontFamily: 'sans-serif' }}>/Dashboard</span>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-content-center justify-content-center">
                  <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
                    <p className="m-0">phamhieu</p>
                  </div>
                  <div className="icon-admin-nav-log p-2 py-3 text-white">
                    <FontAwesomeIcon icon={faPowerOff} />
                  </div>
                </div>
                <div className="col-md-12 p-0">
                  <div className="flex-admin-content text-center w-100">
                    <div className="body-admin-top w-100">
                      <div className="body-admin-title d-flex justify-content-between align-items-center w-100">
                        <span className="ms-3" style={{ color: 'white' }}>Dashboard</span>
                      </div>
                    </div>
                    <div className="body-admin-center">
                      <div className="container-fluid">
                        <div className="row">

                        {/* <!-- Total Revenue Card --> */}
                        <div className="col-md-3 mb-5">
                            <div className="card bg-primary text-white h-100">
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon icon={faDollarSign} className="fa-2x text-white-50" />
                                </div>
                                <h5 className="card-title">Total Revenue</h5>
                                <h6>$40,000</h6>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Orders Card --> */}
                          <div className="col-md-3 mb-5">
                            <div className="card bg-success text-white h-100">
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon icon={faClipboardList} className="fa-2x text-white-50" />
                                </div>
                                <h5 className="card-title">Total Orders</h5>
                                <h6>215</h6>
                              </div>
                            </div>
                          </div>

                          {/* <!-- New Customers Card --> */}
                          <div className="col-md-3 mb-5">
                            <div className="card bg-info text-white h-100">
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon icon={faUsers} className="fa-2x text-white-50" />
                                </div>
                                <h5 className="card-title">New Customers</h5>
                                <h6>50</h6>
                              </div>
                            </div>
                          </div>
                          
                          {/* <!-- Order Cancelled Card --> */}
                          
                          <div className="col-md-3 mb-5">
                            <div className="card bg-danger text-white h-100">
                              <div className="card-body">
                                <div className="card-body-icon">
                                  <FontAwesomeIcon icon={faBan} className="fa-2x text-white-50" />
                                </div>
                                <h5 className="card-title">Order Cancelled (Monthly)</h5>
                                <h6>19</h6>
                              </div>
                            </div>
                          </div>


                          <div className="col-md-8 mb-5" style={{ color: "white" }}>
                            <div className="card bg-dark">
                              <div className="card-body">
                                <h5>Revenue Overview</h5>
                                <Line data={revenueData} />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4 mb-5" style={{ color: "white" }}>
                            <div className="card bg-dark">
                              <div className="card-body">
                                <h5>Product Categories</h5>
                                <Pie data={categoryData} />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4 bg-dark pb-3">
                              <div className="card-header py-3 border-white">
                                <h5 className="m-0 font-weight-bold text-white " style={{fontFamily: 'Inter-serif'}}>Top Products</h5>
                              </div>
                              <div className="card-body ">
                                {topProducts.map((product, index) => (
                                  <div key={index}>
                                    
                                    <h4 className="small fw-bold text-white" style={{textAlign: 'left'}}>{product.name} <span className="float-right" style={{float: 'right'}}>{product.percentage}%</span></h4>
                                    <div className="progress mb-4">
                                      <div className={`progress-bar ${product.color}`} role="progressbar" style={{ width: `${product.percentage}%` }} aria-valuenow={product.percentage} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6" style={{ color: "white" }}>
                            <div className="card bg-dark">
                              <div className="card-body">
                                <h5>Sales Report</h5>
                                <table className="table table-bordered text-white">
                                  <thead>
                                    <tr>
                                      <th>Product</th>
                                      <th>Units Sold</th>
                                      <th>Revenue</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {salesReport.map((report, index) => (
                                      <tr key={index}>
                                        <td>{report.product}</td>
                                        <td>{report.units}</td>
                                        <td>{report.revenue}</td>
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
          </div>
        </div>
      </div>
    </>
  );
}










// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../../assets/css/styleadmin.css";

// export default function Admindashboard() {
//   return (
//     <>
//       <div style={{background: '#151C2C'}}>
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-2 nav-admin-left" >
//               <div className="logo-admin d-flex justify-content-center w-100 mt-3">
//                 <a href="" className="">
//                   <p className="logo-admin-left d-inline-block p-1 m-0" style={{fontFamily: 'sans-serif'}}>
//                     LITTLE JOY
//                   </p>
//                   <p className="d-inline-block logo-admin-right ms-2" style={{fontFamily: 'sans-serif'}}>ADMIN</p>
//                 </a>
//               </div>
//               <div className="nav-admin mt-5 w-100">
//                 <table className="w-100">
//                   <tbody>
//                     <tr>
//                       <td colSpan="2" className="py-1">
//                         <span className="nav-admin-title" style={{fontFamily: 'sans-serif'}}>Main</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td></td>
//                       <td className="py-1 active-admin ps-3 active-admin">
//                         <a href="" className="">
//                           <span style={{fontFamily: 'sans-serif'}}>Dashboard</span>
//                         </a>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan="2" className="py-1">
//                         <span className="nav-admin-title" style={{fontFamily: 'sans-serif'}}>Shop</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td></td>
//                       <td className="py-1 ps-3 hover-dashboard">
//                         <a href="" className="">
//                           <i className="fa-solid fa-user"></i>
//                           <span style={{fontFamily: 'sans-serif'}}>User Management</span>
//                         </a>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td></td>
//                       <td className="py-1 ps-3 hover-dashboard">
//                         <a href="" className="">
//                           <i className="fa-solid fa-cart-shopping"></i>{" "}
//                           <span style={{fontFamily: 'sans-serif'}}>Order Management</span>
//                         </a>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td></td>
//                       <td className="py-1 ps-3 hover-dashboard">
//                         <a href="" className="">
//                           <i className="fa-solid fa-box-open"></i>{" "}
//                           <span style={{fontFamily: 'sans-serif'}}>Product Management</span>
//                         </a>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="py-2">
//                         <i className="fa-solid fa-right-from-bracket"></i>
//                       </td>
//                       <td>
//                         <span>Logout</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="col-md-10">
//               <div className="row top-admin-nav">
//                 <div className="col-md-2 text-center">
//                   <div className="dashboard p-2 py-3">
//                     <a href="" className="">
//                       <p className="m-0" style={{fontFamily: 'sans-serif'}}>Dashboard</p>
//                     </a>
//                   </div>
//                 </div>
//                 <div className="col-md-8 d-flex align-content-center">
//                   <div className="icon-admin-nav p-2 py-3">
//                     <i className="fa-solid fa-house"></i>
//                   </div>
//                   <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
//                     <p className="m-0" style={{fontFamily: 'sans-serif'}}>Home</p>
//                     <span style={{fontFamily: 'sans-serif'}}>/Dashboard</span>
//                   </div>
//                 </div>
//                 <div className="col-md-2 d-flex align-content-center justify-content-center">
//                   <div className="pos-admin-nav d-flex align-content-center p-2 py-3">
//                     <p className="m-0">phamhieu</p>
//                   </div>
//                   <div className="icon-admin-nav-log p-2 py-3">
//                     <i className="fa-solid fa-power-off"></i>
//                   </div>
//                 </div>
//                 <div className="col-md-12 p-0">
//                   <div className="flex-admin-content text-center w-100">
//                     <div className="body-admin-top w-100">
//                       <div className="body-admi-title d-flex justify-content-between align-items-center w-100">
//                         <span className="ms-3" style={{color: 'white'}}>Dashboard</span>
//                       </div>
//                     </div>
//                     <div className="body-admin-center">
//                       <div className="container-fluid">
//                         <div className="row">
//                           {/* <!-- Total Revenue Card (Monthly) --> */}
//                           <div
//                             className="col-md-3 mb-5"
//                             style={{ color: "white" }}
//                           >
//                             chart 1
//                           </div>

//                           {/* <!-- Orders Card (Monthly) -->  */}
//                           <div
//                             className="col-md-3 mb-5"
//                             style={{ color: "white" }}
//                           >
//                             chart 2
//                           </div>

//                           {/* <!-- New Customers Card (Monthly) --> */}
//                           <div
//                             className="col-md-3 mb-5"
//                             style={{ color: "white" }}
//                           >
//                             chart 3
//                           </div>

//                           {/* <!-- Order Cancelled Card (Monthly) --> */}
//                           <div
//                             className="col-md-3 mb-5"
//                             style={{ color: "white" }}
//                           >
//                             chart 4
//                           </div>



//                           {/* <!-- Revenue Overview (Monthly) --> */}
//                           <div
//                             className="col-md-8 mb-5"
//                             style={{ color: "white" }}
//                           >
//                             chart 5
//                           </div>

//                           {/* <!-- Product Categories --> */}
//                           <div
//                             className="col-md-4 mb-5"
//                             style={{ color: "white" }}
//                           >
//                             chart 6
//                           </div>

//                           {/* <!-- Top Products --> */}
//                           <div className="col-md-6" style={{ color: "white" }}>
//                             chart 7
//                           </div>

//                           {/* <!-- Sales Report --> */}
//                           <div className="col-md-6" style={{ color: "white" }}>
//                             chart 8
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//     </>
//   );
// }
