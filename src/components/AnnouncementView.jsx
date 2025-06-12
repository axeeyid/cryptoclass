import React, { useEffect, useState } from "react";
import customAPI from "../api";

const AnnouncementView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null); // Menambahkan state untuk menangani error

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await customAPI.get("/post/caripost");
      console.log("Fetched announcements:", response.data); // Log respons dari API
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setError("Gagal mengambil pengumuman."); // Menyimpan pesan error
    }
  };

  return (
    <div className="p-4 bg-utama">
      <h2 className="text-2xl font-bold mb-4 text-white font-primary italic">
        Community post
      </h2>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <ul>
        {announcements.length > 0 ? (
          announcements.map((ann, index) => (
            <li
              key={index}
              className=" p-4 mb-2 rounded-lg shadow-lg glass hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-white">{ann.title}</h3>
              <p className="text-white mb-2">{ann.content}</p>
              {ann.imageUrl && (
                <img
                  src={ann.imageUrl}
                  alt={ann.title}
                  className="mb-2 w-full h-auto"
                />
              )}
              <p className="text-white">
                Special for:{" "}
                <span className="font-semibold">
                  {Array.isArray(ann.rolesAllowed)
                    ? ann.rolesAllowed.join(", ")
                    : "N/A"}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Dibuat pada: {new Date(ann.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada pengumuman yang tersedia.</p>
        )}
      </ul>
    </div>
  );
};

export default AnnouncementView;
