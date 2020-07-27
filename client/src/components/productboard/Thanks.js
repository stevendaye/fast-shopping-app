import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import { doClearUser } from "../../actions/auth";
import { doClearOrder } from "../../actions/orders";
import { doSetInProgress } from "../../actions/cart";

class Thanks extends Component {
    constructor(props) {
        super(props);

        this.onCleanup = this.onCleanup.bind(this);
    }

    onCleanup() {
        this.props.onClearUser();
        this.props.onClearOrder();
        this.props.onSetProgress(true);   
    }

    render() {
        const { order, user } = this.props;

        return (
            <Fragment>
                <div className = "thanks">
                    {
                        order
                        ? <Fragment>
                            <span
                                className = "d-block"
                                role = "img"
                                aria-label = "Celebration Icon"
                                style = {{ fontSize: "3rem" }}
                            >
                                &#127881;
                            </span>
                            <div className = "large thanks-title">
                                Thanks for your purchase
                            </div>
                            <p className = "thanks-message">
                                {user && user.full_name}, we have created your order #{order}.
                                Your items will be soon at your door.
                            </p><br/>
                            <p>Stay Safe</p>
                            <Link to = "/">
                                <Button className = "btn btn-go-back" onClick = {this.onCleanup}>
                                    Start Again
                                </Button>
                            </Link>
                        </Fragment>

                        : <Fragment>
                            <i className = "fa fa-2x fa-truck" style = {{ color: "#537895" }}></i>
                            <p className = "thanks-on-reload">
                                Hey, there is no update on your order yet here.
                                If you have already placed one, then it must be on its way!
                            </p>
                            <Link to = "/">
                                <Button className = "btn btn-go-back">
                                    <i className = "fa fa-arrow-left light-color" aria-hidden = "true"></i>
                                    &nbsp;&nbsp; Go back to products board!
                                </Button>
                            </Link>
                        </Fragment>
                    }
                </div>
            </Fragment>
        );
    }
}

Thanks.propTypes = {
    user: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    onClearUser: PropTypes.func.isRequired,
    onClearOrder: PropTypes.func.isRequired,
    onSetInProgress: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.authState.user,
    order: state.ordersState.order
});

const mapDispatchToProps = dispatch => ({
    onClearUser: () =>
        dispatch(doClearUser()),
    onClearOrder: () =>
        dispatch(doClearOrder()),
    onSetProgress: inProgress =>
        dispatch(doSetInProgress(inProgress))
});

const ConnectedThanks = connect(mapStateToProps, mapDispatchToProps)(Thanks);

export default ConnectedThanks;
