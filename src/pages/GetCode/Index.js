import React, { Component } from 'react';

class GetCode extends Component {
  componentDidMount() {
    this.getCode();
    console.log('code')
  }
  getCode() {
    window.location.href = 'http://localhost:8000/login?code=123';
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5c23dee475f14fc0&redirect_uri=http%3A%2F%2Fxsaza5.natappfree.cc%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxefd2df1f9772ba19&redirect_uri=http%3A%2F%2Fdraw.mqkj.net.cn%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
  }
  render() {
    return (
      <div>Code</div>
    )
  }
}
export default GetCode;

