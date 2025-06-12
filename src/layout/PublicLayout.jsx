import React from "react";
import Navbar from "../components/Navbar";
import FooterView from '../components/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4">
        <Outlet />
      </main>
      <FooterView />
    </>
  );
};

export default PublicLayout;
