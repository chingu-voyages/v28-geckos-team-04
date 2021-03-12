import React from "react";
import compass from "../assets/compass.png";

const HomeButton = ({ userLocation, handleHomeButton }) => {
  return (
    <button
      onClick={() => handleHomeButton(userLocation)}
      className="home-button"
    >
      <img src={compass} alt="RETURN HOME" />
    </button>
  );
};

export default HomeButton;
