import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"

import ProductList from "./list"
import ProductSave from "./save"


export default class Category extends Component{

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/product" component={ProductList}/>
                    <Route path="/product/save/:productId?" component={ProductSave}/>
                </Switch>
            </div>
        )
    }
}