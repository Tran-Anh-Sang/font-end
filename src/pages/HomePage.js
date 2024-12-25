import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/featured'); 
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm nổi bật:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    };

    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  return (
    <div class="lg:px-40">
      {/* Hero banner */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}>
        <div className="container mx-auto h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">Chào mừng đến với Thế giới công nghệ</h1>
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-xl font-bold text-red-500">{product.price} VND</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <Link to={`/categories/${category.id}`} key={category.id}> {/*  đường dẫn đến trang danh sách sản phẩm theo danh mục */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;