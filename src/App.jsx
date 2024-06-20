
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './context/AuthContext';
import { refreshAccessToken } from './services/authService';
import { useEffect } from 'react';
library.add(fas);

function App() {
  
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <>
      <AuthProvider>
        
          <AppRoutes />
        
    </AuthProvider>

    </>
  );
}

export default App;
