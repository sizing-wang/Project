import React, { Component } from "react";
import { connect } from "react-redux"
import Layout from "common/layout/";
import { Breadcrumb, Form, Select, Input, Button } from "antd";
import * as actionCreate from "./store/actionCreate";

const { Option } = Select;

class CategoryAdd extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // 处理分类数据的回填
        this.props.handleLevelCategories()
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // 将表单数据插入数据库
                this.props.handleAdd(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { categories } = this.props;
        // console.log(categories)
        return (
            <div className="categoryAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>新增分类</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="父级分类">
                                {getFieldDecorator('pid', {
                                    rules: [{ required: true, message: '请选择根分类!' }],
                                })(
                                    <Select
                                        placeholder="请选择根分类!"
                                    >
                                        <Option value="0">根分类</Option>
                                        {
                                            categories.toJS().map((category) => {
                                                return <Option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="分类名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入分类名称!' }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="手机分类名称">
                                {getFieldDecorator('mobileName', {
                                    rules: [{ required: true, message: '请输入手机分类名称!' }],
                                })(<Input />)}
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
    // console.log("---------", state.get("category").get("categories"));
    return {
        categories: state.get("category").get("categories")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleAdd: (values) => {
        // 派发action
        dispatch(actionCreate.getCategoriesAction(values))
    },
    handleLevelCategories: () => {
        // 派发action
        dispatch(actionCreate.getLevelCategories())
    }
});
const WrappedApp = Form.create({ name: 'coordinated' })(CategoryAdd);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)

