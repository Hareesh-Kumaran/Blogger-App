import "../Styles/FormPage/FormPage.css";
import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

function FormPage() {
  const [active, setactive] = useState(1);
  return (
    <div className="form-page-wrapper ">
      <div className="tab-control-wrapper">
        <button
          onClick={() => setactive(1)}
          className={active === 1 ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setactive(2)}
          className={active === 2 ? "active" : ""}
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
