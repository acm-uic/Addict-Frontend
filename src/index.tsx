import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeUnauthenticated from './pages/HomeUnauthenticated';
import Home from './pages/Home';
import Users from './pages/Users';
import Create from './pages/Create';
import ChangePassword from './pages/ChangePassword';
import PasswordReset from './pages/PasswordReset';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import apikeyReducer from './redux/reducers/apikey';

import { composeWithDevTools } from 'redux-devtools-extension';
import AuthenticatedNav from './components/AuthenticatedNav';

const store = createStore(apikeyReducer, {key: "", loggedIn: false, server: "http://addict-api.acmuic.org", user: ""}, composeWithDevTools());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthenticatedNav />
          <Routes>
            <Route path="/" element={<HomeUnauthenticated />} />
            <Route path="authorized" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="create" element={<Create />} />
            <Route path="password-reset" element={<PasswordReset />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Routes>
      </BrowserRouter>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
