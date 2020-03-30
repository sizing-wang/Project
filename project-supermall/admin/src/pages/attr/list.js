import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Table, Button, Input, InputNumber, Switch } from "antd"
import { Link } from "react-router-dom"
import * as actionCreate from "./store/actionCreate"

import Layout from "common/layout/"
import "./index.css"


class AttrList extends Component{

    constructor (props) {
        super(props);
    }
    componentDidMount() {
        // 派发action, 获取属性数据, 显示属性列表
        this.props.handleGetAttrs()
    }

    render() {

        const columns = [
            {
                title: '属性名称',
                dataIndex: 'name',
                key: 'name',
                width: "25%"
            },
            {
                title: '属性键',
                dataIndex: 'key',
                key: 'key',
                width: "25%"
            },
            {
                title: '属性值',
                dataIndex: 'value',
                key: 'value',
                width: "20%"
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                width: "20%",
                render: (order, record) => {
                    return (
                        <InputNumber
                            style={{width: "30%"}}
                            defaultValue={order} // 默认排序数值
                            onBlur={(ev) => { // 监听失去焦点进行排序事件
                                // console.log(ev.target.value);
                                const newOrder = ev.target.value
                                const id = record._id
                                if (order != newOrder) {
                                    // 派发action, 进行商品属性排序
                                    this.props.handleAttrOrder(newOrder, id)
                                }
                                
                            }}
                        />
                    )
                }
            },
            {
                title: '操作',
                width: "10%",
                render: (record) => {
                    return (
                        <span>
                            <Link to={"/attr/add/" + record._id}>修改</Link>
                        </span>
                    )
                }
            }
        ];
        
        const { 
            isLoading,
            current,
            total,
            pageSize,
            list
        } = this.props;

        const dataSource = list.toJS();
        return (
            <div className="attrList">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>属性管理</Breadcrumb.Item>
                        <Breadcrumb.Item>属性列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div  className="attrAddBtn">
                        <Link to="/attr/add" className="add-btn">
                            <Button type="primary">
                                新增属性
                            </Button>
                        </Link>
                    </div>
                    <div className="user-content">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            rowKey="_id"
                            pagination={{
                                current: current,
                                total: total,
                                pageSize: pageSize
                            }}
                            onChange={(page) => {
                                // console.log("--------", page);
                                // 获取当前点击的当前页, 派发action, 获取点击的页面数据列表
                                this.props.handleGetAttrs(page.current)
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
    // console.log("----", state.get("attr").get("current"));
    return {
        isLoading: state.get("attr").get("isLoading"),
        current: state.get("attr").get("current"),
        total: state.get("attr").get("total"),
        pageSize: state.get("attr").get("pageSize"),
        list: state.get("attr").get("list")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleGetAttrs: (page) => {
        // 派发action, 获取属性数据
        dispatch(actionCreate.handleGetAttrsAction(page))
    },
    handleAttrOrder: (newOrder, id) => {
        // 派发action, 更新属性排序
        dispatch(actionCreate.handleAttrOrderAction(newOrder, id))
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(AttrList)