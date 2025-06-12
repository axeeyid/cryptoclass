import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Checkout = () => {
    const { subscriptionId } = useParams();
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await axios.get(`/subscriptions/${subscriptionId}`); // Ambil detail subscription
                setSubscription(response.data);
            } catch (error) {
                console.error('Error fetching subscription:', error);
            }
        };
        fetchSubscription();
    }, [subscriptionId]);

    const handlePayment = async () => {
        // Logic untuk memproses pembayaran
        try {
            const response = await axios.post('/subscribe', { courseId: subscription.courseId._id });
            // Tampilkan hasil dari respons
            alert(response.data.message);
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    if (!subscription) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <h2 className="text-xl mb-4">{subscription.courseId.title}</h2>
            <p className="mb-4">Deskripsi: {subscription.courseId.description}</p>
            <p className="text-lg font-bold mb-4">Harga: Rp {subscription.courseId.price}/bulan</p>
            <button 
                onClick={handlePayment} 
                className="bg-ketiga text-white py-2 px-4 rounded">
                Bayar Sekarang
            </button>
        </div>
    );
};

export default Checkout;
