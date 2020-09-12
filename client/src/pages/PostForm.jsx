import React, { useState, useEffect } from "react";
import "../app.css";
import AccountHeader from "../components/AccountHeader";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const PostForm = ({ match, history }) => {
  const { id } = match.params;
  const [postData, setPostData] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`, { withCredentials: true })
        .then(({ data }) => {
          setPostData({ title: data.title, content: data.content });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPostData(null);
    }
  }, [id]);

  const createPost = () => {
    axios
      .post(`/api/posts`, postData, { withCredentials: true })
      .then(({ data }) => {
        alert("Post created!");
        history.push(`/post-editor/${data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = () => {
    window.confirm("Are you sure you want to delete this post permanently?") &&
      axios
        .delete(`/api/posts/${id}`)
        .then(({ data }) => {
          history.push("/account-posts");
        })
        .catch((err) => console.log(err));
  };

  const editPost = () => {
    axios
      .patch(`/api/posts/${id}`, postData, { withCredentials: true })
      .then(({ data }) => {
        alert("Edit successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    id ? editPost() : createPost();
    form.reset();
  };

  return (
    <>
      <Row className="text-center">
        <AccountHeader />
      </Row>

      <Row className="mt-5">
        <Col>
          <h3>{id ? "Edit Post" : "Create New Post"}</h3>
          <Form onSubmit={handleSubmit} className="account-form">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    [e.target.name]: e.target.value,
                  })
                }
                defaultValue={id && postData?.title}
                type="text"
                placeholder="Title"
                name="title"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Post</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    [e.target.name]: e.target.value,
                  })
                }
                defaultValue={id ? postData?.content : ""}
                as="textarea"
                rows="10"
                placeholder="Type your post here!"
                name="content"
              />
            </Form.Group>
            <Button className="mr-3" type="submit">
              Submit
            </Button>
            {id && (
              <Button onClick={deletePost} className="delete-btn">
                Delete Post
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PostForm;
