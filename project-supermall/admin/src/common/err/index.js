import React, { Component } from "react"
import { Alert, Button } from "antd"
import { Link } from "react-router-dom"

import "./index.css"

class Err extends Component {

    render() {
        return (
            <div className="err">
                <Alert
                    message="错误"
                    description="请求地址出错啦, 请稍后再试 !!!"
                    type="error"
                    showIcon
                />
                <Button type='primary' className="btn">
                    <Link to="/">回到首页</Link>
                </Button>
            </div>
        )
    }
}

export default Err