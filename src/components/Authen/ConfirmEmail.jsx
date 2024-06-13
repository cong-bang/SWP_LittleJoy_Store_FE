import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmEmail = () => {
    const { id } = useParams(); 
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://littlejoyapi.azurewebsites.net/api/authen/confirm-email?token=${id}`
            );
            console.log(id);
            if (!response.ok) {
              throw new Error('Có lỗi trong quá trình fetch dữ liệu');
            }
            const data = await response.json();
    
          } catch (error) {
            console.error('Fetch error:', error.message);
          }
        };
        fetchData();
      }, []);

  return (
    <>
        <Link to='/login'>Quay lại trang Login</Link>
        Xác minh tài khoản thành công 

    </>
  )
}

export default ConfirmEmail