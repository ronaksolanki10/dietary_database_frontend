import React, { useState, useEffect, useCallback } from 'react';
import { addFoodItem, getFoodItems } from '../services/api';
import { notify } from '../utils/Notification';
import { useForm } from 'react-hook-form';
import Modal from './common/Modal';
import UploadCsv from './UploadCsv';
import '../css/components/forms.css';

interface FormValues {
  name: string;
  category: string;
  iddsiLevels: string;
}

/**
 * Displays a form to add food items and a list of existing food items.
 * Includes functionality to search and filter food items.
 * 
 * @returns {JSX.Element} The FoodItems component.
 */
const FoodItems: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [iddsiLevels, setIddsiLevels] = useState('');
  const [issdiLevelsArray, setIssdiLevelsArray] = useState<number[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = process.env.REACT_APP_FOOD_CATEGORIES?.split(',') || [];
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();
  const [search, setSearch] = useState('');

  const resetForm = () => {
    reset({
      name: '',
      category: '',
      iddsiLevels: ''
    });
    setIssdiLevelsArray([]);
  };

  const onSubmit = async (values: FormValues) => {
    const issdiLevelsArray = values.iddsiLevels.split(',').map(Number);
    setIssdiLevelsArray(issdiLevelsArray);
    const newItem = { name: values.name, category: values.category, iddsi_levels: issdiLevelsArray };
    try {
      const response = await addFoodItem(newItem);
      fetchFoodItems();
      resetForm();
      notify(response.data.message, 'success');
      setIsModalOpen(false);
    } catch (error) {
      // Handle error
    }
  };

  const fetchFoodItems = useCallback(async (search: string = '') => {
    try {
      const items = await getFoodItems(search);
      setFoodItems(items.data.data);
    } catch (error) {
      console.error('Failed to fetch food items', error);
    }
  }, []);

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const clearSearch = () => {
    setSearch('');
    fetchFoodItems();
  };

  const handleSearch = () => {
    fetchFoodItems(search);
  };

  const onUploadSuccess = () => {
    setSearch('');
    fetchFoodItems();
  };

  return (
    <div className="container">
      <div className="data-insertion-container">
        <button onClick={() => setIsModalOpen(true)} className="add-item-button">Add Food Item</button>
        <UploadCsv label="food items" apiEndpoint="food-items" onUploadSuccess={onUploadSuccess} />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Add Food Item</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              className={`form-input form-element ${errors.name ? 'error' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div>
            <label>Category</label>
            <select
              className={`form-element ${errors.category ? 'error' : ''}`}
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="error-message">{errors.category.message}</p>}
          </div>
          <div>
            <label>IDDSI Levels</label>
            <input
              type="text"
              className={`form-element ${errors.iddsiLevels ? 'error' : ''}`}
              {...register('iddsiLevels', { required: 'IDDSI Levels are required' })}
            />
            {errors.iddsiLevels && <p className="error-message">{errors.iddsiLevels.message}</p>}
            <p><i>Use comma for multiple levels</i></p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, category or IDDSI Levels"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="button-container">
          <button className="add-item-button" onClick={handleSearch}>Search</button>
          <button className="add-item-button" onClick={clearSearch}>Reset</button>
        </div>
      </div>
      <h2>Food Items</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>IDDSI Levels</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.iddsi_levels}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItems;