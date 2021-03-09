import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./styles/mapStyles";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 40.712776,
  lng: -74.005974,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Map({ iNatResults, userLocation }) {
  console.log(userLocation);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);
  // useEffect(() => {
  //   panTo({ lat: userLocation[0], lng: userLocation[1] });
  // }, []);
  useEffect(() => {
    const success = async (pos) => {
      const { latitude, longitude } = await pos.coords;
      panTo({ lat: latitude, lng: longitude });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, [panTo]);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map...";
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {iNatResults.map((marker) => (
          <Marker
            key={marker.id}
            position={{
              lat: marker.geojson.coordinates[1],
              lng: marker.geojson.coordinates[0],
            }}
            icon={{
              url: "/mushroom.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Mushroom</h2>
              <p>
                found at latitude:{selected.lat} longitude:
                {selected.lng}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default Map;
