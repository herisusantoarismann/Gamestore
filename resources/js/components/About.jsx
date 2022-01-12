import React from "react";
import Cookies from "universal-cookie";
import Logo from "../../img/logo.png";
import ABOUT from "../../img/about.png";
import { connect, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/action";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
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
        return (
            <div style={{ overflow: "hidden" }}>
                <Navbar />
                <div
                    className="container row mx-auto d-flex align-items-center"
                    style={{ height: "85vh" }}
                >
                    <div className="col-6">
                        <h2
                            style={{
                                letterSpacing: "2px",
                                fontSize: "50px",
                            }}
                        >
                            <b>ABOUT</b>
                        </h2>
                        <h2
                            style={{
                                letterSpacing: "2px",
                                fontSize: "50px",
                            }}
                        >
                            <b>US</b>
                        </h2>
                        <p className="w-75">
                            A trusted online game shop that has been around
                            since sitting down. Have transacted 1400+ with 405+
                            customers. Order here is guaranteed satisfaction.
                        </p>
                        <Link to="/beranda">
                            <button type="button" class="btn btn-primary">
                                To Store
                            </button>
                        </Link>
                    </div>
                    <div className="col-6">
                        <img
                            src={ABOUT}
                            alt="about"
                            style={{ width: "400px", height: "350px" }}
                            className="d-flex justify-content-center"
                        />
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

export default connect(mapStateToProps, mapDispatchToProps())(Home);
