import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Function to retrieve the initial user from localStorage
const getInitialUser = () => {
    const userString = localStorage.getItem('user');
    if (!userString || userString === 'undefined') {
        localStorage.removeItem('user'); // Clear corrupt entry
        return null;
    }

    try {
        return JSON.parse(userString);
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user'); // Clear corrupt entry
        return null;
    }
};

// Initial state with user from localStorage
const initialState = {
    user: getInitialUser(),
};

// Create user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = action.payload.data;
            console.log('User data received in slice:', user); // Debugging

            if (user && user.id) {
                state.user = user; // Set user in state
                localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
                toast.success('Login berhasil');
            } else {
                toast.error('Data pengguna tidak valid.');
            }
        },
        registerUser: (state, action) => {
            const user = action.payload.data;

            if (user && user.id) {
                state.user = user; // Set user in state
                localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
                toast.success('Registrasi berhasil');
            } else {
                toast.error('Data pengguna tidak valid.');
            }
        },
        logoutUser: (state) => {
            const userId = state.user?.id; // Get current user's ID
            state.user = null; // Clear user from state
            localStorage.removeItem('user'); // Remove user from localStorage
            if (userId) {
                localStorage.removeItem(`cart_${userId}`); // Clear cart if applicable
            }
            toast.success('Logout berhasil');
        },
    },
});

// Export actions for use in components
export const { loginUser, registerUser, logoutUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
