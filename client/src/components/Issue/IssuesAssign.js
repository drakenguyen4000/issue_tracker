import React, { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import Loading from "../Loading";
import { MsgContext } from "../../context/MsgContext";

const IssuesAssign = (props) => {
  const msgContext = useContext(MsgContext);
  const [developer, setDeveloper] = useState({
    users: [],
    isLoading: true,
    assigned: "",
  });
  //Gets list of developers to choose from
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        //spread operator to copy object property and add new property
        setDeveloper({
          ...developer,
          users: response.data,
          isLoading: false,
        });
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    //Decodes URI component, parse data into JS object
    var data = JSON.parse(decodeURIComponent(e.target.value));
    setDeveloper({ ...developer, assigned: data });
  };

  const assignDev = () => {
    const data = {
      username: developer.assigned.username,
      userId: developer.assigned._id,
    };
    axios
      .post(`/issues/${props.issue._id}/assign`, data)
      .then((response) => {
        props.assignedUpdate(response);
        msgContext.setMessage(response.data.message);
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  return (
    <Container>
      {developer.isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div>
          <Form>
            <FormGroup className="assign-group">
              <Input
                type="select"
                name="assigned"
                onChange={onChange}
                className="assign-input"
              >
                <option value={encodeURIComponent(JSON.stringify(""))}>
                  --Assign Developer--
                </option>
                {developer.users.map(function (user) {
                  //Take each user info object and turn into string.  Encode as URI so we can pass to onChange method and update in state.
                  const storeUser = encodeURIComponent(JSON.stringify(user));
                  return (
                    <option key={user.username} value={storeUser}>
                      {user.username}
                    </option>
                  );
                })}
              </Input>
              <Button
                className="btn-style"
                size="sm"
                color="info"
                onClick={assignDev}
              >
                Assign <i className="fas fa-user-edit"></i>
              </Button>
            </FormGroup>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default IssuesAssign;
