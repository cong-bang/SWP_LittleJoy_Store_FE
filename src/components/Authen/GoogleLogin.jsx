import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginG = () => {
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    // Gửi token đến API của bạn
    fetch('https://littlejoyapi.azurewebsites.net/api/authen/login-with-google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
      console.log('API Response:', data);
    });
  };

  const handleFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="30879456615-if2h2961oa2o059jf9lvncjpo0b68rfv.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default LoginG;