import React from "react";
import AccountHeader from "../components/AccountHeader";
import { Row, Col } from "react-bootstrap";
import UpdateInfoForm from "../components/UpdateInfoForm";

const Account = () => {
  return (
    <>
      <Row className="text-center">
        <AccountHeader />
      </Row>

      <Row className="mt-5 mb-5">
        <Col xs={12}>
          <UpdateInfoForm />
        </Col>
      </Row>
    </>
  );
};

export default Account;
