import React from "react";
import {Link} from "react-router-dom";

export default class Login extends React.Component{
    handleLogin = (e) => {
        e.preventDefault();
        this.props.handleLogin(e);
        this.props.history.push("/home")
    };

  render() {
    return (
      <React.Fragment>
        <h1>Login to Your Account</h1>
        <div className="login-form">
          <form className="login-form">
            <div className="login-section">
               <label className="email-label">Email</label>
               <input type="text" name="email" defaultValue="demo@demo.com" />

               <label className="password-label">Password</label>
               <input type="password" name="password" defaultValue="password" />
            </div>
            <div></div>
          </form>
          <button onClick={(e) => this.handleLogin(e)}>Sign in</button>
        </div>
        <div className="create-account">
            <Link to="/register">Create an Account</Link>
        </div>
     </React.Fragment>
    );
  }
}