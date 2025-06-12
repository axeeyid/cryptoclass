import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const UserIcon = () => {
  const navigate = useNavigate();
  const { user } = useAuth() || {}; // Tambahkan fallback agar tidak terjadi error

  const handleClick = () => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admindashboard');
          break;
        case 'manager':
          navigate('/manager');
          break;
        case 'user':
          navigate('/user');
          break;
        default:
          navigate('/home'); // Anda bisa menambahkan rute default atau halaman utama di sini
          break;
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className="rounded-full flex items-center justify-center cursor-pointer text-xl hover:text-blue-500"
      onClick={handleClick}
      title="Profile"
    >
      <FaUserCircle className="text-2xl" />
    </div>
  );
};

export default UserIcon;
