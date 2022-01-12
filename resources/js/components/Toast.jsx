import React from "react";
import Logo from "../../img/logo.png";
import { connect } from "react-redux";
import { increment, decrement, deleteUser } from "../redux/action";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div
                    class="toaster position-fixed bottom-0 end-0 p-3"
                    style={{ zIndex: "5" }}
                >
                    <div
                        class="toast hide"
                        id={this.props.status}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                    >
                        <div class="toast-header">
                            <svg
                                class="docs-placeholder-img rounded me-2"
                                width="20"
                                height="20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                            >
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="#007aff"
                                ></rect>
                            </svg>
                            <strong class="me-auto">Bootstrap</strong>
                            <button
                                class="btn-close"
                                type="button"
                                data-coreui-dismiss="toast"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="toast-body">
                            Hello, world! This is a toast message.
                        </div>
                    </div>
                </div>
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
        deleteUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
