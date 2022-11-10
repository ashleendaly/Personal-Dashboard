import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className='content'> Checking Authentication...</div>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink to="/">Login</NavLink><small>(Access without token only)</small>
            <NavLink to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div>
          <div className='content'>
            <Routes>
              <Route path="/" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App