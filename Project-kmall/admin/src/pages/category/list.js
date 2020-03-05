import React, { Component } from "react";
import { connect } from "react-redux"
import {Breadcrumb, Table, Button, Input, InputNumber, Switch, Divider} from "antd"
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
                width: "200px",
                render: (name, record) => {
                    return (
                        <Input
                            style={{width: "50%"}}
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
                width: "200px",
                render: (mobileName, record) => {
                    return (
                        <Input
                            style={{width: "50%"}}
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
                title: '手机图标',
                dataIndex: '0',
                key: '0',
                render: (icons, record) => {
                    // console.log("-----------", record)
                    return <img className="mobileImage" src={record.icon} alt=""/>
                }
            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
                // width: "20%",
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
                title: '是否为楼层',
                dataIndex: 'isFloor',
                key: 'isFloor',
                render: (isFloor, record) => {
                    return (
                        <Switch
                            checkedChildren="是"
                            unCheckedChildren="否"
                            checked={isFloor == "0" ? false : true}
                            onChange={(checked) => {
                                const newIsFloor = checked ? "1" : "0";
                                const id = record._id;
                                this.props.handleIsFloorAction(id, newIsFloor)
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
                            // style={{width: "30%"}}
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
            },
            {
                title: "操作",
                render: (record) => {
                    return (
                        <span>
                            <Link to={"/category/add/" + record._id}>编辑</Link>
                        </span>
                    )
                }
            }
        ];

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
        isLoading: state.get("category").get("isLoading")
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
    handleIsFloorAction: (id, newIsFloor) => {
        // 派发action
        dispatch(actionCreate.UpDateIsFloorAction(id, newIsFloor))
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(CategoryList)