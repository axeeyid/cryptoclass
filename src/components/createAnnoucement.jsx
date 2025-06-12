import React, { useEffect, useState } from "react";
import customAPI from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    roles: [],
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await customAPI.get("/post/caripost");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Gagal mengambil pengumuman!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newAnnouncement.title);
    formData.append("content", newAnnouncement.message); // Ganti ke 'content'
    formData.append("rolesAllowed", JSON.stringify(newAnnouncement.roles)); // Ganti ke 'rolesAllowed'
    if (newAnnouncement.image) {
      formData.append("image", newAnnouncement.image);
    }

    try {
      await customAPI.post("/post/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Pengumuman berhasil dibuat!");
      setNewAnnouncement({ title: "", message: "", roles: [], image: null });
      fetchAnnouncements();
      navigate("/home");
    } catch (error) {
      console.error("Error creating announcement:", error.response?.data || error);
      toast.error("Gagal membuat pengumuman: " + (error.response?.data?.message || "Terjadi kesalahan!"));
    }
  };

  const toggleRole = (role) => {
    setNewAnnouncement((prev) => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };

  return (
    <div className="p-4 bg-utama ">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-white">Create Community</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Judul"
          value={newAnnouncement.title}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
          required
          className="border p-2 w-full mb-2 rounded-lg"
        />
        <textarea
          placeholder="Pesan"
          value={newAnnouncement.message}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
          required
          className="border p-2 w-full mb-2 rounded-lg"
        />
        <div className="mb-2">
          <span className="font-bold text-white">Pilih Role:</span>
          <div className="flex gap-2 mt-2">
            {["user", "king", "knight", "student", "admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={` p-2 rounded ${newAnnouncement.roles.includes(role) ? "bg-tombol text-utama font-bold" : "bg-tombol"}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, image: e.target.files[0] })}
          className="border p-2 w-full mb-2 text-white rounded-lg"
        />
        <button type="submit" className="bg-tombol text-utama p-2 rounded">Create post</button>
      </form>
      <ul>
        {announcements.map((ann, index) => (
          <li key={index} className="border p-4 mb-2 rounded-lg">
            <h3 className="text-xl font-semibold text-white">{ann.title}</h3>
            <p className=" text-white">{ann.content}</p>
            {ann.imageUrl && <img src={ann.imageUrl} alt="Pengumuman" className="w-full h-auto my-2" />}
            <p className="text-white">Untuk role: {ann.rolesAllowed.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
