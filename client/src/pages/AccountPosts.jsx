import React from "react";
import PostPreview from "../components/PostPreview";
import AccountHeader from "../components/AccountHeader";
import { Row, Col } from "react-bootstrap";

const AccountPosts = () => {
  return (
    <>
      <Row className="text-center">
        <AccountHeader />
      </Row>

      <Row className="mt-5 text-center">
        <Col>
          <PostPreview />
        </Col>
      </Row>
    </>
  );
};

export default AccountPosts;
