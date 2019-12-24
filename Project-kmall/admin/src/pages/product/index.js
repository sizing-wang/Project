import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"

import ProductList from "./list"
import ProductSave from "./save"
import ProductDetail from "./detail"


export default class Category extends Component{

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/product" component={ProductList}/>
                    <Route path="/product/save/:productId?" component={ProductSave}/>
                    <Route path="/product/detail/:productId?" component={ProductDetail}/>
                </Switch>
            </div>
        )
    }
}