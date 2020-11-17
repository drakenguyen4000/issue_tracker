import React, { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import Loading from "../Loading";
import history from "../../history";
import { MsgContext } from "../../context/MsgContext";

const IssuesEdit = (props) => {
  const msgContext = useContext(MsgContext);
  const [edit, setEdit] = useState({
    details: {},
    isLoading: "true",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`/issues/${props.match.params.id}/edit`)
      .then((response) => {
        setEdit({ details: response.data, isLoading: "false" });
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.goBack();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Take user input and update state
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    //Update state depending on file type.
    type === "file"
      ? //If image file path exist, update state this way.
        setEdit((prevState) => {
          //Create a copy of details object
          var details = Object.assign({}, prevState.details);
          //Store files path in details.image property
          details.image = files[0];
          return { details };
        })
      : //Else update state this way.
        setEdit((prevState) => {
          var details = Object.assign({}, prevState.details);
          details[name] = value;
          return { details };
        });
  };

  //Take issues in state and post to backend
  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    const issueList = {
      project: edit.details.project,
      title: edit.details.title,
      summary: edit.details.summary,
      priority: edit.details.priority,
      type: edit.details.type,
      status: edit.details.status,
      deadline: edit.details.deadline,
    };

    Object.keys(issueList).forEach((key) => {
      formData.set(key, issueList[key]);
    });
    formData.append("image", edit.details.image);

    //All user input tags must have required attribute to prevent User from submitting with missing fields.  Backend Schema setup requires all these properties to be filled.  Node.js will stall if frontend submits inputs with missing fields.
    axios
      .post(`/issues/${props.match.params.id}`, formData)
      .then((response) => {
        msgContext.setMessage(response.data.message);
        history.goBack();
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.goBack();
      });
  };

  return (
    <div>
      <Container>
        {edit.isLoading === "true" ? (
          <Loading message="Loading..." />
        ) : (
          <div>
            <h2 className="text-center">Edit Issue</h2>
            <Form
              className="col-lg-6 mx-auto"
              onSubmit={onSubmit}
              encType="multipart/form-data"
            >
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={edit.details.title}
                  onChange={handleChange}
                  placeholder="Missing Icons"
                  maxLength="25"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Project/Product</Label>
                <Input
                  type="text"
                  name="project"
                  onChange={handleChange}
                  defaultValue={edit.details.project}
                  placeholder="project-4xx"
                  maxLength="25"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Summary</Label>
                <Input
                  type="textarea"
                  name="summary"
                  onChange={handleChange}
                  defaultValue={edit.details.summary}
                  maxLength="500"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="row">
                <div className="col-md-3">
                  <Label>Priority</Label>
                  <Input
                    type="select"
                    name="priority"
                    onChange={handleChange}
                    defaultValue={edit.details.priority}
                    className="priority-input"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Input>
                </div>
                <div className="col-md-4">
                  <Label>Type</Label>
                  <Input
                    type="select"
                    name="type"
                    onChange={handleChange}
                    defaultValue={edit.details.type}
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Bug">Bug</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Customer Issue">Customer Issue</option>
                    <option value="Process">Process</option>
                    <option value="Vulnerability">Vulnerability</option>
                  </Input>
                </div>
                <div className="col-md-5">
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    name="deadline"
                    onChange={handleChange}
                    defaultValue={edit.details.deadline.substring(0, 10)}
                  />
                </div>
              </FormGroup>
              <Button color="dark" size="sm" className="btn-style mb-5">Submit <i class="fas fa-arrow-alt-circle-right"></i></Button>
            </Form>
          </div>
        )}
      </Container>
    </div>
  );
};

export default IssuesEdit;
