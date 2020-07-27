import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Button = ({ className, type = "button", onClick, children }) =>
    <Fragment>
        <button
            type = {type}
            className = {className}
            onClick = {onClick}
        >
            {children}
        </button>
    </Fragment>

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    type: PropTypes.string
};

Button.defaultProps = {
    className: "btn"
};

export default Button;
