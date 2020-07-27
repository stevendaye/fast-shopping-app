import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doListProducts } from "../../actions/products";

class Pages extends Component {
    constructor(props) {
        super(props);

        this.onRequestNewPage = this.onRequestNewPage.bind(this);
    }

    onRequestNewPage(page, hitsPerPage) {
        this.props.onListProducts(page, hitsPerPage);
    }

    render () {
        const { products: { isLoading, page, pages } } = this.props || {};
        const pageNumbers = [];
        if (pages) {
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i);
            }
        }
        
        return (
            <Fragment>
                { !isLoading &&
                    <div className = "pages">
                        <span>&laquo;</span>
                        { pageNumbers.map(number =>
                            <span
                                key = {number}
                                onClick = {() => { this.onRequestNewPage(number, 8) }}
                                className = {(page === number) ? "active-page" : ""}
                                style = {{ backgroundColor: `${page === number ? "#7272722a" : "" }`}}
                            >
                                {number}
                            </span>
                        )}
                        <span>&raquo;</span>
                    </div>

                }
            </Fragment>
        );
    }
}

Pages.propTypes = {
    products: PropTypes.array.isRequired,
    onListProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.productsState
});

const mapDispatchToProps = dispatch => ({
    onListProducts: (page, hitsPerPage) =>
        dispatch(doListProducts({page, hitsPerPage}))
});

const ConnectedPages = connect(mapStateToProps, mapDispatchToProps)(Pages);

export default ConnectedPages;
