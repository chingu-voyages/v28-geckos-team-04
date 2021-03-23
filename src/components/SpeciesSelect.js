import { useState } from "react";
import Select from "react-select";
import { selectorStyles, taxaOptions } from "../utils";

const SpeciesSelect = ({ taxa, handleTaxaChange }) => {
  const [showSelect, setShowSelect] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowSelect(!showSelect)}
        className={`species-toggle`}
      ></button>
      <Select
        className={`${showSelect && "show-select"}`}
        isMulti
        value={taxa}
        onChange={handleTaxaChange}
        options={taxaOptions}
        styles={selectorStyles}
      />
    </>
  );
};

export default SpeciesSelect;
