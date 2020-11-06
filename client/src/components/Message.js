import React, { useContext } from "react";
import { Alert } from "reactstrap";
import { MsgContext } from "../context/MsgContext";

//function determines message background color
const getStyle = (props) => {
  let msgFlash = null;
  if (props.msgError) {
    msgFlash = "danger";
  } else {
    msgFlash = "success";
  }
  return msgFlash;
};

const Message = () => {
  const { message } = useContext(MsgContext);
  return message ? (
    <Alert color={getStyle(message)} className="alert">
     {message.msgError ? <i class="fas fa-times-circle"></i> : <i class="fas fa-check-square"></i>} {message.msgBody}
    </Alert>
  ) : null;
};

export default Message;
