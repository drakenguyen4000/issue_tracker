import React, { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import List from "../SharedComp/List";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const IssuesList = () => {
  const [issue, setIssue] = useState({
    list: [],
    isLoading: true,
  });

  //When page loads - grab bug list from database
  //Update state with list
  useEffect(() => {
    axios
      .get("/issues")
      .then((response) => {
        setIssue({ list: response.data, isLoading: false });
      })
      .catch(() => history.push("/"));
  }, []);

  //Using Loading message if axios is taking time
  //Take list and map over items to display each items
  //Tenary opeartor to check if axios data loaded into state before calling on table.  Error thrown because substring method will getting undefined because state was undefined.
  return (
    <div>
      <Container className="d-flex justify-content-end">
        <Link
          to={`/report`}
          className="btn btn-danger btn-sm mr-2 btn-report btn-style"
        >
          Report Issue <i className="fas fa-bug"></i>
        </Link>
      </Container>
      <List title="Issues Tracking List" gen={issue} />
    </div>
  );
};

export default IssuesList;
