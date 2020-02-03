import React, { Component } from "react";
import { connect } from "react-redux"
import {Breadcrumb, Table, Button, InputNumber, Switch, Divider, Input} from "antd"
import { Link } from "react-router-dom"
import * as actionCreate from "./store/actionCreate"
import moment from "moment"
const { Search } = Input

import Layout from "common/layout/"


class OrderList extends Component{

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        // 发送请求, 加载订单列表数据
        this.props.handleOrderList(1)
    }

    render() {

        let { isLoading, current, pageSize, total, list } = this.props

        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderNo',
                key: 'orderNo'
            },
            {
                title: '收件人',
                dataIndex: 'shipping.name',
                key: 'shipping.name'
            },
            {
                title: '订单状态',
                dataIndex: 'statusDesc',
                key: 'statusDesc'
            },
            {
                title: '订单金额',
                dataIndex: 'payment',
                key: 'payment',
                render: (payment) => {
                    return "￥" + payment
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt'
            },
            {
                title: "操作",
                render: (record) => {
                    return (
                        <span>
                            <Link to={"/order/detail/" + record.orderNo}>查看</Link>
                        </span>
                    )
                }
            }
        ];

        
        let orders = list.toJS()
        // 处理时间格式
        if (orders.length > 0) {
            orders.forEach((order, index) => {
                order.createdAt = moment(order.createdAt).format("YYYY-MM-DD HH-MM-SS")
            });
        }
        const dataSource = orders
        return (
            <div className="orderList">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                        <Breadcrumb.Item>订单列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div  className="orderAddBtn">
                        <Search
                            placeholder="请输入关键字"
                            onSearch={
                                value => {

                                }
                            }
                            enterButton
                            style={{width: "400px"}}
                        />
                    </div>
                    <div className="user-content">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            rowKey="_id"
                            pagination={{
                                current: current,
                                pageSize: pageSize,
                                total: total
                            }}
                            onChange={(page) => {
                                // 点击分页器, 获取对应页面数据
                                this.props.handleOrderList(page.current)
                            }}
                            loading={{
                                spinning: isLoading,
                                tip: "数据正在加载中 ... "
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
    // console.log(state.get("order").get("list").toJS());
    return {
        current: state.get("order").get("current"),
        pageSize: state.get("order").get("pageSize"),
        total: state.get("order").get("total"),
        list: state.get("order").get("list"),
        isLoading: state.get("order").get("isLoading")
    }
};
// 定义方法, 派发action, 处理数据
const mapDispatchToProps = (dispatch) => ({
    handleOrderList: (page) => {
        // 派发action, 处理订单列表数据
        dispatch(actionCreate.getOrderListAction(page))
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(OrderList)