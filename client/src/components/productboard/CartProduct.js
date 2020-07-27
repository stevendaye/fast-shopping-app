import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { doRemoveFromCart, doSetQuantity } from "../../actions/cart";

const options = [
    {value: 1, label: "1"},
    {value: 2, label: "2"},
    {value: 3, label: "3"},
    {value: 4, label: "4"}
];

class CartProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            productTitle: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onRemoveProduct= this.onRemoveProduct.bind(this);
    }

    componentDidMount() {
        const { title, product_id } = this.props.product;
            
        import(`../../assets/vendor/local/products/${title}.jpg`)
        .then(module => this.setState({
            productTitle: module.default
        }));
        this.props.onSetQuantity(product_id, 1);
    }

    onChange(e, productId) {
        this.setState({ quantity: e.value });
        this.props.onSetQuantity(productId, e.value);
    }

    onRemoveProduct(productId, unitPrice) {
        const { quantity } = this.state;
        this.props.onRemoveFromCart(productId);
        this.props.onSubstractSubtotal(unitPrice * quantity);
    }

    render() {
        const { product: { product_id, name, unit_price, categories } } = this.props;
        const { quantity, productTitle } = this.state;

        return (
            <Fragment>
                <div className = "cart-product">
                    <img
                        alt = "Product"
                        src = {productTitle}
                        className = "cart-product-image"
                    />

                    <div className = "name-category">
                        <span className = "name cart-name"> {name} </span>
                        <div className = "clear"></div>
                        <p className = "category pull-left cart-category">
                            { 
                                categories.map(category =>
                                    category.category_name
                                ).join(", ")
                            }
                        </p>
                        <div className = "clear"></div>
                        
                    </div>

                    <div className = "btn-remove">
                        <i
                            className = "fa fa-trash trash"
                            aria-hidden = "true"
                            onClick = {() => {this.onRemoveProduct(product_id, unit_price)}}
                        ></i>
                    </div>

                    <div className = "unit-price cart-unit">
                        <p> Unit <span className = "unit-text">Price</span> </p>
                        <p className = "price">
                            {unit_price.toLocaleString('en-US', {style:'currency', currency:'USD'})}
                        </p>
                    </div>

                    <div className = "quantity">
                        <label htmlFor = "number-options" className = "d-block cart-qty-text">Qty</label>
                        <Select
                            name = "number"
                            id = "number-options"
                            placeholder = "1"
                            value = {quantity.value}
                            onChange = {e => { this.onChange(e, product_id) }}
                            options = {options}
                            className = "number-select cart-select"
                        />
                    </div>

                    <div className = "price cart-price"> {
                        (unit_price * quantity).toLocaleString('en-US', {style:'currency', currency:'USD'})
                    } </div>
                </div>
            </Fragment>
        );
    }
}

CartProduct.propTypes = {
    product: PropTypes.object.isRequired,
    onSubstractSubtotal: PropTypes.func.isRequired,
    onSetQuantity: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    onRemoveFromCart: productId =>
        dispatch(doRemoveFromCart(productId)),
    onSetQuantity: (productId, quantity) =>
        dispatch(doSetQuantity({productId, quantity}))
});

const ConnectedCartProduct = connect(null, mapDispatchToProps)(CartProduct);

export default ConnectedCartProduct;
