import "../Styles/FormPage/registerForm.css";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { userEndPoint } from "../utils/ApiUrl";
import { toast } from "react-toastify";
import getCountrylist from "../utils/Country_data";

function RegisterForm() {
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    getCountrylist().then((data) => setCountryData([...data]));
  }, []);

  const initalState = {
    firstname: "",
    lastname: "",
    gender: "male",
    email: "",
    password: "",
    location: "India",
    phone: "",
  };

  const [state, dispatch] = useReducer(reducer, initalState);

  function reducer(state, action) {
    switch (action.type) {
      case "firstname":
        return { ...state, firstname: action.value };
      case "lastname":
        return { ...state, lastname: action.value };
      case "gender":
        return { ...state, gender: action.value };
      case "email":
        return { ...state, email: action.value };
      case "password":
        return { ...state, password: action.value };
      case "location":
        return { ...state, location: action.value };
      case "phone": {
        return { ...state, phone: action.value };
      }
    }
  }

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await axios.post(userEndPoint, { ...state });

    !response.data.success
      ? toast.error(response.data.message, {})
      : toast.success(response.data.message, {});
  };

  return (
    <div className="register-form-main-wrapper">
      <div className="input-field-wrapper">
        <label>Firstname</label>
        <input
          placeholder="Enter First Name"
          value={state.firstname}
          onChange={(e) => {
            dispatch({ type: "firstname", value: e.target.value });
          }}
        />
      </div>

      <div className="input-field-wrapper">
        <label>Lastname</label>
        <input
          placeholder="Enter Second Name"
          value={state.lastname}
          onChange={(e) => {
            dispatch({ type: "lastname", value: e.target.value });
          }}
        />
      </div>

      <div className="dropdown-wrapper">
        <label>Gender</label>
        <select
          aria-label="Default select example"
          onChange={(e) => {
            dispatch({ type: "gender", value: e.target.value });
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Others</option>
        </select>
      </div>

      <div className="input-field-wrapper">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) => {
            dispatch({ type: "email", value: e.target.value });
          }}
        />
      </div>

      <div className="input-field-wrapper">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => {
            dispatch({ type: "password", value: e.target.value });
          }}
        />
      </div>

      <div className="dropdown-wrapper">
        <label>Location</label>
        <select
          aria-label="Default select example"
          style={{ width: "200px" }}
          size="sm"
          onChange={(e) =>
            dispatch({ type: "location", value: e.target.value })
          }
        >
          <option>India</option>
          {countryData.map((item, index) => {
            return (
              <option style={{}} value={item.country} key={index}>
                {item.country}
              </option>
            );
          })}
        </select>
      </div>

      <div className="input-field-wrapper">
        <label>Phone</label>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={state.phone}
          onChange={(e) => {
            dispatch({ type: "phone", value: e.target.value });
          }}
        />
      </div>

      <div className="button-container">
        <button onClick={(e) => registerUser(e)}>Register</button>
      </div>
    </div>
  );
}

export default RegisterForm;
