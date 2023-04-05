import axios from "axios";

const getCountrylist = async () => {
  const response = await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
  );
 
  return  [...response.data.data];
};

export default getCountrylist;
