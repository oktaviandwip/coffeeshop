import {createBrowserRouter} from "react-router-dom";
import SignUp from "../pages/auth/SignUp";

export default createBrowserRouter([
  {
    path:"/signup",
    element: <SignUp/>,
  }
])