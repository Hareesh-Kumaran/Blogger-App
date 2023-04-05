import { Form } from "react-bootstrap";
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
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          placeholder="Enter First Name"
          value={state.firstname}
          onChange={(e) => {
            dispatch({ type: "firstname", value: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          placeholder="Enter Second Name"
          value={state.lastname}
          onChange={(e) => {
            dispatch({ type: "lastname", value: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            dispatch({ type: "gender", value: e.target.value });
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Others</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) => {
            dispatch({ type: "email", value: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => {
            dispatch({ type: "password", value: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Select
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
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Phone Number"
          value={state.phone}
          onChange={(e) => {
            dispatch({ type: "phone", value: e.target.value });
          }}
        />
      </Form.Group>

      <button onClick={(e) => registerUser(e)}>Register</button>
    </Form>
  );
}

export default RegisterForm;
