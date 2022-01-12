import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Beranda from "./Beranda";
import Dashboard from "./Dashboard";

import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Checkout from "./Checkout";
import Payment from "./Payment";
import PaymentList from "./PaymentList";
import Profile from "./Profile";
import About from "./About";
import Order from "./Order";

function Game() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/beranda" element={<Beranda />} />
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/admin/payment"
                            element={<PaymentList />}
                        />
                        <Route path="/admin/orderlist" element={<Order />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default Game;

// DOM element
if (document.getElementById("game")) {
    ReactDOM.render(<Game />, document.getElementById("game"));
}
