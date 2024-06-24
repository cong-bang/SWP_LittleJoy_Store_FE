import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/styleUserAddress.css";
import Ellipse2 from "../../assets/img/Ellipse2.png";

const UserAddress = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  return (
    <>
      

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

                <tr>
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
                        id="ButtonAddSpecial"
                        type="submit"
                        value="Mặc định"
                        className="px-3 py-1"
                      />
                    </div>
                  </td>

                  <td></td>
                </tr>

                <tr className="pt-2">
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
                </tr>
              </tbody>
            </table>
          
    </>
  );
}
export default UserAddress;
