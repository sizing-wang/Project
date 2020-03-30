import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Form, Select, Input, Button, InputNumber } from "antd";

import Layout from "common/layout/";
import * as actionCreate from "./store/actionCreate";
import RichEditor from "../../common/rich-editor/index"
import UpLoadImage from "common/upLoad-image/"
import Attr from "./transfer";
import { UPLOADPATH } from "../../api/config"
import "./index.css"


const { Option } = Select;

class ProductSave extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        const productId = this.props.match.params.productId;
        this.state = {
            productId: productId
        }
    }

    componentDidMount() {
        // 分类数据的回填
        this.props.handleLevelCategories()

        // 如果有商品id, 就获取商品信息, 并回填
        const productId = this.state.productId
        if (productId) {
            this.props.handleProductDetail(productId)
            // 获取所有商品属性数据
            // this.props.handleGetAttrs()
        } // else {
            // 获取所有商品属性数据
            // this.props.handleGetAttrs()
        // }
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

            // 新增/编辑商品
            values.id = this.state.productId;
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
            payNums,
            checkedAttrs,
            mainImage,
            images,
            detail,
            attrs
        } = this.props;
        // console.log("--------------", attrs);
        // 封面图片的回填
        let mainImageList = [];
        if (mainImage) {
            mainImageList.push({
                uid: "0",
                name: "image.png",
                status: "done",
                url: mainImage,
                response: {
                    url: mainImage
                }
            })
        }
        // 商品图片的回填
        // console.log(":::::::::", images);
        let imagesList = [];
        if (images) {
            imagesList = images.split(",").map((url, index) => {
                return {
                    uid: index,
                    name: "image.png",
                    status: "done",
                    url: url,
                    response: {
                        url: url
                    }
                }
            });
        }
        return (
            <div className="productAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        {
                            this.state.productId
                                ?
                                <Breadcrumb.Item>
                                    编辑商品
                                </Breadcrumb.Item>
                                :
                                <Breadcrumb.Item>
                                    新增商品
                                </Breadcrumb.Item>
                        }

                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="商品分类">
                                {getFieldDecorator('category', {
                                    rules: [{ required: true, message: '请选择商品分类!' }],
                                    initialValue: category
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
                            <Form.Item label="支付人数">
                                {getFieldDecorator('payNums', {initialValue: payNums})(<InputNumber min={0} />)}
                            </Form.Item>
                            <Form.Item label="商品属性">
                                <Attr
                                    getAttrValues={(attrValues) => {
                                        // 处理获取选择的商品属性数据
                                        this.props.handleGetAttrValues(attrValues)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                                validateStatus={mainImageErr}
                                help={mainHelp}
                                required={true}
                            >
                                <UpLoadImage
                                    max={1}
                                    action={UPLOADPATH}
                                    getFileList={(fileList) => {
                                        this.props.handleMainImage(fileList)
                                    }}
                                    fileList={mainImageList}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                                validateStatus={imagesErr}
                                help={imagesHelp}
                                required={true}
                            >
                                <UpLoadImage
                                    max={5}
                                    action={UPLOADPATH}
                                    getFileList={(fileList) => {
                                        this.props.handleImages(fileList)
                                    }}
                                    fileList={imagesList}
                                />
                            </Form.Item>
                            <Form.Item label="商品详情">
                                <RichEditor
                                    getValues={(value) => {
                                        this.props.handleDetailValue(value)
                                    }}
                                    values={detail}
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
    // console.log(":::::::::::", state.get("product").get("attrs"));
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
        payNums: state.get("product").get("payNums"),
        // checkedAttrs: state.get("product").get("checkedAttrs"),
        mainImage: state.get("product").get("mainImage"),
        images: state.get("product").get("images"),
        detail: state.get("product").get("detail"),
        // attrs: state.get("product").get("attrs")
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
    },
    // handleGetAttrs: () => {
    //     dispatch(actionCreate.handleGetAttrsAction())
    // },
    handleGetAttrValues: (attrValues) => {
        dispatch(actionCreate.handleGetAttrValuesAction(attrValues))
    }

});
const WrappedApp = Form.create({ name: 'coordinated' })(ProductSave);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)