import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Register = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/authors", formData)
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
          <Card className="account-form">
            <Card.Header className="text-center">
              <Card.Title style={{ fontSize: "1.5rem" }}>Register</Card.Title>
              <Card.Subtitle>Sign up for an account here.</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter your username here.
                  </Form.Text>
                </Form.Group>

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
                    Enter a valid email address here.
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
                  <Form.Text className="text-muted">
                    Password must be at least six characters.
                  </Form.Text>
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/login">
                Already have an account? Click here to log in!
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Register;
