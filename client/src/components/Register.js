import React, { useEffect, useState, useRef, useContext } from "react";
import { Container, Input, Label, Form, FormGroup, Button } from "reactstrap";
import AuthService from "../services/AuthService";
import { MsgContext } from "../context/MsgContext";
import history from "../history";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    jobtitle: "",
    registercode: "",
    avatar: "",
  });

  const msgContext = useContext(MsgContext);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const code = () => {
    const message = { msgBody: "Admin Code: superdev2099 ---- User Code: tumen10", msgError: false };
    msgContext.setMessage(message);
  }

  const handleChange = (e) => {
    const { name, type } = e.target;
    type === "file"
      ? setUser({ ...user, avatar: e.target.files[0] })
      : setUser({ ...user, [name]: e.target.value });
  };
  //Create new Form data to store image file and others inputs
  //Create object to store all other inputs.
  //Loop through all other inputs to set them inside formData
  //Append image file to formData
  //Use axios to post to backend
  //return to list directory
  const onSubmit = (e) => {
    e.preventDefault();
    //Creating a form to include image object in requesting data
    let formData = new FormData();
    const userInfo = {
      username: user.username,
      password: user.password,
      jobtitle: user.jobtitle,
      registercode: user.registercode,
    };
    Object.keys(userInfo).forEach((key) => {
      formData.set(key, userInfo[key]);
    });
    formData.append("image", user.avatar);

    AuthService.register(formData).then((data) => {
      const { message } = data;
      msgContext.setMessage(message);
      //When registration is successful, wait 2 sec then push to login page
      if (!message.msgError) {
        timerID = setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <Container>
      <h2 className="text-center">Register</h2>
      <Form
        className="col-lg-6 mx-auto"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <FormGroup>
          <Label for="reg-username">Username</Label>
          <Input
            type="text"
            onChange={handleChange}
            name="username"
            id="reg-username"
            value={user.username}
            maxLength="12"
            required
          />
        </FormGroup>
        <FormGroup className="row">
          <div className="col-md-6">
            <Label for="reg-jobtitle">Job Title</Label>
            <Input
              type="select"
              onChange={handleChange}
              name="jobtitle"
              id="reg-jobtitle"
              value={user.jobtile}
              required
            >
              <option value="">--Select--</option>
              <option value="Lead Engineer">Lead Engineer</option>
              <option value="Fullstack Engineer">Fullstack Engineer</option>
              <option value="QC Engineer">QC Engineer</option>
            </Input>
          </div>
          <div className="col-md-6">
            <Label for="reg-password">Password</Label>
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              id="reg-password"
              value={user.password}
              maxLength="12"
              required
            />
          </div>
        </FormGroup>
        <FormGroup className="row">
          <div className="col-md-6">
            <Label for="register">Registration Code</Label> 
            <Button color="dark" className="register_code" onClick={code} size="sm"><i className="fas fa-question"></i></Button>
            <Input
              type="text"
              onChange={handleChange}
              name="registercode"
              id="register"
              value={user.registercode}
              maxLength="12"
              required
            />
          </div>
          <div className="col-md-6">
            <Label for="image">Avatar</Label>
            <Input
              type="file"
              onChange={handleChange}
              name="avatar"
              id="image"
              accept="image/*"
              maxLength="25"
            />
          </div>
        </FormGroup>
        <p className="login-info">* Admin - Full rights, including deleting user.<br/>* User - Create, edit, and delete your own comments.</p>
        <Button color="dark" size="sm" className="btn-style mb-5">
          Submit <i className="fas fa-arrow-alt-circle-right"></i>
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
