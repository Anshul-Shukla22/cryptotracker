import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
