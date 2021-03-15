import React from "react";

export default class Register extends React.Component {
  render() {
    return (
      <div className="register-section">
        <form className="register-form">
          <label>Name</label>
          <input type="text" />
          <label>Email</label>
          <input type="text" />
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" />
          <label>Password</label>
          <input type="password" />
          <label>Confirm Password</label>
          <input type="password" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}