import React from 'react';
import Shows from './Shows.js'
import MovieInfo from './MovieInfo.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import MovieProvider from './context/MovieContext'
import Login from "./Login";
import Register from "./Register";
import Logout from './Logout.js';
import { AuthProvider } from './context/AuthContext.js';
import AuthContext from './context/AuthContext.js';
import { useContext, useEffect } from 'react';

const App = () => {
  return (
      <MovieProvider>
          <Routes path="/">
            <Route index element={<Shows />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/:movieId" exact element={<MovieInfo />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
      </MovieProvider>
  )
}

export default App;
