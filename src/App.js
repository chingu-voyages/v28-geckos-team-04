import React from "react";
import {Route} from "react-router-dom"
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import { Map } from "./components";
import "./App.css";


class App extends React.Component{
  state = {
    isLoggedIn: false,
  };

  handleLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
  };


  render(){
    return(
      <div className="App">
        <Route
          path="/"
          render={(props) => (
            <NavBar {...props} {...this.state} handleLogout={this.handleLogout} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login {...props} handleLogin={this.handleLogin} />
          )}
        />
       <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
      <main>
        <section className="main">
          <Route exact path="/home"  component={SearchBar}/>
          <Map />
        </section>
      </main>
    </div>
    );
  }
}



export default App;
