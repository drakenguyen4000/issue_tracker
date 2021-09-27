import React, { useState, useEffect, useContext } from "react";
import { Container } from "reactstrap";
import Loading from "../Loading";
import axios from "axios";
import List from "../SharedComp/List";
import history from "../../history";
import { MsgContext } from "../../context/MsgContext";

const UserProfile = (props) => {
  const msgContext = useContext(MsgContext);
  const defaultImage = "https://res.cloudinary.com/dkn4000/image/upload/v1632694602/blank-profile_a7n0vm.png";
  const [profile, setProfile] = useState({
    user: [],
    reportedBy: {
      list: [],
    },
    assigned: {
      list: [],
    },
    isLoading: true,
  });

  //Grabs issues this developer reported, assigned to, and their user info.
  useEffect(() => {
    const requestOne = axios.get(`/user/${props.match.params.id}/reportedBy`);
    const requestTwo = axios.get(`/user/${props.match.params.id}/assigned`);
    const requestThree = axios.get(`/user/${props.match.params.id}`);

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          setProfile({
            reportedBy: { list: responseOne.data },
            assigned: { list: responseTwo.data },
            user: responseThree.data,
            isLoading: false,
          });
        })
      )
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.push("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (profile.isLoading) {
    return (
      <Container>
        <Loading message="Loading..." />;
      </Container>
    );
  }

  return (
    <Container>
      <img
        className="small-avatar"
        src={`${profile.user.avatar.image ? profile.user.avatar.image : defaultImage}`}
        alt="avatar"
      />
      <h5>{profile.user.username}</h5>
      <h6>{profile.user.jobtitle}</h6>
      <List title={`Reported`} gen={profile.reportedBy} />
      <List title={`Assigned`} gen={profile.assigned} />
    </Container>
  );
};

export default UserProfile;
