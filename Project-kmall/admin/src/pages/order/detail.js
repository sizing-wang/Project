import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Form, Select, Input, Button, InputNumber } from "antd";
import moment from "moment"

import Layout from "common/layout/";
import * as actionCreate from "./store/actionCreate";

class OrderDetail extends Component{

    constructor(props) {
        super(props);
        const orderNo = this.props.match.params.orderNo
        this.state = {
            orderNo: orderNo
        }
    }

    componentDidMount() {
        // 获取订单详情数据
        const { orderNo } = this.state
        this.props.handleOrderDetails(orderNo)
    }

    render() {
        const { orderDetail } = this.props
        console.log("::::::::::", orderDetail);
        for (let orderDet in orderDetail) {
            if (orderDet == "createdAt") {
                orderDetail.createdAt = moment(orderDetail.createdAt).format("YYYY-MM-DD HH-MM-SS")
            }
        }
        if (orderDetail.shipping) {
            return (
                <div className="orderDetail">
                    <Layout>
                        <Breadcrumb style={{ margin: "16px 0"}}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                            <Breadcrumb.Item>订单详情</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="detailContent">
    
                            <div className="panel">
                                <h2 className="panel-header">订单信息</h2>
                                <div className="pandel-body">
                                    <ul className="order-info">
                                        <li className="order-no">
                                            <span className="lable">订单号:</span>
                                            <span className="text"> {orderDetail.orderNo}</span>
                                        </li>
                                        <li className="order-create-time">
                                            <span className="lable">创建时间:</span>
                                            <span className="text"> {orderDetail.createdAt}</span>
                                        </li>
                                        <li className="order-shipping-name">
                                            <span className="lable">收件人:</span>
                                            <span className="text"> {orderDetail.shipping.name} </span>
                                        </li>
                                        <li className="order-shipping-address">
                                            <span className="lable">收件地址:</span>
                                            <span className="text"> {orderDetail.shipping.province} {orderDetail.shipping.city} {orderDetail.shipping.address} (邮编: {orderDetail.shipping.zip})</span>
                                        </li>
                                        <li className="order-status">
                                            <span className="lable">订单状态:</span>
                                            <span className="text"> {orderDetail.statusDesc}</span>
                                        </li>
                                        <li className="order-payment">
                                            <span className="lable">订单金额:</span>
                                            <span className="text"> ￥{orderDetail.payment}</span>
                                        </li>
                                        <li className="order-payment-type">
                                            <span className="lable">支付方式:</span>
                                            <span className="text"> {orderDetail.paymentTypeDesc}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="panel">
                                <h2 className="panel-header">商品列表</h2>
                                <div className="pandel-body">
                                    <ul className="product-title clearfix">
                                        <li className="product-info">
                                        商品
                                        </li>
                                        <li className="product-price">
                                            单价
                                        </li>
                                        <li className="product-count">
                                            数量
                                        </li>
                                        <li className="product-totalPrice">
                                            小计
                                        </li>
                                    </ul>
                                    {orderDetail.productList.map((product, index) => {
                                        return (
                                            <ul className="product-item" key={index}> 
                                                <li className="product-info text-ellipsis">
                                                    <a href="./detail.html?productId=" className="link" target="_blank">
                                                        <img src={product.mainImage} alt={product.name} />
                                                        <span> {product.name}</span>
                                                    </a>
                                                </li>
                                                <li className="product-price">
                                                    ￥{product.price}
                                                </li>
                                                <li className="product-count">
                                                    {product.count}
                                                </li>
                                                <li className="product-totalPrice">
                                                    ￥{product.totalPrice}
                                                </li>
                                            </ul>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Layout>
                </div>
            )
        } else {
            return null
        }
        
    }
}

// 将store中的属性映射到当前组件中
const mapStateToProps = (state) => {
    // console.log("---------", state.get("order").get("orderDetail"));
    return {
        orderDetail: state.get("order").get("orderDetail")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleOrderDetails: (orderNo) => {
        // 派发action 获取订单详情数据
        dispatch(actionCreate.handleOrderDetailsAction(orderNo))
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(OrderDetail)