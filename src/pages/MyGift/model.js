
import {
  getMyGiftList
} from './service';

export default {
  namespace: 'MyGift',
  state: {
    moguNumber: 0,
    myGiftList:[]
  },
  effects: {
    *getMyGiftList(param, {call, put}) {
      const { callback } = param;
      const res = yield call(getMyGiftList, param)
      if (res.success === true) {
        yield put({
          type: 'savegetMyGiftList',
          payload: res.data,
        })
        if (callback) callback(res);
      }
    }
  },
  reducers: {
    savegetMyGiftList(state, {payload}) {
      return{
        ...state,
        myGiftList: payload
      }
    }
  },
};
