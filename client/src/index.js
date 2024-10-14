import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from 'theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App/>} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

