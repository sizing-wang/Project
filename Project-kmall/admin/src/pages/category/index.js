import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"
import CategoryAdd from "./add";
import CategoryList from "./list"

export default class Category extends Component{

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/category" component={CategoryList} />
                    <Route path="/category/add/:categoryId?" component={CategoryAdd} />
                </Switch>
            </div>
        )
    }
}