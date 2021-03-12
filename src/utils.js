export const getDataFromINat = async (taxa, latitude, longitude, radius) => {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations?taxon_name=${taxa}&iconic_taxa=Fungi&lat=${latitude}&lng=${longitude}&radius=${radius}&order=desc&order_by=created_at`
  );
  const data = await res.json();
  return data;
};
