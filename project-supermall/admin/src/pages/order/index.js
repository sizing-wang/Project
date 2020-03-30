import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"

import OrderList from "./list"
import OrderDetail from "./detail"

import "./index.css"

export default class Product extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/order" component={OrderList}/>
                    <Route path="/order/detail/:orderNo" component={OrderDetail}/>
                </Switch>
            </div>
        )
    }
}