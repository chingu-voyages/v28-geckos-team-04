import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthAPIService from "../../services/AuthAPIService";

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [user, setUser] = useState({ username: "", name: "", user_id: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    AuthAPIService.postUser({
      name,
      username,
      password,
      confirmPassword
    })
      .then((user) => {
        history.push("/login");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  return (
    <div className="register-section">
      <form className="register-form" onSubmit={handleSubmit}>
        {error && <p className="register-error">{error}</p>}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>User Name</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;