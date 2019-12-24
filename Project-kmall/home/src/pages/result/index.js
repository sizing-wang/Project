require("./index.css");
require("../common/footer/index");
require("../common/logo/index");
let _util = require("util");

$(function () {
    let result = _util.getParamsFromUrl("type");
    $('.' + result).show()
})
