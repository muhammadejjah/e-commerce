import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';

import store from './State';
import { Provider } from 'react-redux';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     errorElement: <h1>Error</h1>,
//     element: <App />,
//     children: [
//       { index: true, element: <HomePage /> },

//     ]
//   },
//   {
//     path: "/login",
//     errorElement: <h1>Error</h1>,
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     errorElement: <h1>Error</h1>,
//     element: <Register />,
//   },
//   {
//     path: "/auth/google/callback",
//     errorElement: <h1>Error</h1>,
//     element: <GoogleCallback />,
//   },
//   {
//     element: <RequireAuth />,
//     errorElement: <h1>Error</h1>,
//     children: [
//       {
//         path: "/dashboard",
//         errorElement: <h1>Error</h1>,
//         element: <Dashboard />,
//         children: [
//           { index: true, element: <Users /> },
//           { path: "users", element: <Users /> },
//           { path: "users/:id", element: <EditeUser /> },
//           { path: "users/adduser", element: <AddUser /> },
//           { path: "writer", element: <Writer /> },
//         ]
//       },
//     ]
//   }
// ])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>


);


