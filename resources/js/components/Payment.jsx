import React from "react";
import Cookies from "universal-cookie";
import Logo from "../../img/logo.png";
import { connect, useDispatch } from "react-redux";
import { increment, decrement, deleteGames } from "../redux/action";
import { BsFillTrashFill, BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            order: "",
            code_pay: "",
            game: "",
            price: "",
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Payment";
        const cookies = new Cookies();
        this.setState({
            user: cookies.get("user"),
        });

        const data = this.props.data;

        axios
            .post("/admin/oneorder", {
                order_id: data.order,
            })
            .then((res) => {
                this.setState({
                    code_pay: res.data.order.code_pay,
                    game: res.data.order.game,
                    price: res.data.order.price,
                });
            });
    }

    render() {
        let game = this.state.game.split(",");
        game = game.map((item) => item.replace("{", " "));
        game = game.map((item) => item.replace("}", " "));
        console.log(game);
        return (
            <div style={{ overflow: "hidden" }}>
                <Navbar />
                <div className="mx-auto w-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col-6" style={{ width: "400px" }}>
                            <div class="card px-2 py-3">
                                <div className="info">
                                    <span>Code Pay : </span>
                                    <p>
                                        {(Math.random() + 1)
                                            .toString(36)
                                            .substring(2)}
                                    </p>
                                </div>
                                <div className="info">
                                    <span>Game : </span>
                                    <p>
                                        {game.map((item) => (
                                            <p>{item}</p>
                                        ))}
                                    </p>
                                </div>
                                <div className="info">
                                    <span>Total Price : </span>
                                    <p>{this.state.price}</p>
                                </div>
                                <div className="info">
                                    <span>Purchase Status : </span>
                                    <p>Waiting for payment</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{ width: "400px" }}>
                            <div class="card px-2 py-3">
                                <p>
                                    Please transfer to the account number below:
                                    :{" "}
                                </p>
                                <div className="info">
                                    <span>Bank : </span>
                                    <p>Mandiri</p>
                                </div>
                                <div className="info">
                                    <span>Account number : </span>
                                    <p>06274128412</p>
                                </div>
                                <div className="info">
                                    <span>On behalf of : </span>
                                    <p>Heri Susanto Arisman</p>
                                </div>
                                <Link
                                    to="/beranda"
                                    className="d-flex justify-content-center"
                                >
                                    <button
                                        type="button"
                                        class="btn btn-primary "
                                    >
                                        Beranda
                                    </button>
                                </Link>
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
        deleteGames,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Payment);
