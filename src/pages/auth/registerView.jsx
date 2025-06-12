import React from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/userSlice'; // Pastikan path ini benar

const RegisterView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      const response = await customAPI.post('/user/register', data);
      dispatch(registerUser(response.data)); // Dispatch aksi untuk memperbarui Redux store
      toast.success('Registrasi berhasil');
      navigate('/otp'); // Arahkan ke halaman OTP setelah registrasi berhasil
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Registrasi gagal';
      toast.error(errorMessage);
    }
  };

  return (
    <main>
      <FormAuth isRegister={true} onSubmit={handleRegister} />
    </main>
  );
};

export default RegisterView;
