import React, { useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetailPage from './Pages/ProductDetailPage';
import NewsPage from './Pages/New'; // Đã chỉnh sửa tên file thành 'News'
import ContactPage from './Pages/Contact';
import CartPage from './Pages/Cart';
import StorePage from './Pages/Store';
import logoImage from './Components/Assets/image/OIP1.jpg'; // Đảm bảo đường dẫn và phần mở rộng file chính xác

import './App.css';
import LoginForm from './Components/LoginForm/LoginForm'; // Đảm bảo đường dẫn chính xác
import RegisterForm from './Components/LoginForm/RegisterForm'; // Đảm bảo đường dẫn chính xác

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Navigate to home page with search query
        navigate(`/?search=${event.target.value}`);
    };

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            removeFromCart(productId);
        }
    };

    // Dữ liệu sản phẩm
    const productCategories = {
        'Tủ lạnh': [
            { id: 1, name: 'Tủ lạnh Samsung Inverter 488 lít Multi Door', price: 21490000, image: 'https://via.placeholder.com/150' },
            { id: 2, name: 'Tủ lạnh Samsung Inverter 655 lít Side by Side', price: 17790000, image: 'https://via.placeholder.com/150' },
            { id: 3, name: 'ITủ lạnh Panasonic Inverter 550 lít Multi Doorphone 12', price: 24990000, image: 'https://via.placeholder.com/150' },
            { id: 4, name: 'Tủ lạnh Aqua Inverter 550 lít Side By Side', price: 13990000, image: 'https://via.placeholder.com/150' },
            { id: 5, name: 'Tủ lạnh Toshiba Inverter 474 lít Multi Door', price: 14990000, image: 'https://via.placeholder.com/150' },
            { id: 6, name: 'Tủ lạnh Toshiba Inverter 474 lít Multi Door', price: 14990000, image: 'https://via.placeholder.com/150' },
        ],
        'Máy giặt': [
            { id: 7, name: 'Máy giặt Samsung Inverter 11 kg', price: 13390000, image: 'https://via.placeholder.com/150' },
            { id: 8, name: 'Máy giặt Panasonic Inverter giặt 10.5 kg  ', price: 12990000, image: 'https://via.placeholder.com/150' },
            { id: 9, name: 'Máy giặt Toshiba Inverter 9.5 Kg ', price: 7890000, image: 'https://via.placeholder.com/150' },
            { id: 10, name: 'Máy giặt Aqua Inverter 9.5 kg ', price: 7390000, image: 'https://via.placeholder.com/150' },
            { id: 11, name: 'Máy giặt sấy Samsung AI Combo Heatpump Inverter giặt 25 kg ', price: 67890000, image: 'https://via.placeholder.com/150' },
            { id: 12, name: 'Máy giặt LG Inverter 9 kg ', price: 8290000, image: 'https://via.placeholder.com/150' },
        ],
        'Máy lọc không khí': [
            { id: 13, name: 'Máy lọc không khí Xiaomi Smart Air Purifier 4', price: 1690000, image: 'https://via.placeholder.com/150' },
            { id: 14, name: 'Máy lọc không khí Levoit Core Mini 7W', price: 1450000, image: 'https://via.placeholder.com/150' },
            { id: 15, name: 'Máy lọc không khí Daikin MC55UVM6 37W', price: 6990000, image: 'https://via.placeholder.com/150' },
            { id: 16, name: 'Máy lọc không khí Electrolux EP53-46UGA 40W', price: 5490000, image: 'https://via.placeholder.com/150' },
            { id: 17, name: 'Máy lọc không khí Samsung AX34R3020WW/SV 30W', price: 3990000, image: 'https://via.placeholder.com/150' },
            { id: 18, name: 'Máy lọc không khí Sharp FP-J40E-W 23W', price: 3990000, image: 'https://via.placeholder.com/150' },
        ],
    };

    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logoImage} alt="Logo" className="logo-image" />
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/store">Cửa hàng</Link>
                    </li>
                    <li>
                        <Link to="/contact">Liên hệ</Link>
                    </li>
                    <li>
                        <Link to="/news">Tin tức</Link>
                    </li>
                    <li>
                        <Link to="/cart">Giỏ hàng</Link>
                    </li>
                    <li className="search-item">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                            style={{ width: '300px', padding: '8px', fontSize: '16px' }} // Thay đổi style inline
                        />
                    </li>
                    <li>
                        <Link to="/login">Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to="/register">Đăng ký</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home productCategories={productCategories} searchTerm={searchTerm} />} />
                <Route path="/store" element={<StorePage addToCart={addToCart} />} />
                <Route
                    path="/cart"
                    element={<CartPage cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                {/* Đường dẫn tới ProductDetailPage với productId */}
                <Route path="/product/:productId" element={<ProductDetailPage productCategories={productCategories} />} />
            </Routes>
        </div>
    );
}

export default App;
