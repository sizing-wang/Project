import React, { Component } from "react";
import { connect } from "react-redux"
import { Card } from "antd"
import * as actionCreate from "./store/actionCreate"



import Layout from "common/layout/"
import "./home.css"


class Home extends Component{

    constructor (props) {
        super(props)
    }
    componentDidMount() {
        // 派发action, 处理异步任务
        this.props.handleCountsAction()
    }

    render() {
        const { userNum, orderNum, productNum } = this.props;
        return (
            <div className="home">
                <Layout>
                    首页
                    <div className="home-content">
                        <Card title="用户统计" style={{ width: 300}}>
                            <p>{ userNum }</p>
                        </Card>
                        <Card title="订单量" style={{ width: 300}}>
                            <p>{ orderNum }</p>
                        </Card>
                        <Card title="商品统计" style={{ width: 300}}>
                            <p>{ productNum }</p>
                        </Card>
                    </div>
                </Layout>
            </div>
        )
    }
}

// 将store中的属性映射到当前组件中
const mapStateToProps = (state) => {
    // console.log(state.get("home").get("userNum"));
    return {
        userNum: state.get("home").get("userNum"),
        orderNum: state.get("home").get("orderNum"),
        productNum: state.get("home").get("productNum")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleCountsAction: () => {
        dispatch(actionCreate.getCountsAction())
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(Home)