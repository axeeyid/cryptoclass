import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser as reduxLogoutUser } from '../features/userSlice';
import { toast } from 'react-toastify';

// Membuat konteks autentikasi
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    });

    const login = (userData) => {
        if (!userData || !userData.id) {
            toast.error('Data pengguna tidak valid.');
            return;
        }

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(loginUser({ data: userData })); // Update Redux store
        toast.success('Login berhasil');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        dispatch(reduxLogoutUser());
        toast.success('Logout berhasil');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
