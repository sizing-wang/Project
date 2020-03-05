import * as type from "./actionTypes"
import { message, Result } from "antd"
import api from "api/"

// 处理更改密码
export const handleUpDatePwdAction = (values) => {
    return function (dispatch, getState) {
        // 发送请求, 将新密码传入到数据库中
        const password = values.pwd;
        api.getUpDatePwd({password})
            .then(result => {
                // console.log(":::::::", result);
                const data = result.data;
                if (data.code == 0) {
                    message.success(data.message, () => {
                        api.logout()
                            .then(result => {
                                const data = result.data;
                                if (data.code == 0) {
                                    window.location.href = "/login"
                                } else {
                                    message.error("用户退出失败, 请刷新再试 !")
                                }
                            })
                            .catch(err => {
                                message.error(err.message)
                            })
                    });

                } else {
                    message.error("密码更改失败, 请刷新再试 !")
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }
}




