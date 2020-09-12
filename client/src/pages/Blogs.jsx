import React, { useEffect, useState } from "react";
import "../app.css";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const [authors, setAuthors] = useState();

  useEffect(() => {
    axios
      .get(`/api/authors`)
      .then(({ data }) => {
        setAuthors(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h1 className="mb-5">All Blogs:</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap justify-content-center">
          {authors &&
            authors
              .map((author) => {
                return (
                  <Card key={author._id} className="mx-3 mb-5 all-blogs-card">
                    <Card.Header className="text-center">
                      <Card.Title
                        as={Link}
                        to={`/author/${author._id}`}
                        style={{ fontSize: "1.5rem" }}
                      >
                        {author.blogTitle}
                      </Card.Title>
                      <Card.Subtitle className="mt-3">
                        by {author.username}
                      </Card.Subtitle>
                    </Card.Header>
                    <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                      {author.blogDescription}
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                  </Card>
                );
              })
              .reverse()}
        </Col>
      </Row>
    </>
  );
};

export default Blogs;
