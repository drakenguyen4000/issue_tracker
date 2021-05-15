import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import history from "../history";
import { Container, Collapse, NavbarToggler } from "reactstrap";

const Navbar = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const onClick = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        console.log("We Logged out!");
        history.push("/login");
      }
    });
  };
  const unauthenticatedNavBar = () => {
    return (
      <>
        <ul className="navbar-nav mr-auto">
          <li className="nav-bar item">
            <Link to="/login" className="nav-link main-link">
              Login
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="/register" className="nav-link main-link">
              Register
            </Link>
          </li>
        </ul>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <ul className="navbar-nav mr-auto">
          <li className="nav-bar item">
            <Link to="/dashboard" className="nav-link main-link mr-4">
              Dashboard
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="/issues" className="nav-link  main-link mr-3">
              Report Issue
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="/user" className="nav-link main-link">
              Team
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="" onClick={onClick} className="nav-link main-link">
              Logout
            </Link>
          </li>
        </ul>
        <li className="nav-bar item">
          <Link to={`/user/${user._id}`} className="nav-link text-light">
            {user.username} [ {user.role} ]
          </Link>
        </li>
        {user.avatar.image ? (
          <li className="nav-bar item">
            <img src={`${user.avatar.image}`} alt="avatar" />
          </li>
        ) : null}
      </>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg">
        <Container>
          <Link to="/" className="navbar-brand">
            <strong>ISSUE</strong> TRACKER
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
          </Collapse>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
