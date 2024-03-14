import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Shows from './Shows.js'
import MovieInfo from './MovieInfo.js';
import { Routes, Route } from 'react-router-dom';
import MovieProvider from './context/MovieContext'


const App = () => {
  

 

  return (
    <MovieProvider>
      <Routes  path="/">
        <Route index element={<Shows />} />
        <Route path="/:movieId" exact element={<MovieInfo />} />
      </Routes>
    </MovieProvider>
  )
}

export default App;
