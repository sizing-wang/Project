import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Table, Button, Input, InputNumber, Switch } from "antd"
import { Link } from "react-router-dom"
import * as actionCreate from "./store/actionCreate"

import Layout from "common/layout/"
import "./index.css"


class CategoryList extends Component{

    constructor (props) {
        super(props);
    }
    componentDidMount() {
        // 发送ajax请求, 处理异步任务
        this.props.handlePages()
    }
    /*
    componentWillUnmount(){
        // 清除定时器
        this.props.handleClearSetTimerOut()
        const timer = this.props.timer
        clearTimeout(timer)
    }
    */

    render() {

        const {
            list,
            current,
            pageSize,
            total,
            handlePages,
            isLoading
        } = this.props;

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                width: "40%",
                render: (name, record) => {
                    return (
                        <Input
                            style={{width: "60%"}}
                            defaultValue={name}
                            onBlur={(ev) => {
                                // console.log(record);
                                const id = record._id;
                                const newName = ev.target.value;
                                if (name !== newName) {
                                    // 派发action更改数据
                                    this.props.handleUpdateAction(id, newName)
                                }
                            }}
                        />
                    )
                }
            },
            {
                title: '手机分类名称',
                dataIndex: 'mobileName',
                key: 'mobileName',
                width: "30%",
                render: (mobileName, record) => {
                    return (
                        <Input
                            style={{width: "30%"}}
                            defaultValue={mobileName}
                            onBlur={(ev) => {
                                // console.log(record);
                                const id = record._id;
                                const newMobileName = ev.target.value;
                                if (mobileName !== newMobileName) {
                                    // 派发action更改数据
                                    this.props.handleUpdateMobileNameAction(id, newMobileName)
                                }
                            }}
                        />
                    )
                }
            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
                render: (isShow, record) => {
                    return (
                        <Switch
                            checkedChildren="显示"
                            unCheckedChildren="隐藏"
                            checked={isShow == "0" ? false : true}
                            onChange={(checked) => {
                                const newIsShow = checked ? "1" : "0";
                                const id = record._id;
                                this.props.handleIsShowAction(id, newIsShow)
                            }}
                        />
                    )
                }
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render: (order, record) => {
                    return (
                        <InputNumber
                            style={{width: "30%"}}
                            defaultValue={order}
                            onBlur={(ev) => {
                                const id = record._id;
                                let newOrder = ev.target.value;
                                if (order !== newOrder) {
                                    // 派发action更改数据
                                    this.props.handleUpdateOrderAction(id, newOrder)
                                }
                            }}
                        />
                    )
                }
            }
        ];


        // console.log(":::::::", list.toJS());
        const dataSource = list.toJS();
        return (
            <div className="categoryList">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div  className="categoryAddBtn">
                        <Link to="/category/add" className="add-btn">
                            <Button type="primary">
                                新增分类
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
        list: state.get("category").get("list"),
        current: state.get('category').get("current"),
        pageSize: state.get("category").get("pageSize"),
        total: state.get("category").get("total"),
        isLoading: state.get("category").get("isLoading"),
        timer: state.get("category").get("timer")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handlePages: (page) => {
        // 派发action
        dispatch(actionCreate.getPageAction(page))
    },
    handleUpdateAction: (id, newName) => {
        // 派发action
        dispatch(actionCreate.getUpdateAction(id, newName))
    },
    handleUpdateMobileNameAction: (id, newMobileName) => {
        // 派发action
        dispatch(actionCreate.UpdateMobileNameAction(id, newMobileName))
    },
    handleUpdateOrderAction: (id, newOrder) => {
        // 派发action
        dispatch(actionCreate.UpdateOrderAction(id, newOrder))
    },
    handleIsShowAction: (id, newIsShow) => {
        // 派发action
        dispatch(actionCreate.UpdateIsShowAction(id, newIsShow))
    },
    handleClearSetTimerOut: () => {
        // 派发action
        dispatch(actionCreate.getClearSetTimerOut())
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(CategoryList)