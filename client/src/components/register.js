import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import RegisterButton from "../buttons/register_button.png";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return <div role="alert">This field is required!</div>;
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return <div role="alert">This is not a valid email.</div>;
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div role="alert">The username must be between 3 and 20 characters.</div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div role="alert">The password must be between 6 and 40 characters.</div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <Form
        className="h-full w-screen"
        onSubmit={this.handleRegister}
        ref={(c) => {
          this.form = c;
        }}
      >
        {!this.state.successful && (
          <>
            <h1 className="flex text-6xl text-white flex justify-center items-center">
              Dev Challenge
            </h1>
            <div className="flex pt-20 justify-evenly">
              <Input
                type="text"
                name="username"
                className="h-16 w-80 text-3xl border-b-2 bg-inherit placeholder-white"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required, vusername]}
              />

              <Input
                type="text"
                name="email"
                className="h-16 w-80 text-3xl border-b-2 bg-inherit placeholder-white"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required, email]}
              />
            </div>

            <div className="flex justify-evenly mt-16">
              <Input
                type="password"
                placeholder="Password"
                className="h-16 w-80 text-3xl border-b-2 bg-inherit placeholder-white"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="flex justify-center items-end -mt-96 h-full">
              <button>
                <img src={RegisterButton} alt="login" width="350px"></img>
              </button>
            </div>
          </>
        )}

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
      </Form>
    );
  }
}