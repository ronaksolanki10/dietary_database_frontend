import React from 'react';
import { Tabs, Tab } from '../components/Tabs';
import FoodItems from '../components/FoodItems';
import Residents from '../components/Residents';
import ResidentMealPlans from '../components/ResidentMealPlans';
import IddsiLevelInfo from '../components/common/IddsiLevelInfo';
import '../css/pages/dashboard.css';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard component displaying various tabs for food items, residents, and resident meal plans.
 * Includes a header with a logout button and IDDSI level information.
 * 
 * @returns {JSX.Element}
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Handles user logout by removing the access token and redirecting to the login page.
   */
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <IddsiLevelInfo/>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <Tabs>
        <Tab label="Food Items">
          <FoodItems />
        </Tab>
        <Tab label="Residents">
          <Residents />
        </Tab>
        <Tab label="Resident Meal Plans">
          <ResidentMealPlans />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;