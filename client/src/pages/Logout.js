import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAuth({});
    localStorage.removeItem("accessToken");
    navigate("/login");
  }, [])

  return (
    <div>Logging out...</div>
  )
}

export default Logout;
