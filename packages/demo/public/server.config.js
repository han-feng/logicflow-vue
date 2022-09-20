// 服务端配置文件
// 可以在部署或运行时改变参数，从而影响前端行为

// eslint-disable-next-line no-unused-vars
var serverConfig = {
  // 'X-Token-Key': 'X-Token', // 请求头token的key，默认值为'X-Token'
  'service.baseUrl': './api/',
  'service.timeout': 5000, // 请求超时时间
  // login service
  'service.login.url': 'login'
}
