import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Form, Select, Input, Button, InputNumber } from "antd";

import Layout from "common/layout/";
import * as actionCreate from "./store/actionCreate";


import "./index.css"

class ProductDetail extends Component{

    constructor(props) {
        super(props);
        const productId = this.props.match.params.productId
        this.state = {
            productId: productId
        }
    }

    componentDidMount() {
        // 如果有商品id, 就获取商品信息, 并回填
        const productId = this.state.productId
        if (productId) {
            this.props.handleProductDetail(productId)    
        }
    }

    render() {
        const {
            categoryName,
            name,
            description,
            price,
            stock,
            mainImage,
            images,
            detail
        } = this.props;
        // console.log("::::::::", images);
        let imagesList = [];
        if (images) {
            imagesList = images.split(",").map((url, index) => {
                return <li key={index}><img src={url} /></li>
            })
        }
        return (
            <div className="productAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>查看商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="商品分类">
                                <Input value={categoryName} />
                            </Form.Item>
                            <Form.Item label="商品名称">
                                <Input value={name} />
                            </Form.Item>
                            <Form.Item label="商品描述">
                                <Input value={description} />
                            </Form.Item>
                            <Form.Item label="商品价格">
                                <InputNumber value={price} />
                            </Form.Item>
                            <Form.Item label="商品库存">
                                <InputNumber value={stock} />
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                            >
                                <img src={mainImage} className={"mainImage"}/>
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                            >
                                <ul className={"imagesList"}>{imagesList}</ul>
                            </Form.Item>
                            <Form.Item label="商品详情">
                                {/* 将html字符串, 解析成HTML代码*/}
                                <div dangerouslySetInnerHTML={{__html:detail}}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </Layout>
            </div>
        )
    }
}

// 将store中的属性映射到当前组件中
const mapStateToProps = (state) => {

    return {
        categoryName: state.get("product").get("categoryName"),
        name: state.get("product").get("name"),
        description: state.get("product").get("description"),
        price: state.get("product").get("price"),
        stock: state.get("product").get("stock"),
        mainImage: state.get("product").get("mainImage"),
        images: state.get("product").get("images"),
        detail: state.get("product").get("detail")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleProductDetail: (productId) => {
        dispatch(actionCreate.getProductDetailAction(productId))
    }
});
const WrappedApp = Form.create({ name: 'coordinated' })(ProductDetail);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)