import axios from 'axios';
import { notify } from '../utils/Notification';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    notify(error.response.data.message, 'error');
    if (error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/**
 * Log in a user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<any>}
 */
export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post(`${API_URL}/login`, { username, password });
  return response.data;
};

/**
 * Add a new food item.
 * @param {Object} foodItem
 * @param {string} foodItem.name
 * @param {string} foodItem.category
 * @param {number[]} foodItem.iddsi_levels
 * @returns {Promise<any>}
 */
export const addFoodItem = async (foodItem: { name: string; category: string; iddsi_levels: number[] }) => {
  return await axiosInstance.post(`${API_URL}/food-items/add`, foodItem);
};

/**
 * Get a list of food items.
 * @param {string} [search='']
 * @returns {Promise<any>}
 */
export const getFoodItems = async (search: string = '') => {
  return await axiosInstance.get(`${API_URL}/food-items?search=${search}`);
};

/**
 * Get a list of residents.
 * @param {string} [search='']
 * @returns {Promise<any>}
 */
export const getResidents = async (search: string = '') => {
  return await axiosInstance.get(`${API_URL}/residents?search=${search}`);
};

/**
 * Add a new resident.
 * @param {Object} resident
 * @param {string} resident.name
 * @param {string} resident.iddsi_level
 * @returns {Promise<any>}
 */
export const addResident = async (resident: { name: string; iddsi_level: string }) => {
  return await axiosInstance.post(`${API_URL}/residents/add`, resident);
};

/**
 * Add a new resident meal plan.
 * @param {Object} residentMealPlan
 * @param {string} residentMealPlan.name 
 * @param {string} residentMealPlan.resident_id
 * @param {string} residentMealPlan.food_item_id
 * @returns {Promise<any>}
 */
export const addResidentMealPlan = async (residentMealPlan: { name: string; resident_id: string; food_item_id: string }) => {
  return await axiosInstance.post(`${API_URL}/resident-meal-plans/add`, residentMealPlan);
};

/**
 * Get a list of resident meal plans.
 * @param {string} [search=''].
 * @returns {Promise<any>}
 */
export const getResidentMealPlans = async (search: string = '') => {
  return await axiosInstance.get(`${API_URL}/resident-meal-plans?search=${search}`);
};

/**
 * Get consumable food items for a resident.
 * @param {Object} resident
 * @param {string} resident.resident_id
 * @returns {Promise<any>}
 */
export const getResidentConsumableFoodItems = async (resident: { resident_id: string }) => {
  return await axiosInstance.post(`${API_URL}/food-items/residents-consumable`, resident);
};

/**
 * Upload a CSV file.
 * @param {string} endpoint
 * @param {FormData} formData
 * @returns {Promise<any>}
 */
export const uploadCSV = async (endpoint: string, formData: FormData) => {
  return await axiosInstance.post(`${API_URL}/${endpoint}/upload`, formData);
};