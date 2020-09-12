import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";

const Comments = ({ postID }) => {
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/posts/${postID}/comments`)
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => console.log(err));
  }, [postID, loading]);

  const addComment = (e) => {
    e.preventDefault();
    axios
      .post(`/api/posts/${postID}/comments`, newComment)
      .then(({ data }) => {
        setLoading(true);
        setNewComment(null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  };

  return (
    <>
      <Form onSubmit={addComment} className="pb-2">
        <h3 className="mb-4">Want to leave a reply?</h3>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              setNewComment({ ...newComment, [e.target.name]: e.target.value })
            }
            type="text"
            name="name"
          />
          <Form.Text className="text-muted">Enter your name here.</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            onChange={(e) =>
              setNewComment({ ...newComment, [e.target.name]: e.target.value })
            }
            as="textarea"
            rows="3"
            name="text"
            required
          />
          <Form.Text className="text-muted">Enter your comment here.</Form.Text>
        </Form.Group>
        <Button type="submit" className="mb-4">
          Add Your Thoughts
        </Button>
      </Form>
      <hr />
      <h5 className="pt-3 pb-2">Comments:</h5>
      <Table striped bordered>
        <tbody style={{ background: "white" }}>
          {comments
            ?.map((comment) => {
              return (
                <tr key={comment._id}>
                  <td
                    style={{
                      width: "20%",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {comment.name}
                  </td>
                  <td>{comment.text}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </Table>
    </>
  );
};

export default Comments;
