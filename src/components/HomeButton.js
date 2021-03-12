import React from "react";

const HomeButton = ({ userLocation, handleHomeButton }) => {
  return (
    <button
      onClick={() => handleHomeButton(userLocation)}
      className="home-button"
    >
      RETURN HOME
    </button>
  );
};

export default HomeButton;
