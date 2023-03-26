import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { userDetails } = useSelector((state) => state.common);
  return userDetails.email ? children : <Navigate to="/login" />;
};
