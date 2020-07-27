import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "./Button";
import { doAddToCart } from "../../actions/cart";

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productTitle: ""
        };

        this.onAddProduct = this.onAddProduct.bind(this);
    }

    componentDidMount() {
        if (this.props.product) {
            const { title } = this.props.product;
            
            import(`../../assets/vendor/local/products/${title}.jpg`)
            .then(module => this.setState({
                productTitle: module.default
            }));
        }
    }

    onAddProduct(product) {
        this.props.onAddToCart(product);
    }

    render() {
        const { product_id, name, description, unit_price, categories } = this.props.product || {};
        const { products } = this.props; 
        const { productTitle } = this.state;
        const product_categories = (categories || []).map(category =>
                category.category_name
        );
        const search = products.filter(product => product.product_id === product_id);

        return (
            <Fragment>
                { this.props.product &&
                    <div className = "title product">
                        <div>
                            <img
                                alt = "Product"
                                src = { productTitle }
                            />
                        </div>
                        <div className = "product-details">
                            <span className = "name">
                                {name}
                            </span>
                            <p className = "category">
                                { product_categories.join(", ") }
                            </p>
                            <p className = "desc">
                                {description}
                            </p>
                            <Button
                                className = { search.length > 0 ? "btn btn-dim" : "btn btn-primary"}
                                children = { search.length > 0 ? "Added in Cart" : "Add to Cart" }
                                onClick = {() => {
                                    search.length === 0 &&
                                    this.onAddProduct(this.props.product)
                                }}
                            />
                            <div className = "price pull-right">
                                {unit_price.toLocaleString('en-US', {style:'currency', currency:'USD'})}
                            </div>
                            <div className = "clear"></div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.cartState.products
});

const mapDispatchToProps = dispatch => ({
    onAddToCart: product =>
        dispatch(doAddToCart(product))
});

const ConnectedProduct = connect(mapStateToProps, mapDispatchToProps)(Product);

export default ConnectedProduct;
