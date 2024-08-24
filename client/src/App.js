import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";

const Applayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      { path: "/", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/Home", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
// <div className="App">
//    <App/>
// </div>

export default appRouter;
