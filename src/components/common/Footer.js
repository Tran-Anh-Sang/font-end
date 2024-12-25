import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 - Bản quyền thuộc về Thế giới công nhệ</p>
        {/*  thông tin liên hệ */}
        <p>Địa chỉ: 123 Đường ABC, Quận Cầu Giấy, Hà Nội</p>
        <p>Email: contact@mystore.com</p>
      </div>
    </footer>
  );
}

export default Footer;