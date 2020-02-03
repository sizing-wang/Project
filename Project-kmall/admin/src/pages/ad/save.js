import React, { Component } from "react";
import { connect } from "react-redux"
import { Breadcrumb, Form, Select, Input, Button, InputNumber } from "antd";

import Layout from "common/layout/";
import * as actionCreate from "./store/actionCreate";
import UpLoadImage from "common/upLoad-image/"
import { UPLOADADIMAGE } from "../../api/config"
import "./index.css"


const { Option } = Select;

class AdSave extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        let id = this.props.match.params.adId;
        this.state = {
            adId : id
        }
    }

    componentDidMount() {
        const { adId } = this.state;
        if (adId) {
            // 如果有广告id 则是进入修改广告组件 数据回填
            this.props.handleAdDetail(adId)
        }
    }

    handleSubmit(e){
        const { adId } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (adId) { // 编辑广告
                this.props.handleAdUpData(adId, values)
            } else { // 新增广告
                this.props.handleSaveAd(values, err)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            adImageErrMsg,
            image,
            name,
            link,
            position
        } = this.props;

        // 广告图片的回填
        let fileList;
        if (image) {
            fileList = image.split(",").map((url, index) => {
                return {
                    uid: index,
                    name: "image.png",
                    status: "done",
                    url: url,
                    response: {
                        url: url
                    }
                }
            })
        }
        const { adId } = this.state;
        return (
            <div className="AdAdd">
                <Layout>
                    <Breadcrumb style={{ margin: "16px 0"}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>广告管理</Breadcrumb.Item>
                        {
                            adId ? <Breadcrumb.Item>
                                    修改广告
                                   </Breadcrumb.Item>
                                :
                                <Breadcrumb.Item>
                                    新增广告
                                </Breadcrumb.Item>
                        }
                    </Breadcrumb>
                    <div className="addContent">
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="广告名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入广告名称!' }],
                                    initialValue: name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="广告地址">
                                {getFieldDecorator('link', {
                                    rules: [{ required: true, message: '请输入广告地址!' }],
                                    initialValue: link
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="广告位置">
                                {getFieldDecorator('position', {
                                    rules: [{ required: true, message: '请选择广告位置!' }],
                                    initialValue: position
                                })(
                                    <Select
                                        placeholder="请选择广告位置!"
                                    >
                                        <Option key="1" value="1">
                                            首页轮播图
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="广告图片"
                                required={true}
                                validateStatus="error"
                                help={adImageErrMsg}
                            >
                                <UpLoadImage
                                    max={5}
                                    action={UPLOADADIMAGE}
                                    getFileList={(fileList) => {
                                        this.props.handleAdImage(fileList)
                                    }}
                                    fileList={fileList}
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
    // console.log("-------------", state.get("ad").get("adImage"));
    return {
        adImageErrMsg: state.get("ad").get("adImageErrMsg"),
        image: state.get("ad").get("image"),
        name: state.get('ad').get("name"),
        link: state.get("ad").get("link"),
        position: state.get("ad").get("position")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    // 将广告图片数据存储到store
    handleAdImage: (fileList) => {
        dispatch(actionCreate.getAdImageAction(fileList))
    },
    handleSaveAd: (values, err) => {
        dispatch(actionCreate.getSaveAdAction(values, err))
    },
    handleAdDetail: (id) => {
        dispatch(actionCreate.getAdDetailAction(id))
    },
    handleAdUpData: (id, values) => {
        dispatch(actionCreate.getAdUpDataAction(id, values))
    }

});
const WrappedApp = Form.create({ name: 'coordinated' })(AdSave);
export default connect (mapStateToProps, mapDispatchToProps)(WrappedApp)