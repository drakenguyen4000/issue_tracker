import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserList = (props) => {
  const { user } = useContext(AuthContext);
  const currentUser = user;
  const { profile } = props;
  const defaultImage = "https://res.cloudinary.com/dkn4000/image/upload/v1632694602/blank-profile_a7n0vm.png";

  const deleteUser = (e) => {
    e.preventDefault();
    props.userDelete(profile._id);
  };

  const Delete = ({ currentUser, profile }) => {
    //Only admin has option to delete user. Admin cannot delete their own account.
    if (currentUser._id !== profile._id && currentUser.role === "admin") {
      return (
        <Button
          className="btn-style"
          size="sm"
          color="danger"
          onClick={deleteUser}
        >
          Delete <i className="fas fa-trash"></i>
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="profile">
      <img
        className="profile-avatar"
        //If user does not have image, display default image
        src={`${profile.avatar.image ? profile.avatar.image : defaultImage }`}
        alt="avatar"
      />
      <div className="profile-info">
        <h5>{profile.username}</h5>
        <h6>{profile.jobtitle}</h6>
        <div>
          <Link to={`/user/${profile._id}`}>
            <Button className="btn-style" size="sm" color="primary">
              Profile <i className="fas fa-user"></i>
            </Button>
          </Link>
          <Delete currentUser={currentUser} profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
