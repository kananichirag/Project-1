import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Contect from "./pages/Contect.jsx";
import Login from "./pages/Login.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/menu", element: <Menu /> },
      { path: "/about", element: <About /> },
      { path: "/contect", element: <Contect /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/new-product", element: <NewProduct /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
