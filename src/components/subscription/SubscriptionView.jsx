import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import customAPI from '../../api';

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", import.meta.env.VITE_CLIENT_MIDTRANS);
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await customAPI.get('/course/allcourse');
        const data = response.data;

        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          throw new Error('Data tidak valid');
        }
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      }
    };

    fetchCourses();
    insertSnapScript();
  }, []);

  const handleSubscribe = async (courseId) => {
    setLoading(true);
    try {
      const course = courses.find(course => course._id === courseId);
      if (!course) throw new Error("Course not found");

      const uniqueOrderId = `${courseId}-${Date.now()}`;

      const tokenResponse = await customAPI.post("/pay/generate-token", {
        amount: parseFloat(course.monthlyPrice),
        order_id: uniqueOrderId,
      });

      const tokenId = tokenResponse.data.tokenId;

      window.snap.pay(tokenId, {
        onSuccess: async (result) => {
          console.log(result);
          toast.success("Payment successful!");

          // Optionally call your backend to update the subscription status
          await customAPI.post("/subs/subscribe", { courseId, orderId: uniqueOrderId });
          navigate('/'); // Redirect to the appropriate route
        },
        onPending: (result) => {
          console.log(result);
          toast.info("Waiting for your payment confirmation.");
        },
        onError: (result) => {
          console.log(result);
          toast.error("Payment failed!");
        },
        onClose: () => {
          console.log("Payment window closed.");
          toast.warn("Payment window closed.");
        },
      });
    } catch (err) {
      console.error("Error during subscription:", err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Membership Area</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course._id} className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <p className="text-lg font-bold text-teal-500">Harga Bulanan: {course.monthlyPrice}</p>
              <button 
                onClick={() => handleSubscribe(course._id)}
                className="mt-4 bg-tombol text-white py-2 px-4 rounded hover:bg-teal-600"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Langganan'}
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada kursus tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
