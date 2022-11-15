import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    return (
      <div className="bg-therapy-box bg-cover w-full h-screen flex justify-center">
        <div className="h-full py-20">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
