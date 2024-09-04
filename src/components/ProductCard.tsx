import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, deleteProduct } from '../store/productsSlice';
import { Product } from '../types/Product';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="border border-gray-300 rounded-lg p-4 m-4 cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <img className="w-full h-32 object-cover mb-4 rounded" src={product.image} alt={product.title} />
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-sm">{product.description.substring(0, 50)}...</p>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleLike(product.id));
            }}
          >
            {product.liked ?  <IoMdHeart className='text-red-500' size={30} /> :<IoMdHeartEmpty size={30}/>}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteProduct(product.id));
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
