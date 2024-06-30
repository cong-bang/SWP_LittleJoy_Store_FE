import React, { useEffect, useState } from 'react'
import '../../assets/css/stylepaymentsuccess.css'
import { Link, useParams } from 'react-router-dom';

const PaymentPending = () => {
    const [inforPending, setInforPending] = useState({});
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [countP, setCountP] = useState(1);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const responseUser = await fetch(`https://littlejoyapi.azurewebsites.net/api/user/${userId}`);
            const responseOrder = await fetch(`https://littlejoyapi.azurewebsites.net/api/order/get-order-by-orderCode/${id}`);

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
 
            const totalQuantity = dataOrder.productOrders.reduce((total, product) => {
                return total + product.quantity;
            }, 0);
            setCountP(totalQuantity);

            setInforPending(dataOrder);
        }
          
        } catch (error) {
            console.log(error.message);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <>
        <div className="outline">
        <div className="container payment-body">
            <div className="row payment-container">
                <div className="col-md-12 pay-header">
                    <h5>PAYMENT PENDING</h5>
                </div>

                <div className="col-md-12 pay-img">
                    <img src="./assets/img/checkout/success-icon.png" alt="" width="100px"/>
                    <h4>Payment pending</h4>
                </div>
                <div className="col-md-12 payment-in4">
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
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <th>Amout paid:</th>
                                <td className="amout">{inforPending.totalPrice} VND</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-12 break">
                    <div className="line"></div>
                    <span>Details</span>
                    <div className="line"></div>
                </div>
                <div className="col-md-12 payment-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Order date:</th>
                                <td>{inforPending.date}</td>
                            </tr>
                            <tr>
                                <th>Location:</th>
                                <td>{inforPending.address}</td>
                            </tr>
                            <tr>
                                <th>Phone number:</th>
                                <td>{user.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th>Total quantity:</th>
                                <td>{countP}</td>
                            </tr>
                            <tr>
                                <th>Payment type:</th>
                                <td>COD</td>
                            </tr>
                            <tr>
                                <th>Note:</th>
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
                        <p><Link to="/" className='fs-6'>Quay về trang chủ</Link></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentPending;