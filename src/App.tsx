import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

/**
 * Main application component.
 * 
 * Sets up the router and notification provider for the application.
 * 
 * @returns {React.ReactElement}
 */
const App: React.FC = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={ <LoginPage/> } />
          <Route element={ <ProtectedRoute/> }>
            <Route path="/dashboard" element={ <Dashboard/> } />
          </Route>
          <Route path="/" element={ <Dashboard/> } />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;