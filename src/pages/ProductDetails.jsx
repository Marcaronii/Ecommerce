import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../context/AppContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(AppContext);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Return to Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50 h-64 md:h-auto">
          <img src={product.image} alt={product.name} className="max-w-full max-h-56 object-contain mix-blend-multiply" />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{product.category}</div>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-xl text-gray-500">₱{formatPrice(product.price)}</p>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{product.fullDescription}</p>
          </div>
          <div className="mt-6 flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div className="mt-8">
            <button
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
