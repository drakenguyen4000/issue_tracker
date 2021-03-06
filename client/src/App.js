import React from "react";
import { Router, Route } from "react-router-dom";
import IssuesReport from "./components/Issue/IssuesReport";
import IssuesDashboard from "./components/Issue/IssuesDashboard";
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
import PrivateRoute from "./authorization/PrivateRoute";
import UnPrivateRoute from "./authorization/UnPrivateRoute";
import Message from "./components/Message";

const App = () => {
    return (
      <Router history={history}>
        <Navbar />
        <Message />
          <br/>
          <Route path="/" exact component={Landing} />
          <PrivateRoute roles={["admin", "user"]} path="/dashboard" exact component={IssuesDashboard} />
          <PrivateRoute roles={["admin", "user"]} path="/issues" exact component={IssuesReport} />
          <PrivateRoute roles={["admin", "user"]} path="/issues/:id/edit" exact component={IssuesEdit} />
          <PrivateRoute roles={["admin", "user"]} path="/issues/:id" exact component={IssuesDetails} />
          <PrivateRoute roles={["admin", "user"]} path="/issues/:id/comments/:comment_id/edit" exact component={CommentEdit} />
          <PrivateRoute roles={["admin", "user"]} path="/user" exact component={Users} />
          <PrivateRoute roles={["admin", "user"]} path="/user/:id" exact component={UserProfile} />
          <UnPrivateRoute path="/register" exact component={Register} />
          <UnPrivateRoute path="/login" exact component={Login} />
      </Router> 
    )  
}

export default App;
 