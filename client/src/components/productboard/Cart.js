import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import CartProduct from "./CartProduct";
import { doUpdateSubtotal } from "../../actions/cart";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subtotal: 0,
        }

        this.onSubstractSubtotal = this.onSubstractSubtotal.bind(this);
    }

    componentDidMount() {
        let total = 0;
        const { products } = this.props;
        const cartIcon = document.getElementById("cart-icon");
        const pages = document.getElementById("pages");

        cartIcon.style.display = "none";
        pages && (pages.style.display = "none");

        for (let product of products) {
            total += product.unit_price;
        }
        this.setState({ subtotal: total });
        this.props.onUpdateSubtotal(total);
    }

    onSubstractSubtotal(price) {
        const { subtotal } = this.props;
        this.props.onUpdateSubtotal(subtotal - price);
    }

    render () {
        const { products, subtotal } = this.props;

        return (
            <Fragment>
                <div className = "cart">
                    <header>
                        <p className = "medium font-bold text-emphasize cart-title">
                            Shopping Cart
                        </p>
                        { products.length !== 0 &&
                            <Link to = "/checkout">
                                <Button className = "btn btn-checkout cart-checkout">
                                    Check Out
                                </Button>
                            </Link>
                        }
                    </header>
                    {
                        products.length === 0
                        ?
                            <div className = "notification">
                                <i className = "fa fa-2x fa-shopping-basket" aria-hidden = "true"></i>
                                <span className = "d-block cart-empty-message">
                                    You have no product added to your cart at the moment.
                                    You can start adding your best interest.
                                </span>
                                <Link to = "/">
                                    <Button className = "btn btn-go-back">
                                        <i
                                            className = "fa fa-arrow-left light-color"
                                            aria-hidden = "true"
                                            style = {{ color: "white" }}
                                        ></i>
                                        &nbsp;&nbsp; Go back to products board!
                                    </Button>
                                </Link>
                            </div>
                        :
                            <div className = "cart-products">
                                { products.map(product => 
                                    <CartProduct
                                        key = {product.product_id}
                                        product = {product}
                                        onSubstractSubtotal = {this.onSubstractSubtotal}
                                    />
                                )}

                                <div className = "footer-checkout">
                                    <Link to = "/" className = "small cart-continue"> Continue Shopping </Link>
                                    <span className = "subtotal">
                                        Total: {
                                            subtotal &&
                                            subtotal.toLocaleString('en-US', {style:'currency', currency:'USD'})
                                        }
                                    </span>
                                </div>
                                <Link to = "/checkout">
                                    <Button className = "btn btn-checkout pull-right cart-checkout">
                                        Check Out
                                    </Button>
                                </Link>
                                <div className = "clear clear-cart"></div>
                            </div>
                    }
                </div>
            </Fragment>
        );
    }
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    onUpdateSubtotal: PropTypes.func.isRequired,
    subtotal: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    products: state.cartState.products,
    subtotal: state.cartState.subtotal
});

const mapDispatchToProps = dispatch => ({
    onUpdateSubtotal: total =>
        dispatch(doUpdateSubtotal(total))
});

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
