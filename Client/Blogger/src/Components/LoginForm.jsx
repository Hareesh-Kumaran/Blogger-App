import "../Styles/FormPage/LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import { fetchuserDetails } from "../Redux/Feature/userSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["Blogging_Token"]);

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn(
        "email or password is not proper please enter a valid password",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }

    //change to constant
    const response = await axios.post("http://localhost:7000/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      setCookie("Blogging_Token", response.data.token);
      localStorage.setItem("Blogging_UserID", response.data.userID);
      let id = response.data.userID;

      dispatch(fetchuserDetails(id));
      navigate("/");
    } else {
      toast.warn(`${response.data.message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="login-form-main-wrapper">
      <div className="input-field-wrapper">
        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="input-field-wrapper">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="button-container">
        <button onClick={(e) => loginUser(e)}>Login</button>
      </div>
    </div>
  );
}

export default LoginForm;
