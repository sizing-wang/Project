
/*
options = {
    page: 需要显示的页码,
    model: 需要操作的数据库,
    query: 查询数据的条件,
    projections: 被忽略的数据,
    sort: 数据的排序
    populates: 关联查询
}
 */


/*
    分页功能逻辑分析:
    1. 需要获取前台传入的页码
    2. 限制每页显示多少条数据 比如限制: 每页显示2条
    规律:
    第一页: 显示第1和2条  skip: (1-1)*2   limit: 2
    第二页: 显示第3和4条  skip: (2-1)*2   limit: 2
    第三页: 显示第5和6条  skip: (3-1)*2   limit: 2
    ......
    第page页  显示第 skip: (page-1)*2  limit: 2
    公式: (要显示的第几页-1)*跳过的多少数据  limit: 限制多少条数据
    */
async function pagination(options) {
    let { page, model, query, projection, sort, populates } = options;
    const limit = 2; // 限制显示的数据
    // let page = parseInt(req.query.page); // 获取想要显示的第几页
// 容错处理
    if (isNaN(page)) {
        page = 1
    }
// 上一页边界控制
    if (page === 0) {
        page = 1
    }
    const count = await model.countDocuments(query); // 根据查询条件, 查找集合中, 有多少条数据

    //由于swig无法对数字进行循环遍历,因此需要在后台生成页码
    let list = [];
    let pages = Math.ceil(count / 2);
    if (page > pages) { // 下一页的边界控制
        page = pages;
    }
    if (page === 0 ) {
        page = 1
    }
    for (let i = 1; i <= pages; i++) {
        list.push(i);
    }

    // 关联查询
    let result = model.find(query, projection);
    if (populates) {
        populates.forEach(function (populate) {
            return result.populate(populate);
        })
    }

    let skip = (page-1)*limit; // 获取跳过多少条数据
    const users = await result
        .sort(sort)
        .skip(skip)
        .limit(limit);
        return {
            users: users,
            page: page,
            list: list,
            pages: pages
        }

}
module.exports = pagination;


