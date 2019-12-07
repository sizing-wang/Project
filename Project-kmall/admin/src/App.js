import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"

import TodoList from "./pages/todoList/index"
import "./index.css"


class Home extends Component {

    render() {
        return (
            <h2>this is home page ... </h2>
        )
    }
}
/*
class TodoList extends Component {

    render() {
        return (
            <h2>this is TodoList page ... </h2>
        )
    }
}
 */

class About extends Component {

    render() {
        return (
            <h2>this is About page ... </h2>
        )
    }
}
class User extends Component {

    render() {
        return (
            <h2>this is user page userId is {this.props.match.params.id} </h2>
        )
    }
}

class Admin extends Component {


    render() {

        return (
            <Switch>
                <Route exact path="/admin" render={(props)=>(<h2>this is admin page </h2>)} />
                <Route path="/admin/active" render={(props)=>(<h2>this is AdminActive page </h2>)} />
                <Route path="/admin/:id" render={(props)=>(<h2>this is Admin page, the id is {props.match.params.id} </h2>)} />

            </Switch>
        )
    }
}




class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: true
        }
    }

    render() {
        const ProtectRoute = ({component:Component, ...rest}) => {
            // console.log(rest);
            return <Route
                {...rest}
                render={(props) => {
                    return this.state.isAdmin ? <Component {...props} /> : <h2>登录后, 再访问</h2>
                }}
            />
        };


        return (
            <Router>
                <div className='App'>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/todoList">TodoList</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/user/123456">User</Link>
                            </li>
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                            <li>
                                <Link to="/admin/123">Admin123</Link>
                            </li>
                            <li>
                                <Link to="/admin/active">AdminActive</Link>
                            </li>
                        </ul>
                        { /* 可切换的路由组件 */ }
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/todoList' component={TodoList} />
                            <Route path='/about' component={About} />
                            <Route path='/user/:id' component={User} />
                            <ProtectRoute path='/admin' component={Admin} />

                        </Switch>
                    </nav>

                </div>
            </Router>
        )
    }
}

export default App