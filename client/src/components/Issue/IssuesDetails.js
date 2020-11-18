import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Button, Form, Input, Label, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Comment from "../Comment/Comment";
import history from "../../history";
import IssuesItem from "./IssuesItem";
import IssuesAssign from "./IssuesAssign";
import { AuthContext } from "../../context/AuthContext";
import { MsgContext } from "../../context/MsgContext";
import Message from "../Message";

const Details = (props) => {
  const msgContext = useContext(MsgContext);
  //Destructure message state from MsgContext
  const { message } = useContext(MsgContext);
  const { user } = useContext(AuthContext);
  const currentUser = user;

  const [issue, setIssue] = useState({
    details: [],
    isLoading: "true",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`/issues/${props.match.params.id}`)
      .then((response) => {
        setIssue({ details: response.data, isLoading: "false" });
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.push("/dashboard");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Update developer assigned
  const updateAssigned = (response) => {
    setIssue({ details: response.data.record, isLoading: "false" });
  };

  const onChangeStatus = (e) => {
    const { name } = e.target;
    setIssue({ ...issue, [name]: e.target.value });
  };

  //Update project status
  const updateStatus = () => {
    const data = {
      status: issue.status,
    };
    axios
      .post(`/issues/${props.match.params.id}/status`, data)
      .then((response) => {
        setIssue({ details: response.data.record });
        msgContext.setMessage(response.data.message);
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  const onDelete = () => {
    axios
      .delete(`/issues/${props.match.params.id}`)
      .then((response) => {
        msgContext.setMessage(response.data.message);
        history.push("/dashboard");
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  //Tenary opeartor to check if axios data loaded into state before calling on table.  Error thrown because substring method will getting undefined because state was undefined.
  return (
    <div>
      <Container>
        {issue.isLoading === "true" ? (
          <Loading message="Loading..." />
        ) : (
          <div>
            <div className="edit-delete-group">
              {currentUser._id === issue.details.reportedBy.id ||
              currentUser.jobtitle === "Lead Engineer" ? (
                <Link
                  className="mr-3"
                  to={`/issues/${props.match.params.id}/edit`}
                >
                  <Button className="btn-style" size="sm" color="warning">
                    Edit <i className="fas fa-eraser"></i>
                  </Button>
                </Link>
              ) : null}
              {currentUser.jobtitle === "Lead Engineer" ? (
                <Button
                  className="mr-3 btn-style"
                  size="sm"
                  color="danger"
                  onClick={onDelete}
                >
                  Delete <i className="fas fa-trash"></i>
                </Button>
              ) : null}
            </div>
            <h2>Issue Details</h2>
            <IssuesItem details={issue.details} />
            <div className="status-assign-group">
              {currentUser._id === issue.details.assigned.id ||
              currentUser.jobtitle === "Lead Engineer" ? (
                <Form className="status-group">
                  <FormGroup>
                    <Label className="pr-5 mt-2" for="Open">
                      <Input
                        className="mt-2"
                        name="status"
                        value="Open"
                        id="Open"
                        type="radio"
                        onChange={onChangeStatus}
                      ></Input>
                      Open
                    </Label>
                    <Label className="pr-5 mt-2" for="On Hold">
                      <Input
                        className="mt-2"
                        name="status"
                        value="On Hold"
                        id="On Hold"
                        type="radio"
                        onChange={onChangeStatus}
                      ></Input>
                      On Hold
                    </Label>
                    <Label className="pr-3 mt-2" for="Closed">
                      <Input
                        className="mt-2"
                        name="status"
                        value="Closed"
                        id="Closed"
                        type="radio"
                        onChange={onChangeStatus}
                      ></Input>
                      Closed
                    </Label>
                    <Button
                      className="btn-style"
                      size="sm"
                      color="success"
                      onClick={updateStatus}
                    >
                      Status <i className="far fa-folder-open"></i>
                    </Button>
                  </FormGroup>
                </Form>
              ) : null}
              {currentUser.jobtitle === "Lead Engineer" ? (
                <div>
                  <IssuesAssign
                    assignedUpdate={updateAssigned}
                    issue={issue.details}
                  />
                </div>
              ) : null}
            </div>
            {message ? <Message /> : null}
            <Comment currentUser={currentUser} issue={issue} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Details;
