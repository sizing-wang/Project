import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"

import AdList from "./list";
import AdSave from "./save"


export default class Ad extends Component{

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/ad" component={AdList}/>
                    <Route path="/ad/save/:adId?" component={AdSave}/>
                </Switch>
            </div>
        )
    }
}