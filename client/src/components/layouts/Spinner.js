import React, { Fragment } from "react";

const Spinner = () =>
    <Fragment>
        <div className = "spinner">
            <i className = "fa-1x fa fa-circle-o-notch fa-spin"></i>&nbsp;
            <span> Loading Products... </span>
        </div>
    </Fragment>

export default Spinner;
