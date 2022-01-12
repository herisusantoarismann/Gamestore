import React from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import RegisterImg from "../../img/imgRegister.jpg";
import Logo from "../../img/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import "../../css/app.css";
import siteKey from "./Captcha";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            errors: false,
            isSuccess: false,
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Register";
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        isSuccess: true,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data.errors,
                });
            });
    };

    render() {
        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        if (this.state.isSuccess) {
            return <Navigate to="/" />;
        } else {
            return (
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-4 login-section-wrapper">
                            <div class="brand-wrapper mx-auto">
                                <img src={Logo} alt="logo" class="logo" />
                            </div>
                            <div class="login-wrapper my-auto mx-auto">
                                <h1 class="login-title">Register</h1>
                                <form action="#!">
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={token}
                                    ></input>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={`form-control ${
                                                this.state.errors.hasOwnProperty(
                                                    "email"
                                                )
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="email@example.com"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.hasOwnProperty(
                                            "email"
                                        ) ? (
                                            <div class="invalid-feedback">
                                                {this.state.errors.email[0]}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            class={`form-control ${
                                                this.state.errors.hasOwnProperty(
                                                    "password"
                                                )
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="enter your passsword"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.hasOwnProperty(
                                            "password"
                                        ) ? (
                                            <div class="invalid-feedback">
                                                {this.state.errors.password[0]}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password">
                                            Password Confirmation
                                        </label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            id="password"
                                            class={`form-control ${
                                                this.state.errors.hasOwnProperty(
                                                    "password_confirmation"
                                                )
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="enter your passsword confirmation"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.hasOwnProperty(
                                            "password_confirmation"
                                        ) ? (
                                            <div class="invalid-feedback">
                                                {
                                                    this.state.errors
                                                        .password_confirmation[0]
                                                }
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div class="form-group mb-4">
                                        <ReCAPTCHA sitekey={siteKey} />
                                    </div>
                                    <input
                                        name="login"
                                        id="login"
                                        class="btn btn-block login-btn"
                                        type="button"
                                        value="Register"
                                        onClick={(e) => this.handleSubmit(e)}
                                    />
                                </form>
                                <p class="login-wrapper-footer-text">
                                    Already have an account?{" "}
                                    <Link to="/">Login here</Link>
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-8 px-0 d-none d-sm-block">
                            <img
                                src={RegisterImg}
                                alt="login image"
                                class="login-img"
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Register;
