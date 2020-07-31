import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ miniModel }) => ({
  miniModel,
}))
class Miniprogram extends Component {
  state = {
    token: '',
    share: '',
  };
  componentDidMount() {
    this.getMini();
  }
  getMini() {
    const href = window.location.href.split("?")[0]
    sessionStorage.setItem('access_token', this.props.location.query.token);
    sessionStorage.setItem('shareId', this.props.location.query.share);
    sessionStorage.setItem('ismini', true);
    sessionStorage.setItem('miniUrl', href)
    const userid = sessionStorage.getItem("shareId")
    this.props.dispatch({
      type: 'miniModel/receiveShareAward',
      payload: {
        recommendAccountId: userid,
      },
      callback: () => {
        this.props.history.replace('/index');
      },
    });
  }
  render() {
    return (
      <div>
        <div>mini</div>
      </div>
    );
  }
}
export default Miniprogram;
