import { useState } from "react";
import { getDataFromINat } from "./utils";

function App() {
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
    console.log(results);
    setINatResults(results);
  };
  return (
    <div className="App">
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
      </form>
      <ul>Results</ul>
      {iNatResults.map((result) => (
        <li key={result.id}>{result.location}</li>
      ))}
    </div>
  );
}

export default App;
