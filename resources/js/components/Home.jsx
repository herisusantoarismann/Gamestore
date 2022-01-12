import React from "react";
import Cookies from "universal-cookie";
import Logo from "../../img/logo.png";
import BG from "../../img/bg.jpg";
import { connect, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/action";
import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import Menu from "./Menu";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Home";
        const cookies = new Cookies();
        this.setState({
            user: cookies.get("user"),
        });
    }

    render() {
        const data = this.props.data;
        return (
            <>
                <header style={{ width: "100vw", height: "100vh" }}>
                    <nav
                        class="position-absolute w-100 navbar navbar-expand-lg text-dark px-4 d-flex justify-content-between"
                        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                    >
                        <a class="navbar-brand" href="#">
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
                                <Link to="/" className="nav-link navMen">
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
                        <form class="form-inline my-2 my-lg-0">
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
                    <div>
                        <img
                            src={BG}
                            alt="forza"
                            className="w-100"
                            style={{ height: "100vh" }}
                        />
                        <div
                            className="position-absolute text-white"
                            style={{ top: "40%", marginLeft: "5%" }}
                        >
                            <h2
                                style={{
                                    letterSpacing: "2px",
                                    fontSize: "50px",
                                }}
                            >
                                <b>THINK DEEPER</b>
                            </h2>
                            <h5
                                style={{
                                    letterSpacing: "1.5px",
                                    fontSize: "25px",
                                }}
                            >
                                <b>WIN MORE GAMES</b>
                            </h5>
                            <p>
                                Get the best games at the best prices and be the
                                best gamers
                            </p>
                            <Link to="/beranda">
                                <button type="button" class="btn btn-primary">
                                    To Store
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                {this.props.data.user ? <Menu /> : ""}
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

export default connect(mapStateToProps, mapDispatchToProps())(Home);
