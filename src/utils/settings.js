//域名端口
// export const baseUrl = 'http://192.168.2.244:19201/duanwu/'
//export const localbaseUrl = 'http://192.168.2.244:9999/'
export const baseUrl = 'https://api.mqkj.net.cn/serve/';
//获取code地址
export const getCodeUrl = baseUrl + 'test/getCode';
//刷新token地址
export const refreshTokenUrl = baseUrl + 'user/app/v1/user/refreshToken';
//是否使用token
export const isToken = true;
//第三方登录
export const loginByThirdParty = baseUrl + 'user/app/v1/user/loginByThirdParty';
//请求的header中没有token的url数组
export const noHeaderUrl = [getCodeUrl, refreshTokenUrl, loginByThirdParty];
//Aes密钥
export const aesKey = 'raB4e9C6hP39e6Ik0E2wfG86Ml0FsQcY';
