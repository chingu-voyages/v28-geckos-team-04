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
    label: "Morels (Morchella sp.)",
  },
  {
    value: "Pleurotus",
    label: "Oyster Mushrooms (Pleurotus sp.)",
  },
  {
    value: "Cantharellus",
    label: "Chanterelles (Cantharellus sp.)",
  },
  {
    value: "Laetiporus",
    label: "Chicken of the Woods (Laetiporus sp.)",
  },
];

export const selectorStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
    maxWidth: "400px",
    marginTop: "40px",
    position: "fixed",
    left: "50%",
    top: "60px",
    transform: "translateX(-50%)",
    zIndex: "2",
  }),
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    maxWidth: "400px",
    position: "fixed",
    left: "50%",
    top: "60px",
    transform: "translateX(-50%)",
    zIndex: "2",
  }),
};
