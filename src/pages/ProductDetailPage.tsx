import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RootState } from "../store/store";
import { toggleLike } from "../store/productsSlice";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the product from the store
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        className="w-full h-64 object-cover mb-4 rounded"
        src={product.image}
        alt={product.title}
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="flex items-center mb-4">
        <button onClick={() => dispatch(toggleLike(product.id))}>
          {product.liked ? (
            <IoMdHeart className="text-red-500" size={30} />
          ) : (
            <IoMdHeartEmpty size={30} />
          )}
        </button>
      </div>
      <div className="flex  items-center gap-2">
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Products
        </button>
        <Link
          className="flex gap-2 font-semibold border border-blue-500 px-4 py-2 rounded"
          to={`/edit-product/${id}`}
        >
          <RiEdit2Line size={20} className="text-orange-600" />
          edit product
        </Link>{" "}
      </div>
    </div>
  );
};

export default ProductDetailPage;
