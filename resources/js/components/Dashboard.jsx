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
    BsFillPersonFill,
    BsFillCartFill,
} from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            games: [],
            publishers: [],
            developers: [],
            search: "",
            game_id: "",
            GameName: "",
            publisher_id: "",
            developer_id: "",
            release_date: "",
            genre: "",
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

        axios.get("/admin/games").then((res) =>
            this.setState({
                games: res.data.games.data,
                publishers: res.data.publisher,
                developers: res.data.developer,
                pagination: res.data.games.links,
                lastPage: res.data.games.last_page,
            })
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    search = () => {
        axios.post("/admin/search", { search: this.state.search }).then((res) =>
            this.setState({
                games: res.data.games.data,
            }).catch((err) => {
                console.log(err.response);
            })
        );
    };

    changePage = (url) => {
        console.log(url);
        axios.get(url).then((res) =>
            this.setState({
                games: res.data.games.data,
                publishers: res.data.publisher,
                developers: res.data.developer,
                pagination: res.data.games.links,
            })
        );
    };

    handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/admin/games", {
                name: this.state.GameName,
                publisher_id: this.state.publisher_id,
                developer_id: this.state.developer_id,
                release_date: this.state.release_date,
                genre: this.state.genre,
                price: this.state.price,
            })
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire("Saveed!", "", "success");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    handleEdit = (e) => {
        e.preventDefault();

        axios
            .put("/admin/games", {
                game_id: this.state.game_id,
                name: this.state.GameName,
                publisher_id: this.state.publisher_id,
                developer_id: this.state.developer_id,
                release_date: this.state.release_date,
                genre: this.state.genre,
                price: this.state.price,
            })
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire("Edited!", "", "success");
                    window.location.reload();
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
                    .delete("/admin/games", {
                        data: {
                            game_id: id,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );

                            window.location.reload();
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
                                        Dashboard
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
                                        <span>Dashboard</span>
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
                                            Dashboard
                                        </div>
                                        <div className="card-body">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-toggle="modal"
                                                data-target="#exampleModalCenter"
                                                onClick={() =>
                                                    this.setState({
                                                        GameName: "",
                                                        publisher_id: "",
                                                        developer_id: "",
                                                        release_date: "",
                                                        genre: "",
                                                        price: "",
                                                        modalType: "create",
                                                    })
                                                }
                                            >
                                                Add Games
                                            </button>
                                            <div className="float-left mr-2 mb-2 ">
                                                <a
                                                    href="../admin/export"
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
                                                                Game Name
                                                            </th>
                                                            <th className="text-center">
                                                                Publisher Name
                                                            </th>
                                                            <th className="text-center">
                                                                Release Date
                                                            </th>
                                                            <th className="text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.games.map(
                                                            (item, index) => {
                                                                return (
                                                                    <tr className="text-center">
                                                                        <td>
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.GameName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.PublisherName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.release_date
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
                                                                                            game_id:
                                                                                                item.game_id,
                                                                                            GameName:
                                                                                                item.GameName,
                                                                                            publisher_id:
                                                                                                item.publisher_id,
                                                                                            developer_id:
                                                                                                item.developer_id,
                                                                                            release_date:
                                                                                                item.release_date,
                                                                                            genre: item.Genre,
                                                                                            price: item.Price,
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
                                                                                            game_id:
                                                                                                item.game_id,
                                                                                            GameName:
                                                                                                item.GameName,
                                                                                            publisher_id:
                                                                                                item.publisher_id,
                                                                                            developer_id:
                                                                                                item.developer_id,
                                                                                            release_date:
                                                                                                item.release_date,
                                                                                            genre: item.Genre,
                                                                                            price: item.Price,
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
                                                                                        item.game_id
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
                                                                                {item.label.includes(
                                                                                    ";"
                                                                                )
                                                                                    ? item.label.substring(
                                                                                          item.label.indexOf(
                                                                                              ";"
                                                                                          ) +
                                                                                              1
                                                                                      )
                                                                                    : item.label}
                                                                                {item.label.includes(
                                                                                    "Next"
                                                                                )
                                                                                    ? "Next"
                                                                                    : ""}
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                ) : (
                                                                    <li class="page-item">
                                                                        <div className="page-link">
                                                                            <span aria-hidden="true">
                                                                                {item.label.includes(
                                                                                    ";"
                                                                                )
                                                                                    ? item.label.substring(
                                                                                          item.label.indexOf(
                                                                                              ";"
                                                                                          ) +
                                                                                              1
                                                                                      )
                                                                                    : item.label}
                                                                                {item.label.includes(
                                                                                    "Next"
                                                                                )
                                                                                    ? "Next"
                                                                                    : ""}
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
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class="labels">
                                                    Game Name
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    defaultValue={
                                                        this.state.GameName
                                                    }
                                                    name="GameName"
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
                                                    Publisher Name
                                                </label>
                                                <select
                                                    class="form-select"
                                                    aria-label="Default select example"
                                                    name="publisher_id"
                                                    value={
                                                        this.state.publisher_id
                                                    }
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.publishers.map(
                                                        (item) => {
                                                            if (
                                                                item.name ==
                                                                this.state
                                                                    .publisher_id
                                                            ) {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            item.publisher_id
                                                                        }
                                                                        selected
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                );
                                                            } else {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            item.publisher_id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-12">
                                                <label class="labels">
                                                    {this.state.developer_id}
                                                </label>
                                                <select
                                                    class="form-select"
                                                    aria-label="Default select example"
                                                    name="developer_id"
                                                    value={
                                                        this.state.developer_id
                                                    }
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.developers.map(
                                                        (item) => {
                                                            if (
                                                                item.name ==
                                                                this.state
                                                                    .developer_id
                                                            ) {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            item.developer_id
                                                                        }
                                                                        selected
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                );
                                                            } else {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            item.developer_id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-12">
                                                <label class="labels">
                                                    Release Date
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    defaultValue={
                                                        this.state.release_date
                                                    }
                                                    name="release_date"
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
                                                    Genre
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    defaultValue={
                                                        this.state.genre
                                                    }
                                                    name="genre"
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
                                {this.state.modalType === "read" ? (
                                    ""
                                ) : (
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        {this.state.modalType === "create" ? (
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                onClick={(e) =>
                                                    this.handleSubmit(e)
                                                }
                                            >
                                                Save changes
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                onClick={(e) =>
                                                    this.handleEdit(e)
                                                }
                                            >
                                                Save changes
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;
