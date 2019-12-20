import React, { Component } from "react"
import { Layout } from 'antd';

import Header from "../header/index"
import Sider from "../sider/index"
import "./index.css"

const { Content } = Layout;


class AdminLayout extends Component {

    render() {
        return (
            <div className="layout">
                <Layout>
                    <Header />
                    <Layout>
                    <Sider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default AdminLayout