import React, { Component } from 'react';
import Bridge from '../../utils/iosBridge.js';
import wx from 'weixin-js-sdk';

class Demo extends Component {
  state = {
    token: '',
    share: ''
  };
  componentDidMount() {
    this.getToken();
  }
  getToken() {
    const self = this;
    let token = "";
    if(window.IAndroid) {
      token = window.IAndroid.getToken();
      sessionStorage.setItem('access_token', token)
      sessionStorage.setItem('isapp', true)
      self.props.history.replace('/index');
    } else {
      Bridge.registerhandler('sendToken', function(response) {
        token = response
        sessionStorage.setItem('access_token', token)
        sessionStorage.setItem('isapp', true)
        self.props.history.replace('/index');
      });
    }
  }
  render() {
    const { token, share } = this.state;
    return (
      <div>
        {/* <div>
          <span>token</span>
          <span>{token}</span>
        </div>
        <div>
          <span>userid</span>
          <span>{share}</span>
        </div> */}
      </div>
    );
  }
}
export default Demo;
