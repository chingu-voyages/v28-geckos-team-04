import React from "react";
import PlacesSearch from "../PlacesSearch";
import SpeciesSelect from "../SpeciesSelect";

const SearchBar = ({ panTo, userLocation, taxa, handleTaxaChange }) => {
  return (
    <div className="search-bar">
      <PlacesSearch panTo={panTo} userLocation={userLocation} />
      <SpeciesSelect value={taxa} handleTaxaChange={handleTaxaChange} />
    </div>
  );
};

export default SearchBar;
