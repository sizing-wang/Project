import React, { Component } from "react"
import { Layout, Menu, Dropdown, Icon } from 'antd';
import axios from "axios"
import api from "api"

import { getUsername, removeUsername } from "util/index"
import "./index.css"

const { Header } = Layout;

class AdminHeader extends Component {

    handleLogout () {
        // 用户退出
        api.logout()
            .then(result => {
                const data = result.data;
                if (data.code === 0) {
                    // 清除用户信息
                    removeUsername();
                    // 返回登录页面
                    window.location.href = "/login";
                }
            })
            .catch(err => {
                console.log(err);
            })

        /*
        axios({
            method: "delete",
            url: "http://127.0.0.1:3000/sessions/users"
        })
            .then(result => {
                const data = result.data;
                if (data.code === 0) {
                    // 清除用户信息
                    removeUsername();
                    // 返回登录页面
                    window.location.href = "/login";
                }
            })
            .catch(err => {
                console.log(err);
            })
         */

    }

    render() {
        const menu = ( // 导航栏退出下拉按钮
            <Menu>
                <Menu.Item key="0" onClick={this.handleLogout}>
                    <Icon type="logout" />退出
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="AdminHeader">
                <Header className="header">
                    <div className="logo">
                        KMALL <span className="name">后台管理系统</span>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link header_dropDown" href="#">
                            {getUsername()} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
            </div>
        )
    }
}

export default AdminHeader