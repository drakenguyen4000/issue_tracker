import React from "react";
import { Link } from "react-router-dom";

const Items = (props) => {
  return (
    <tr className="table-row">
      <td className="search">
        <Link to={`/issues/${props.issue._id}`}>
          <i className="fas fa-search fa-lg"></i>
        </Link>
      </td>
      <td>{props.issue.title}</td>
      <td>{props.issue.status}</td>
      <td>{props.issue.type}</td>
      <td>{props.issue.project}</td>
      <td>{props.issue.priority}</td>
      <td>{props.issue.created.substring(0, 10)}</td>
      <td>{props.issue.deadline.substring(0, 10)}</td>
    </tr>
  );
};

export default Items;
