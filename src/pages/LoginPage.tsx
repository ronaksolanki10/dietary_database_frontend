import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useForm } from 'react-hook-form';
import '../css/pages/login.css';

interface FormValues {
  username: string;
  password: string;
}

/**
 * LoginPage component for user authentication.
 * Displays a login form and handles user login.
 * Redirects to the dashboard if the user is already authenticated.
 * 
 * @returns {JSX.Element}
 */
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();

  /**
   * Handles form submission for user login.
   * @param {FormValues}
   */
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await login(values.username, values.password);
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/dashboard');
    } catch(error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text"
            className={`form-input form-element ${errors.username ? 'error' : ''}`}
            {...register('username', { required: 'Username is required' })} 
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password"
            className={`form-input form-element ${errors.password ? 'error' : ''}`}
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;