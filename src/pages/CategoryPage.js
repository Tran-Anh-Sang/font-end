import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm theo danh mục:', error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin danh mục:', error);
      }
    };

    fetchProducts();
    fetchCategory();
  }, [categoryId]);

  return (
    <div className="container mx-auto py-8 lg:px-40">
      {category && (
        <h1 className="text-2xl font-bold mb-4">Danh mục: {category.name}</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <Link to={`http://localhost:5000/products/${product.id}`} key={product.id} className="transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                <p className="text-lg font-bold text-red-500">{product.price} VND</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;