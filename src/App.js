import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InventoryDefault from './components/InventoryDefault';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/inventory' element={<InventoryDefault />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
