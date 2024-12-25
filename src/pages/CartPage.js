import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart'); // Gọi API lấy danh sách sản phẩm trong giỏ hàng
        setCartItems(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${cartItemId}`, { quantity: newQuantity }); // Gọi API cập nhật số lượng
      // Cập nhật lại state cartItems sau khi cập nhật số lượng thành công
      setCartItems(cartItems.map(item => 
        item.cart_item_id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`); // Gọi API xóa sản phẩm khỏi giỏ hàng
      // Cập nhật lại state cartItems sau khi xóa thành công
      setCartItems(cartItems.filter(item => item.cart_item_id !== cartItemId));
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-8 lg:px-40">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Sản phẩm</th>
                <th className="px-4 py-2">Giá</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Tổng</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cart_item_id}>
                  <td className="px-4 py-2">
                    <Link to={`/products/${item.product_id}`}>
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-2">{item.price} VND</td>
                  <td className="px-4 py-2">
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={e => handleQuantityChange(item.cart_item_id, parseInt(e.target.value))} 
                      className="border border-gray-400 px-2 py-1 rounded w-16" 
                    />
                  </td>
                  <td className="px-4 py-2">{item.price * item.quantity} VND</td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleRemoveItem(item.cart_item_id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8">
            <p className="text-xl font-bold">Tổng tiền: {calculateTotalPrice()} VND</p>
            <Link to="/checkout">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;