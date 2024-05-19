import {createBrowserRouter} from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

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
  }
])