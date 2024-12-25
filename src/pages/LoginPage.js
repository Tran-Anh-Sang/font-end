import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // const handleSubmit = async (e) => {
  // e.preventDefault();
  // try {
    // const response = await axios.post('http://localhost:5000/api/users/login', formData);

    // // Kiểm tra xem có redirectTo trong response không
    // if (response.data.redirectTo) {
    //   // Chuyển hướng đến trang quản trị
    //   navigate(response.data.redirectTo);
    // } else {
    //   // Lưu token JWT vào localStorage
    //   localStorage.setItem('token', response.data.token);
    //   // Chuyển hướng đến trang chủ hoặc trang tài khoản
    //   navigate('/account'); 
    // }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', formData);
    
        // Lưu token JWT vào localStorage
        localStorage.setItem('token', response.data.token);
    
        // Chuyển hướng đến trang được chỉ định trong redirectTo
        navigate(response.data.redirectTo); 
    

    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Đăng nhập thất bại.');
      }
    }
  };

  
  return (
    <div className="container mx-auto py-8 lg:px-40">
      <h1 className="text-3xl font-bold mb-8">Đăng nhập</h1>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Tên đăng nhập:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Mật khẩu:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Đăng nhập
        </button>
      </form>

      <p className="mt-4 text-center">
        Chưa có tài khoản? <Link to="/register" className="text-blue-500 hover:text-blue-700">Đăng ký</Link>
      </p>
    </div>
  );
}

export default LoginPage;




// import React, { useState } from 'react';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import { useNavigate, Link } from 'react-router-dom';

// function LoginPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/users/login', formData);

//       // Lưu token JWT vào localStorage
//       localStorage.setItem('token', response.data.token);

//       // Giải mã token để lấy role
//       const decodedToken = jwt.decode(response.data.token);

//       // Kiểm tra role và chuyển hướng
//       if (decodedToken.role === 'admin') {
//         // Chuyển hướng đến trang quản trị
//         navigate('/admin');
//       } else {
//         // Chuyển hướng đến trang chủ hoặc trang tài khoản
//         navigate('/account');
//       }
//     } catch (error) {
//       console.error('Lỗi khi đăng nhập:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Đăng nhập thất bại.');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-8">Đăng nhập</h1>

//       {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

//       <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
//             Tên đăng nhập:
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
//             Mật khẩu:
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//           Đăng nhập
//         </button>
//       </form>

//       <p className="mt-4 text-center">
//         Chưa có tài khoản? <Link to="/register" className="text-blue-500 hover:text-blue-700">Đăng ký</Link>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;






















