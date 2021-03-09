import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import { Map } from "./components";
import { getDataFromINat } from "./utils";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [iNatResults, setINatResults] = useState([]);
  const [userLocation, setUserLocation] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const success = async (pos) => {
      const { latitude, longitude } = await pos.coords;
      setUserLocation([latitude, longitude]);
      const { results } = await getDataFromINat(
        "Morchella",
        latitude,
        longitude,
        "30"
      );
      setINatResults(results);
      console.log(results);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <div className="App">
      {/* <Route
        path="/"
        render={(props) => (
          <NavBar {...props} {...this.state} handleLogout={handleLogout} />
        )}
      />
      <Route
        exact
        path="/login"
        render={(props) => <Login {...props} handleLogin={handleLogin} />}
      />
      <Route exact path="/register" component={Register} />
      <Route exact path="/about" component={About} /> */}
      <main>
        <section className="main">
          <Route exact path="/home" component={SearchBar} />
          <Map iNatResults={iNatResults} userLocation={userLocation} />
        </section>
      </main>
    </div>
  );
}

export default App;
