import React, { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../Form/FormInput';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { loginUser } from '../../features/userSlice'; // Pastikan path sesuai

const FormAuth = ({ isRegister, isOtp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    otp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        const response = await customAPI.post('/user/register', formData);
        toast.success(response.data.message);
        navigate('/otp'); // Navigasi ke halaman OTP setelah pendaftaran berhasil
      } else if (isOtp) {
        const response = await customAPI.post('/user/verify-otp', {
          email: formData.email,
          otp: formData.otp
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate('/login'); // Navigasi ke halaman login setelah verifikasi berhasil
        }
      } else {
        // Login handling
        const response = await customAPI.post('/user/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log(response); // Log response untuk debugging
        toast.success(response.data.message);

        // Pastikan data user ada sebelum disimpan ke Redux
        if (response.data.user) {
          // Simpan data user ke Redux
          dispatch(loginUser(response.data.user));

          // Simpan data user ke Local Storage
          localStorage.setItem('user', JSON.stringify(response.data.user));

          navigate('/'); // Navigasi ke halaman dashboard setelah login berhasil
          window.location.reload(); // Refresh halaman
        } else {
          toast.error('Data pengguna tidak ditemukan.');
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Terjadi kesalahan';
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await customAPI.post('/v1/user/resend-otp', { email: formData.email });
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Terjadi kesalahan saat mengirim ulang OTP';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-kempat font-primary min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-md px-4 py-8 mx-auto">
        <div className="text-center mb-8">
          <Form
            method="POST"
            className="flex flex-col p-6 mx-auto max-w-lg text-center font-bold text-black glass rounded-lg hover:shadow-md hover:opacity-80 transition duration-300 ease-in-out"
            onSubmit={handleSubmit}
          >
            <h3 className="font-bold text-lg text-white mb-4">
              {isRegister ? "Register" : isOtp ? "Verifikasi OTP" : "Login"}
            </h3>
            {isRegister && (
              <>
                <FormInput type="text" name="name" label="Nama" value={formData.name} onChange={handleChange} />
                <FormInput type="text" name="username" label="Username" value={formData.username} onChange={handleChange} />
              </>
            )}
            <FormInput type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
            {!isOtp && (
              <FormInput type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
            )}
            {isOtp && (
              <>
                <FormInput
                  type="text"
                  name="otp"
                  label="Kode OTP"
                  placeholder="Masukkan kode OTP"
                  value={formData.otp}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-ketiga mt-2"
                >
                  Kirim Ulang Kode OTP
                </button>
              </>
            )}
            <button
              type="submit"
              className="bg-kempat text-ketiga rounded-md px-4 py-2 mt-4 hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
            >
              {isRegister ? "Register" : isOtp ? "Verifikasi OTP" : "Login"}
            </button>
            <div className="mt-4">
              {isOtp ? null : !isRegister ? (
                <p className="text-white">
                  belum punya akun? 
                  <Link
                    to="/register"
                    className="font-semibold text-ketiga hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out cursor-pointer ml-2"
                  >
                    register
                  </Link>
                </p>
              ) : (
                <p className="text-white">
                  sudah punya akun? 
                  <Link
                    to="/login"
                    className="font-semibold text-ketiga hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out cursor-pointer ml-2"
                  >
                    Login
                  </Link>
                </p>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormAuth;
