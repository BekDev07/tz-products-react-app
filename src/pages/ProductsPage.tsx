import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/api";
import { setProducts, setFilter } from "../store/productsSlice";
import ProductList from "../components/ProductList";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { RiAddBoxLine } from "react-icons/ri";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.products.filter);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      dispatch(
        setProducts(
          products.map((product: any) => ({ ...product, liked: false }))
        )
      );
    };

    loadProducts();
  }, [dispatch]);

  return (
    <div className=" container mx-auto p-4 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          <Link to={"/"}>Products</Link>
        </h1>
        <div className="flex items-center gap-2">
          <RiAddBoxLine className="text-indigo-500 font-semibold" size={25} />
          <Link to="/create-product" className="font-semibold text-violet-500">
            Add Product
          </Link>
        </div>
      </div>
      <hr className="text-blue-600 mb-4 border-blue-500" />
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-4 py-2 rounded mr-2 ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => dispatch(setFilter("liked"))}
          className={`px-4 py-2 rounded ${
            filter === "liked"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Liked Products
        </button>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
