import React, { useState, useEffect, useContext } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import history from "../../history";
import { AuthContext } from "../../context/AuthContext";
import { MsgContext } from "../../context/MsgContext";

const IssuesReport = () => {
  const msgContext = useContext(MsgContext);
  const { user } = useContext(AuthContext);
  const [issue, setIssue] = useState({
    author: "",
    authorId: "",
    title: "",
    project: "",
    summary: "",
    image: "",
    priority: "",
    type: "",
    status: "Open",
    deadline: "",
  });

  useEffect(() => {
    setIssue({ ...issue, author: user.username, authorId: user._id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Take user input and update state
  const handleChange = (e) => {
    //Destructure name from target
    const { name, type } = e.target;
    //Update state
    type === "file"
      ? setIssue({ ...issue, image: e.target.files[0] })
      : setIssue({ ...issue, [name]: e.target.value });
  };

  //Take issues in state and post to backend
  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    const issueList = {
      authorId: issue.authorId,
      author: issue.author,
      title: issue.title,
      project: issue.project,
      summary: issue.summary,
      priority: issue.priority,
      type: issue.type,
      status: issue.status,
      deadline: issue.deadline,
    };

    Object.keys(issueList).forEach((key) => {
      formData.set(key, issueList[key]);
    });
    formData.append("image", issue.image);

    //All user input tags must have required attribute to prevent User from submitting with missing fields.  Backend Schema setup requires all these properties to be filled.  Node.js will stall if frontend submits inputs with missing fields.
    axios
      .post("/issues", formData)
      .then((response) => {
        msgContext.setMessage(response.data.message);
        history.push("/dashboard");
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.push("/");
      });
  };

  return (
    <div>
      <Container>
        <h2>Report Issue</h2>
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
              value={issue.title}
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
              value={issue.project}
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
              value={issue.summary}
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
                value={issue.priority}
                required
                className="priority-input"
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
                value={issue.type}
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
                value={issue.deadline}
              />
            </div>
          </FormGroup>
          <Button className="btn-style mb-5" size="sm" color="dark">
            Submit <i class="fas fa-arrow-alt-circle-right"></i>
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default IssuesReport;
