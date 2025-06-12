import React from "react";
import Navbar from "../components/Navbar";
import FooterView from '../components/Footer'
import { Outlet } from 'react-router-dom';



const publicview = () => {
  
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterView />
    </>
  );
};

export default publicview;
