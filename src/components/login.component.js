import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css/signin.css'
import singinimg from '../images/signin-image.jpg'

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div style ={{background:'white'}}>
      <div class="container px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div class="card card0 border-0">
      <div class="row d-flex">
          <div class="col-lg-6">
              <div class="card1 mt-5">
                  <div class="row px-3 justify-content-center  border-line"> <img src={singinimg} class="image"/> </div>
              </div>
          </div>
          <div class="col-lg-6">
              <div class="card2 card border-0 px-4 py-5">
                  <div class="row mb-4 px-3">
                      <h6 class="mb-0 mr-4 mt-2">Sign in with</h6>
                      <div class="facebook text-center mr-3">
                          <div class="fa fa-facebook"></div>
                      </div>
                      <div class="twitter text-center mr-3">
                          <div class="fa fa-twitter"></div>
                      </div>
                      <div class="linkedin text-center mr-3">
                          <div class="fa fa-linkedin"></div>
                      </div>
                  </div>
                  <div class="row px-3 mb-4">
                      <div class="line"></div> <small class="or text-center">Or</small>
                      <div class="line"></div>
                  </div>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div class="row px-3"> <label class="mb-1">
                          <h6 class="mb-0 text-sm">Username</h6>
                      </label>
              <input
                type="text"
                className="mb-4"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div class="row px-3"> <label class="mb-1">
                          <h6 class="mb-0 text-sm">Password</h6>
                      </label>
              <input
                type="password"
                className="mb-4"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div class="row mb-3 px-3">
              <button
                className="btn btn-blue text-center"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account? <a class="text-danger " href="/register">Register</a></small> </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}