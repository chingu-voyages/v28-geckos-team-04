import Select from "react-select";
import { selectorStyles, taxaOptions } from "../utils";

const SpeciesSelect = ({ taxa, handleTaxaChange }) => {
  return (
    <Select
      isMulti
      value={taxa}
      onChange={handleTaxaChange}
      options={taxaOptions}
      styles={selectorStyles}
    />
  );
};

export default SpeciesSelect;
