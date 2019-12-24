import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Table, Button, InputNumber, Switch, Divider } from "antd"
import { Link } from "react-router-dom"
import * as actionCreate from "./store/actionCreate"


import Layout from "common/layout/"
import "./index.css"


class ProductList extends Component{

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        // 获取商品列表数据
        this.props.handleProductsList()
    }

    render() {

        const {
            list,
            current,
            pageSize,
            total,
            isLoading
        } = this.props;

        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '是否首页显示',
                dataIndex: 'isShow',
                key: 'isShow',
                render: (isShow, record) => {
                    return (
                        <Switch
                            checkedChildren="显示"
                            unCheckedChildren="隐藏"
                            checked={isShow == "0" ? false : true}
                            onChange={(checked) => {
                                const newIsShow = checked ? "1" : "0"
                                const id = record._id
                                this.props.handleIsShowProduct(id, newIsShow)
                            }}
                        />
                    )
                }
            },
            {
                title: '是否上架',
                dataIndex: 'status',
                key: 'status',
                render: (status, record) => {
                    return (
                        <Switch
                            checkedChildren="上架"
                            unCheckedChildren="下架"
                            checked={status == "0" ? false : true}
                            onChange={(checked) => {
                                const newStatus = checked ? "1" : "0"
                                const id = record._id
                                this.props.handleIsStatusProduct(id, newStatus)
                            }}
                        />
                    )
                }
            },
            {
                title: '是否热卖',
                dataIndex: 'isHot',
                key: 'isHot',
                render: (isHot, record) => {
                    return (
                        <Switch
                            checkedChildren="是"
                            unCheckedChildren="否"
                            checked={isHot == "0" ? false : true}
                            onChange={(checked) => {
                                const newIsHot = checked ? "1" : "0"
                                const id = record._id
                                this.props.handleIsHotProduct(id, newIsHot)
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
                            defaultValue={order}
                            onBlur={(ev) => {
                                const newOrder = ev.target.value
                                const id = record._id
                                if (order !== newOrder) {
                                    this.props.handleIsOrderProduct(id, newOrder)
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
                            <Link to={"/product/save/" + record._id}>编辑</Link>
                            <Divider type="vertical" />
                            <Link to={"/product/detail/" + record._id}>查看</Link>
                        </span>
                    )
                }
            }
        ];
        // console.log(":::::::::", list.toJS());
        const dataSource = list.toJS();
        return (
            <div className="productList">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div  className="productAddBtn">
                        <Link to="/product/save" className="add-btn">
                            <Button type="primary">
                                新增商品
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
                                this.props.handleProductsList(page.current)
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
    // console.log("------", state.get("product").toJS());
    return {
        list: state.get("product").get("list"),
        current: state.get("product").get("current"),
        pageSize: state.get("product").get("pageSize"),
        total: state.get("product").get("total"),
        isLoading: state.get("product").get("isLoading")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleProductsList: (page) => {
        // 获取商品列表, 派发action
        dispatch(actionCreate.getProductsListAction(page))
    },
    handleIsShowProduct: (id, newShow) => {
        dispatch(actionCreate.getIsShowProduct(id, newShow))
    },
    handleIsStatusProduct: (id, newStatus) => {
        dispatch(actionCreate.getIsStatusAction(id, newStatus))
    },
    handleIsHotProduct: (id, newIsHot) => {
        dispatch(actionCreate.getIsHotAction(id, newIsHot))
    },
    handleIsOrderProduct: (id, newOrder) => {
        dispatch(actionCreate.getIsOrderAction(id, newOrder))
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(ProductList)