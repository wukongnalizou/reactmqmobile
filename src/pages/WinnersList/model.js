
import {
  getWinnersList
} from './service';

export default {
  namespace: 'WinnersList',
  state: {
    winnersData: [],
    iPhoneXIProRecord:[],
    photographyCardRecord:[],
    largeCashRecord:[],
    littleCashRecord:[],
  },
  effects: {
    *getWinnersList(param, {call, put}) {
      const { callback } = param;
      const res = yield call(getWinnersList, param)
      if (res.success === true) {
        yield put({
          type: 'savegetWinnersList',
          payload: res.data,
        })
        if (callback) callback(res);
      }
    }
  },
  reducers: {
    savegetWinnersList(state, {payload}) {
      return{
        ...state,
        winnersData: payload,
        iPhoneXIProRecord:payload.iPhoneXIProRecord,
        photographyCardRecord:payload.photographyCardRecord,
        largeCashRecord:payload.largeCashRecord,
        littleCashRecord:payload.littleCashRecord,
      }
    }
  },
};
