import {Form} from "react-bootstrap";
import countryData from "../utils/Country_data";
function CountryList() {
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
            value={item}
            key={index}
          >
            {item}
          </option>
        );
      })}
    </Form.Select>
  );
}

export default CountryList;
