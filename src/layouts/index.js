import React, { Component } from 'react';
import renderRoutesMap from '../components/RenderRoutesMap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import routes from '../../config/routes';
import styles from './index.css';

class BasicLayout extends Component {
  render() {
    const { props } = this;
    return (
      <div className={styles.normal}>
        <Router history={'browserHistory'}>
          <Switch>{renderRoutesMap(routes)}</Switch>
        </Router>
      </div>
    );
  }
}

export default BasicLayout;
