import { createContext, useState } from 'react';

export const formatPrice = (price) => {
  return Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
export const AppContext = createContext();

const initialProducts = [
  { id: 1, name: 'Earphones', price: 1499.00, description: 'Ergonomic in-ear monitors designed for comfortable, long-lasting listening.', fullDescription: `The Wan'er 2 IEM features a carefully engineered earmold designed to comfortably fit a wide range of ear sizes and shapes. Its ergonomic contour ensures a secure, natural seal for extended listening sessions without pressure or fatigue. The earmold is made from skin-safe, hypoallergenic materials, carefully tested to ensure it is non-toxic, irritation-free, and safe for long-term use. This design provides both universal comfort and peace of mind for everyday listening.`, image: 'https://tangzu.net/cdn/shop/files/02_22a9854f-476d-4d02-b7af-f7525fdb01d7.jpg?v=1769679388&width=713', stock: 15, category: 'Electronics' },
  
  { id: 2, name: 'Smartwatch', price: 9499.00, description: 'Track your fitness, monitor your health, and stay connected throughout the day with this smartwatch.', fullDescription: 'The ultimate smartwatch for your daily life. Monitor your heart rate, track your workouts, and receive notifications directly on your wrist.', image: 'https://static.wikia.nocookie.net/ben10fanfiction/images/c/cd/Omnitrix_Prototype.jpg/revision/latest?cb=20240402175829', stock: 10, category: 'Accessories' },
 
  { id: 3, name: 'Mechanical Keyboard', price: 7299.00, description: 'Creamy Yellow U1 switches for a softer, creamier typing experience.', fullDescription: 'The keyboard features Lord of the Mysteries theme artwork across the top case and the entire back panel. Paired with the matching themed keycaps, it presents a perfectly cohesive full-body design from every angle.', image: 'https://en.akkogear.com/wp-content/uploads/2026/04/Lord-of-the-Mysteries-5108-V5.png', stock: 20, category: 'Electronics' },
  
  { id: 4, name: 'Gaming Mouse', price: 5500.00, description: 'Ergonomic gaming mouse with high precision sensor.', fullDescription: 'Boost your gaming potential with the Logitech G502 Lightspeed Wireless Gaming Mouse 🎮⚡️ Experience precision, speed, and ultimate control in every move.', image: 'https://i.pinimg.com/1200x/77/98/82/77988261d04bc21c3c9c4fe1eb48a244.jpg', stock: 25, category: 'Electronics' },
  
  { id: 5, name: 'Leather Wallet', price: 2599.00, description: 'Classic genuine leather bifold wallet designed for everyday use, with a sleek and durable finish.', fullDescription: 'A timeless accessory. This genuine leather wallet offers multiple card slots, a cash compartment, and a slim profile that fits perfectly in your pocket.', image: 'https://www.antorini.com/cdn/shop/products/penezenka-zelena-1_1200x.jpg?v=1616833992', stock: 30, category: 'Fashion' },
  
  { id: 6, name: 'Sunglasses', price: 1889.00, description: 'Polarized sunglasses with UV protection, offering clear vision and comfortable wear for everyday outdoor use.', fullDescription: 'Protect your eyes in style. These sunglasses feature polarized lenses to reduce glare and provide 100% UV protection. Perfect for outdoor activities.', image: 'https://samandmarshalleyewear.in/wp-content/uploads/2026/07/full-black-front-45-600x600.jpg', stock: 40, category: 'Accessories' },
  
  { id: 7, name: 'Espresso Machine', price: 60000.00, description: 'Programmable drip coffee maker with convenient brewing controls for fresh, flavorful coffee anytime.', fullDescription: 'Start your morning right with this programmable coffee maker. Features a 12-cup capacity, keep-warm function, and an easy-to-clean design.', image: 'https://smhome.ph/cdn/shop/files/39256561_20-_20Breville_20Barista_20Express_20Impress_20BES376BTR_20Espresso_20Machine_20-_20Black_20Truffle.jpg?v=1759809943', stock: 12, category: 'Home' },
 
  { id: 8, name: 'Desk Lamp', price: 1599.00, description: 'LED desk lamp with adjustable brightness for comfortable and customizable lighting.', fullDescription: 'Illuminate your workspace with this modern LED desk lamp. Offers multiple brightness levels, touch controls, and a flexible gooseneck.', image: 'https://tekled.co.uk/cdn/shop/articles/what-is-desk-light-570992.jpg?v=1683457296', stock: 18, category: 'Home' }
];

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  const [users, setUsers] = useState([
  {
    name: 'Test User',
    email: 'testing@gmail.com',
    password: '123456'
  }
]);

  const [currentUser, setCurrentUser] = useState(null);

  const register = (name, email, password) => {
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      throw new Error('Email already registered');
    }
    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    setCurrentUser({ name, email });
    return true;
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    setCurrentUser({ name: user.name, email: user.email });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addToCart = (product) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (!currentProduct || currentProduct.stock <= 0) return;

    setProducts(prevProducts => prevProducts.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find(item => item.id === productId);
    if (itemToRemove) {
      setProducts(prevProducts => prevProducts.map(p => 
        p.id === productId ? { ...p, stock: p.stock + itemToRemove.quantity } : p
      ));
    }
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    const currentProduct = products.find(p => p.id === productId);
    const itemInCart = cart.find(item => item.id === productId);
    
    if (!currentProduct || !itemInCart) return;

    if (delta > 0 && currentProduct.stock <= 0) return;
    
    if (delta < 0 && itemInCart.quantity <= 1) return;

    setProducts(prevProducts => prevProducts.map(p => 
      p.id === productId ? { ...p, stock: p.stock - delta } : p
    ));

    setCart((prevCart) => prevCart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <AppContext.Provider value={{ 
      products, cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
      users, currentUser, register, login, logout 
    }}>
      {children}
    </AppContext.Provider>
  );
};
