import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from 'pages/Landing.js'
import Booking from 'pages/Booking';

const App = () => {
  return (
    <Routes path="/">
      <Route index element={<Landing />}/>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} /> */}
      <Route path="/:movieId" exact element={<Booking />} />
      <Route path="*" element={<Landing />}/>
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  )
}

export default App;
