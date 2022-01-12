import React from "react";
import Logo from "../../img/logo.png";
import { connect } from "react-redux";
import { increment, decrement, deleteUser } from "../redux/action";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div className="fixed-bottom text-right mr-4 mb-4">
                    <img
                        src="/images/bf.jpg"
                        alt="profile"
                        className="rounded-circle dropdown-toggle icon-login"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    />
                    <ul class="list-group list-group-flush dropdown-menu">
                        <Link to="/profile">
                            <li
                                className="list-group-item list-menu"
                                style={{ textDecoration: "none" }}
                            >
                                Profile
                            </li>
                        </Link>
                        <Link to="/">
                            <li
                                className="list-group-item list-menu"
                                onClick={() => this.props.deleteUser()}
                                style={{ textDecoration: "none" }}
                            >
                                Logout
                            </li>
                        </Link>
                    </ul>
                </div>
            </>
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
        deleteUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
