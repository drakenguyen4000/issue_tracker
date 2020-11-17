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
    <div className="details-table">
      <div className="table-body">
        <div className="tb-column">
          <div>
            <span>Tile</span>
            <span>{props.details.title}</span>
          </div>
          <div>
            <span>Project</span>
            <span>{props.details.project}</span>
          </div>
          <div>
            <span>Status</span>
            <span className={`font-weight-bold ${getStyle(props)}`}>
              {props.details.status}
            </span>
          </div>
          <div>
            <span>Type</span>
            <span>{props.details.type}</span>
          </div>
          <div>
            <span>Priority</span>
            <span>{props.details.priority}</span>
          </div>
          <div>
            <span>Reported By</span>
            <span>
              <Link to={`/user/${props.details.reportedBy.id}`}>
                {props.details.reportedBy.username}
              </Link>
            </span>
          </div>
          <div>
            <span>Assigned To</span>
            {props.details.assigned.username !== "n/a" ? (
              <span>
                <Link to={`/user/${props.details.assigned.id}`}>
                  {props.details.assigned.username}
                </Link>
              </span>
            ) : (
              <span>{props.details.assigned.username}</span>
            )}
          </div>
          <div>
            <span>Created</span>
            <span>{props.details.created.substring(0, 10)}</span>
          </div>
          <div>
            <span>Deadline</span>
            <span>{props.details.deadline.substring(0, 10)}</span>
          </div>
        </div>
      </div>
      <div className="table-body">
        <div className="tb-column">
          <div>
            <span>Image</span>
            <span>
              <img src={props.details.image[0].image} alt="None provided" />
            </span>
          </div>
          <div>
            <span>Summary</span>
            <span>{props.details.summary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesItem;
