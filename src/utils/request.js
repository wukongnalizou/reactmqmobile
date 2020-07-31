import axios from 'axios';
// import qs from 'qs';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import { baseUrl, isToken } from './settings';

const request = axios;
request.defaults.timeout = 5000;
request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
request.defaults.baseURL = baseUrl;
// request拦截器, 改变url 或 options.
request.interceptors.request.use(config => {
  if (isToken) {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  // config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbklkIjoib291aFgwbHRZeThEYlN6MHJxZU9oVm9QWW4wQSIsInVzZXJfaWQiOiIxMjcwNzAxODgwNzM4MzE2Mjg4IiwidXNlcl9uYW1lIjoiMTI3MDcwMTg4MDc1NTA5MzUwNCIsImltQ3JlYXRlVGltZSI6MTU5MTc5MzkxMjE3MSwiaW1Ub2tlbiI6ImMwZjg5Yzk4MDU1YzQ4OTUzMjhmYzE2YWJkOWY1ZWRkIiwic2NvcGUiOlsic2VydmljZSJdLCJ0ZWxOdW0iOiIxMzUxNjA4MjU1MiIsImV4cCI6MTU5MTgwMTExMywibm9QYXNzd29yZFNldCI6dHJ1ZSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9NVU5DSEVFX1VTRVIiXSwianRpIjoiNGRhNWZlYTktYzQ4Yy00OTAzLWEwODQtY2ViZWQ5NWQyNDkzIiwiY2xpZW50X2lkIjoic2VydmljZS11c2VyIn0.A9aokRthbT6AVy2swMpFCzlPInm4DZ23Mqd0AsSb6v-p2cqXtGUx6DOGitdT3cxo0a5hDe2_AYvHgKh7_GPvBwYpWgHvdgTxQQUBoTUSF9cnK_gpNlvswlORroAIoSxl-DVkOyP8zaEVgwFW9jvCa_cew05eEHuU490PkmasyICzjCw9wRcXV7oUd5cBlidfmd4YDwtlqH3KqE0uflSi_d2eSTcXJ6jSfBE1PixmXU8uZg_B4tpeGA4pMfvtKB4b7hXd0D8wV4_yWiMU6_-qF7KJOAkl1mw0wgIQpMNJhUvyoQoBYVRPabjdA0VgtEWTYUyr-hJpn_AfotoJj3bS1w`
	// let deviceInfo = getData("device_info");
	// let deviceInfoNew = {
	// 		system: deviceInfo
	// }
	// deviceInfoNew = JSON.stringify(deviceInfoNew);
	// if(deviceInfo){
	// 	config.headers.deviceInfo = deviceInfoNew
	// }
  return config;
});

// response拦截器, 处理response
request.interceptors.response.use(response => {
  const res = response.data;
  if (!res.success) {
    if (res.code === 'UNAUTHORIZED' && res.subCode === '401') {
      sessionStorage.removeItem('access_token')
			router.push('/wxcode');
    } else if(res.code === 'ERR' && (res.subCode != '21012' || res.subCode != '21013' || res.subCode != '21014')) {
      console.log('全局拦截')
      Toast.info(res.subMsg, 2);
    }
  }
  return res;
});

export default request;
