import React, { Component } from "react";
import {Button, Col, Input, List, Row} from "antd";
import { connect } from "react-redux"
import { actionCreate } from "./store/store"

import "./todoList.css"

// 容器组件
class TodoList extends Component{

    componentDidMount() {
        // 发送ajax请求
        // this.props.handleInit();
    }

    render() {
        let {lists, task, handleInput, handleAdd, deleteItem} = this.props;
        return (
            <div className="toDo">
                <Row>
                    <Col span={18}>
                        <Input
                            onChange={handleInput}
                            value={task}
                        />
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={handleAdd}>提交</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <List
                            className="list"
                            bordered
                            dataSource={lists}
                            renderItem={(item, index) => (
                                <List.Item
                                    onClick={() => {deleteItem(index)}}
                                >
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
// 将store中的属性映射到当前组件中
const mapStateToProps = (state) => {
    // console.log("--- ", state);
    return {
        lists: state.todoList.get("lists"),
        task: state.todoList.get("task")
    };

};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleInput: (ev) => {
        // 获取输入框中数据
        let task = ev.target.value.trim();
        // 派发action
        dispatch(actionCreate.getChangeItemAction(task));
    },
    handleAdd: () => {
        // 派发action
        dispatch(actionCreate.getAddItemAction())
    },
    deleteItem: (index) => {
        // 派发action
        dispatch(actionCreate.getDelItemAction(index))
    },
    handleInit: () => {
        // 初始化数据
        // 派发action, 发送ajax请求
        dispatch(actionCreate.getLoadInitActions())
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(TodoList)