import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import '../css/signin.css'
import singupimg from '../images/signup-image.jpg'




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

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
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
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
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
                  <div class="row px-3 justify-content-center  border-line"> <img src={singupimg} class="image"/> </div>
              </div>
          </div>
          <div class="col-lg-6">
              <div class="card2 card border-0 px-4 py-5">
                  <div class="row mb-4 px-3">
                      <h6 class="mb-0 mr-4 mt-2">Sign up with</h6>
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
             onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div class="row px-3"> 
                 <label class="mb-1"/>
                 <h6 class="mb-0 text-sm">Username</h6>
                  <input
                    type="text"
                    className="mb-4 inputCl"
                    placeholder="Enter a username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div class="row px-3"> 
                <label class="mb-1"/>
                <h6 class="mb-0 text-sm">Email Address</h6>
                  <input
                    type="text"
                    className="mb-4 inputCl"
                    name="email"
                    placeholder="Enter a email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div class="row px-3"> <label class="mb-1"/>
                          <h6 class="mb-0 text-sm">Password</h6>
                  <input
                    type="password"
                    className="mb-4 inputCl"
                    name="password"
                    placeholder="Enter a password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div class="row mt-3 mb-3 px-3">                 
                  <button className="btn btn-blue text-center">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
