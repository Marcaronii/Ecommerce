import { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { products } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">Curated everyday goods</p>
          <h1 className="home-title">
            Good things,
            <br />
            made to last.
          </h1>
          <p className="home-copy">
            A considered collection of useful objects for your desk, your home,
            and the small rituals that make a day feel better.
          </p>
        </div>
        <div className="hero-note">
          <strong>Free delivery, always.</strong>
          <p>Every order is packed with care and sent straight to your door.</p>
        </div>
      </section>

      <div className="catalog-toolbar">
        <div>
          <div className="catalog-label">The collection</div>
          <div className="catalog-count">
            {filteredProducts.length} pieces to explore
          </div>
        </div>
        <div className="catalog-controls">
          <input
            type="text"
            placeholder="Search the collection"
            className="search-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="category-field"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
