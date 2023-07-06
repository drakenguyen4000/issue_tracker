import React from "react";
import { Link } from "react-router-dom";
import Localtime from '../SharedComp/Localtime';

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
    <div className="details-table">
      <div className="table-body">
        <div className="column-1">
          <div>
            <span className="cell-label">Tile</span>
            <span className="cell-value">{props.details.title}</span>
          </div>
          <div>
            <span className="cell-label">Project</span>
            <span className="cell-value">{props.details.project}</span>
          </div>
          <div>
            <span className="cell-label">Status</span>
            <span className={`font-weight-bold ${getStyle(props)}`}>
              {props.details.status}
            </span>
          </div>
          <div>
            <span className="cell-label">Type</span>
            <span className="cell-value">{props.details.type}</span>
          </div>
          <div>
            <span className="cell-label">Priority</span>
            <span className="cell-value">{props.details.priority}</span>
          </div>
          <div>
            <span className="cell-label">Reported By</span>
            <span className="cell-value">
              <Link to={`/user/${props.details.reportedBy.id}`}>
                {props.details.reportedBy.username}
              </Link>
            </span>
          </div>
          <div>
            <span className="cell-label">Assigned To</span>
            {props.details.assigned.username !== "n/a" ? (
              <span className="cell-value">
                <Link to={`/user/${props.details.assigned.id}`}>
                  {props.details.assigned.username}
                </Link>
              </span>
            ) : (
              <span className="cell-value">{props.details.assigned.username}</span>
            )}
          </div>
          <div>
            <span className="cell-label">Created</span>
            <span className="cell-value">{Localtime(props.details.created)}</span>
          </div>
          <div>
            <span className="cell-label">Deadline</span>
            <span className="cell-value">{props.details.deadline.substring(0, 10)}</span>
          </div>
        </div>
      </div>
      <div className="table-body">
        <div className="column-2">
          <div>
            <span className="cell-label">Image</span>
            <span className="cell-value">
              <img src={props.details.image[0].image} alt="None provided" />
            </span>
          </div>
          <div>
            <span className="cell-label">Summary</span>
            <span className="cell-value">{props.details.summary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesItem;
