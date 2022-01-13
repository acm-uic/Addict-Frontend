import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeUnauthenticated } from './components/HomeUnauthenticated';
import Home from './components/Home';
import Users from './components/Users';
import Create from './components/Create';
import PasswordReset from './components/PasswordReset';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<HomeUnauthenticated />} />
          <Route path="authorized" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="create" element={<Create />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
