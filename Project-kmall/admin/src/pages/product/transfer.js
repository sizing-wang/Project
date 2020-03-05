import React, { Component }from "react"
import { connect } from "react-redux"
import { Transfer, notification, message } from 'antd';
import * as actionCreate from "./store/actionCreate";


class Attr extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.state = {
            mockData: [],
            targetKeys: [],
            selectedKeys: []
        };
    }

    componentDidMount () {
        this.props.handleGetAttrs()
        // console.log("穿梭框::::::::::::::",this.props.attrs);
    }

    // 商品属性的数据回填
    /*
    static getDerivedStateFromProps (props, state) {
        // 加载商品属性
        let mockData = [];
        let oriTargetKeys = [];
        let  { attrs, checkedAttrs } = props;
        if (attrs.length > 0) {
            for (let i = 0; i < attrs.length; i++) {
                mockData.push({
                    key: i.toString(),
                    title: attrs[i].name,
                    id: attrs[i]._id
                })
            }
            mockData.forEach(item => {
                for (let j = 0; j < checkedAttrs.length; j++) {
                    if (item.id == checkedAttrs[j]._id) {
                        oriTargetKeys.push(item.key)
                    }
                }
            })
            return {
                mockData: mockData
            }
        }

        return null
    }
    */

    handleChange (nextTargetKeys, direction, moveKeys) {
        this.setState({
            targetKeys: nextTargetKeys
        });

        if (nextTargetKeys.length > 2) {
            const openNotificationWithIcon = type => {
                notification[type]({
                    message: '警告',
                    description: '商品属性不能超过两组 !'
                });
            };
            openNotificationWithIcon("warning");
            nextTargetKeys.splice(0, 1)
        }
        // 获取选择的商品属性数据
        const mockData = this.state.mockData;
        let attrValues = nextTargetKeys.map((item, index) => {
            for (let i = 0; i < mockData.length; i++) {
                if (item == i) {
                    return mockData[i]
                }
            }
        })
        this.props.getAttrValues(attrValues)
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };

    handleSelectChange (sourceSelectedKeys, targetSelectedKeys) {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };

    render() {
        const { targetKeys, selectedKeys } = this.state;
        const { attrs, checkedAttrs } = this.props
        const mockData = [];
        for (let i = 0; i < attrs.length; i++) {
            mockData.push({
                key: i.toString(),
                title: attrs[i].name,
                id: attrs[i]._id
            })
        }
        this.state = {
            mockData
        }
        // mockData.forEach(item => {
        //     for (let i = 0; i < checkedAttrs.length; i++) {
        //         if (item.id == checkedAttrs[i]._id) {
        //             targetKeys.push(item.key)
        //         }
        //     }
        // })
            return (
                <div>
                    <Transfer
                        dataSource={mockData}
                        titles={['未选属性', '已选属性']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={this.handleChange}
                        onSelectChange={this.handleSelectChange}
                        // onScroll={this.handleScroll}
                        render={item => item.title}
                    />
                </div>
            );
    }
}

// 将store中的属性映射到当前组件中
const mapStateToProps = (state) => {
    // console.log("------", state.get("product").toJS());
    return {
        attrs: state.get("product").get("attrs"),
        checkedAttrs: state.get("product").get("checkedAttrs")
    }
};
// 将store中的方法映射到当前组件中
const mapDispatchToProps = (dispatch) => ({
    handleGetAttrs: () => {
        dispatch(actionCreate.handleGetAttrsAction())
    }
});
export default connect (mapStateToProps, mapDispatchToProps)(Attr)