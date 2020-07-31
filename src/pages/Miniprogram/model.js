import { receiveShareAward } from './service';

export default {
  namespace: 'miniModel',
  state: {},
  effects: {
    *receiveShareAward(param, { call }) {
      const { callback } = param;
      const res = yield call(receiveShareAward, param);
      if (callback) callback(res.data);
    },
  },
};
