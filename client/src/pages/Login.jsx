import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Login = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser, currentUser } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios("/api/author/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: formData,
    })
      .then(({ data }) => {
        sessionStorage.setItem("user", data.data);
        setCurrentUser(data.data);
        if (data) {
          history.push("/account");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {currentUser && <Redirect to={`/account`} />}
      <Row>
        <Col>
          <Card>
            <Card.Header className="text-center">
              <Card.Title>Login</Card.Title>
              <Card.Subtitle>Access your account here.</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter the email you signed up with.
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Link to="/register">
                Want to create an account? Click here to register with us!
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
