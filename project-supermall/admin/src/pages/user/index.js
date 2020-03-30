import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Table } from "antd"
import moment from "moment"
import * as actionCreate from "./store/actionCreate"



import Layout from "common/layout/"
import "./user.css"


class User extends Component{

    constructor (props) {
        super(props)
    }
    componentDidMount() {
        // 发送ajax请求, 处理异步任务
        this.props.handlePages()
    }
    /*
    componentWillUnmount(){
        this.props.handleClearSetTimerOut()
        const timer = this.props.timer
        clearTimeout(timer)
    }
     */

    render() {

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                render: username => <a>{username}</a>
            },
            {
                title: '是否为管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
                render: isAdmin => isAdmin ? "是" : "否"
            },
            {
                title: '电子邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话号码',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '创建时间',
                dataIndex: 'createAt',
                key: 'createAt'
            },
        ];

        const { list, current, pageSize, total, handlePages, isLoading } = this.props;
        const dataSource = list.toJS().map((user) => {
            return {
                key: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                email: user.email,
                phone: user.phone,
                createAt: moment(user.createAt).format("YYYY-MM-DD HH-MM-SS")
            }
        });
        return (
            <div className="user">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="user-content">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                current: current,
                                pageSize: pageSize,
                                total: total
                            }}
                            onChange={(page) => {
                                // console.log(":::::", page);
                                handlePages(page.current)
                            }}
                            loading={{
                                spinning: isLoading,
                                tip: "数据玩命加载中 ... "
                            }}
                        />
                    </div>
                </Layout>
            </div>
        )
    }
}

// 将store中的属性映射到当前组件中
const mapStateToProps = (state) => {
    // console.log("----", state.get("user").get("current"));
    return {
        list: state.get("user").get("list"),
        current: state.get('user').get("current"),
        pageSize: state.get("user").get("pageSize"),
        total: state.get("user").get("total"),
        isLoading: state.get("user").get("isLoading"),
        timer: state.get("user").get("timer")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handlePages: (page) => {
        // 派发action
        dispatch(actionCreate.getPageAction(page))
    },
    handleClearSetTimerOut: () => {
        // 派发action
        dispatch(actionCreate.getClearSetTimerOut())
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(User)