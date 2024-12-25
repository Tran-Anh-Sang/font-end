import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Chi tiết đơn hàng #{order.order.id}</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
        <p>Họ và tên: {order.order.customer_name}</p>
        {/* Hiển thị các thông tin khác của khách hàng nếu có */}

        <h2 className="text-xl font-semibold mt-8 mb-4">Sản phẩm đã đặt</h2>
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
            {order.orderItems.map(item => (
              <tr key={item.product_id}>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover mr-4" />
                    <span>{item.product_name}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{item.item_price} VND</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.item_price * item.quantity} VND</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8">
          <p className="font-bold">Tổng tiền: {order.order.total_amount} VND</p>
          <p className="font-bold">Trạng thái: {order.order.status}</p>
          {/* Hiển thị các thông tin khác của đơn hàng nếu có */}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;