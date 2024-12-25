// import React from 'react';
// import { Link } from 'react-router-dom'; 

// function Header() {
//   return (
//     <header className="bg-gray-800 text-white py-4">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold">
//           {/* Tên thương hiệu*/}
//           Thế giới công nghệ 
//         </Link>
//         <nav>
//           <ul className="flex space-x-6">
//             <li><Link to="/">Trang chủ</Link></li>
//             <li><Link to="/products">Sản phẩm</Link></li>
//             <li><Link to="/login">Đăng nhập</Link></li>
//             <li><Link to="/register">Đăng ký</Link></li>

//             {/*  các mục menu khác  */}
//           </ul>
//         </nav>
//         <div>
//           <input 
//             type="text" 
//             placeholder="Tìm kiếm..." 
//             className="border border-gray-600 px-4 py-2 rounded-lg" 
//           />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    // Chuyển hướng đến trang chủ sau khi đăng xuất
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between lg:px-40">
        <Link to="/" className="text-2xl font-bold">
          Thế giới công nghệ
        </Link>

        {/* Menu 
        <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />*/}
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/cart">Giỏ hàng</Link></li>
            {/* <li><Link to="/checkout">checkout</Link></li>
            <li><Link to="/order-success">Order thành công</Link></li>
            <li><Link to="/account">thông tin cá nhân</Link></li>
             */}
            
            {/* Thêm các mục menu khác nếu cần */}
          </ul>
        </nav>

        {/* Thông tin người dùng/Đăng nhập/Đăng ký */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center">
              <span className="mr-4">Xin chào, {user.full_name}!</span>
              <Link to="/account" className="mr-4">Tài khoản</Link>
              <Link to="/cart" className="mr-4">Giỏ hàng</Link> {/* Chưa có chức năng giỏ hàng */}
              <button onClick={handleLogout} className="text-red-500">Đăng xuất</button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="mr-4">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );

}

export default Header;