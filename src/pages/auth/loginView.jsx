import React, { useState } from 'react';
import FormAuth from '../../components/Form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [alertShown, setAlertShown] = useState(false); // State untuk kontrol alert

  const handleLogin = async (data) => {
    if (alertShown) return; // Cek jika alert sudah ditampilkan

    try {
      const response = await customAPI.post('/user/login', data);
      const userData = response.data.user;

      if (userData && userData.id) {
        dispatch(loginUser({ data: userData }));
        login(userData);
        toast.success('Login berhasil');
        setAlertShown(true); // Tandai alert sudah ditampilkan
        navigate('/'); // Arahkan ke halaman utama setelah login
      } else {
        if (!alertShown) {
          toast.error('Data pengguna tidak valid.');
          setAlertShown(true);
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Login gagal';
      if (!alertShown) {
        toast.error(errorMessage);
        setAlertShown(true);
      }
    }
  };

  return (
    <main>
      <FormAuth isRegister={false} onSubmit={handleLogin} />
    </main>
  );
};

export default LoginView;
