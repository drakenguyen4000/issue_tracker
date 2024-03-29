import React, { useState, useEffect, useContext } from "react";
import { Container } from "reactstrap";
import axios from "axios";
import history from "../../history";
import Loading from "../Loading";
import UserList from "./UserList";
import { MsgContext } from "../../context/MsgContext";

const Users = () => {
  const msgContext = useContext(MsgContext);

  const [user, setUser] = useState({
    user: [],
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setUser({ user: response.data, isLoading: false });
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.push("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`/user/${userId}`)
      .then((response) => {
        setUser({
          user: user.user.filter((el) => el._id !== userId),
        });
        msgContext.setMessage(response.data.message);
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  const userList = () => {
    return user.user.map((user) => {
      return <UserList key={user._id} userDelete={deleteUser} profile={user} />;
    });
  };

  if (user.isLoading === true) {
    return <Loading message="Loading..." />;
  }

  return (
    <Container>
      <h2>Team</h2>
      <div className="profile-list">{userList()}</div>
    </Container>
  );
};

export default Users;
