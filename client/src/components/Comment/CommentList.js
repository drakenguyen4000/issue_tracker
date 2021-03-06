import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CommentList = (props) => {
  const { user } = useContext(AuthContext);
  const currentUser = user;
  const author = props.text.author;

  const onDelete = (e) => {
    e.preventDefault();
    props.commentDelete(props);
  };

  return (
    <div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <h6 className="card-title text-info">
              <Link to={`/user/${props.text.author._id}`}>
                {props.text.author.username}
              </Link>
            </h6>
            <img
              src={`${props.text.author.avatar.image}`}
              className="small-avatar"
              alt="author"
            />
            <div className="comment-jobtitle">{props.text.author.jobtitle}</div>
          </div>
          <div className="col-md-9 comment-text border">
            <div className="row d-flex justify-content-end mt-3">
              <span>
                {currentUser._id === author._id ? (
                  <Link
                    to={`/issues/${props.issueId}/comments/${props.text._id}/edit`}
                    className="btn btn-outline-warning btn-sm mr-2"
                  >
                    Edit
                  </Link>
                ) : null}
              </span>
              <span>
                {currentUser._id === author._id ||
                currentUser.role === "admin" ? (
                  <Link
                    to=""
                    onClick={onDelete}
                    className="btn btn-outline-danger btn-sm mr-2"
                  >
                    Delete
                  </Link>
                ) : null}
              </span>
            </div>
            <div className="row d-flex justify-content-start pl-4">
              <p className="comment-date">
                {props.text.created.substring(0, 10)}
              </p>
            </div>
            <div className="row p-4">
              <p>{props.text.text}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CommentList;
