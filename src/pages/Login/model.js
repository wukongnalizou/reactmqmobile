import { userLogin, shareInfo, thirdLogin } from './service';

export default {
  namespace: 'login',
  state: {},
  effects: {
    *userLogin(param, { call, put, take }) {
      const { callback } = param;
      const res = yield call(userLogin, param);
      if (res.success === true) {
        yield put({
          type: 'thirdLogin',
          payload: {
            authType: 'weChat',
            key: res.data.unionId,
            openId: res.data.openId,
          },
        });
        yield take('thirdLogin/@@end')
        sessionStorage.setItem('userInfo', JSON.stringify(res.data));
        if (callback) callback(res.data);
      }
    },
    *thirdLogin(param, { call }) {
      const { callback } = param;
      const res = yield call(thirdLogin, param);
      if(res.success === true) {
        sessionStorage.setItem("access_token", res.data.access_token);
        sessionStorage.setItem('accountId', res.data.accountId);
      }
    },
    *shareInfo(param, { call }) {
      const { callback } = param;
      const res = yield call(shareInfo, param);
      if (res.success === true) {
        sessionStorage.setItem('shareInfo', JSON.stringify(res.data));
        if (callback) callback(res.data);
      }
    },
  },
};
