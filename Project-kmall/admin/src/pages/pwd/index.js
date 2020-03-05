import React, { Component } from "react";
import { connect } from "react-redux"
import Layout from "common/layout/";
import { Breadcrumb, Form, message, Input, Button } from "antd";
import * as actionCreate from "./store/actionCreate";


class Pwd extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // 获取新密码数据, 提交到数据库中
                if (values.pwd != values.rePwd) {
                    message.error("两次密码输入不一致 !")
                } else {
                    this.props.handleUpDatePwd(values)
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className="categoryAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>修改密码</Breadcrumb.Item>   
                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="新密码">
                                {getFieldDecorator('pwd', {
                                    rules: [{ required: true, message: '请输入新密码!' }],

                                })(<Input autoComplete="off" />)}
                            </Form.Item>
                            <Form.Item label="确认密码">
                                {getFieldDecorator('rePwd', {
                                    rules: [{ required: true, message: '请再次输入新密码!' }]
                                })(<Input autoComplete="off" />)}
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
        
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleUpDatePwd : (values) => {
        // 派发action, 将新密码提交到数据库中
        dispatch(actionCreate.handleUpDatePwdAction(values))
    }

});
const WrappedApp = Form.create({ name: 'coordinated' })(Pwd);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)

