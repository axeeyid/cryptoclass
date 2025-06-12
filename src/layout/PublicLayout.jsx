import React from "react";
import Navbar from "../components/Navbar";
import FooterView from '../components/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      
        <Outlet />
      
      <FooterView />
    </>
  );
};

export default PublicLayout;
