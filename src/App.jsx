// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
// import AppRoutes from './routes/AppRoutes';




// // import Admindashboard from './pages/admin/Admindashboard';
// // import AdminLayout from './layouts/AdminLayout';




// // Nếu bạn cài thêm các gói khác, bạn có thể import chúng như sau:
// // import { far } from '@fortawesome/free-regular-svg-icons';
// // import { fab } from '@fortawesome/free-brands-svg-icons';

// // Thêm các icon cần sử dụng vào thư viện
// library.add(fas);

// function App() {
  

//   return (
//     <>
    
//       <Header />
//       <AppRoutes />
//       <Footer />
      

//     </>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import ManageUser from './components/ManageUser/ManageUser';
import ManageOrder from './components/ManageOrder/ManageOrder';
import ManageProduct from './components/ManageProduct/ManageProduct';
import AdminDashboard from './pages/admin/AdminDashboard';


// import AdminLayout from './layouts/AdminLayout';




// Nếu bạn cài thêm các gói khác, bạn có thể import chúng như sau:
// import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';

// Thêm các icon cần sử dụng vào thư viện
library.add(fas);

function App() {
  

  return (
    <>
    
      <Routes>
        
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/manageorder" element={<ManageOrder />} />
        <Route path="/manageproduct" element={<ManageProduct />} />

      </Routes>
      

    </>
  )
}

export default App