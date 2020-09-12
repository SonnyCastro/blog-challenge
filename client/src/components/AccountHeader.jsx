import React, { useContext } from "react";
import "../app.css";
import { AppContext } from "../context/AppContext";
import { Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AccountHeader = () => {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);

  return (
    <Col>
      <h1>Account</h1>
      <p>Manage your account information here.</p>
      <Button onClick={() => history.push("/account")} className="mx-3 mt-3">
        Update Account Info
      </Button>
      <Button
        onClick={() => history.push("/account-posts")}
        className="mx-3 mt-3"
      >
        Manage Posts
      </Button>
      <Button
        onClick={() => history.push("/post-editor")}
        className="mx-3 mt-3"
      >
        Create New Post
      </Button>
      <Button
        onClick={() => history.push(`/author/${currentUser?._id}`)}
        className="mx-3 mt-3"
      >
        View Blog
      </Button>
    </Col>
  );
};

export default AccountHeader;
