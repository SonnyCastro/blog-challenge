import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, NavDropdown } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Logout = () => {
  const history = useHistory();
  const { setCurrentUser } = useContext(AppContext);

  const handleLogout = () => {
    axios
      .post("/api/author/logout", { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        sessionStorage.removeItem("user");
        history.push("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <NavDropdown.Item className="logout" as={Button} onClick={handleLogout}>
      Logout
    </NavDropdown.Item>
  );
};

export default Logout;
