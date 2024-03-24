import React from 'react';
import Shows from './Shows.js'
import MovieInfo from './MovieInfo.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import MovieProvider from './context/MovieContext'
import Login from "./Login";
import Register from "./Register";
import { AuthProvider } from './context/AuthContext.js';
import AuthContext from './context/AuthContext.js';
import { useContext, useEffect } from 'react';

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    
      <MovieProvider>
        <Routes path="/">
          <Route index element={
                    (JSON.stringify(auth)!=='{}') ? (
                      <Shows />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
          />
          <Route path="/login" element={
                   (JSON.stringify(auth)==='{}') ? (
                    <Login />
                  ) : (
                    <Navigate to="/" />
                  )
                }
          />
          <Route path="/register" element={
                  (JSON.stringify(auth)==='{}') ? (
                    <Register />
                  ) : (
                    <Navigate to="/" />
                  )
                }
          />
          {/* <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shows" element={<Shows />} /> */}
          <Route path="/:movieId" exact element={<MovieInfo />} />
        </Routes>
      </MovieProvider>
    
    
  )
}

export default App;
