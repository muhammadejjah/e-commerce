import { Outlet, Route, Routes } from "react-router-dom";
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/Website/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Users from './pages/Dashboard/Users';
import GoogleCallback from './pages/Auth/GoogleCallback';
import Dashboard from './pages/Dashboard/Dashboard';
import RequireAuth from './pages/Auth/RequireAuth';
import EditeUser from './pages/Dashboard/EditeUser';
import AddUser from './pages/Dashboard/AddUser';
import Acsses from './pages/Auth/403';
import Writer from './pages/Dashboard/Writer';
import Err404 from './pages/Auth/404';
import RequireBack from "./pages/Auth/RequireBack";
import Products from "./pages/Dashboard/Products";
import Categories from "./pages/Dashboard/Categories";
import AddCategory from "./pages/Dashboard/AddCategory";
import EditCategory from "./pages/Dashboard/EditCategory";
import Test from "./pages/Dashboard/test";
import AddProduct from "./pages/Dashboard/AddProduct";
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

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />}></Route>
        <Route path="/*" element={<Err404 />}></Route>

        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole="1995" />} >
              <Route path="users" element={<Users />}></Route>
              <Route path="users/:id" element={<EditeUser />} errorElement={<Err404 />}></Route>
              <Route path="users/adduser" element={<AddUser />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />} >
              <Route path="writer" element={<Writer />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />} >
              <Route path="products" element={<Products />}></Route>
              <Route path="products/addproduct" element={<AddProduct />}></Route>
              <Route path="categories" element={<Categories />}></Route>
              <Route path="categories/addcategory" element={<AddCategory />}></Route>
              <Route path="categories/:id" element={<EditCategory />} errorElement={<Err404 />}></Route>
            </Route>
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
