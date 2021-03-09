import React from "react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.handleLogout(e);
    this.props.history.push("/");
  };

  render() {
    return (
      <nav>
        {!this.props.isLoggedIn ? (
          <>
            <div className="nav-home">
              <div className="nav-logo">
                <h1>
                  <Link to="/">Mushroom Finder</Link>
                </h1>
              </div>
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="nav-home">
            <h1>
              <Link to="/">Mushroom Finder</Link>
            </h1>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <button onClick={(e) => this.handleLogout(e)}>Log Out</button>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
