import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

// 配置了文件别名
import LoginForm from "pages/login/index"
import Home from "pages/home/index"
import User from "pages/user/index"
import Category from "pages/category/index"
import Product from "pages/product/index"
import Ad from "pages/ad/index"
import Order from "pages/order/index"


import { getUsername } from "util/index"
import Err from "./common/err/index"
import "./index.css"


class App extends Component {

    render() {
        // 自定义路由
        const HomeRoute = ({component:Component, ...rest}) => {
            return <Route
                {...rest}
                render = {(props) => {
                    return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
                }}
            />
        };
        const LoginRoute = ({component:Component, ...rest}) => {
            return <Route
                {...rest}
                render = {(props) => {
                    return getUsername() ? <Redirect to="/" /> : <Component {...props}/>
                 }}
            />
        };
        return (
            <Router forceRefresh={true}>
                <div className='App'>
                    <Switch>
                        <HomeRoute exact path="/" component={Home} />
                        <HomeRoute path="/user" component={User} />
                        <HomeRoute path="/category" component={Category} />
                        <HomeRoute path="/product" component={Product} />
                        <HomeRoute path="/ad" component={Ad} />
                        <HomeRoute path="/order" component={Order} />
                        <LoginRoute path="/login" component={LoginForm} />
                        <Route component={Err} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App