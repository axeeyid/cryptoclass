import React, { useEffect, useState } from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';

const OTPView = () => {
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  useEffect(() => {
    // Set a timer for 2 minutes (120000 milliseconds)
    const timer = setTimeout(() => {
      setIsExpired(true);
      toast.error('Waktu untuk memasukkan kode OTP telah habis.');
    }, 120000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);

  const handleVerifyOtp = async (data) => {
    if (isExpired) {
      toast.error('Kode OTP sudah tidak berlaku.');
      return;
    }

    try {
      const response = await customAPI.post('/user/verify-otp', { email: data.email, otp: data.otp });

      if (response.status === 200) {
        const userData = response.data.user; // Ambil data pengguna jika ada

        // Simpan data pengguna dan token jika ada
        dispatch(loginUser({ data: userData }));
        login(userData);
        toast.success('OTP berhasil diverifikasi');
        navigate('/login'); // Pindahkan ke halaman login
      } else {
        toast.error('Data pengguna tidak valid.');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Verifikasi OTP gagal';
      toast.error(errorMessage);
    }
  };

  return (
    <main>
      <FormAuth isOtp={true} onSubmit={handleVerifyOtp} isExpired={isExpired} />
    </main>
  );
};

export default OTPView;
