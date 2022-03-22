import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './assets/css/global.css';
import LandingPage from './components/LandingPage';
import RequestRide from './components/RequestRide';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LandingPage />} />
          <Route path={'/request-ride'} element={<RequestRide />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
