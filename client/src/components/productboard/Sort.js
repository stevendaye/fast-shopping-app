import React, { Fragment, PureComponent } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const options = [
    {value: "ALPHA", label: "Alpha Order"},
    {value: "PRICE", label: "Lowest Price"},
    {value: "DATE", label: "Most Recent"},
];

class Sort extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            key: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(key) {
        this.setState({ key: key.value });
        this.props.onSort(key.value);
    }

    render() {
        const { key } = this.state;

        return (
            <Fragment>
                <div className = "sort fs pull-right">
                    <label htmlFor = "sort-options medium">Sort By:</label>
                    <Select
                        id = "sort-options"
                        placeholder = "Alpha Order"
                        value = {key.value}
                        onChange = {this.onChange}
                        options = {options}
                        className = "sortby"
                    />
                </div>
                <div className = "clear"></div>
            </Fragment>
        );
    }
}

Sort.propTypes = {
    onSort: PropTypes.func.isRequired,
    sortKey: PropTypes.string
};

export default Sort;
