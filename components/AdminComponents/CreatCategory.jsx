'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, fetchCategories, deleteCategory, updateCategory } from '@/app/store/slices/getSetFoodCategorySlice';
import { toast } from 'react-toastify';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories()); // Fetch categories on component mount
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (categoryName.trim() === '') return;

        if (editId) {
            // Update existing category
            await dispatch(updateCategory({ id: editId, name: categoryName }));
            toast.success('Category updated successfully!');
            setEditId(null);
        } else {
            // Create new category
            await dispatch(createCategory(categoryName));
            toast.success('Category created successfully!');
        }

        setCategoryName(''); // Clear input after submission
    };

    const handleEdit = (category) => {
        setEditId(category._id);
        setCategoryName(category.name); // Populate input field with category name
    };

    const handleDelete = async (id) => {
        await dispatch(deleteCategory(id));
        toast.success('Category deleted successfully!');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Category' : 'Create Category'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="category-name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                    {editId ? 'Update Category' : 'Create Category'}
                </button>
            </form>

            {status === 'loading' && <p>Loading categories...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <h3 className="text-xl font-bold mt-8">Categories List</h3>
            <ul className="list-disc pl-5">
                {categories.map((category) => (
                    <li key={category._id} className="flex items-center justify-between mb-2">
                        <span>{category.name}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(category)}
                                className="px-2 py-1 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(category._id)}
                                className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateCategory;
