import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Create from './pages/Create';
import ChangePassword from './pages/ChangePassword';
import Page404 from './pages/Page404';
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
            <Route path="admin" element={<Home />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/create" element={<Create />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<Page404 />} />
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
