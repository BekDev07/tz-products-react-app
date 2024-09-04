import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { updateProduct } from "../store/productsSlice";
import { useParams, useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
  image: string;
}

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      image: product?.image || "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (product) {
      dispatch(updateProduct({ ...product, ...data }));
      navigate("/products");
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            {...register("image", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">Image URL is required</span>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
