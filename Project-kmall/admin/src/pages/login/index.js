import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
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
    /*
    componentWillUnmount() {
        this.props.handleClearTimerOut()
        const time = this.props.timer
        clearTimeout(time)
    }
    */

    render() {
        const { getFieldDecorator } = this.props.form;
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
                                { pattern: /^\w{3,6}$/i, message: "请以任意字符, 3-6位字符"}
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
    // console.log("---------", state.get("login").get("isLoading"));
    return {
        isLoading: state.get("login").get("isLoading"),
        timer: state.get("login").get("timer")
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
    }
});
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default connect (mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
