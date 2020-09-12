import React, { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Author = ({ match }) => {
  const { id } = match.params;
  const [author, setAuthor] = useState();

  useEffect(() => {
    axios
      .get(`/api/authors/${id}`)
      .then(({ data }) => {
        setAuthor(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>{author?.blogTitle}</h1>
          <h4>
            <i>a blog by </i>
            {author?.username}
          </h4>
          <p className="mt-4 post-card" style={{ whiteSpace: "pre-wrap" }}>
            {author?.blogDescription}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <PostPreview authorID={id} />
        </Col>
      </Row>
    </>
  );
};

export default Author;
