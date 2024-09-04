import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title: string;
  description: string;
  image: string;
}

const CreateProductPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const newProduct = {
      id: Date.now(),
      ...data,
      liked: false,
    };
    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register('title', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            {...register('image', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.image && <span className="text-red-500 text-sm">Image URL is required</span>}
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
