import React, { Fragment } from "react";
import Products from "./Products";
import Pages from "./Pages";

const Landing = () =>
    <Fragment>
        <div className = "landing">
            <Products/>
            <Pages/>
        </div>
    </Fragment>

export default Landing;
