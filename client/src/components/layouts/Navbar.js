import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ products }) =>
    <Fragment>
        <nav className = "navbar">
            <div className = "navbar-wrapper">
                <a>
                    <div className = "logo">
                        <i className = "fa-2x fab fa-drupal"></i>
                        <span className = "lead">Fast Shopping</span>
                    </div>
                </a>
                <div className = "cart-icon">
                    <Link to = "/cart" className = "position-relative" id = "cart-icon">
                        {products.length !== 0 &&
                            <span className = "counter rounded-circle position-absolute">
                                {products.length}
                            </span>
                        }
                        <i className = "fa-1x fa fa-shopping-cart mx-1" aria-hidden = "true"></i>
                    </Link>
                </div>
            </div>
        </nav>
    </Fragment>

Navbar.propTypes = {
    products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    products: state.cartState.products
});

const ConnectedNavbar = connect(mapStateToProps)(Navbar);

export default ConnectedNavbar;
