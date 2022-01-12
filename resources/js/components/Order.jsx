import React from "react";
import "../../css/v_simplebar.css";
import "../../css/simplebar.css";
import "../../css/dashboard.css";
import {
    BsZoomIn,
    BsPencil,
    BsFillTrashFill,
    BsFillHouseFill,
    BsFillFilePdfFill,
    BsFillCartFill,
    BsFillPersonFill,
} from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            orders: [],
            publishers: [],
            developers: [],
            search: "",
            order_id: "",
            code_pay: "",
            user_name: "",
            game: "",
            price: "",
            pagination: [],
            page: 1,
            lastPage: "",
            modalType: "",
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Home";
        // const cookies = new Cookies();
        // this.setState({
        //     user: cookies.get("user"),
        // });

        axios.get("/admin/order").then((res) =>
            this.setState({
                orders: res.data.orders.data,
            })
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    search = () => {
        console.log(this.state.search);

        axios
            .post("/admin/order/search", { search: this.state.search })
            .then((res) =>
                this.setState({
                    orders: res.data.orders.data,
                })
            )
            .catch((err) => {
                console.log(err.response);
            });
    };

    changePage = (url) => {
        console.log(url);
        axios.get(url).then((res) =>
            this.setState({
                orders: res.data.orders.data,
                pagination: res.data.games.links,
            })
        );
    };

    handleEdit = (e) => {
        e.preventDefault();
        axios
            .put("/admin/order", {
                order_id: this.state.order_id,
                user_id: this.state.user_id,
                code_pay: this.state.code_pay,
                game: this.state.game,
                price: this.state.price,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete("/admin/order", {
                        data: {
                            order_id: id,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                    });
            }
        });
    };

    render() {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        return (
            <>
                <div
                    className="sidebar sidebar-dark sidebar-fixed"
                    id="sidebar"
                >
                    <div className="sidebar-brand d-none d-md-flex">
                        GameStore
                    </div>
                    <ul
                        className="sidebar-nav d-none d-md-flex text-center"
                        data-coreui="navigation"
                        data-simplebar
                    >
                        <li className="nav-item text-center">
                            <Link
                                to="/admin/dashboard"
                                className="nav-link text-center ml-4"
                            >
                                <BsFillHouseFill className="mr-1" />
                                Dashboard
                            </Link>
                            <Link
                                to="/admin/orderlist"
                                className="nav-link text-center ml-4"
                            >
                                <BsFillCartFill className="mr-1" />
                                Order List
                            </Link>
                            <Link
                                to="/profile"
                                className="nav-link text-center ml-4"
                            >
                                <BsFillPersonFill className="mr-1" />
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="sidebar-toggler"
                        type="button"
                        data-coreui-toggle="unfoldable"
                    ></button>
                </div>
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <header className="header header-sticky mb-4">
                        <div className="container-fluid">
                            <a className="header-brand d-md-none" href="#"></a>
                            <ul className="header-nav d-none d-md-flex text-left">
                                <li className="nav-item text-center">
                                    <a className="nav-link text-center">
                                        Order List
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="header-divider"></div>
                        <div className="container-fluid">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb my-0 ms-2">
                                    <li className="breadcrumb-item">
                                        <span>Home</span>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <span>Order List</span>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </header>
                    <div className="body flex-grow-1 px-3">
                        <div className="container-lg">
                            <div className="row px-4">
                                <div className="col-md-12">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            Order List
                                        </div>
                                        <div className="card-body">
                                            <div className="float-left mr-2 mb-2 ">
                                                <a
                                                    href="../admin/export/order"
                                                    target="_blank"
                                                >
                                                    <button
                                                        class="btn btn-success text-white"
                                                        type="button"
                                                    >
                                                        <BsFillFilePdfFill />
                                                        Export
                                                    </button>
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        this.setState({
                                                            toast: !this.state
                                                                .toast,
                                                        })
                                                    }
                                                >
                                                    TOAST
                                                </button>
                                            </div>
                                            <form className="form-inline mb-2 my-lg-0 float-right">
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
                                                    className="btn btn-success my-2 my-sm-0 mr-2 text-white"
                                                    type="button"
                                                    onClick={this.search}
                                                >
                                                    Search
                                                </button>
                                            </form>
                                            <div className="table-responsive">
                                                <table className="table border mb-0">
                                                    <thead className="table-light fw-semibold">
                                                        <tr className="align-middle">
                                                            <th className="text-center">
                                                                No
                                                            </th>
                                                            <th className="text-center">
                                                                Name
                                                            </th>
                                                            <th className="text-center">
                                                                Code Pay
                                                            </th>
                                                            <th className="text-center">
                                                                Price
                                                            </th>
                                                            <th className="text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.orders.map(
                                                            (item, index) => {
                                                                return (
                                                                    <tr className="text-center">
                                                                        <td>
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.user_name
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.code_pay
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.price
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-primary btn-sm text-white mr-2"
                                                                                data-toggle="modal"
                                                                                data-target="#exampleModalCenter"
                                                                                onClick={() =>
                                                                                    this.setState(
                                                                                        {
                                                                                            order_id:
                                                                                                item.order_id,
                                                                                            user_id:
                                                                                                item.user_id,
                                                                                            user_name:
                                                                                                item.user_name,
                                                                                            code_pay:
                                                                                                item.code_pay,
                                                                                            game: item.game,
                                                                                            price: item.price,
                                                                                            modalType:
                                                                                                "read",
                                                                                        }
                                                                                    )
                                                                                }
                                                                            >
                                                                                <BsZoomIn />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-success btn-sm text-white mr-2"
                                                                                data-toggle="modal"
                                                                                data-target="#exampleModalCenter"
                                                                                onClick={() =>
                                                                                    this.setState(
                                                                                        {
                                                                                            order_id:
                                                                                                item.order_id,
                                                                                            user_id:
                                                                                                item.user_id,
                                                                                            user_name:
                                                                                                item.user_name,
                                                                                            code_pay:
                                                                                                item.code_pay,
                                                                                            game: item.game,
                                                                                            price: item.price,
                                                                                            modalType:
                                                                                                "edit",
                                                                                        }
                                                                                    )
                                                                                }
                                                                            >
                                                                                <BsPencil />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-warning btn-sm text-white"
                                                                                onClick={() =>
                                                                                    this.handleDelete(
                                                                                        item.order_id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <BsFillTrashFill />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                                <nav aria-label="Page navigation example mt-4">
                                                    <ul class="pagination float-right mt-2">
                                                        {this.state.pagination.map(
                                                            (item, idx) => {
                                                                return item.url ? (
                                                                    <li
                                                                        class="page-item"
                                                                        onClick={() =>
                                                                            this.changePage(
                                                                                item.url
                                                                            )
                                                                        }
                                                                    >
                                                                        <div className="page-link">
                                                                            <span aria-hidden="true">
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                ) : (
                                                                    <li class="page-item">
                                                                        <div className="page-link">
                                                                            <span aria-hidden="true">
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="modal fade"
                        id="exampleModalCenter"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                    >
                        <div
                            class="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5
                                        class="modal-title"
                                        id="exampleModalCenterTitle"
                                    >
                                        {this.state.modalType === "read"
                                            ? "Read Data"
                                            : "Edit Data"}
                                    </h5>
                                    <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form action="#!">
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value={token}
                                        ></input>
                                        <div class="row mt-3">
                                            <div class="col-md-12">
                                                <label class="labels">
                                                    Code Pay
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    defaultValue={
                                                        this.state.code_pay
                                                    }
                                                    name="code_pay"
                                                    onChange={this.handleChange}
                                                    readOnly={
                                                        this.state.modalType ===
                                                        "read"
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-12">
                                                <label class="labels">
                                                    Game
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    defaultValue={
                                                        this.state.game
                                                    }
                                                    name="game"
                                                    onChange={this.handleChange}
                                                    readOnly={
                                                        this.state.modalType ===
                                                        "read"
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-12">
                                                <label class="labels">
                                                    Price
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    defaultValue={
                                                        this.state.price
                                                    }
                                                    name="price"
                                                    onChange={this.handleChange}
                                                    readOnly={
                                                        this.state.modalType ===
                                                        "read"
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        onClick={(e) => this.handleEdit(e)}
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Order;
