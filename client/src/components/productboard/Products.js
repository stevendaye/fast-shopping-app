import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { sortBy } from "lodash";
import PropTypes from "prop-types";
import Sort from "./Sort";
import Spinner from "../layouts/Spinner";
import Product from "./Product";
import { doListProducts } from "../../actions/products";

const SORTS = {
    ALPHA: list => sortBy(list, "name"),
    DATE: list => sortBy(list, "release_date"),
    PRICE: list => sortBy(list, "unit_price")
}

class Products extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            hitsPerPage: 8,
            sortKey: "ALPHA"
        };

        this.onSort = this.onSort.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const { page, hitsPerPage } = this.state;
        const cartIcon = document.getElementById("cart-icon");
        const pages = document.getElementById("pages");

        this._isMounted && this.props.onListProducts(page, hitsPerPage);
        cartIcon.style.display = "inline-block";
        pages && (pages.style.display = "block");
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSort(sortKey) {
        this.setState({ sortKey });
    }

    render() {
        let sortedProducts;
        const { isLoading, products } = this.props.products;
        const { sortKey } = this.state;
        sortKey === "DATE"
        ? (sortedProducts = SORTS[sortKey](products)).reverse()
        : (sortedProducts = SORTS[sortKey](products));

        return (
            <Fragment>
                <div className = "products">
                    {
                        (isLoading || !products)
                        ? <Spinner/>
                        : (
                            <div className = "list">
                                <Sort onSort = {this.onSort} />
                                <div className = "products-slices">
                                    <div className = "slice slice-1">
                                        {(sortedProducts.slice(0, 4)).map(product =>
                                            <Product
                                                key = {product.product_id}
                                                product = {product}
                                            />
                                        )}
                                    </div>
                                    <div className = "slice slice-2">
                                        {(sortedProducts.slice(4, 8)).map(product =>
                                            <Product
                                                key = {product.product_id}
                                                product = {product}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Fragment>
        );
    }
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
    onListProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.productsState
});

const mapDispatchToProps = dispatch => ({
    onListProducts: (page, hitsPerPage) =>
        dispatch(doListProducts({ page, hitsPerPage }))
});

const ConnectedProducts = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ConnectedProducts;
