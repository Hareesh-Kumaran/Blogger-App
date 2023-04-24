import { useState, useEffect } from "react";
import getCountrylist from "../utils/Country_data";
import { setLocation } from "../Redux/Feature/BlogSlice";
import { useDispatch } from "react-redux";

function CountryList() {
  
  const dispatch=useDispatch();
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getCountrylist().then((data) => setCountryData([...data]));
  }, []);

  return (
    <div className="select-container">
      <label>Filter by country</label>
      <select title="Country"
        className="selectcustom"
        onChange={(e) => dispatch(setLocation(e.target.value))}
      >
        <option value="none">All</option>
        {countryData.map((item, index) => {
          return (
            <option value={item.country} key={index}>
              {item.country}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CountryList;
