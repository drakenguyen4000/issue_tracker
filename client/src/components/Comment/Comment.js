import React, { useEffect, useState, useContext } from "react";
import { Container, FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import CommentList from "./CommentList";
import Loading from "../Loading";
import { MsgContext } from "../../context/MsgContext";

const Comment = (props) => {
  const msgContext = useContext(MsgContext);

  const [comment, setComment] = useState({
    post: "",
    display: [],
    isLoading: true,
  });

  const handleChange = (e) => {
    const { name } = e.target;
    setComment({ ...comment, [name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`/issues/${props.issue.details._id}/comments`)
      .then((response) =>
        setComment({ display: response.data, isLoading: false })
      )
      .catch((err) => msgContext.setMessage(err.response.data.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      comment: comment.post,
      username: props.currentUser.username,
      userId: props.currentUser._id,
      imageId: props.currentUser.avatar.imageId,
      image: props.currentUser.avatar.image,
      jobtitle: props.currentUser.jobtitle,
      role: props.currentUser.role,
      issueId: props.issue.details._id,
    };

    axios
      .post(`/issues/${props.issue.details._id}/comments`, userData)
      .then((res) => {
        setComment({
          display: [...comment.display, res.data.record],
          post: "",
        });
        msgContext.setMessage(res.data.message);
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  const deleteComment = (item) => {
    axios
      .get(`/issues/${item.issueId}/comments/${item.text._id}`)
      .then((res) => {
        setComment({
          display: comment.display.filter((el) => el._id !== item.text._id),
        });
        msgContext.setMessage(res.data.message);
      })
      .catch((err) => msgContext.setMessage(err.response.data.message));
  };

  const commentList = () => {
    return comment.display.map((post) => {
      return (
        <CommentList
          issueId={props.issue.details._id}
          text={post}
          commentDelete={deleteComment}
        />
      );
    });
  };

  return (
    <Container className="mb-5 pb-5">
      {comment.isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div class="row mt-4">
          <div class="mx-auto card col-lg-8 col-md-11 px-0">
            <div className="card-header thead">
              <h2 className="text-center">Discussion</h2>
            </div>
            <div>
              <Form className="comment-form" onSubmit={onSubmit}>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="post"
                    onChange={handleChange}
                    value={comment.post}
                    maxlength="1000"
                  />
                </FormGroup>
                <div className="d-flex justify-content-end">
                  <Button className="btn-style" size="sm" color="dark">
                    Comment <i class="far fa-edit"></i>
                  </Button>
                </div>
              </Form>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{commentList()}</li>
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Comment;
