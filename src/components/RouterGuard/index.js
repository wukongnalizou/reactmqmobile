import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import renderRoutesMap from '../RenderRoutesMap';

class RouterGuard extends Component {
  constructor(props) {
    super();
  }
  componentWillMount() {
    let {
      history: { replace },
      location,
    } = this.props;
    // console.log(this.props)
    const userLogin = sessionStorage.getItem('access_token');
    // const userid = this.getQueryString('share');
    // if(userid || this.props.location.query.share) {
    //   sessionStorage.setItem('shareId', userid)
    //   sessionStorage.setItem('shareId11', this.props.location.query.share)
    // }
    // if (!userLogin) replace('./wxcode');
    // if (location.pathname === '/') replace('./login');
    if (this.props.location.query.share) {
      sessionStorage.setItem('shareId', this.props.location.query.share);
    } else {
      const codeUrl = decodeURIComponent(this.props.location.pathname);
      const hasParam = codeUrl.split('?')[1];
      if (hasParam) {
        const reg = new RegExp('(^|&)' + 'share' + '=([^&]*)(&|$)');
        const param = hasParam.substr(1).match(reg);
        if (param != null) {
          sessionStorage.setItem('shareId', unescape(param[2]));
          replace('/index');
        }
      }
    }

    // const test = '?fx=1&share=1257973000738963456'
    // const reg = new RegExp('(^|&)' + 'share' + '=([^&]*)(&|$)');
    // const param = codeUrl.split("?")[1].substr(1).match(reg)
    // if(param) {

    //   console.log(unescape(param[2]))
    // }
    // if(codeUrl.split("?")[0] == '/index') replace('/index')
    if (this.props.auth && !userLogin) {
      replace('/wxcode');
    }
    // console.log('路由跳转前的拦截', this.props);
  }
  render() {
    let { component, routes = [] } = this.props;
    // console.log('准备渲染compoent前', this.props);
    const LoadableComponent = Loadable({
      //按需加载
      loader: () => import(`../../pages/${component}`),
      loading: () => <span className="aa"></span>,
    });
    return (
      <div>
        <LoadableComponent {...this.props} />
        {renderRoutesMap(routes)}
      </div>
    );
  }
}

export default withRouter(RouterGuard);
