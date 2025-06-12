import React, { useState } from 'react';

const PlayerForm = ({ token }) => {
  const [player, setPlayer] = useState({ name: '', role: '', hero: '', winRate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(player),
      });

      if (!response.ok) {
        throw new Error('Failed to add player');
      }

      const data = await response.json();
      console.log('Player added:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nama Pemain" onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
      <input type="text" name="hero" placeholder="Hero" onChange={handleChange} required />
      <input type="number" name="winRate" placeholder="Win Rate" onChange={handleChange} required />
      <button type="submit">Tambah Pemain</button>
    </form>
  );
};

export default PlayerForm;
