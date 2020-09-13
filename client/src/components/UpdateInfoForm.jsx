import React, { useState, useContext } from "react";
import "../app.css";
import { AppContext } from "../context/AppContext";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UpdateInfoForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const checkPasswords = () => {
    if (
      (formData.password && !formData.confirmPassword) ||
      (!formData.password && formData.confirmPassword) ||
      formData.password !== formData.confirmPassword
    ) {
      return alert("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return alert("Password must be longer than 6 characters.");
    }
    delete formData.confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData?.password && checkPasswords();
    const form = e.target;
    axios
      .patch("/api/author/me", formData, { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data);
        form.reset();
        alert("Update successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete("/api/author/me", { withCredentials: true })
      .then((response) => {
        setCurrentUser(null);
        sessionStorage.removeItem("user");
        history.push("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Form className="account-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={currentUser?.blogTitle}
            type="text"
            placeholder="Blog Title"
            name="blogTitle"
          />
          <Form.Text className="text-muted">
            Enter a name for your blog here.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Blog Description</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={currentUser?.blogDescription}
            as="textarea"
            rows="3"
            placeholder="Blog Description"
            name="blogDescription"
          />
          <Form.Text className="text-muted">
            Enter your blog description here.
          </Form.Text>
        </Form.Group>
        <hr />

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={currentUser?.username}
            type="text"
            placeholder="Username"
            name="username"
          />
          <Form.Text className="text-muted">
            Enter your username here.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={currentUser?.email}
            type="email"
            placeholder="Email"
            name="email"
          />
          <Form.Text className="text-muted">
            Enter a valid email address here.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            type="password"
            placeholder="Password"
            name="password"
          />
          <Form.Text className="text-muted">
            Password must be at least six characters.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <Form.Text className="text-muted">Type password again.</Form.Text>
        </Form.Group>

        <Button type="submit">Submit</Button>
        <Button className="ml-3 delete-btn" onClick={handleDelete}>
          Delete Account
        </Button>
      </Form>
    </div>
  );
};

export default UpdateInfoForm;
