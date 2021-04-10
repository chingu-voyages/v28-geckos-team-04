import React from "react";
import NavToggle from "../Navbar/NavToggle";
import CenterUserButton from "../CenterUserButton";

const ButtonContainer = ({
  userLocation,
  handleCenterUser,
  handleNavToggle,
}) => {
  return (
    <div className="btn-container">
      <CenterUserButton
        userLocation={userLocation}
        handleHomeButton={handleCenterUser}
      />
      <NavToggle handleNavToggle={handleNavToggle} />
    </div>
  );
};

export default ButtonContainer;
