import React from "react";
import AuthAPIService from "../../services/AuthAPIService";
import TokenService from "../../services/TokenService"
import {Link} from "react-router-dom";

export default class Login extends React.Component{
  state = {
    error: null,
    user : {
      username: "",
      password: ""
    }
  }
    handleLogin = (e) => {
        e.preventDefault();
        const {username, password} = e.target;
        this.setState({
          error: null,
        });
        const user = {username: username.value, password: password.value};
        AuthAPIService.postLogin(user)
          .then((loginResponse) => {
            TokenService.readJwtToken(loginResponse.authToken);
            this.props.history.push("/home")
          })
          .catch((res) => {
            this.setState({error: res.error});
          });
    
    };
    setUser = (user) => {
      this.setState({
        user: {
          username: user.sub,
          password: user.password
        }

      })
    }

  render() {
    return (
      <React.Fragment>
        <h1>Login to Your Account</h1>
        <div className="login-form">
          <form className="login-form" onSubmit={this.handleLogin}>
            {this.state.error && <p className="error">{this.state.error}</p>}
            <div className="login-section">
              <label className="email-label">Email</label>
              <input type="text" name="email" defaultValue="demo@demo.com" />

              <label className="password-label">Password</label>
              <input type="password" name="password" defaultValue="password" />
            </div>
          </form>
          <button id="sign-in">Sign in</button>
        </div>
        <div className="create-account">
          <Link to="/register">Create an Account</Link>
        </div>
      </React.Fragment>
    );
  }
}
