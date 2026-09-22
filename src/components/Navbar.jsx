import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { cartCount, currentUser, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="site-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="brand-mark text-2xl font-bold">
            E<span>Shop</span>
          </Link>
          <div className="flex items-center gap-5">
            {currentUser && (
              <Link to="/" className="nav-link text-sm font-bold">
                Shop
              </Link>
            )}

            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="nav-user flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold">
                  <User className="h-4 w-4" />
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="nav-link text-sm font-bold">
                  Log in
                </Link>
                <Link to="/register" className="coral-button px-4 py-2">
                  Join EShop
                </Link>
              </div>
            )}

            {currentUser && (
              <Link
                to="/cart"
                aria-label="Shopping cart"
                className="nav-action relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="cart-badge absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
