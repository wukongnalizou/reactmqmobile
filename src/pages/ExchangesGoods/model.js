
import {
  getExchangesList,
  exchangeCash,
  exchangePhotographyCard,
  getHomepageActivityUserInfo
} from './service';

export default {
  namespace: 'exchangesGoods',
  state: {
    exchangesData: [],
  },
  effects: {
    *getFirstInfo(param, { call }) {
      const { callback } = param;
      const res = yield call(getHomepageActivityUserInfo, param);
      if(res.success === true) {
        if(callback) callback(res.data);
      }
    },
    *getExchangesList(param, {call, put}) {
      const { callback } = param;
      const res = yield call(getExchangesList, param)
      if (res.success === true) {
        console.log('llres',res)
        yield put({
          type: 'saveExchangesList',
          payload: res.data,
        })
        if (callback) callback(res);
      }
    },
    *exchangeCash(param, {call, put}) {
      const { callback } = param;
      const res = yield call(exchangeCash, param)
      if (res.success === true) {
        // yield put({
        //   type: 'saveExchangesList',
        //   payload: res.data,
        // })
      }
      if (callback) callback(res);
    },
    
    *exchangePhotographyCard(param, {call, put}) {
      const { callback } = param;
      const res = yield call(exchangePhotographyCard, param)
      if (res.success === true) {
        // yield put({
        //   type: 'saveExchangesList',
        //   payload: res.data,
        // })
      }
      if (callback) callback(res);
    }
  },
  reducers: {
    saveExchangesList(state, {payload}) {
      return{
        ...state,
        exchangesData: payload
      }
    }
  },
};
