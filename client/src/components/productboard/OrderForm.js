import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Notifications from "../layouts/Notifications";

const OrderForm = (
    {   type, user, lookingup, notifications,
        userInput: { name, userID, address, phoneNumber, email },
        onChange, onCheckUser, onLookup
    }) =>
    <Fragment>
        <div className = "customer-info">
            <div className = "medium font-bold text-emphasize">
                Customer Information
            </div>
            <div className = "user type small my">
                Are You? &nbsp;&nbsp;
                <span>
                    <input
                        id = "new-customer"
                        type = "radio"
                        name = "type"
                        value = "NEW"
                        onChange = {onChange}
                    />
                    <label htmlFor = "new-customer"> New Customer </label>
                </span>
                &nbsp;&nbsp;
                <span>
                    <input
                        id = "existing-customer"
                        type = "radio"
                        name = "type"
                        value = "OLD"
                        onChange = {onChange}
                    />
                    <label htmlFor = "new-customer"> Existing Customer </label>
                </span>
            </div>
            <Notifications/>

            { type === "OLD"
                ? (
                    <div className = "lookup-block">
                        {
                            user
                            ? (
                                <div className = "old-user-info">
                                    <div className = "medium">
                                        Welcome back, {user.full_name}
                                    </div>
                                    <div className = "muted">
                                        <p>ID: {user.user_id}</p>
                                        <p>Address: {user.address}</p>
                                        <p>Phone Number: {user.phone_number}</p>
                                        <p>Email: {user.email}</p>
                                    </div>
                                    <div
                                        className = "lookup-again small text-emphasize"
                                        onClick = {onLookup}
                                    >
                                        Not {user.full_name}? Lookup again
                                    </div>
                                </div>
                            ) : (
                                <div className = "old-user-form" >
                                    <label htmlFor = "old-email"> Email* </label>
                                    <input
                                        id = "old-email"
                                        type = "email"
                                        name = "email"
                                        value = {email}
                                        pattern = "^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$"
                                        onChange = {onChange}
                                        required
                                    />
                                    <div className = "clear"></div>
                                    <Button
                                        className = {
                                            lookingup && Object.keys(notifications).length === 0
                                            ? "btn btn-default-dim"
                                            : "btn btn-default"
                                        }
                                        onClick = {onCheckUser}
                                    >
                                        {
                                            lookingup && Object.keys(notifications).length === 0
                                            ? "Looking up..."
                                            : "Lookup"
                                        }
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                )
                : (
                    <div className = "form-new-user">
                        <form className ="form-user">
                            <div className = "form-group">
                                <label htmlFor = "full-name"> Full Name* </label>
                                <input
                                    id = "full-name"
                                    type = "text"
                                    name = "name"
                                    value = {name}
                                    onChange = {onChange}
                                    required
                                />
                                <div className = "clear"></div>
                            </div>

                            <div className = "form-group">
                                <label htmlFor = "user-id"> ID* </label>
                                <input
                                    id = "user-id"
                                    type = "text"
                                    name = "userID"
                                    value = {userID}
                                    onChange = {onChange}
                                    disabled
                                    required
                                />
                                <div className = "clear"></div>
                            </div>

                            <div className = "form-group">
                                <label htmlFor = "address"> Address* </label>
                                <textarea
                                    id = "adrress"
                                    cols = "20"
                                    rows = "5"
                                    maxLength = "100"
                                    name = "address"
                                    value = {address}
                                    onChange = {onChange}
                                    required
                                >
                                </textarea>
                                <div className = "clear"></div>
                            </div>

                            <div className = "form-group">
                                <label htmlFor = "phone-number"> Phone Number </label>
                                <input
                                    id = "phone-number"
                                    type = "tel"
                                    name = "phoneNumber"
                                    pattern = "[0-9]{4}-[0-9]{3}-[0-9]{3}"
                                    value = {phoneNumber}
                                    onChange = {onChange}
                                />
                                <div className = "clear"></div>
                            </div>

                            <div className = "form-group">
                                <label htmlFor = "new-email"> Email* </label>
                                <input
                                    id = "new-email"
                                    type = "email"
                                    name = "email"
                                    value = {email}
                                    pattern = "^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$"
                                    onChange = {onChange}
                                    required
                                />
                                <div className = "clear"></div>
                            </div>
                        </form>
                    </div>
                )
            } 
        </div>
    </Fragment>

OrderForm.propTypes = {
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onCheckUser: PropTypes.func.isRequired,
    onLookup: PropTypes.func.isRequired
};

export default OrderForm;
