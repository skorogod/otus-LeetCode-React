import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Users from './components/Users/Users';
import User from './components/User/User';
import {loader as userLoader} from './components/User/User'
import {loader as usersLoader} from './components/Users/Users'
import EditUser from './components/User/EditUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'users',
        element: <Users></Users>,
        loader: usersLoader,
        children: [
          {
            path: ':id',
            element: <User></User>,
            loader: userLoader,
          },
          {
            path: ':id/edit',
            element: <EditUser></EditUser>,
            loader: userLoader
          }
        ]
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
