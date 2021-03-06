import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import { Map } from "./components";
import { getDataFromINat } from "./utils";
import TokenService from "./services/TokenService";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [iNatResults, setINatResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  const [showNav, setShowNav] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavToggle = () => {
    setShowNav((prevValue) => !prevValue);
  };

  const handleLogout = () => {
    TokenService.clearAuthToken();
    setLoggedOut(true);
  };

  useEffect(() => {
    const success = (pos) => {
      setUserLocation(pos);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const handleDrag = async ({ taxa, bounds }) => {
    setINatResults([]);
    console.log(taxa);
    const { lat: neLat, lng: neLng } = await bounds.getNorthEast().toJSON();
    const { lat: swLat, lng: swLng } = await bounds.getSouthWest().toJSON();
    if (taxa.length) {
      taxa.forEach(async (taxon) => {
        const { results } = await getDataFromINat(
          taxon.value,
          neLat,
          neLng,
          swLat,
          swLng,
          Math.floor(100 / taxa.length)
        );
        setINatResults((prevValue) => [...prevValue, ...results]);
      });
    }
  };

  useEffect(() => {
    const success = (pos) => {
      setUserLocation(pos);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <div className="App">
      <Route
        path="/"
        render={() => (
          <NavBar
            handleNavToggle={handleNavToggle}
            showNav={showNav}
            handleLogout={handleLogout}
          />
        )}
      />
      <Route
        exact
        path="/login"
        render={(props) => (
          <Login
            loggedOut={loggedOut}
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
          />
        )}
      />
      <Route exact path="/register" component={Register} />
      <Route exact path="/about" component={About} />
      <main>
        <section className="main">
          <Map
            userLocation={userLocation}
            iNatResults={iNatResults}
            handleDrag={handleDrag}
            handleNavToggle={handleNavToggle}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
