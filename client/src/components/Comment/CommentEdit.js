import React, { useEffect, useState, useContext } from "react";
import { Container, FormGroup, Form, Button, Input } from "reactstrap";
import Loading from "../Loading";
import history from "../../history";
import axios from "axios";
import { MsgContext } from "../../context/MsgContext";

const CommentEdit = (props) => {
  const msgContext = useContext(MsgContext);

  const [comment, setComment] = useState({
    post: [],
    update: "",
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get(`${props.match.url}`)
      .then((res) =>
        setComment({ post: res.data, isLoading: false })
      )
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.goBack();
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setComment({ ...comment, update: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      comment: {
        text: comment.update,
        author: comment.post.author,
      },
    };
    axios
      .post(
        `/issues/${comment.post.issueId}/comments/${comment.post._id}`,
        data
      )
      .then((res) => {
        msgContext.setMessage(res.data.message);
        history.goBack();
      })
      .catch((err) => {
        msgContext.setMessage(err.response.data.message);
        history.goBack();
      });
  };

  return (
    <Container>
      {comment.isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div>
          <Form onSubmit={onSubmit} className="comment-form">
            <h3 className="text-center">Comment</h3>
            <FormGroup>
              <Input
                name="post"
                type="textarea"
                defaultValue={comment.post.text}
                onChange={handleChange}
                maxlength="1000"
                className="edit"
              ></Input>
            </FormGroup>
            <Button color="dark" size="sm" className="btn-style mb-5">Submit</Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default CommentEdit;
