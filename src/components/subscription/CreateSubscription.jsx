import React, { useState } from 'react';
import customAPI from '../../api'; // Sesuaikan dengan path API Anda
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [roles, setRoles] = useState({
    student: false,
    king: false,
    knight: false,
  });

  const handleRoleChange = (role) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [role]: !prevRoles[role],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRoles = Object.keys(roles).filter(role => roles[role]);

    try {
      const response = await customAPI.post('/course/create', {
        title,
        description,
        content,
        price: coursePrice, // Hanya mengirim harga kursus
        roles: selectedRoles, // Mengirim role yang dipilih
      });
      const data = response.data;

      if (response.status === 201) {
        toast.success(data.message); // Tampilkan notifikasi sukses
        // Reset form
        setTitle('');
        setDescription('');
        setContent('');
        setCoursePrice('');
        setRoles({ student: false, king: false, knight: false }); // Reset role
      } else {
        toast.error(data.message); // Tampilkan pesan error jika ada
      }
    } catch (error) {
      toast.error('Terjadi kesalahan!'); // Tampilkan error umum
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <h2 className="text-xl mb-4">Buat Kursus Baru</h2>
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Konten"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Harga Kursus"
        value={coursePrice}
        onChange={(e) => setCoursePrice(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <div className="mb-4">
        <h3 className="mb-2">Pilih Role yang Didapat:</h3>
        {Object.keys(roles).map((role) => (
          <label key={role} className="block">
            <input
              type="checkbox"
              checked={roles[role]}
              onChange={() => handleRoleChange(role)}
            />
            {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize first letter */}
          </label>
        ))}
      </div>
      <button type="submit" className="bg-tombol text-white py-2 px-4">
        Buat Kursus
      </button>
    </form>
  );
};

export default CreateCourse;
