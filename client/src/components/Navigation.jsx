import React, { useContext } from "react";
import "../app.css";
import { AppContext } from "../context/AppContext";
import Logout from "../components/Logout";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="md"
      variant="dark"
      className="navigation"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            {currentUser && (
              <>
                <NavDropdown.Item as={Link} to="/account">
                  Account
                </NavDropdown.Item>
                <Logout />
                <NavDropdown.Item as={Link} to={`/author/${currentUser._id}`}>
                  Your Blog
                </NavDropdown.Item>
              </>
            )}
            {!currentUser && (
              <>
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">
                  Register
                </NavDropdown.Item>
              </>
            )}
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/blogs">
              View All Blogs
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
