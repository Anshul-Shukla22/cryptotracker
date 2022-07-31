import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import Header from './Components/Header';
import Alert from './Components/Alert';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
