import React, { Component } from 'react';
import { connect } from 'dva';
import wxShare from '../../utils/wxShare';

@connect(({ login }) => ({
  login,
}))
class Login extends Component {
  componentDidMount() {
    const { code } = this.props.history.location.query;
    console.log('code', code);
    this.login(code);
  }
  login(code) {
    this.props.dispatch({
      type: 'login/userLogin',
      payload: {
        code,
      },
      callback: res => {
        const url = sessionStorage.getItem('location')
        window.location.href = url + '/index';
      },
    });
  }
  render() {
    return <div />;
  }
}
export default Login;
