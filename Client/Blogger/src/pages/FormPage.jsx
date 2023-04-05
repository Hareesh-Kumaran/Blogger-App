import { Tab, Tabs } from "react-bootstrap";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

function FormPage()
{
 return (

     <Tabs>
       <Tab eventKey="login" title="Login">
         <LoginForm/>
       </Tab>
       <Tab eventKey="register" title="Register">
        <RegisterForm/>
       </Tab>
     </Tabs>

 );

}

export default FormPage;
