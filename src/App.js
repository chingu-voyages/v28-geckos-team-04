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
  const [userLocation, setUserLocation] = useState(null);

  const [showNav, setShowNav] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavToggle = () => {
    setShowNav((prevValue) => !prevValue);
  };

  useEffect(() => {
    const success = (pos) => {
      setUserLocation(pos);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const handleDrag = async (e) => {
    const { lat: neLat, lng: neLng } = await e.getNorthEast().toJSON();
    const { lat: swLat, lng: swLng } = await e.getSouthWest().toJSON();
    const { results } = await getDataFromINat(
      "Morchella",
      neLat,
      neLng,
      swLat,
      swLng
    );
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
          <Map
            userLocation={userLocation}
            iNatResults={iNatResults}
            handleDrag={handleDrag}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
