import React, { useState, useEffect, useCallback } from 'react';
import { addResidentMealPlan, getResidentMealPlans, getResidents, getResidentConsumableFoodItems } from '../services/api';
import { useForm } from 'react-hook-form';
import Modal from './common/Modal';
import '../css/components/forms.css';
import { notify } from '../utils/Notification';

interface FormValues {
  name: string;
  residentId: string;
  foodItemId: string;
}

/**
 * Displays a form to add resident meal plans and a list of existing meal plans.
 * Includes functionality to search and filter meal plans.
 * 
 * @returns {JSX.Element} The ResidentMealPlans component.
 */
const ResidentMealPlans: React.FC = () => {
  const [name, setName] = useState('');
  const [residentId, setResidentId] = useState('');
  const [foodItemId, setFoodItemId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residentMealPlans, setResidentsMealPlans] = useState<any[]>([]);
  const [residents, setResidents] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();
  const [search, setSearch] = useState('');

  const resetForm = () => {
    reset({
      name: '',
      residentId: '',
      foodItemId: ''
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const newResident = { name: values.name, resident_id: values.residentId, food_item_id: values.foodItemId };
      const response = await addResidentMealPlan(newResident);
      fetchResidentMealPlans();
      resetForm();
      setIsModalOpen(false);
      notify(response.data.message, 'success');
    } catch (error) {
      // Handle error
    }
  };

  const fetchResidents = useCallback(async () => {
    try {
      const response = await getResidents();
      setResidents(response.data.data);
    } catch (error) {
      console.error('Failed to fetch residents', error);
    }
  }, []);

  const fetchResidentMealPlans = useCallback(async (search: string = '') => {
    try {
      const response = await getResidentMealPlans(search);
      setResidentsMealPlans(response.data.data);
    } catch (error) {
      // Handle error
    }
  }, []);

  useEffect(() => {
    fetchResidentMealPlans();
    fetchResidents();
  }, [fetchResidents]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleResidentOnChange = async (residentId: string) => {
    setResidentId(residentId);
    if (residentId === '') {
      setFoodItems([]);
      return;
    }
    try {
      const response = await getResidentConsumableFoodItems({ resident_id: residentId });
      setFoodItems(response.data.data);
    } catch (error) {
      // Handle error
    }
  };

  const clearSearch = () => {
    setSearch('');
    fetchResidentMealPlans();
  };

  const handleSearch = () => {
    fetchResidentMealPlans(search);
  };

  return (
    <div className="container">
      <button onClick={() => setIsModalOpen(true)} className="add-item-button">Add Meal Plan</button>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Add Meal Plan</h2>
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
            <label>Select Resident</label>
            <select
              className={`form-element ${errors.residentId ? 'error' : ''}`}
              {...register('residentId', { required: 'Please select resident' })}
              onChange={(e) => handleResidentOnChange(e.target.value)}
            >
              <option value="">Select Resident</option>
              {residents.map((resident, index) => (
                <option key={index} value={resident.id}>
                  name: {resident.name}, IDDSI Level: {resident.iddsi_level}
                </option>
              ))}
            </select>
            {errors.residentId && <p className="error-message">{errors.residentId.message}</p>}
          </div>
          <div>
            <label>Select Food Item (Only consumable will be shown)</label>
            <select
              className={`form-element ${errors.foodItemId ? 'error' : ''}`}
              {...register('foodItemId', { required: 'Please select food item' })}
            >
              <option value="">Select Food Item</option>
              {foodItems.map((foodItem, index) => (
                <option key={index} value={foodItem.id}>
                  Name: {foodItem.name}, IDDSI Levels: {foodItem.iddsi_levels}
                </option>
              ))}
            </select>
            {errors.foodItemId && <p className="error-message">{errors.foodItemId.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="button-container">
          <button className="add-item-button" onClick={handleSearch}>Search</button>
          <button className="add-item-button" onClick={clearSearch}>Reset</button>
        </div>
      </div>
      <h2>Meal Plans</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Resident</th>
            <th>Food Item</th>
          </tr>
        </thead>
        <tbody>
          {residentMealPlans.map((mealPlan, index) => (
            <tr key={index}>
              <td>{mealPlan.name}</td>
              <td>
                <div><b>Name:</b> {mealPlan.resident_name}</div>
                <div><b>IDDSI Level:</b> {mealPlan.resident_iddsi_level}</div>
              </td>
              <td>
                <div><b>Name:</b> {mealPlan.food_item_name}</div>
                <div><b>IDDSI Levels:</b> {mealPlan.food_item_iddsi_levels}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResidentMealPlans;