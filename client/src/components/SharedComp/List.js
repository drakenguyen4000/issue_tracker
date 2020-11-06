import React from "react";
import { Container, Table } from "reactstrap";
import Loading from "../Loading";
import Items from "./Items";

const List = (props) => {
  //Create function that will map over issues list from state and return a component called "IssuesItems"
  //Component props will be called "issue" and pass down each allIssues array element
  //allIssue will be called inside our JSX table
  const allIssues = () => {
    //Call list here to state updated, not inside useEffect which runs only once and synchronously.  So console.log will run only once and capture the previous state.
    return props.gen.list.map((item) => {
      return <Items issue={item} key={item._id} />;
    });
  };

  //Using Loading message if axios is taking time
  //Take issues list and map over items to display each items
  //Tenary opeartor to check if axios data loaded into state before calling on table.  Error thrown because substring method will getting undefined because state was undefined.
  return (
    <Container>
      {props.gen.isLoading ? (
        <Loading message="Loading..." />
      ) : // Checks if data is present, display blank if none
      props.gen.list[0] ? (
        <div>
          <h2>{props.title}</h2>
          <Table className="table mb-5" striped bordered size="sm">
            <thead className="thead text-light">
              <tr>
                <th scope="row"></th>
                <th scope="row">Title</th>
                <th scope="row">Status</th>
                <th scope="row">Type</th>
                <th scope="row">Project</th>
                <th scope="row">Priority</th>
                <th scope="row">Created</th>
                <th scope="row">Deadline</th>
              </tr>
            </thead>
            <tbody>{allIssues()}</tbody>
          </Table>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default List;
