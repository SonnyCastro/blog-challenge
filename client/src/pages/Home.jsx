import React from "react";
import "../app.css";
import { Row, Col, Jumbotron, Button } from "react-bootstrap";

const Home = ({ history }) => {
  return (
    <>
      <Row>
        <Col
          style={{ height: "90vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Jumbotron className="text-center home-jumbotron">
            <h1 className="home-title"> Wyn-Blog</h1>
            <hr />
            <h5 className="px-5 pt-5 pb-3 home-text">
              Welcome to <b className="color-primary">Wyn-Blog</b>!{" "}
            </h5>
            <h6 className="px-5 pb-3 text-left home-text">
              Eager for some great reading? Check out our collection of blogs
              full of interesting posts for you to read and comment on!
            </h6>
            <h6 className="px-5 pb-5 text-left home-text">
              Have great ideas for posts you want to share with the world?
              Create an account with us to get started with your own blog to
              create, edit and share your posts!
            </h6>
            <hr />
            <div className="pt-5">
              <Button
                onClick={() => history.push("/register")}
                size="lg"
                variant="dark"
                className="mr-3"
              >
                Register
              </Button>
              <Button
                onClick={() => history.push("/login")}
                size="lg"
                variant="dark"
                className="mr-3"
              >
                Login
              </Button>
              <Button
                onClick={() => history.push("/blogs")}
                size="lg"
                variant="dark"
                className="mr-3"
              >
                View Blogs
              </Button>
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </>
  );
};

export default Home;
