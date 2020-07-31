import React, { Component } from 'react';
import Bridge from '../../utils/iosBridge.js';
import { connect } from 'dva';

@connect(({ WxcodeModel }) => ({
  WxcodeModel,
}))
class Wxcode extends Component {
  state = {
    token: '',
    num: 0,
    share: '',
  };
  componentDidMount() {
    const userid = sessionStorage.getItem("shareId")
    const url = window.location.protocol + '//' + window.location.host;
    sessionStorage.setItem('location', url) 
    if (userid) {
      this.props.dispatch({
        type: 'WxcodeModel/receiveShareAward',
        payload: {
          recommendAccountId: userid,
        },
        callback: () => {
          this.getCode();
        },
      });
    } else {
      this.getCode();
    }
  }
  getCode() {
    const location = sessionStorage.getItem('location');
    window.location.href =
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxefd2df1f9772ba19&redirect_uri=${encodeURIComponent(location)}%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  }
  render() {
    return (
      <div>
        <div>{/* <span>微信登录</span> */}</div>
      </div>
    );
  }
}
export default Wxcode;
