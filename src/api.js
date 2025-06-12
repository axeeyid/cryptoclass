import axios from 'axios';
import { toast } from 'react-toastify'; // Pastikan untuk mengimpor toast

// Create an Axios instance with default settings
const customAPI = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allow sending cookies
});

// Request Interceptor to add Authorization header
customAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request config:', config); // Log the request config for debugging
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor to handle errors
customAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;
      console.error('Response Interceptor Error Status:', status);
      console.error('Response Error Data:', data);

      if (status === 401) {
        console.warn('Unauthorized access - possibly expired token.');

        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');

          if (refreshToken) {
            try {
              console.log('Attempting to refresh token...');
              const refreshResponse = await axios.post(
                'http://localhost:3000/api/v1/auth/refresh',
                { token: refreshToken },
                { withCredentials: true }
              );

              const { token: newToken } = refreshResponse.data;
              console.log('New token received:', newToken);
              localStorage.setItem('token', newToken);
              customAPI.defaults.headers['Authorization'] = `Bearer ${newToken}`;

              // Retry the failed request with the new token
              return customAPI(originalRequest);
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              logoutUser();
            }
          } else {
            console.warn('No refresh token available. Logging out.');
            logoutUser();
          }
        } else {
          console.warn('Retry attempt already made. Logging out.');
          logoutUser();
        }
      } else if (status === 500) {
        toast.error("Terjadi kesalahan di server. Silakan coba lagi nanti!");
      }
    } else {
      console.error('No response from server:', error.message);
    }

    return Promise.reject(error);
  }
);

// Function to handle user logout
const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; // Redirect to login page
};

// Function to delete a course
export const deleteCourse = async (courseId) => {
  try {
    await customAPI.delete(`/course/courses/${courseId}`);
  } catch (error) {
    console.error('Failed to delete course:', error.response ? error.response.data : error.message);
    throw new Error('Failed to delete course');
  }
};

// Function to update the status of a course
export const updateCourseStatus = async (courseId, newStatus) => {
  try {
    await customAPI.patch(`/course/courses/${courseId}/status`, { status: newStatus });
  } catch (error) {
    console.error('Failed to update course status:', error.response ? error.response.data : error.message);
    throw new Error('Failed to update course status');
  }
};

export default customAPI;
