import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Comment from "../Comment/Comment";
import history from "../../history";
import IssuesItem from "./IssuesItem";
import IssuesAssign from "./IssuesAssign";
import { AuthContext } from "../../context/AuthContext";
import { MsgContext } from "../../context/MsgContext";
import Message from "../Message";
import IssueStatus from "./IssueStatus";

const Details = (props) => {
  const msgContext = useContext(MsgContext);
  //Destructure message state from MsgContext
  const { message } = useContext(MsgContext);
  const { user } = useContext(AuthContext);
  const currentUser = user;

  const [issue, setIssue] = useState({
    details: [],
    isLoading: true,
    status: "",
  });

  useEffect(() => {
    axios
      .get(`/issues/${props.match.params.id}`)
      .then((response) => {
        setIssue({ details: response.data, isLoading: false });
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.push("/dashboard");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Update developer assigned in state
  const updateAssigned = (response) => {
    setIssue({ details: response.data.record, isLoading: false });
  };

  //Update state of the Issue item in state
  const onChangeStatus = (e) => {
    const { name } = e.target;
    setIssue({ ...issue, [name]: e.target.value });
  };

  //Update Issue item status to database
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

  //Delete Issue item
  const onDelete = () => {
    axios
      .delete(`/issues/${props.match.params.id}`)
      .then((response) => {
        msgContext.setMessage(response.data.message);
        history.push("/dashboard");
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  //Loading spinner while waiting for API data.  
  if (issue.isLoading === true) {
    return <Loading message="Loading..." />;
  }

  //Display Issue item edit button
  const Edit = ({ currentUser, issue }) => {
    //User can only edit their own reported issue. Lead Engineer can delete & edit all report issues.
    if (
      currentUser._id === issue.details.reportedBy.id ||
      currentUser.jobtitle === "Lead Engineer"
    ) {
      return (
        <Link className="mr-3" to={`/issues/${props.match.params.id}/edit`}>
          <Button className="btn-style" size="sm" color="warning">
            Edit <i className="fas fa-eraser"></i>
          </Button>
        </Link>
      );
    }
    return null;
  };

  //Display issue details delete button
  const Delete = ({ currentUser }) => {
    //Only Lead Engineer can delete Issue item.
    if (currentUser.jobtitle === "Lead Engineer") {
      return (
        <Button
          className="mr-3 btn-style"
          size="sm"
          color="danger"
          onClick={onDelete}
        >
          Delete <i className="fas fa-trash"></i>
        </Button>
      );
    }
    return null;
  };

  //Only the user assigned to this issue or the lead engineer can modify the status of the Issue item.
  const showIssueStatus = () => {
    if (
      currentUser._id === issue.details.assigned.id ||
      currentUser.jobtitle === "Lead Engineer"
    ) {
      return (
        <IssueStatus
          updateStatus={updateStatus}
          onChangeStatus={onChangeStatus}
        />
      );
    }
    return null;
  };
  
  //Only Lead Engineer can assign users to an Issue item.
  const showIssueAssign = () => {
    if (currentUser.jobtitle === "Lead Engineer") {
      return (
        <div>
          <IssuesAssign assignedUpdate={updateAssigned} issue={issue.details} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Container className="wrapper">
        <div className="edit-delete-group">
          <Edit currentUser={currentUser} issue={issue} />
          <Delete currentUser={currentUser} />
        </div>
        <h2>Issue Details</h2>
        <IssuesItem details={issue.details} />
        <div className="status-assign-group">
          {showIssueStatus()}
          {showIssueAssign()}
        </div>
        {message ? <Message /> : null}
        <Comment currentUser={currentUser} issue={issue} />
      </Container>
    </div>
  );
};

export default Details;
