import { useState } from 'react';
import axios from 'axios';

const roles = ["user", "king", "knight", "student", "admin"];

const AnnouncementForm = ({ userRole }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [rolesAllowed, setRolesAllowed] = useState([]);

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRolesAllowed(prev =>
      prev.includes(value) ? prev.filter(role => role !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rolesAllowed', JSON.stringify(rolesAllowed));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/announcements', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Announcement created:', response.data);
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  if (userRole !== 'admin') {
    return <p>You do not have permission to create announcements.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 p-2 border border-gray-300 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Roles to View</label>
        {roles.map(role => (
          <div key={role} className="flex items-center">
            <input
              type="checkbox"
              value={role}
              onChange={handleRoleChange}
              className="mr-2"
            />
            <label>{role}</label>
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Create Announcement</button>
    </form>
  );
};

export default AnnouncementForm;
