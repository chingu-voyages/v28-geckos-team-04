import React from "react";
import Modal from "../UI/Modal";

export default function About() {
  return (
    <Modal>
      <h1>About Mashroom finder</h1>
      <ul className="about-ul">
        <li>Discuss what the app does</li>
        <li>Discuss why people need it</li>
        <li>Discuss how to use it</li>
      </ul>
    </Modal>
  );
}
