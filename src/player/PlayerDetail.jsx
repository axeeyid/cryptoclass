// src/player/PlayerDetail.jsx
import React, { useEffect, useState } from 'react';
import customAPI from '../api'; // Pastikan ini sesuai dengan path Anda

const PlayerDetail = ({ params }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await customAPI.get(`/players/${params.id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error('Error fetching player:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!player) {
    return <div>Player not found.</div>;
  }

  return (
    <div>
      <h2>{player.name}</h2>
      <p>Role: {player.role}</p>
      <p>Win Rate: {player.winRate}%</p>
      {/* Add more player details as needed */}
    </div>
  );
};

export default PlayerDetail;
