import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginG = () => {
  const clientId =
    "30879456615-if2h2961oa2o059jf9lvncjpo0b68rfv.apps.googleusercontent.com";
  const navigate = useNavigate();
  const handleSuccess = async (response) => {
    console.log(response.credential)
    try {
      const res = await fetch(
        "https://littlejoyapi.azurewebsites.net/api/authen/login-with-google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response.credential),
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Decode
        const decodedToken = jwtDecode(data.accessToken);
        console.log(decodedToken);
        const nameClaim =
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        const roleClaim =
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const userClaim = "user_ID";

        const userName = decodedToken[nameClaim];
        const userRole = decodedToken[roleClaim];
        const userId = decodedToken[userClaim];

        localStorage.setItem("userName", userName);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userId", userId);

        navigate("/");
        window.location.reload();
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(data)
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleFailure = (error) => {
    console.log("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default LoginG;
