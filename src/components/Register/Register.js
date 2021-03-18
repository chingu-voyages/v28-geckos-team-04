import React from "react";
import AuthAPIService from "../../services/AuthAPIService"

export default class Register extends React.Component {
  state = {
    error: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, password, confirmPassword } = e.target;
    this.setState({ error: null });
    AuthAPIService.postUser({
        name: name.value,
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    })
        .then((user) => {
            this.props.history.push("/login");
        })
        .catch((res) => {
            this.setState({ error: res.error });
        });
};
  render() {
    return (
      <div className="register-section">
        <form className="register-form" onSubmit={this.handleSubmit}>
          {this.state.error && (
            <p className="register-error">{this.state.error}</p>
          )}
          <label>Name</label>
          <input type="text" name="name" required/>
          <label>User Name</label>
          <input type="text" name="username" required/>
          <label>Password</label>
          <input type="password" name="password" required/>
          <label>Confirm Password</label>
          <input type="password" name="confiermPassword" required/>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}