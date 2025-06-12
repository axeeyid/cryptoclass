import React, { useEffect, useState } from 'react';
import customAPI from '../api'; // Pastikan ini adalah jalur yang benar ke file API Anda

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await customAPI.get('/players'); // Gunakan customAPI untuk mengambil data
        setPlayers(response.data); // Ambil data dari response
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Data Pemain</h1>
      <ul>
        {players.map(player => (
          <li key={player._id}>
            {player.name} - {player.role} - Win Rate: {player.winRate}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
