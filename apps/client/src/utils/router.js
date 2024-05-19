import {createBrowserRouter} from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/home/Home";

export default createBrowserRouter([
  {
    path:"/signup",
    element: <SignUp/>,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path:"/",
    element: <Home/>,
  },
])