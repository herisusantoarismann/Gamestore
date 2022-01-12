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
    BsCartFill,
} from "react-icons/bs";

class PaymentList extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            data: [],
            search: "",
        };
    }

    componentDidMount() {
        document.title = "Gamestore | Home";
        // const cookies = new Cookies();
        // this.setState({
        //     user: cookies.get("user"),
        // });

        axios.get("/admin/paymentlist").then((res) =>
            this.setState({
                data: res.data.payment.data,
            })
        );
    }

    render() {
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
                            <a className="nav-link text-center ml-4">
                                <BsFillHouseFill className="mr-1" />
                                Dashboard
                            </a>
                            <a className="nav-link text-center ml-4">
                                <BsCartFill className="mr-1" />
                                Payment List
                            </a>
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
                                    <li className="breadcrumb-item">
                                        <span>Dashboard</span>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <span>Payment List</span>
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
                                            Payment List
                                        </div>
                                        <div className="card-body">
                                            <div className="float-right mr-2 mb-2 ">
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
                                            <div className="table-responsive">
                                                <table className="table border mb-0">
                                                    <thead className="table-light fw-semibold">
                                                        <tr className="align-middle">
                                                            <th className="text-center">
                                                                No
                                                            </th>
                                                            <th className="text-center">
                                                                Code Pay
                                                            </th>
                                                            <th className="text-center">
                                                                User Name
                                                            </th>
                                                            <th className="text-center">
                                                                Game List
                                                            </th>
                                                            <th className="text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.data.map(
                                                            (item, index) => {
                                                                return (
                                                                    <tr className="text-center">
                                                                        <td>
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.UserName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.CodePay
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {/* {item.GameList.map(
                                                                                (
                                                                                    game
                                                                                ) =>
                                                                                    game.name
                                                                            )} */}
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-primary btn-sm mr-2 text-white"
                                                                            >
                                                                                <BsZoomIn />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-success btn-sm mr-2 text-white"
                                                                            >
                                                                                <BsPencil />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-warning btn-sm text-white"
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
                                                        <li class="page-item">
                                                            <a
                                                                class="page-link"
                                                                href="#"
                                                                aria-label="Previous"
                                                            >
                                                                <span aria-hidden="true">
                                                                    «
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="page-item">
                                                            <a
                                                                class="page-link"
                                                                href="#"
                                                            >
                                                                1
                                                            </a>
                                                        </li>
                                                        <li class="page-item">
                                                            <a
                                                                class="page-link"
                                                                href="#"
                                                            >
                                                                2
                                                            </a>
                                                        </li>
                                                        <li class="page-item">
                                                            <a
                                                                class="page-link"
                                                                href="#"
                                                            >
                                                                3
                                                            </a>
                                                        </li>
                                                        <li class="page-item">
                                                            <a
                                                                class="page-link"
                                                                href="#"
                                                                aria-label="Next"
                                                            >
                                                                <span aria-hidden="true">
                                                                    »
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PaymentList;
