import React, { useEffect, useState, useContext } from "react";
import "../app.css";
import { AppContext } from "../context/AppContext";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const PostPreview = ({ authorID }) => {
  const { currentUser } = useContext(AppContext);
  const history = useHistory();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  const deletePost = (id) => {
    window.confirm("Are you sure you want to delete this post permanently?") &&
      axios
        .delete(`/api/posts/${id}`)
        .then(({ data }) => {
          setLoading(true);
        })
        .catch((err) => console.log(err))
        .finally(setLoading(false));
  };

  useEffect(() => {
    axios
      .get(`/api/authors/${authorID || currentUser?._id}/posts`)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, [authorID, loading, currentUser]);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {posts
        ?.map((post) => {
          return (
            <Card
              key={post._id}
              className="mt-5 mx-5"
              style={{ width: "300px" }}
            >
              <Card.Header className="text-center">
                <Card.Title
                  style={{ fontSize: "1.5rem" }}
                  as={Link}
                  to={`/post/${post._id}`}
                >
                  {post.title}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: ".9rem", fontWeight: "400" }}
                  className="pt-3 text-left"
                >
                  <b>posted on:</b>{" "}
                  {moment(post.createdAt).format("MMM Do YYYY, h:mm a")}
                  <br />
                  <b>last edited:</b>{" "}
                  {moment(post.updatedAt).format("MMM Do YYYY, h:mm a")}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                {post.content.slice(0, 200)}
                {post.content.length > 200 && "..."}
              </Card.Body>
              <Card.Footer>
                {!authorID && currentUser && (
                  <>
                    <Button
                      onClick={() => history.push(`/post-editor/${post._id}`)}
                      className="mx-1 edit-btn"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deletePost(post._id)}
                      className="mx-1 delete-btn"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Card.Footer>
            </Card>
          );
        })
        .reverse()}
    </div>
  );
};

export default PostPreview;
