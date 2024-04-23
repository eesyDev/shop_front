import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Homepage, ProductDetail, Product, Navbar } from './componets';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/product/:slug' element={<ProductDetail/>}  />
        </Routes>
      </div>
    </div>
  );
}

export default App;
