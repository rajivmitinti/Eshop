import NavigationBar from "./components/NavigationBar/NavigationBar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.common);
  useEffect(() => {
    function checkUserLogin() {
      if (window.location.pathname === "/") {
        dispatch({ type: "SET_USER", payload: "" });
        navigate("/login");
      }
    }
    checkUserLogin();
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default App;
