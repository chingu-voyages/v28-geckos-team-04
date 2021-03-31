import React, {useState} from "react";
import Modal from "../UI/Modal";
import AuthAPIService from "../../services/AuthAPIService";
import TokenService from "../../services/TokenService";
import { Link, useHistory } from "react-router-dom";
//import Config  from "../../config/Config";

const Login = () => {
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  //const getData= useState([])

  const history = useHistory();
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    setError(null);
    const user = { username: username.value, password: password.value};
    AuthAPIService.postLogin(user)
      .then((loginResponse) => {
        const {user_id, sub} = TokenService.readJwtToken(loginResponse.authToken);
        setUsername({user_id, sub})
        history.push("/home");
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  
    return (
      <Modal>
        <h1>Login to Your Account</h1>
      <div className="login-form">
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <div className="login-section">
            <label className="email-label">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="password-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button id="sign-in">Sign in</button>
        </form>
      </div>
      <div className="create-account">
        <Link to="/register">Create an Account</Link>
        </div>
      </Modal>
    );
}

export default Login;
