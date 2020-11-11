import React from "react";
import { Router, Route } from "react-router-dom";
import IssuesReport from "./components/Issue/IssuesReport";
import IssuesMain from "./components/Issue/IssuesMain";
import IssuesEdit from "./components/Issue/IssuesEdit";
import IssuesDetails from "./components/Issue/IssuesDetails";
import Users from "./components/Admin/Users";
import history from "./history";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/Admin/UserProfile";
import CommentEdit from "./components/Comment/CommentEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
// import PrivateRoute from "./authorization/PrivateRoute";
// import UnPrivateRoute from "./authorization/UnPrivateRoute";
import Message from "./components/Message";

const App = () => {
    return (
      <Router history={history}>
        <Navbar />
        <Message />
          <br/>
          <Route path="/" exact component={Landing} />
          <Route roles={["admin", "user"]} path="/list" exact component={IssuesMain} />
          <Route roles={["admin", "user"]} path="/issues" exact component={IssuesReport} />
          <Route roles={["admin", "user"]} path="/issues/:id/edit" exact component={IssuesEdit} />
          <Route roles={["admin", "user"]} path="/issues/:id" exact component={IssuesDetails} />
          <Route roles={["admin", "user"]} path="/user" exact component={Users} />
          <Route roles={["admin", "user"]} path="/user/:id" exact component={UserProfile} />
          <Route roles={["admin", "user"]} path="/issues/:id/comments/:comment_id/edit" exact component={CommentEdit} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
      </Router> 
    )  
}

export default App;
 