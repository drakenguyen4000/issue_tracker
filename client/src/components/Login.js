import React, { useContext, useState } from "react";
import { Input, FormGroup, Form, Container, Label, Button } from "reactstrap";
import history from "../history";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { MsgContext } from "../context/MsgContext";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const authContext = useContext(AuthContext);
  const msgContext = useContext(MsgContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setUser({ ...user, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { user, isAuthenticated } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        history.push("/dashboard");
      } else {
        const message = { msgBody: "Login failed!", msgError: true };
        msgContext.setMessage(message);
      }
    });
  };

  return (
    <Container className="login-form">
      <h2 className="text-center">Login</h2>
      <Form className="col-lg-6 mx-auto" onSubmit={onSubmit}>
        <FormGroup>
          <Label for="login-username">Username (Alex)</Label>
          <Input
            type="text"
            name="username"
            id="login-username"
            onChange={handleChange}
            value={user.username}
            maxLength="25"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="login-password">Password (bug2727)</Label>
          <Input
            type="password"
            name="password"
            id="login-password"
            onChange={handleChange}
            value={user.password}
            maxLength="25"
            required
          />
        </FormGroup>
        <div className="login-info">* Please use the above info or register a new account to sign in.</div>
        <Button size="sm" className="btn-style">Login <i className="fas fa-unlock"></i></Button>
      </Form>
    </Container>
  );
};
export default Login;
