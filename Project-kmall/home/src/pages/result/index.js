require("./index.css");
require("../common/footer/index");
require("../common/logo/index");
let _util = require("util");

$(function () {
    let result = _util.getParamsFromUrl("type");
    let orderNo = _util.getParamsFromUrl("orderNo")
    let $orderDetail = $(".order-detail")
    let url = $orderDetail.attr("href") + orderNo
    $orderDetail.attr("href", url)
    $('.' + result).show()
})
