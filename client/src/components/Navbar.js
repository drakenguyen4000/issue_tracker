import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import history from "../history";

const Navbar = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
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
            <Link to="/login" className="nav-link nav6">
              Login
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="/register" className="nav-link nav6">
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
            <Link to="/list" className="nav-link nav6 mr-4">
              Issues List
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="/issues" className="nav-link  nav6 mr-3">
              Report Issue
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="/user" className="nav-link nav6 ">
              Team
            </Link>
          </li>
          <li className="nav-bar item">
            <Link to="" onClick={onClick} className="nav-link nav6 ">
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
    <nav className="navbar navbar-dark navbar-expand-lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <strong>ISSUE</strong> TRACKER
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
