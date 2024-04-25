import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Homepage, ProductDetail, Product, Navbar, Success } from './componets';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/product/:slug' element={<ProductDetail/>}  />
          <Route path='/success' element={<Success/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
