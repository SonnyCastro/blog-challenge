import React, { useEffect, useState } from "react";
import "../app.css";
import Comments from "../components/Comments";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = ({ match }) => {
  const { id } = match.params;
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then(({ data }) => {
        setPost(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (post) {
      axios
        .get(`/api/authors/${post.author}`)
        .then(({ data }) => {
          setAuthor(data);
        })
        .catch((err) => console.log(err));
    }
  }, [post]);

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>{post?.title}</h1>
          <h5 className="pt-2">
            from the blog <i>{author?.blogTitle}</i> by&nbsp;
            <Link to={`/author/${author?._id}`}>{author?.username}</Link>
          </h5>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card className="post-card">
            <Card.Header></Card.Header>
            <Card.Body style={{ whiteSpace: "pre-wrap" }}>
              {post?.content}
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card className="post-card">
            <Card.Header></Card.Header>
            <Card.Body>
              <Comments postID={id} />
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Post;
