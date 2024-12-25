import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    paymentMethod: 'cod', // Mặc định là COD
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/orders', {
        shipping_address: formData.address,
        payment_method: formData.paymentMethod,
        cartItems: cartItems,
      });
      // Chuyển hướng đến trang thành công hoặc trang cảm ơn
      navigate('/order-success'); 
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
            Họ và tên:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Địa chỉ giao hàng:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-gray-700 font-bold mb-2">
            Phương thức thanh toán:
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            {/* Thêm các phương thức thanh toán khác nếu cần */}
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4">Thông tin đơn hàng</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Sản phẩm</th>
                <th className="px-4 py-2">Giá</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cart_item_id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.price} VND</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.price * item.quantity} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xl font-bold mt-4">Tổng tiền: {calculateTotalPrice()} VND</p>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Đặt hàng
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;