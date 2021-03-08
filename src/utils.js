//URI to query iNaturalist API for Fungi in given area
//https://api.inaturalist.org/v1/observations?taxon_name=GENUS/SPECIES_NAME&iconic_taxa=Fungi&lat=LATITUDE_COORDINATE_HERE&lng=LONGITUDE_COORDINATE_HERE-&radius=RADIUS_HERE&order=desc&order_by=created_at
//
//i.e.: Morels (Morchella) near Tim
//https://api.inaturalist.org/v1/observations?taxon_name=Morchella&iconic_taxa=Fungi&lat=39.96238554917605&lng=-75.27935028076173&radius=5&order=desc&order_by=created_at

// 20210308105806
// https://api.inaturalist.org/v1/observations?taxon_name=Morchella&iconic_taxa=Fungi&lat=39.96238554917605&lng=-75.27935028076173&radius=5&order=desc&order_by=created_at

export const getDataFromINat = async (taxa, latitude, longitude, radius) => {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations?taxon_name=${taxa}&iconic_taxa=Fungi&lat=${latitude}&lng=${longitude}&radius=${radius}&order=desc&order_by=created_at`
  );
  const data = await res.json();
  return data;
};
