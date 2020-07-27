import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../productboard/Button";

const _404 = () =>
    <Fragment>
        <div className = "not-found text-center">
            <i className = "fa fa-2x fa-exclamation-circle" aria-hidden = "true"></i>
            <h1 className = "medium">
                PAGE NOT FOUND
            </h1>
            <p className = "small">
                We are sorry, we are afraid the link you have followed is no more here, does not
                exist or is broken. Come back later. Thanks
            </p>
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
    </Fragment>

export default _404;
