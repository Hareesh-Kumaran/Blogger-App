import "../Styles/FormPage/FormPage.css";
import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

function FormPage() {
  const [active, setactive] = useState(1);

  const activeStyle = {
    backgroundColor: " rgb(247, 186, 117)",
    color: "white",
    border: "0.5px solid  white",
  };
  return (
    <div className="form-page-wrapper ">
      <div className="tab-control-wrapper">
        <button
          onClick={() => setactive(1)}
          style={active === 1 ? activeStyle : {}}
        >
          Login
        </button>
        <button
          onClick={() => setactive(2)}
          style={active === 2 ? activeStyle : {}}
        >
          Register
        </button>
      </div>
      <div className="tab-content-wrapper">
        {active === 1 ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export default FormPage;
