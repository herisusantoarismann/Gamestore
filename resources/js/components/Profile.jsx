import React from "react";
import "../../css/v_simplebar.css";
import "../../css/simplebar.css";
import "../../css/dashboard.css";
import { connect, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/action";
import Navbar from "./Navbar";
import Menu from "./Menu";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            data: [],
            user_id: "",
            name: "",
            surname: "",
            email: "",
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Home";
        // const cookies = new Cookies();
        // this.setState({
        //     user: cookies.get("user"),
        // });
        axios
            .post("/user", {
                user_id: this.props.data.user.user_id,
            })
            .then((res) =>
                this.setState({
                    user: res.data.user,
                    user_id: res.data.user.user_id,
                    name: res.data.user.name,
                    surname: res.data.user.surname,
                    email: res.data.user.email,
                })
            );
        console.log(this.state.user);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put("/user", {
                user_id: this.state.user_id,
                name: this.state.name,
                surname: this.state.surname,
            })
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div style={{ overflow: "hidden" }}>
                <Navbar />
                <div
                    className="w-100 h-75 position-absolute"
                    style={{ backgroundColor: "#f7fbff" }}
                >
                    <div class="container rounded bg-white mt-5 mb-5">
                        <div class="row">
                            <div class="col-md-5 border-right">
                                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        class="rounded-circle mt-5"
                                        width="150px"
                                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    />
                                    <span class="font-weight-bold">
                                        {this.state.user.name
                                            ? this.state.user.name
                                            : " "}{" "}
                                        {this.state.user.surname
                                            ? this.state.user.surname
                                            : " "}
                                    </span>
                                    <span class="text-black-50">
                                        {this.state.user.email}
                                    </span>
                                    <span> </span>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <div class="p-3 py-5">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="text-right">
                                            Profile Settings
                                        </h4>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <label class="labels">Name</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="first name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="labels">
                                                Surname
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="surname"
                                                value={this.state.surname}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <label class="labels">Email</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={this.state.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div class="mt-5 text-center">
                                        <button
                                            class="btn btn-primary profile-button"
                                            type="button"
                                            onClick={(e) =>
                                                this.handleSubmit(e)
                                            }
                                        >
                                            Save Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.data.user ? <Menu /> : ""}
            </div>
        );
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Profile);
