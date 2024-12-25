import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/customers'); // API lấy danh sách người dùng
        setCustomers(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders'); // API lấy danh sách đơn hàng (cho admin)
        setOrders(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      }
    };

    fetchProducts();
    fetchCustomers();
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Trang quản trị</h1>

{/* Quản lý sản phẩm */}
<div className="bg-white shadow-md rounded-lg p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4">Quản lý sản phẩm</h2>

  {/* Nút thêm sản phẩm */}
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
    Thêm sản phẩm
  </button>

  <table className="w-full">
    <thead>
      <tr>
        <th className="px-4 py-2">ID</th>
        <th className="px-4 py-2">Tên sản phẩm</th>
        <th className="px-4 py-2">Giá</th>
        <th className="px-4 py-2">Số lượng</th>
        {/* <th className="px-4 py-2">Trạng thái</th> */}
        <th className="px-4 py-2">Hành động</th>
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
        <tr key={product.id}>
          <td className="px-4 py-2">{product.id}</td>
          <td className="px-4 py-2">{product.name}</td>
          <td className="px-4 py-2">{product.price}</td>
          <td className="px-4 py-2">{product.quantity_in_stock}</td>
          {/* <td className="px-4 py-2">{product.status ? 'Hiện' : 'Ẩn'}</td> */}
          <td className="px-4 py-2">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
              Sửa
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Quản lý khách hàng */}
<div className="bg-white shadow-md rounded-lg p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4">Quản lý khách hàng</h2>
  <table className="w-full">
    <thead>
      <tr>
        <th className="px-4 py-2">ID</th>
        <th className="px-4 py-2">Tên khách hàng</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">Số điện thoại</th>
        <th className="px-4 py-2">Hành động</th>
      </tr>
    </thead>
    <tbody>
      {customers.map(customer => (
        <tr key={customer.id}>
          <td className="px-4 py-2">{customer.id}</td>
          <td className="px-4 py-2">{customer.full_name}</td>
          <td className="px-4 py-2">{customer.email}</td>
          <td className="px-4 py-2">{customer.phone}</td>
          <td className="px-4 py-2">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
              Sửa
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Quản lý đơn hàng */}
<div className="bg-white shadow-md rounded-lg p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4">Quản lý đơn hàng</h2>
  <table className="w-full">
    <thead>
      <tr>
        <th className="px-4 py-2">ID</th>
        <th className="px-4 py-2">Khách hàng</th>
        <th className="px-4 py-2">Ngày đặt</th>
        <th className="px-4 py-2">Tổng tiền</th>
        <th className="px-4 py-2">Trạng thái</th>
        <th className="px-4 py-2">Hành động</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => (
        <tr key={order.id}>
          <td className="px-4 py-2">{order.id}</td>
          <td className="px-4 py-2">{order.customer_id}</td> 
          <td className="px-4 py-2">{new Date(order.order_date).toLocaleString()}</td>
          <td className="px-4 py-2">{order.total_amount}</td>
          <td className="px-4 py-2">{order.status}</td>
          <td className="px-4 py-2">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
              Xem chi tiết
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Thống kê */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Thống kê</h2>
        {/* Hiển thị các biểu đồ thống kê */}
        {/* ... */}
      </div>
    </div>
  );
}

export default AdminPage;