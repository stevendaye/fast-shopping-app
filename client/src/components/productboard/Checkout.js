import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import uuid from "uuid";
import PropTypes from "prop-types";
import Button from "./Button";
import { doCheckUser, doSaveUser, doClearUser } from "../../actions/auth"; 
import { doSaveOrders } from "../../actions/orders";
import OrderForm from "./OrderForm";
import OrderTable from "./OrderTable";
import { doShowNotification } from "../../actions/notifications";

function shipdate() {
    const today = new Date();
    const days = 7;
    today.setDate(today.getDate() + days);

    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yy = today.getFullYear();

    return `${yy}-${mm}-${dd}`
}

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            userID: null,
            address: "",
            phoneNumber: "",
            email: "",
            type: "NEW",
            submitted: false,
            lookingup: false
        };

        this.onChange = this.onChange.bind(this);
        this.onLookup = this.onLookup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheckUser = this.onCheckUser.bind(this);
    }

    componentDidMount() {
        this.setState({ userID: uuid() });
        const cartIcon = document.getElementById("cart-icon");
        cartIcon.style.display = "none";
    }

    componentDidUpdate(prevProps, prevState) {
        const { user, products, subtotal } = this.props;
        const { userID, address, submitted } = this.state;
        
        const orderList = {
            user_id: userID, order_date: new Date(),
            ship_date: shipdate(), ship_address: address,
            subtotal: subtotal
        };

        if (prevProps.user !== user && submitted) {
            this.props.onPlaceOrder(userID, products, orderList);
        }

        if (prevProps.notifications !== this.props.notifications) {
            this.setState({ submitted: false });
            this.setState({ lookingup: false });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.value === "NEW") {
            this.onLookup();
        }
    }

    onLookup() {
        this.setState({ lookingup: false });
        this.props.onLookupAgain();
    }

    onCheckUser() {
        const { email } = this.state;
        if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
            this.props.onFindUser(email);
            this.setState({ lookingup: true });
        } else {
            this.props.onDisplayNotification("A valid email is required!", "danger");
        }
    }

    onSubmit() {
        const { user, products, subtotal } = this.props;
        const { name, userID, address, phoneNumber, email } = this.state;
        
        const userForm = {
            full_name: name, user_id: userID, address: address,
            phone_number: phoneNumber, email: email
        };

        const orderList = {
            user_id: userID, order_date: new Date(),
            ship_date: shipdate(), ship_address: user ? user.address : address,
            subtotal: subtotal 
        };

        if (user) {
            this.setState({
                name: user.full_name, userID: user.user_id,
                address: user.address, phoneNumber: user.phone_number,
                email: user.email
            });
            this.props.onPlaceOrder(userID, products, orderList);
        } else {
            if (name && userID && address && phoneNumber && email) {
                this.props.onRegisterUser(userForm);
                this.setState({ submitted: true });
            } else {
                this.props.onDisplayNotification(
                    "You must fill all entries to complete your order!", "danger"
                );
            }
        }
    }
    
    render () {
        const {
            user, products, subtotal,
            inProgress, notifications, order
        } = this.props;
        const {
            name, userID, address, phoneNumber,
            email, type, submitted, lookingup
        } = this.state;
        const userInput = { name, userID, address, phoneNumber, email };

        if (order) {
            return <Redirect to = "/thanks"/>
        }

        return (
            <Fragment>
                { inProgress && products.length !== 0
                    ? 
                        <div className = "checkout">
                            <div className = "checkout-order">
                                <OrderForm
                                    type = {type}
                                    user = {user}
                                    submitted = {submitted}
                                    lookingup = {lookingup}
                                    notifications = {notifications}
                                    userInput = {userInput}
                                    onChange= {this.onChange}
                                    onLookup = {this.onLookup}
                                    onCheckUser = {this.onCheckUser}
                                />
                                <OrderTable/>
                            </div>
                            <div className = "checkout-finish">
                                <div className = "checkout-subtotal subtotal">
                                    Total: &nbsp;&nbsp;
                                    { subtotal && subtotal.toLocaleString('en-US', {
                                        style:'currency', currency:'USD'
                                    }) }
                                </div>

                                <Button
                                    className = {
                                        submitted && Object.keys(notifications).length === 0
                                        ? "btn btn-dim"
                                        : "btn btn-checkout"
                                    }
                                    onClick = { this.onSubmit }
                                >
                                    {
                                        submitted && Object.keys(notifications).length === 0
                                        ? "Placing your order..."
                                        : "Place Order"
                                    }
                                </Button>
                            </div>
                            <div className = "clear"></div>
                        </div>
                    :   <div className = "chekout-empty">
                            <i className = "fa fa-2x fa-shopping-bag d-block"></i>
                            <div className = "checkout-empty-message">
                                Hey there, you are seeing this message because you probabily
                                did not add product to your cart. You can start now.
                            </div>
                            <Link to = "/">
                                <Button className = "btn btn-go-back">
                                    <i
                                        className = "fa fa-arrow-left light-color"
                                        aria-hidden = "true"
                                        style = {{ color: "white" }}
                                    ></i>
                                    &nbsp; Go back to products board!
                                </Button>
                            </Link>
                        </div>
                }
            </Fragment>
        );
    }
}

Checkout.propTypes = {
    user: PropTypes.object,
    products: PropTypes.array.isRequired,
    inProgress: PropTypes.bool.isRequired,
    subtotal: PropTypes.number.isRequired,
    onLookupAgain: PropTypes.func.isRequired,
    onPlaceOrder: PropTypes.func.isRequired,
    onFindUser: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
    onDisplayNotification: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    user: state.authState.user,
    products: state.cartState.products,
    inProgress: state.cartState.inProgress,
    notifications: state.notificationsState,
    subtotal: state.cartState.subtotal,
    order: state.ordersState.order
});

const mapDispatchToProps = dispatch => ({
    onLookupAgain: () =>
        dispatch(doClearUser()),
    onPlaceOrder: (user_id, products, order) =>
        dispatch(doSaveOrders({user_id, products, order})),
    onRegisterUser: user =>
        dispatch(doSaveUser(user)),
    onFindUser: email =>
        dispatch(doCheckUser(email)),
    onDisplayNotification: (message, alert) =>
        dispatch(doShowNotification({ message, alert }))
});

const ConnectedCheckout = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default ConnectedCheckout;
