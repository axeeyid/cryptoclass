import React from "react";
import { useAuth } from "../context/AuthContext"; 
import UserIcon from "./UserIcon"; 
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout berhasil");
  };

  const handleUserIconClick = () => {
    if (user) {
      navigate(user.role === 'admin' ? '/admindashboard' : '/userdashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-between py-5 px-5 text-white">
      <div className="flex-1" />
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <p className="text-ketiga text-xs sm:text-sm font-primary italic font-bold mr-2">
              Hello, {user.name}
            </p>
            <UserIcon onClick={handleUserIconClick} />
            <button
              className="ml-4 text-xs bg-kempat px-2 py-1 rounded-md hover:bg-opacity-80 font-primary text-ketiga cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/login"
              className="text-xs bg-kempat px-2 py-1 rounded-md hover:bg-opacity-80 font-primary text-ketiga cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-xs bg-kempat px-2 py-1 rounded-md hover:bg-opacity-80 font-primary text-ketiga cursor-pointer"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
