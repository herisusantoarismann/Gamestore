import React from "react";
import Logo from "../../img/logo.png";
import { connect } from "react-redux";
import { increment, decrement } from "../redux/action";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        const data = this.props.data;
        return (
            <>
                <header style={{ width: "100vw", marginBottom: "4rem" }}>
                    <nav className="navbar navbar-expand-lg navbar-gamestore px-4 d-flex justify-content-between">
                        <a href="/home" className="navbar-brand">
                            <img
                                src={Logo}
                                alt="gamestore"
                                style={{ width: "80px", height: "30px" }}
                            />
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/home" className="nav-link navMen">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/beranda" className="nav-link navMen">
                                    Catalog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link navMen">
                                    About
                                </Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            {data.user ? (
                                <>
                                    <Link to="/checkout">
                                        <BsCartFill
                                            style={{ cursor: "pointer" }}
                                        />
                                    </Link>
                                    <span
                                        className="badge badge-warning"
                                        id="lblCartCount"
                                    >
                                        {data.games.length}
                                    </span>{" "}
                                </>
                            ) : (
                                <Link to="/">
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                    >
                                        Login
                                    </button>
                                </Link>
                            )}
                        </form>
                    </nav>
                </header>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
