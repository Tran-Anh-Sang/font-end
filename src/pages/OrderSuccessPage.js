import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccessPage() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
      <p className="text-lg mb-6">Cảm ơn bạn đã mua hàng tại My E-commerce Store.</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}

export default OrderSuccessPage;