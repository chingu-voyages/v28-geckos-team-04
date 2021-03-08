import { useState } from "react";
import { getDataFromINat } from "../utils";

const SearchBar = () => {
  const [iNatResults, setINatResults] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { results } = await getDataFromINat(
      "Morchella",
      latitude,
      longitude,
      "30"
    );
    setINatResults(results);
    console.log(results);
  };
  const getLocation = (e) => {
    e.preventDefault();
    const success = async (pos) => {
      const { latitude, longitude } = await pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    };
    navigator.geolocation.getCurrentPosition(success);
  };
  return (
    <form onSubmit={handleSubmit} action="">
      <input
        value={latitude}
        onChange={(e) => {
          setLatitude(e.target.value);
        }}
        type="text"
        placeholder="latitude"
      />
      <input
        value={longitude}
        onChange={(e) => {
          setLongitude(e.target.value);
        }}
        type="text"
        placeholder="longitue"
      />
      <button>Submit</button>
      {iNatResults && <p>Got results</p>}
      <button onClick={getLocation}>get my location</button>
    </form>
  );
};

export default SearchBar;
