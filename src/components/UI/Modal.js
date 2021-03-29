import React from "react";
import { useHistory } from "react-router-dom";

const Modal = ({ children, handleClose }) => {
  let history = useHistory();
  const exitModal = () => {
    history.push("/");
  };
  return (
    <>
      <div className="backdrop" onClick={exitModal}></div>
      <div className="modal">{children}</div>
    </>
  );
};

export default Modal;
