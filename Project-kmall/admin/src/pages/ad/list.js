import React, { Component } from "react";
import { connect } from "react-redux"
import {Breadcrumb, Table, Button, InputNumber, Switch, Divider, Input} from "antd"
import { Link } from "react-router-dom"
import * as actionCreate from "./store/actionCreate"

import Layout from "common/layout/"
import "./index.css"


class AdList extends Component{

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        // 获取商品列表数据
        this.props.handleAdList(1)
    }

    render() {

        const { current, total, pageSize, list, isLoading} = this.props;

        const columns = [
            {
                title: '广告名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '广告缩略图',
                dataIndex: 'image',
                key: 'image',
                render: (image) => {
                    return (
                        <div className={"imgBox"}>
                            <img src={image}/>
                        </div>
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
                                let newOrder = ev.target.value;
                                let id = record._id;
                                this.props.handleAdOrder(id, newOrder)
                            }}
                        />
                    )
                }
            },
            {
                title: '显示/隐藏',
                dataIndex: 'isShow',
                key: 'isShow',
                render: (isShow, record) => {
                    return (
                        <Switch
                            checkedChildren="显示"
                            unCheckedChildren="隐藏"
                            checked={isShow == "0" ? false : true}
                            onChange={(checked) => {
                                let id = record._id;
                                let newIsShow = checked ? "1" : "0";
                                this.props.handleAdIsShow(id, newIsShow)
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
                            <Link to={"/ad/save/" + record._id}>
                                修改
                            </Link>
                        </span>
                    )
                }
            }
        ];
        const dataSource = list.toJS();
        return (
            <div className="adList">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>广告管理</Breadcrumb.Item>
                        <Breadcrumb.Item>广告列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div  className="AdAddBtn">
                        <Link to="/ad/save" className="add-btn">
                            <Button type="primary">
                                新增广告
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
                            onChange={(pagination) => {
                                this.props.handleAdList(pagination.current)
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
    // console.log("----------------", state.get("ad").get("list").toJS());
    return {
        current: state.get("ad").get("current"),
        total: state.get("ad").get("total"),
        pageSize: state.get("ad").get("pageSize"),
        list: state.get("ad").get("list"),
        isLoading: state.get("ad").get("isLoading")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleAdList: (page) => {
        dispatch(actionCreate.getAdImageListAction(page))
    },
    handleAdIsShow: (id, newIsShow) => {
        dispatch(actionCreate.getAdIsShowAction(id, newIsShow))
    },
    handleAdOrder: (id, newOrder) => {
        dispatch(actionCreate.getAdOrderAction(id, newOrder))
    }

});
export default connect (mapStateToProps, mapDispatchToProps)(AdList)