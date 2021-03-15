export const getDataFromINat = async (
  taxa,
  neLat,
  neLng,
  swLat,
  swLng,
  results
) => {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations?taxon_name=${taxa}&iconic_taxa=Fungi&nelat=${neLat}&nelng=${neLng}&swlat=${swLat}&swlng=${swLng}&per_page=${results}&order=desc&order_by=created_at`
  );
  const data = await res.json();
  return data;
};
