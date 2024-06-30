import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from "react-js-loader";

 const PaymentInfo = () => {
    const [params, setParams] = useState({});
    const apiEndpoint = 'https://littlejoyapi.azurewebsites.net/api/vnpay/return';
    const [responsePayment, setResponsePayment] = useState({});
    const [user, setUser] = useState({});
    const [inforOrder, setInforOrder] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
  
      const paramsObj = {};
      for (const [key, value] of urlParams.entries()) {
        paramsObj[key] = value;
      }
      setParams(paramsObj);
  
      const fetchApiData = async () => {
        const apiUrl = `${apiEndpoint}?${urlParams.toString()}`;
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setResponsePayment(data);
          }
          
          //fetch user
            const userId = localStorage.getItem('userId');
            const responseUser = await fetch(`https://littlejoyapi.azurewebsites.net/api/user/${userId}`);
            const responseOrder = await fetch(`https://littlejoyapi.azurewebsites.net/api/order/get-order-by-orderCode/${data.code}`);

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
                setInforOrder(dataOrder);
            }

          

        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchApiData();
    }, [apiEndpoint]);

    //

  return (
    <>
    {loading ? (
                <div className="text-center pt-5 mt-5">
                  <Loader
                    type="spinner-default"
                    bgColor={"#000"}
                    color={{ color: "#000" }}
                    title={"Đang xác thực..."}
                    size={100}
                  />
                </div>
              ) : (
                <>
    {responsePayment.status == "Thành Công" ? (
         <div class="outline">
        <div class="container payment-body">
            <div class="row payment-container" style={{border: '2px solid #5D9C59'}}>
                <div class="col-md-12 pay-header" style={{backgroundColor: '#5D9C59'}}>
                    <h5>PAYMENT INFORMATION</h5>
                </div>

                <div class="col-md-12 pay-img">
                    <img src="./assets/img/checkout/success-icon.png" alt="" width="100px"/>
                    <h4>Payment success</h4>
                </div>
                <div class="col-md-12 payment-in4">
                    <table>
                        <tbody>
                            <tr>
                                <th>Customer:</th>
                                <td>{user.fullname}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Order code:</th>
                                <td>{responsePayment.code}</td>
                            </tr>
                            <tr>
                                <th>Amout paid:</th>
                                <td class="amout" style={{color: '#5D9C59'}}>{inforOrder.totalPrice} VND</td>
                            </tr>
                            <tr>
                                <th>Transaction ID:</th>
                                <td>{inforOrder.id}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-12 break">
                    <div class="line"></div>
                    <span>Details</span>
                    <div class="line"></div>
                </div>
                <div class="col-md-12 payment-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Billing content:</th>
                                <td>{inforOrder.note}</td>
                            </tr>
                            <tr>
                                <th>Bank code:</th>
                                <td>{inforOrder.paymentMethod}</td>
                            </tr>
                            <tr>
                                <th>Payment type:</th>
                                <td>VISA</td>
                            </tr>
                            <tr>
                                <th>Payment date:</th>
                                <td>{inforOrder.date}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='fs-6'>Chúng tôi sẽ gửi email xác nhận đơn đặt hàng cho bạn với thông tin chi tiết.</p>
                    <div className="thanks">
                        <p className='fs-6'>Cảm ơn bạn đã chọn chúng tôi.</p>
                        <p className='fs-6'>Hẹn gặp lại!</p>
                    </div>
                    <div class="payment-footer">
                        <p><Link to="/" className='fs-6' style={{color: '#757575'}}>Quay lại trang chủ</Link></p>
                        <p className='fs-6'>Powered by <a href="#" >VNPAY</a></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    ) : (
      <div class="outline">
        <div class="container payment-body">
            <div class="row payment-container" style={{border: '2px solid #e74646'}}>
                <div class="col-md-12 pay-header" style={{backgroundColor: '#e74646'}}>
                    <h5>PAYMENT INFORMATION</h5>
                </div>
                <div class="col-md-12 pay-img">
                    <img src="./assets/img/checkout/failure-icon.png" alt="" width="100px"/>
                    <h4>Payment failure</h4>
                </div>
                <div class="col-md-12 payment-in4">
                    <table>
                        <tbody>
                            <tr>
                                <th>Customer:</th>
                                <td>{user.fullname}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Order code:</th>
                                <td>{inforOrder.orderCode}</td>
                            </tr>
                            <tr>
                                <th>Amout paid:</th>
                                <td class="amout" style={{color: '#e74646'}}>{inforOrder.totalPrice} VND</td>
                            </tr>
                            <tr>
                                <th>Transaction ID:</th>
                                <td>{inforOrder.id}</td>
                            </tr>
                            {/* <tr>
                                <th>Error code:</th>
                                <td class="error-code">24</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <div class="col-md-12 break">
                    <div class="line"></div>
                    <span>Details</span>
                    <div class="line"></div>
                </div>
                <div class="col-md-12 payment-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Billing content:</th>
                                <td>{inforOrder.note}</td>
                            </tr>
                            <tr>
                                <th>Bank code:</th>
                                <td>{inforOrder.paymentMethod}</td>
                            </tr>
                            <tr>
                                <th>Payment type:</th>
                                <td>VISA</td>
                            </tr>
                            {/* <tr>
                                <th>Bank transaction no:</th>
                                <td>54325626226</td>
                            </tr> */}
                            <tr>
                                <th>Payment date:</th>
                                <td>{inforOrder.date}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="thanks">
                      <p className='fs-6'>Cảm ơn bạn đã chọn chúng tôi.</p>
                      <p className='fs-6'>Hẹn gặp lại!</p>
                    </div>
                    <div class="payment-footer">
                        <p><Link to="/" className='fs-6' style={{color: '#757575'}}>Quay lại trang chủ</Link></p>
                        <p className='fs-6'>Powered by <a href="#" >VNPAY</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}</> 
)}

    </>
  )
}
export default PaymentInfo;
