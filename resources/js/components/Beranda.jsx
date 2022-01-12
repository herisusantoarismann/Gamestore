import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Logo from "../../img/logo.png";
import CoD from "../../img/cod.jpg";
import "../../css/app.css";
import { BsFillHeartFill, BsCartFill } from "react-icons/bs";
import { connect, useDispatch } from "react-redux";
import { increment, decrement, addGames, deleteUser } from "../redux/action";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            data: [],
            search: "",
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Home";
        const cookies = new Cookies();
        this.setState({
            user: cookies.get("user"),
        });

        axios.get("/games").then((res) =>
            this.setState({
                data: res.data.games.data,
            })
        );
    }

    search = () => {
        axios.post("/search", { search: this.state.search }).then(
            (res) =>
                this.setState({
                    data: res.data.games.data,
                })
            // console.log(res.data.games)
        );
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    render() {
        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        const data = this.props.data;
        console.log(data);
        const addGames = this.props.addGames;
        return (
            <>
                <div style={{ overflowX: "hidden" }}>
                    <Navbar />
                    <div className="container">
                        <form className="w-25 d-flex justify-content-end mb-4 float-right">
                            <input
                                type="hidden"
                                name="_token"
                                value={token}
                            ></input>
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search by Game Name"
                                aria-label="Search"
                                name="search"
                                onChange={this.handleChange}
                            />
                            <button
                                className="btn btn-success my-2 my-sm-0 mr-2"
                                type="button"
                                onClick={this.search}
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div
                        className="container"
                        style={{
                            width: "80vw",
                            display: "grid",
                            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                            gap: "20px",
                            marginBottom: "50px",
                        }}
                    >
                        {this.state.data.map((item) => {
                            return (
                                <div class="card" key={item.game_id}>
                                    <img
                                        class="card-img-top"
                                        src={CoD}
                                        alt="Card image cap"
                                        style={{ height: "18rem" }}
                                    />
                                    <div className="mt-4 px-2 row">
                                        <div className="col-7">
                                            <p className="mb-1">{item.name}</p>
                                            <p>{item.price}</p>
                                        </div>
                                        <div className="col-5 text-right">
                                            <BsFillHeartFill className="mr-2 icon" />
                                            <BsCartFill
                                                className="icon"
                                                onClick={() => addGames(item)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2 mr-2 row">
                                        <div className="col-6"></div>
                                        <div className="col-6 text-right">
                                            <Link to="/checkout">
                                                <button
                                                    type="button"
                                                    class="btn btn-primary"
                                                    onClick={() =>
                                                        addGames(item)
                                                    }
                                                >
                                                    Purchase Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
        addGames,
        deleteUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Home);
