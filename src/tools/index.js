//处理通用性request
module.exports.handler = require('./handler')

//生成唯一标识ID
module.exports.uid = require('./uid')

//邮件发送
module.exports.emailsender = require('./email')

//正则表达式
module.exports.regex = require('./regex')

//文件工具
module.exports.file = require('./file')

//fetch
module.exports.fetch = require('./fetch')

//阿里云oss
module.exports.oss = require('./oss')
