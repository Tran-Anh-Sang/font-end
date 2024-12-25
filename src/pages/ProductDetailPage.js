import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const handleAddToCart = async () => {
    // Kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Gọi API thêm sản phẩm vào giỏ hàng
        await axios.post('http://localhost:5000/api/cart', {
          productId: product.id,
          quantity: 1, // Hoặc cho phép người dùng chọn số lượng
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Hiển thị thông báo thành công
        alert('Thêm vào giỏ hàng thành công!');
      } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        alert('Thêm vào giỏ hàng thất bại.');
      }
    } else {
      // Chuyển hướng đến trang đăng nhập
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 lg:px-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
          {/* Hiển thị thêm các hình ảnh khác nếu có */}
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-xl text-red-500 mb-4">{product.price} VND</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Thông tin bổ sung */}
          <div className="mt-4">
            <p>Thương hiệu: {product.brand}</p>
            <p>Model: {product.model}</p>
            <p>Màu sắc: {product.color}</p>
            <p>Kích thước: {product.size}</p>
            <p>Trọng lượng: {product.weight}</p>
            <p>Bảo hành: {product.warranty}</p>
          </div>

          {/* Thông số kỹ thuật */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Thông số kỹ thuật</h2>
          {/* Hiển thị thông số kỹ thuật (product.specifications) */}

          {/* Đánh giá */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Đánh giá</h2>
          {/* Hiển thị đánh giá của sản phẩm (product.rating, product.reviews) */}

          {/* Nút thêm vào giỏ hàng */}
          <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );

}

export default ProductDetailPage;