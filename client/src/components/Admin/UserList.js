import React, { useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserList = (props) => {
  const { user } = useContext(AuthContext);
  const currentUser = user;

  const deleteUser = (e) => {
    e.preventDefault();
    props.userDelete(props.profile._id);
  };

  return (
    <div className="profile">
      <img
        className="profile-avatar"
        src={`${props.profile.avatar.image}`}
        alt="avatar"
      />
      <div className="profile-info">
        <h5>{props.profile.username}</h5>
        <h6>{props.profile.jobtitle}</h6>
        <div>
          <Link to={`/user/${props.profile._id}`}>
            <Button className="btn-style" size="sm" color="primary">
              Profile <i class="fas fa-user"></i>
            </Button>
          </Link>
          {/* //Only admin has option to delete user.  Admin cannot delete their own account */}
          {currentUser._id !== props.profile._id &&
          currentUser.role === "admin" ? (
            <Button
              className="btn-style"
              size="sm"
              color="danger"
              onClick={deleteUser}
            >
              Delete <i class="fas fa-trash"></i>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserList;
