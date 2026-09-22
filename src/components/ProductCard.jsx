import { Link } from "react-router-dom";
import { formatPrice } from "../context/AppContext";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name truncate">
          {product.name}
        </h3>
        <p className="product-description line-clamp-2">
          {product.description}
        </p>
        <div className="product-footer">
          <span className="product-price">
            ₱{formatPrice(product.price)}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="coral-button product-button"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
