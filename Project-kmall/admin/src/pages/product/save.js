import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Form, Select, Input, Button, InputNumber } from "antd";

import Layout from "common/layout/";
import * as actionCreate from "./store/actionCreate";
import RichEditor from "../../common/rich-editor/index"
import UpLoadImage from "common/upLoad-image/"
import { UPLOADPATH } from "../../api/config"
import "./index.css"


const { Option } = Select;

class ProductSave extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        const productId = this.props.match.params.productId
        this.state = {
            productId: productId
        }
    }

    componentDidMount() {
        // 分类数据的回填
        this.props.handleLevelCategories()
        // 商品信息的回填
        const productId = this.state.productId
        this.props.handleProductDetail(productId)
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            /*
            if (!err) {
                // console.log('-----------', values);
                this.props.handleSaveProduct(values)
            }
             */
            this.props.handleSaveProduct(values)
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            categories,
            mainImageErr,
            mainHelp,
            imagesErr,
            imagesHelp,
            category,
            name,
            description,
            price,
            stock,
            mainImage,
            images,
            detail
        } = this.props;
        return (
            <div className="productAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="商品分类">
                                {getFieldDecorator('category', {
                                    rules: [{ required: true, message: '请选择商品分类!' }],
                                    initialValue: category.name
                                })(
                                    <Select
                                        placeholder="请选择商品分类!"
                                    >
                                        {
                                            categories.toJS().map((category) => {
                                                return (
                                                    <Option
                                                        key={category._id}
                                                        value={category._id}
                                                    >
                                                        {category.name}
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="商品名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入商品名称!' }],
                                    initialValue: name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="商品描述">
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: '请输入商品描述!' }],
                                    initialValue: description
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="商品价格">
                                {getFieldDecorator('price', {
                                    rules: [{ required: true, message: '请输入商品价格!' }],
                                    initialValue: price
                                })(<InputNumber min={0} />)}
                            </Form.Item>
                            <Form.Item label="商品库存">
                                {getFieldDecorator('stock', {
                                    rules: [{ required: true, message: '请输入商品库存!' }],
                                    initialValue: stock
                                })(<InputNumber min={0} />)}
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                                validateStatus={mainImageErr}
                                help={mainHelp}
                            >
                                <UpLoadImage
                                    max={1}
                                    action={UPLOADPATH}
                                    getFileList={(fileList) => {
                                        this.props.handleMainImage(fileList)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                                validateStatus={imagesErr}
                                help={imagesHelp}
                            >
                                <UpLoadImage
                                    max={5}
                                    action={UPLOADPATH}
                                    getFileList={(fileList) => {
                                        this.props.handleImages(fileList)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="商品详情">
                                <RichEditor
                                    getValues={(value) => {
                                        this.props.handleDetailValue(value)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                                <Button type="primary" onClick={this.handleSubmit}>
                                    提交
                                </Button>
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
        categories: state.get("product").get("categories"),
        mainImageErr: state.get("product").get("mainImageErr"),
        mainHelp: state.get("product").get("mainHelp"),
        imagesErr: state.get("product").get("imagesErr"),
        imagesHelp: state.get("product").get("imagesHelp"),
        category: state.get("product").get("category"),
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
    handleSaveProduct: (values) => {
        dispatch(actionCreate.getProductsAction(values))
    },
    handleLevelCategories: () => {
        dispatch(actionCreate.getLevelCategoriesAction())
    },
    handleMainImage: (fileList) => {
        dispatch(actionCreate.getMainImageAction(fileList))
    },
    handleImages: (images) => {
        dispatch(actionCreate.getImagesAction(images))
    },
    handleDetailValue: (value) => {
        dispatch(actionCreate.getDetailValueAction(value))
    },
    handleProductDetail: (productId) => {
        dispatch(actionCreate.getProductDetailAction(productId))
    }


});
const WrappedApp = Form.create({ name: 'coordinated' })(ProductSave);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)