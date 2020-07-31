import {
  getHomepageActivityUserInfo,
  drawCard,
  showAwardRecordList,
  bindByWeChat,
  bindByWeChatWithTelNum,
  getCode,
  shareInfo,
  receivedRegisterAndConcernAward,
  getActivityConfig
} from './service';

export default {
  namespace: 'IndexModel',
  state: {},
  effects: {
    *getFirstInfo(param, { call }) {
      const { callback } = param;
      const res = yield call(getHomepageActivityUserInfo, param);
      // if(res.success === true) {
      // setSessionData('ricePudding', res.data );
      if (callback) callback(res);
      // }
    },
    *getCard(param, { call }) {
      const { callback } = param;
      const res = yield call(drawCard, param);
      if (callback) callback(res);
      // if(res.success === true) {
      // }
    },
    *getUserList(param, { call }) {
      const { callback } = param;
      const res = yield call(showAwardRecordList, param);
      if (res.success === true) {
        if (callback) callback(res.data);
      }
    },
    *bindByWeChat(param, { call }) {
      const { callback } = param;
      const res = yield call(bindByWeChat, param);
      if (callback) callback(res);
    },
    *relation(param, { call }) {
      const { callback } = param;
      const res = yield call(bindByWeChatWithTelNum, param);
      if (res.success === true) {
        if (callback) callback(res.data);
      }
    },
    *getCode(param, { call }) {
      const { callback } = param;
      const res = yield call(getCode, param);
      if (res.success === true) {
        if (callback) callback(res.data);
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
    *receivedRegisterAndConcernAward(param, { call }) {
      const { callback } = param;
      const res = yield call(receivedRegisterAndConcernAward, param);
      if (res.success === true) {
        if (callback) callback(res.data);
      }
    },
    *getActivityConfig(param, { call }) {
      const { callback } = param;
      const res = yield call(getActivityConfig, param);
      if (res.success === true) {
        if (callback) callback(res.data);
      }
    },
  },
};
