import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"
import AttrAdd from "./add";
import AttrList from "./list"

export default class Attr extends Component{

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/attr" component={AttrList} />
                    <Route path="/attr/add/:attrId?" component={AttrAdd} />
                </Switch>
            </div>
        )
    }
}