import React, { useState, useEffect, useCallback } from 'react';
import { addResident, getResidents } from '../services/api';
import { useForm } from 'react-hook-form';
import { notify } from '../utils/Notification';
import Modal from './common/Modal';
import '../css/components/forms.css';
import UploadCsv from './UploadCsv';

interface FormValues {
  name: string;
  iddsiLevel: string;
}

/**
 * Displays a form to add residents and a list of existing residents.
 * Includes functionality to search and filter residents.
 * 
 * @returns {JSX.Element} The Residents component.
 */
const Residents: React.FC = () => {
  const [name, setName] = useState('');
  const [iddsiLevel, setIddsiLevel] = useState('0');
  const [residents, setResidents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();
  const [search, setSearch] = useState('');

  const resetForm = () => {
    reset({
      name: '',
      iddsiLevel: ''
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const newResident = { name: values.name, iddsi_level: values.iddsiLevel };
      const response = await addResident(newResident);
      fetchResidents();
      resetForm();
      setIsModalOpen(false);
      notify(response.data.message, 'success');
    } catch (error) {
      console.error('Error adding resident:', error);
    }
  };

  const fetchResidents = useCallback(async (search: string = '') => {
    try {
      const response = await getResidents(search);
      setResidents(response.data.data);
    } catch (error) {
      console.error('Failed to fetch residents', error);
    }
  }, []);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const clearSearch = () => {
    setSearch('');
    fetchResidents();
  };

  const handleSearch = () => {
    fetchResidents(search);
  };

  const onUploadSuccess = () => {
    setSearch('');
    fetchResidents();
  };

  return (
    <div className="container">
      <div className="data-insertion-container">
        <button onClick={() => setIsModalOpen(true)} className="add-item-button">Add Resident</button>
        <UploadCsv label="residents" apiEndpoint='residents' onUploadSuccess={onUploadSuccess}/>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Add Resident</h2>
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
            <label>IDDSI Level</label>
            <select
              className={`form-element ${errors.iddsiLevel ? 'error' : ''}`}
              {...register('iddsiLevel', { required: 'IDDSI Level is required' })}
            >
              <option value="">Select IDDSI Level</option>
              {Array.from({ length: 8 }, (_, level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.iddsiLevel && <p className="error-message">{errors.iddsiLevel.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or IDDSI Level"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="button-container">
          <button className="add-item-button" onClick={handleSearch}>Search</button>
          <button className="add-item-button" onClick={clearSearch}>Reset</button>
        </div>
      </div>
      <h2>Residents</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IDDSI Level</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident, index) => (
            <tr key={index}>
              <td>{resident.name}</td>
              <td>{resident.iddsi_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Residents;