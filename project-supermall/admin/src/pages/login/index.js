import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col, Svg } from 'antd';
import { connect } from "react-redux"
import { actionCreate } from "./store/store"

import Err from "../../common/err/index"
import "./index.css"

class LoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.handleLogin(values)
            }
        });
    }

    componentDidMount () {
        // 组件挂在完毕, 发送请求, 获取图形验证码
        this.props.handleGetCaptcha()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { captcha } = this.props
        // console.log(":::::::::::", captcha);
        
        return (
            <div className="login">
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入用户名!' },
                                { pattern: /^[a-z][a-z0-9_]{2,5}$/i, message: "请以字母开头, 3-6位字符"}
                                ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码!' },
                                { pattern: /^\w{3,10}$/i, message: "请以任意字符, 3-10位字符"}
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '验证码不正确!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入验证码"
                                    autoComplete="off"
                                />
                            )
                            }
                            </Col>
                            <Col span={12}>
                                <div 
                                className="captcha" 
                                dangerouslySetInnerHTML={{__html: captcha}}//dangerouslySetInnerHTM: 将带有html标签元素的字符串, 转换成html标签元素 
                                onClick={this.props.handleGetCaptcha}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={this.handleSubmit}
                            loading={this.props.isLoading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
// 将store中的属性, 映射到当前组件
const mapStateToProps = (state) => {
    // console.log("---------", state.get("login").get("captcha"));
    return {
        isLoading: state.get("login").get("isLoading"),
        timer: state.get("login").get("timer"),
        captcha: state.get("login").get("captcha")
    }
};
// 将store中的方法, 映射到当前组件比如(getHandleLogin())
const mapDispatchToProps = (dispatch) => ({
    handleLogin: (value) => {
        // 派发action
        dispatch(actionCreate.getHandleLogin(value))
    },
    handleClearTimerOut: () => {
        dispatch(actionCreate.getClearTimerOutAction())
    },
    handleGetCaptcha: () => {
        dispatch(actionCreate.getCaptchaAction())
    }
});
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default connect (mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
