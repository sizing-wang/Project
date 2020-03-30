import React, { Component } from "react";
import { connect } from "react-redux"
import Layout from "common/layout/";
import { Breadcrumb, Form, Select, Input, Button } from "antd";
import * as actionCreate from "./store/actionCreate";

const { Option } = Select;

class AttrAdd extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(":::::::::::", this.props.match.params);
        const attrId = this.props.match.params.attrId
        // console.log("::::::::::", attrId);
        this.state = {
            attrId
        }
    }

    componentDidMount() {
        const { attrId } = this.state
        if (attrId) {
            // 进行商品属性的数据回填
            this.props.handleAttrDetail(attrId)
        }
        
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // if (!err) {
                // console.log('Received values of form: ', values);        
                // 获取数据, 插入数据库中
                // this.props.handleAddAttr(values)
            // }

            // 判断当前是否为修改属性还是新增属性
            const { attrId } = this.state
            if (attrId) {
                // 修改属性
                this.props.handleAttrDetailPut(attrId, values)
            } else {
                // 新增属性
                this.props.handleAddAttr(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { name, keys, value } = this.props;
        // console.log("::::::::::", key);
        
        return (
            <div className="categoryAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>属性管理</Breadcrumb.Item>
                        {
                            this.state.attrId ? <Breadcrumb.Item>修改属性</Breadcrumb.Item> : <Breadcrumb.Item>新增属性</Breadcrumb.Item>
                        }
                        
                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Form.Item label="属性名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入属性名称!' }],
                                    initialValue: name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="属性键">
                                {getFieldDecorator('key', {
                                    rules: [{ required: true, message: '请输入属性键!' }],
                                    initialValue: keys
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="属性值">
                                {getFieldDecorator('value', {
                                    rules: [{ required: true, message: '请输入属性值!' }],
                                    initialValue: value
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
    // console.log("---------", state.get("attr").get("key"));
    return {
        name: state.get("attr").get("name"),
        keys: state.get("attr").get("key"),
        value: state.get("attr").get("value")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleAddAttr: (values) => {
        // 派发action 将获取的数据插入数据库中
        dispatch(actionCreate.handleAddAttrAction(values))
    },
    handleAttrDetail: (attrId) => {
        // 派发action 进行商品属性的数据回填
        dispatch(actionCreate.handleAttrDetailAction(attrId))
    },
    handleAttrDetailPut: (attrId, values) => {
        // 派发action 进行商品属性的修改
        dispatch(actionCreate.handleAttrDetailPutAction(attrId, values))
    }
});
const WrappedApp = Form.create({ name: 'coordinated' })(AttrAdd);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)

