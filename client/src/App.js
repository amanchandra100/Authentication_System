import "./App.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import SendOTP from "./pages/SendOTP.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";
import Profile from "./pages/Profile.tsx";
import PrivateRoute from "./components/Routes/Private.tsx";

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
      { 
        path: "/", 
        element: <Register /> 
      },
      {
        path: "/send-otp", 
        element: <SendOTP /> 
      },
      { 
        path: "/login", 
        element: <Login /> },
      { 
        path: "/forget-password", 
        element: <ForgetPassword /> 
      },
      {
        element:<PrivateRoute/>,
        children:[
          { 
            path: "/home", 
            element: <Home /> },
          { 
            path: "/profile", 
            element: <Profile /> 
          },
        ]
      },
      { 
        path: "*", 
        element: <NotFound /> 
      },
    ],
  },
]);
// <div className="App">
//    <App/>
// </div>

export default appRouter;
