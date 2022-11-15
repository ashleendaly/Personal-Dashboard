import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import LoginButton from "../assets/login_button.png";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

import { withRouter } from "../common/with-router";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <Form
        className="h-full w-screen"
        onSubmit={this.handleLogin}
        ref={(c) => {
          this.form = c;
        }}
      >
        <h1 className="flex font-semibold text-6xl text-white flex justify-center items-center">
          Dev Challenge
        </h1>

        <div className="flex pt-20 justify-evenly">
          <Input
            type="text"
            className="h-16 w-80 text-3xl border-b-2 bg-inherit placeholder-white"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required]}
          />

          <Input
            type="password"
            className="h-16 w-80 text-3xl border-b-2 bg-inherit placeholder-white"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            validations={[required]}
          />
        </div>

        <div className="flex justify-center items-end h-full -mt-64">
          <button disabled={this.state.loading}>
            {this.state.loading && <span></span>}
            <img src={LoginButton} alt="login" width="350px"></img>
          </button>
        </div>

        {this.state.message && (
          <div>
            <div role="alert">{this.state.message}</div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={(c) => {
            this.checkBtn = c;
          }}
        />

        <div className="flex justify-center items-center">
          <h1 className="text-4xl text-white mt-5"> New to the challenge?</h1>
          <Link className="text-4xl text-yellow-200 mt-5 ml-2" to={"/register"}>
            Sign Up
          </Link>
        </div>
      </Form>
    );
  }
}

export default withRouter(Login);
