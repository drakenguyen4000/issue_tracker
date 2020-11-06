import React from "react";
import { Spinner, Container } from "reactstrap";

const Loading = (props) => {
  return (
    <Container>
      <div className="text-dark">
        <Spinner />
        <span className="h3"> {props.message} </span>
      </div>
    </Container>
  );
};

Loading.defaultProps = {
  message: "Loading...",
};

export default Loading;
