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

export const taxaOptions = [
  {
    value: "Morchella",
    label: "Morchella",
  },
  {
    value: "Pleurotus",
    label: "Pleurotus",
  },
  {
    value: "Cantharellus",
    label: "Cantharellus",
  },
  {
    value: "Laetiporus",
    label: "Laetiporus",
  },
];

export const selectorStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: "200px",
    marginTop: "50px",
  }),
  control: (provided, state) => ({
    ...provided,
    width: "200px",
    position: "fixed",
    zIndex: "2",
  }),
};
