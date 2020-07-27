import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const OrderTable = ({ products }) =>
    <Fragment>
        <div className = "order-summary">
            <div className = "medium font-bold text-emphasize">
                Order Summary
            </div>
            <div className = "table table-order">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Units</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>

                    <tbody id="table-body">
                        { products.map(product =>
                            <tr key = { product.product_id }>
                                <td> { product.name } </td>
                                <td> { (product.unit_price).toLocaleString() } </td>
                                <td> { product.quantity } </td>
                                <td> { (product.unit_price * product.quantity).toLocaleString() } </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </Fragment>

OrderTable.propTypes = {
    products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    products: state.cartState.products
});

const ConnectedOrderTable = connect(mapStateToProps)(OrderTable);

export default ConnectedOrderTable;
