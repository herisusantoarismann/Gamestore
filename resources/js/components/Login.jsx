import axios from "axios";
import React from "react";
import { Navigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import LoginImg from "../../img/imgLogin.jpg";
import Logo from "../../img/logo.png";
import { connect, useDispatch } from "react-redux";
import { increment, decrement, addUser } from "../redux/action";
import "../../css/app.css";
import ReCAPTCHA from "react-google-recaptcha";
import siteKey from "./Captcha";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: false,
            isLogin: false,
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Login";
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        isLogin: true,
                    });
                    window.sessionStorage.setItem("isLogin", true);
                    const addUser = this.props.addUser;
                    addUser(res.data.data);
                    cookies.set("user", res.data.data);
                }
            })
            .catch((err) => {
                this.setState({
                    errors: true,
                });
                console.log(err.response);
            });
    };

    render() {
        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        if (this.state.isLogin) {
            return <Navigate to="/beranda" />;
        } else {
            return (
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-8 px-0 d-none d-sm-block">
                            <img
                                src={LoginImg}
                                alt="login image"
                                class="login-img"
                            />
                        </div>
                        <div class="col-sm-4 login-section-wrapper">
                            <div class="brand-wrapper mx-auto">
                                <img src={Logo} alt="logo" class="logo" />
                            </div>
                            <div class="login-wrapper my-auto mx-auto">
                                <h1 class="login-title">Log in</h1>
                                {this.state.errors ? (
                                    <div
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                    >
                                        Please fill in the data correctly
                                        <button
                                            type="button"
                                            class="close"
                                            data-dismiss="alert"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">
                                                &times;
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <form>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={token}
                                    ></input>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="username"
                                            class="form-control"
                                            placeholder="enter your username"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            class="form-control"
                                            placeholder="enter your passsword"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div class="form-group mb-4">
                                        <ReCAPTCHA sitekey={siteKey} />
                                    </div>
                                    <input
                                        name="login"
                                        id="login"
                                        class="btn btn-block login-btn"
                                        value="Login"
                                        onClick={(e) => this.handleSubmit(e)}
                                    />
                                </form>
                                <a href="#!" class="forgot-password-link">
                                    Forgot password?
                                </a>
                                <p class="login-wrapper-footer-text">
                                    Don't have an account?{" "}
                                    <Link to="/register">Register here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data: state,
    };
};

const mapDispatchToProps = () => {
    return {
        increment,
        decrement,
        addUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Login);
