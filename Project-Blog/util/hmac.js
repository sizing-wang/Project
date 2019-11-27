/**             密码加密            **/
const crypto = require("crypto");
module.exports = (str) => {
    const hmac = crypto.createHmac('sha256', 'fbgiawbdjkbgjalkwdgnoi');
    hmac.update(str);
    return hmac.digest('hex');
};