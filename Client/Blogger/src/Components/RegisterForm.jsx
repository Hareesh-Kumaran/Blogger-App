import { Form } from "react-bootstrap";
import { useState } from "react";
import countryData from "../utils/Country_data";
import axios from "axios";
function RegisterForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("india");
  const [phone, setPhone] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:7000/user", {
      firstname,
      lastname,
      gender,
      email,
      password,
      location,
      phone,
    });
    console.log(response);
    response.data.success === false
      ? alert(response.data.message)
      : alert(response.data.message);
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            placeholder="Enter First Name"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            placeholder="Enter Second Name"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Select
            aria-label="Default select example"
            style={{ width: "200px" }}
            size="sm"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>India</option>
            {countryData.map((item,index) => {
              return (
                <option style={{}} value={item} key={index}>
                  {item}
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
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </Form.Group>

        <button onClick={(e) => registerUser(e)}>Register</button>
      </Form>
    </div>
  );
}

export default RegisterForm;
