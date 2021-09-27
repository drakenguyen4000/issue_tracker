import React from "react";
import { Container, Table } from "reactstrap";
import Loading from "../Loading";
import Items from "./Items";

//Shared List Component (dashboard and assign/report list)
const List = (props) => {
  const allIssues = () => {
    return props.gen.list.map((item) => {
      return <Items issue={item} key={item._id} />;
    });
  };

  if (props.gen.isLoading) {
    return <Loading message="Loading..." />;
    //Display empty div if list data does not exist.
  } else if (!props.gen.list[0]) {
    return <div></div>;
  }

  return (
    <Container>
      <h2>{props.title}</h2>
      <Table className="mb-5" striped bordered size="sm">
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
    </Container>
  );
};

export default List;
