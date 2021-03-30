import React from "react";
import {Link} from "react-router-dom";
import TokenService from "../../services/TokenService";

export default class NavBar extends React.Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.handleLogout(e);
    this.props.history.push("/");
  };


    render(){
        return(
            <nav>
                {TokenService.hasAuthToken() ? (
                    <div className="nav-home">
                    <span>
                        <img src={'/mushroom.png'} alt="mushroom img"  className="mush-img" />
                    </span>
                    <h1>
                       <Link to="/">Mushroom Finder</Link>
                    </h1>

                </div>
            ):(
                <>
                  <div className="nav-links">
                      <span>
                      <img src={'/mushroom.png'} alt="mushroom img"  className="nav-logo" />
                      </span>
                      <h1>
                           <Link to="/">Mushroom Finder</Link>
                      </h1>

                  </div>
                </>

            )}
            <div className="nav-home">
                {TokenService.hasAuthToken() ? (
                    <Link to="/">Home</Link>

                ):(
                    <>
                      <Link to="/">Home</Link>
                      <Link to="/about">About</Link>
                    </>

                )}

                {TokenService.hasAuthToken() ? (
                    <button
                       type="submit"
                       onClick={(e) => this.handleLogout(e)}
                    >
                        Log out
                    </button>
                ):(
                    <>
                      <Link to="/register">
                        <button className="register-button" type="submit">
                          Register
                        </button>
                       </Link>
                      <Link to="/login">
                        <button type="submit" className="login-button">
                            Login
                        </button>
                       </Link>
                    </>
                )}

            </div>

                
          </nav>

        )
    }
}
            
              
        
    

