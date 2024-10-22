import React from 'react';
import './NotFound.css'; 
import SideBar from '../SideBar/SideBar';
import { useNavigate  } from 'react-router-dom'; 

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! Page Not Found</p>
        <p className="error-suggestion">The page you are looking for does not exist.</p>
      </div>
      <button 
        onClick={() =>navigate(-1)} 
        className="flex items-center mt-8 px-4 py-2 bg-[#FF7F5C] text-white rounded-lg hover:bg-[#f56b44] transition-all duration-300"
      >
        <i className="fa-solid fa-arrow-left-long mr-2 animate-arrow"></i>
        Go Back
      </button>
      <div className="animation">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </div>
  );
};

export default NotFound;
