import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import getCountrylist from "../utils/Country_data";

function CountryList() {
  
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getCountrylist().then((data) => setCountryData([...data]));
  }, []);

  return (
    <Form.Select
      aria-label="Default select example"
      // size="sm"
      className="selectcustom"
    >
      <option>Select Location</option>
      {countryData.map((item, index) => {
        return (
          <option
            style={{ color: "red", width: "20%" }}
            value={item.country}
            key={index}
          >
            {item.country}
          </option>
        );
      })}
    </Form.Select>
  );
}

export default CountryList;
