import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import NavToggle from "./components/Navbar/NavToggle";
import { Map } from "./components";
import { getDataFromINat } from "./utils";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [iNatResults, setINatResults] = useState([]);
  const [userLocation, setUserLocation] = useState([]);

  const [showNav, setShowNav] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavToggle = () => {
    setShowNav((prevValue) => !prevValue);
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
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const handleDrag = async (e) => {
    const { lat, lng } = await e.toJSON();
    const { results } = await getDataFromINat("Morchella", lat, lng, "30");
    setINatResults(results);
  };

  return (
    <div className="App">
      <Route
        path="/"
        render={() => (
          <NavBar handleNavToggle={handleNavToggle} showNav={showNav} />
        )}
      />
      <Route
        exact
        path="/login"
        render={(props) => (
          <Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
        )}
      />
      <Route exact path="/register" component={Register} />
      <Route exact path="/about" component={About} />
      <main>
        <section className="main">
          <NavToggle handleNavToggle={handleNavToggle} />
          <Map iNatResults={iNatResults} handleDrag={handleDrag} />
        </section>
      </main>
    </div>
  );
}

export default App;
