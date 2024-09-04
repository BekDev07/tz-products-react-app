import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { products, filter } = useSelector(
    (state: RootState) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredProducts =
    filter === "liked" ? products.filter((p) => p.liked) : products;
  const searchedProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(searchedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = searchedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
