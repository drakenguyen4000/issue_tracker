import React from "react";
import { Link } from "react-router-dom";

const IssuesItem = (props) => {
  const getStyle = (props) => {
    let msgFlash = null;
    if (props.details.status === "Open") {
      msgFlash = "text-success";
    } else if (props.details.status === "On Hold") {
      msgFlash = "text-info";
    } else {
      msgFlash = "text-danger";
    }
    return msgFlash;
  };

  return (
    <div className="row issues-item">
      <table>
        <tr>
          <th>Tile</th>
          <td>{props.details.title}</td>
        </tr>
        <tr>
          <th>Project</th>
          <td>{props.details.project}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td className={`font-weight-bold ${getStyle(props)}`}>
            {props.details.status}
          </td>
        </tr>
        <tr>
          <th>Type</th>
          <td>{props.details.type}</td>
        </tr>
        <tr>
          <th>Priority</th>
          <td>{props.details.priority}</td>
        </tr>
        <tr>
          <th>Reported By</th>
          <td>
            <Link to={`/user/${props.details.reportedBy.id}`}>
              {props.details.reportedBy.username}
            </Link>
          </td>
        </tr>
        <tr>
          <th>Assigned To</th>
          {props.details.assigned.username !== "n/a" ? (
            <td>
              <Link to={`/user/${props.details.assigned.id}`}>
                {props.details.assigned.username}
              </Link>
            </td>
          ) : (
            <td>{props.details.assigned.username}</td>
          )}
        </tr>
        <tr>
          <th>Created</th>
          <td>{props.details.created.substring(0, 10)}</td>
        </tr>
        <tr>
          <th>Deadline</th>
          <td>{props.details.deadline.substring(0, 10)}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Image</th>
          <td>
            <img src={props.details.image[0].image} alt="None provided" />
          </td>
        </tr>
        <tr>
          <th>Summary</th>
          <td>{props.details.summary}</td>
        </tr>
      </table>
    </div>
  );
};

export default IssuesItem;
