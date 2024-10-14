import React, { useState } from 'react';

// Khai báo Component Store
function Store() {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    const products = {
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
        'Máy tính bảng': [
            { id: 19, name: 'Máy tính bảng 123', category: 'Máy tính bảng', price: 8000000, image: 'https://via.placeholder.com/150' }
        ],
        'Máy lọc không khí': [
            { id: 13, name: 'Máy lọc không khí Xiaomi Smart Air Purifier 4', price: 1690000, image: 'https://via.placeholder.com/150' },
            { id: 14, name: 'Máy lọc không khí Levoit Core Mini 7W', price: 1450000, image: 'https://via.placeholder.com/150' },
            { id: 15, name: 'Máy lọc không khí Daikin MC55UVM6 37W', price: 6990000, image: 'https://via.placeholder.com/150' },
            { id: 16, name: 'Máy lọc không khí Electrolux EP53-46UGA 40W', price: 5490000, image: 'https://via.placeholder.com/150' },
            { id: 17, name: 'Máy lọc không khí Samsung AX34R3020WW/SV 30W', price: 3990000, image: 'https://via.placeholder.com/150' },
            { id: 18, name: 'Máy lọc không khí Sharp FP-J40E-W 23W', price: 3990000, image: 'https://via.placeholder.com/150' },
        ]
    };

    // Lấy danh sách danh mục từ Object keys của products
    const categories = ['Tất cả', ...Object.keys(products)];

    // Lọc sản phẩm theo danh mục
    const filteredProducts = selectedCategory === 'Tất cả' 
        ? Object.values(products).flat()
        : products[selectedCategory];

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            const newCartItem = { ...product, quantity: 1, createdAt: new Date() };
            updatedCart = [...cart, newCartItem];
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Lưu vào localStorage
    };

    
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Cửa hàng điện tử</h1>
            </header>
            <main style={styles.main}>
                <section style={styles.leftPanel}>
                    <h2>Tìm kiếm</h2>
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={styles.select}>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </section>
                <section style={styles.products}>
                    {filteredProducts.map(product => (
                        <div key={product.id} style={styles.product}>
                            <img src={product.image} alt={product.name} style={styles.productImage} />
                            <h3>{product.name}</h3>
                            <p>Giá: {product.price.toLocaleString()} VND</p>
                            <button style={styles.button} onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
                        </div>
                    ))}
                </section>
            </main>
            <footer style={styles.footer}>
                <p>&copy; 2024 Shop Điện Tử. Mọi quyền được bảo lưu.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: '10px',
        color: 'white',
    },
    main: {
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    leftPanel: {
        flex: '1 1 20%',
        minWidth: '200px',
        marginRight: '20px',
        textAlign: 'left',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
    },
    products: {
        flex: '2 1 60%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    product: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        margin: '10px',
        maxWidth: '200px',
        textAlign: 'center',
    },
    productImage: {
        width: '100%',
        height: 'auto',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: '10px',
        marginTop: '20px',
    }
};

export default Store;
