import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  

  const loginUser = async (userData) => {
    try {
      const res = await fetch(`https://reqres.in/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (res.ok && result.token) {
        localStorage.setItem("token", result.token);
        setUser({email: userData.email});
        toast.success(`Login successful`);

        navigate("/users", { replace: true });
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    toast.success("Logged out.");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // Check for existing token in localStorage and set the user state if needed
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "" }); 
    }
  }, []);


  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;