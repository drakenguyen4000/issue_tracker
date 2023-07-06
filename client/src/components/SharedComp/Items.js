import React from "react";
import { Link } from "react-router-dom";
import Localtime from '../SharedComp/Localtime';

const Items = (props) => {
  return (
    <tr>
      <td className="search">
        <Link to={`/issues/${props.issue._id}`}>
          <i className="fas fa-search fa-lg"></i>
        </Link>
      </td>
      <td>
        <Link to={`/issues/${props.issue._id}`}>{props.issue.title}</Link>
      </td>
      <td>{props.issue.status}</td>
      <td>{props.issue.type}</td>
      <td>{props.issue.project}</td>
      <td>{props.issue.priority}</td>
      <td>{Localtime(props.issue.created)}</td>
      <td>{props.issue.deadline.substring(0, 10)}</td>
    </tr>
  );
};

export default Items;
