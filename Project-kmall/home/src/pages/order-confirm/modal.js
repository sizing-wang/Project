let modalTpl = require("./modal.tpl")
let _util = require("util")
let _city = require("util/city/index")
let api = require("api/")

let fromErr = {
    show: function (msg) {
        $(".error-item")
            .show()
            .find(".error-msg")
            .text(msg)
    },
    hide: function () {
        $(".error-item")
            .hide()
            .find(".error-msg")
            .text("")
    }
}

module.exports = {
    show: function (shippingDetail) {
        // 将编辑的地址详情数据, 存储到this中(方便操作)
        this.shippingDetail = shippingDetail
        this.$modalBox = $(".modal-box")
        // 显示弹出层
        let html = _util.render(modalTpl, shippingDetail)
        this.$modalBox.html(html)
        // 加载省份信息
        this.loadProvinceInfo()
        // 监听事件
        this.bindEvent()
    },
    loadProvinceInfo: function () {
        // 获取省份信息
        let provinces = _city.getProvinces()
        // 生成省份信息的html
        let html = this.getProvinceSelect(provinces)
        let $provinceSelect = $(".province-select")
        $provinceSelect.html(html)

        // 处理编辑地址省份信息的回填
        if (this.shippingDetail) {
            $provinceSelect.val(this.shippingDetail.province)
            // 根据当前省份名称, 重新加载对应城市名称
            let province = this.shippingDetail.province
            let cities = _city.getCities(province)
            this.loadCitiesInfo(cities)
        }
    },
    loadCitiesInfo: function (cities) {
        // 生成对应城市的html
        let html = this.getProvinceSelect(cities)
        let citiesSelect = $(".city-select")
        citiesSelect.html(html)

        // 处理编辑地址城市信息的回填
        if (this.shippingDetail) {
            citiesSelect.val(this.shippingDetail.city)
        }
    },
    getProvinceSelect: function (provinces) {
        let html = `<option value=\"\">请选择</option>`
        for (let i = 0; i < provinces.length; i++) {
            html += `<option value=${provinces[i]}>${provinces[i]}</option>`
        }
        return html
    },
    bindEvent: function () {
        let _this = this
        // 点击关闭按钮, 隐藏弹出层
        this.$modalBox.on("click", ".close", function () {
            _this.hideModal()
        })
        // 阻止事件冒泡, 防止点击表单时关闭弹出层
        this.$modalBox.on('click', ".modal-container", function (ev) {
            ev.stopPropagation()
        })
        // 监听对应省份名称, 加载对应城市名称
        this.$modalBox.on("change", ".province-select", function () {
            let province = $(this).val()
            // 获取对应城市信息
            let cities = _city.getCities(province)
            // 加载对应城市信息
            _this.loadCitiesInfo(cities)
        })
        // 点击提交按钮,验证数据合法性, 通过并提交数据
        this.$modalBox.find("#btn-submit").on("click", function () {
            // 验证数据合法性, 通过并提交
            _this.submit()
        })
        this.$modalBox.find(".form-content").on("keyup", function (ev) {
            if (ev.keyCode == 13) {
                // 验证数据合法性, 通过并提交
                _this.submit()
            }
        })
    },
    hideModal: function () {
        this.$modalBox.empty()
    },
    submit: function () {
        let _this = this
        // 获取数据
        let fromDate = {
            name : $.trim($("[name='name']").val()),
            province : $.trim($("[name='province']").val()),
            city : $.trim($("[name='city']").val()),
            address : $.trim($("[name='address']").val()),
            phone : $.trim($("[name='phone']").val()),
            zip : $.trim($("[name='zip']").val()),
        };
        // 验证数据合法性
        let fromDataValiDate = this.valiDate(fromDate);
        // 数据合法, 提交数据
        if (fromDataValiDate.status) {
            // 数据验证通过, 错误信息提示置空
            fromErr.hide();
            // 发送ajax
            let request = api.addShipping
            let action = "新增成功"
            if (this.shippingDetail) {
                request = api.upDataShippingDetail
                fromDate.id = this.shippingDetail._id
                action = "编辑成功"
            }
            request({
                data: fromDate,
                success: function (result) {
                    let shippings = result.data
                    // 新增地址成功后, 隐藏弹出层
                    _this.hideModal()
                    // 自定义事件,将新增地址的数据,传递出去, 更新地址列表
                    $(".shipping-box").trigger("get-shippings", [shippings])
                    // 提示信息
                    _util.showSuccessMsg(action)
                },
                error: function (msg) {
                    fromErr.show(msg)
                }
            })
        } else {
            // 数据验证不通过, 错误信息提示
            fromErr.show(fromDataValiDate.msg)
        }

    },
    valiDate: function (fromDate) {
        let result = {
            status : false,
            msg: ""
        };
        // 验证用户姓名不能为空
        if (!_util.valiDate(fromDate.name, "require")) {
            result.msg = "用户姓名不能为空";
            return result
        }
        // 验证省份名称不能为空
        if (!_util.valiDate(fromDate.province, "require")) {
            result.msg = "省份名称不能为空";
            return result
        }
        // 验证城市名称不能为空
        if (!_util.valiDate(fromDate.city, "require")) {
            result.msg = "城市名称不能为空";
            return result
        }
        // 验证详细地址不能为空
        if (!_util.valiDate(fromDate.address, "require")) {
            result.msg = "详细地址不能为空";
            return result
        }
        // 验证手机号不能为空
        if (!_util.valiDate(fromDate.phone, "require")) {
            result.msg = "手机号码不能为空";
            return result
        }
        // 验证手机号书写合法性
        if (!_util.valiDate(fromDate.phone, "phone")) {
            result.msg = "手机号码格式不正确";
            return result
        }

        result.status = true;
        return result
    }
}