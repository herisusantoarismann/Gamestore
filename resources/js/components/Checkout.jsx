import React from "react";
import Cookies from "universal-cookie";
import Logo from "../../img/logo.png";
import { connect, useDispatch } from "react-redux";
import {
    increment,
    decrement,
    deleteGames,
    deleteAllGames,
    Order,
} from "../redux/action";
import { BsFillTrashFill, BsCartFill } from "react-icons/bs";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Menu from "./Menu";

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            redirect: false,
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Checkout";
        const cookies = new Cookies();
        this.setState({
            user: cookies.get("user"),
        });
    }

    handleSubmit = (e, user_id, game, price) => {
        e.preventDefault();

        let groupedData = game.reduce(function (r, a) {
            r[a.game_id] = r[a.game_id] || [];
            r[a.game_id].push(a);
            return r;
        }, Object.create(null));
        console.log(groupedData);
        let itemGame = "";
        Object.keys(groupedData).map((item) => {
            itemGame += "{ ";
            itemGame += groupedData[item][0].name + " x ";
            itemGame += groupedData[item].length + "}, ";
        });
        axios
            .post("order", {
                code_pay: (Math.random() + 1).toString(36).substring(2),
                game: itemGame,
                user_id: user_id,
                price: price,
            })
            .then((res) => {
                if (res.status === 200) {
                    const deleteAllGames = this.props.deleteAllGames;
                    const Order = this.props.Order;
                    deleteAllGames();
                    Order(res.data.order.order_id);
                    this.setState({
                        redirect: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    render() {
        const data = this.props.data;
        const deleteGames = this.props.deleteGames;
        let groupedData = "";
        let total = 0;
        if (data.games) {
            data.games.map((item) => (total += parseInt(item.price)));
            groupedData = data.games.reduce(function (r, a) {
                r[a.game_id] = r[a.game_id] || [];
                r[a.game_id].push(a);
                return r;
            }, Object.create(null));
        }
        if (this.state.redirect) {
            return <Navigate to="/payment" />;
        } else {
            return (
                <div style={{ overflow: "hidden" }}>
                    <Navbar />
                    <section class="shopping-cart dark">
                        <div class="container">
                            <div class="block-heading">
                                <h2>Checkout</h2>
                            </div>
                            <div class="content">
                                <div class="row">
                                    <div class="col-md-12 col-lg-8">
                                        <div class="items">
                                            {Object.keys(groupedData).map(
                                                (item, index) => {
                                                    return (
                                                        <div class="product">
                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <img
                                                                        class="img-fluid mx-auto d-block image"
                                                                        src={`/images/${groupedData[item][0].picture}`}
                                                                        style={{
                                                                            height: "160px",
                                                                            width: "160px",
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <div class="info">
                                                                        <div class="row">
                                                                            <div class="col-md-5 product-name">
                                                                                <div class="product-name">
                                                                                    <a href="#">
                                                                                        {
                                                                                            groupedData[
                                                                                                item
                                                                                            ][0]
                                                                                                .name
                                                                                        }
                                                                                    </a>
                                                                                    <div class="product-info">
                                                                                        <div>
                                                                                            Genre:{" "}
                                                                                            <span class="value">
                                                                                                {
                                                                                                    groupedData[
                                                                                                        item
                                                                                                    ][0]
                                                                                                        .genre
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div>
                                                                                            Release
                                                                                            Date:{" "}
                                                                                            <span class="value">
                                                                                                {
                                                                                                    groupedData[
                                                                                                        item
                                                                                                    ][0]
                                                                                                        .release_date
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div>
                                                                                            Price:
                                                                                            <span class="value">
                                                                                                {
                                                                                                    groupedData[
                                                                                                        item
                                                                                                    ][0]
                                                                                                        .price
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="mt-8">
                                                                                            <button
                                                                                                type="button"
                                                                                                class="btn btn-danger text-white"
                                                                                                onClick={() =>
                                                                                                    deleteGames(
                                                                                                        item
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <BsFillTrashFill />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-4 quantity">
                                                                                <label for="quantity">
                                                                                    Quantity:
                                                                                </label>
                                                                                <input
                                                                                    id="quantity"
                                                                                    type="text"
                                                                                    value={
                                                                                        groupedData[
                                                                                            item
                                                                                        ]
                                                                                            .length
                                                                                    }
                                                                                    class="form-control quantity-input"
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div class="col-md-3 price">
                                                                                <span>
                                                                                    {groupedData[
                                                                                        item
                                                                                    ][0]
                                                                                        .price *
                                                                                        groupedData[
                                                                                            item
                                                                                        ]
                                                                                            .length}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-4">
                                        <div class="summary">
                                            <h3>Summary</h3>
                                            <div class="summary-item">
                                                <span class="text">
                                                    Discount
                                                </span>
                                                <span class="price">$0</span>
                                            </div>
                                            <div class="summary-item">
                                                <span class="text">Total</span>
                                                <span class="price">
                                                    {total}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-lg btn-block"
                                                onClick={(e) =>
                                                    this.handleSubmit(
                                                        e,
                                                        data.user.user_id,
                                                        data.games,
                                                        total
                                                    )
                                                }
                                            >
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {this.props.data.user ? <Menu /> : ""}
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
        deleteGames,
        deleteAllGames,
        Order,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Checkout);
