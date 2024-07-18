import React, { useEffect, useState } from 'react'
import '../../assets/css/stylepaymentsuccess.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import notfound from "../../assets/img/404.jpg";

const PaymentPending = () => {
    const [inforPending, setInforPending] = useState({});
    const [user, setUser] = useState({});
    const [countP, setCountP] = useState(null);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const orderCode = localStorage.getItem('orderCode')
            if (orderCode !== null ) {
                setFlag(true);
            }
            const userId = localStorage.getItem('userId');
            const responseUser = await fetch(`https://littlejoyapi.azurewebsites.net/api/user/${userId}`);
            const responseOrder = await fetch(`https://littlejoyapi.azurewebsites.net/api/order/get-order-by-orderCode/${orderCode}`);

            localStorage.removeItem('orderCode')
            const dataUser = await responseUser.json();
            if (responseUser.ok) {
                setUser(dataUser)
            }
          
            const dataOrder = await responseOrder.json();
        if (responseOrder.ok) {
            // Format the date in dataOrder
            if (dataOrder.date) {
                const dateObj = new Date(dataOrder.date);
                const formattedDate = `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()} ${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
                dataOrder.date = formattedDate;
            }

            if (dataOrder.totalPrice) {
                const formattedPrice = dataOrder.totalPrice;
                dataOrder.totalPrice = formattedPrice.toLocaleString('de-DE');
            }

            setInforPending(dataOrder);
        }
          
        } catch (error) {
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const handleRrturnHome = () => {
        setFlag(false);
        navigate('/');
      }

  return (
    <>
    {flag == true ? (
        <div className="outline">
        <div className="container payment-body">
            <div className="row payment-container">
                <div className="col-md-12 pay-header">
                    <h5>THÔNG TIN THANH TOÁN</h5>
                </div>

                <div className="col-md-12 pay-img">
                    <img src="./assets/img/checkout/success-icon.png" alt="" width="100px"/>
                    <h4>Thanh toán đang chờ</h4>
                </div>
                <div className="col-md-12 payment-in4">
                    <table>
                        <tbody>
                            <tr>
                                <th>Khách hàng:</th>
                                <td>{user.fullname}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Mã đơn hàng:</th>
                                <td>{inforPending.orderCode}</td>
                            </tr>
                            <tr>
                                <th>Tổng cộng:</th>
                                <td className="amout">{inforPending.totalPrice} VND</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-12 break">
                    <div className="line"></div>
                    <span>Chi tiết</span>
                    <div className="line"></div>
                </div>
                <div className="col-md-12 payment-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Ngày đặt hàng:</th>
                                <td>{inforPending.date}</td>
                            </tr>
                            <tr>
                                <th>Địa chỉ:</th>
                                <td>{inforPending.address}</td>
                            </tr>
                            <tr>
                                <th>Số điện thoại:</th>
                                <td>{inforPending.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th>Phương thức thanh toán:</th>
                                <td>{inforPending.paymentMethod}</td>
                            </tr>
                            <tr>
                                <th>Ghi chú:</th>
                                <td>{inforPending.note}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='fs-6'>Chúng tôi sẽ gửi email xác nhận đơn đặt hàng cho bạn với thông tin chi tiết.</p>
                    <div className="thanks">
                        <p className='fs-6'>Cảm ơn bạn đã chọn chúng tôi.</p>
                        <p className='fs-6'>Hẹn gặp lại!</p>
                    </div>
                    <div className="payment-footer">
                        <p><span className='fs-6' style={{cursor: 'pointer'}} onClick={handleRrturnHome}>Quay về trang chủ</span></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    ) : (
        <div
        className="container-fluid py-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(60, 117, 166, 0.2) 0%, rgba(255, 255, 255, 0.15) 53%, #fff 68%, #fff 100%)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 my-5 text-center">
            <div>
                    
                  <div className="col-md-12 text-center my-5 py-5">
                  <div
                    className="d-inline-block p-5"
                    style={{
                      backgroundColor: "#FAFAFA",
                      border: "1px dotted black",
                      borderRadius: "15px",
                    }}
                  >
                    <div className="d-flex flex-column align-items-center p-3">
                      <img src={notfound} alt="" className="w-50" />
                      <span
                        className="text-center fs-4 pt-3"
                        style={{
                          fontFamily: "sans-serif",
                        }}
                      >
                        Không tìm thấy trang
                      </span>
                    </div>
                  </div>
                </div>
                
                </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default PaymentPending;