// src/player/AddPlayerForm.jsx
import React, { useState } from 'react';
import customAPI from '../api';

const AddPlayerForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [winRate, setWinRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customAPI.post('/addplayer', { name, role, winRate });
      alert('Player added successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Player Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Role" 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Win Rate (%)" 
        value={winRate} 
        onChange={(e) => setWinRate(e.target.value)} 
        required 
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
