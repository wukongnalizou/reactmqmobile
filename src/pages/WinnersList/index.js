import React, { Component } from 'react';
// import { Toast, NavBar, Icon } from 'antd-mobile';
import NavBar from './../../components/NavBar/index';
import { connect } from 'dva';
import styles from './index.less';
import indexTitle from './../../assets/index_title.png';
import awardNum1 from './../../assets/award_num1.png';
import awardNum2 from './../../assets/award_num2.png';
import awardNum3 from './../../assets/award_num3.png';
import awardNum4 from './../../assets/award_num4.png';

@connect(({ WinnersList, loading }) => ({
  winnersData:WinnersList.winnersData,
  iPhoneXIProRecord:WinnersList.iPhoneXIProRecord,
  photographyCardRecord:WinnersList.photographyCardRecord,
  largeCashRecord:WinnersList.largeCashRecord,
  littleCashRecord:WinnersList.littleCashRecord,
}))
class WinnersList extends Component {
  state = {
    list: [],
    arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  };
  componentDidMount() {
    this.getWinnersList();
  }
  getWinnersList() {
    let { list } = this.state;
    this.props.dispatch({
      type: 'WinnersList/getWinnersList',
      payload: {},
    });
  }
  render() {
    const {winnersData,iPhoneXIProRecord,photographyCardRecord,largeCashRecord,littleCashRecord}= this.props;
    return (
      <div>
      <div className={styles.total}>
        <NavBar  className={styles.navBar} text={'获奖名单'} imgsrc={'./../../assets/iconBack.png'} />
        <div className={styles.content}>
          <img className={styles.indexTitle} src={indexTitle} />
          <div className={styles.activityTime}>活动日期：6.19 - 6.25</div>

          <img className={styles.awardNum} src={awardNum1} />
          {iPhoneXIProRecord.length>0?<div className={styles.firstPrize}>
            {iPhoneXIProRecord[0].awardContent}
          </div>:''}
          <img className={styles.awardNum} src={awardNum2} />
          {photographyCardRecord.length>0?<div className={photographyCardRecord.length<=10?styles.secondPrize:styles.thirdPrize}>
            {photographyCardRecord.map(item => {
              return (
                <div>
                  {item.awardContent}
                </div>
              )
            })}
          </div>:''}
          <img className={styles.awardNum} src={awardNum3} />
          <div className={styles.awardNumAfter}>（只展示部分用户）</div>
          {largeCashRecord.length>0?<div className={largeCashRecord.length<=10?styles.secondPrize:styles.thirdPrize}>
            {largeCashRecord.map(item => {
              return (
                <div>
                  {item.awardContent}
                </div>
              )
            })}
          </div>:''}
          <img className={styles.awardNum} src={awardNum4} />
          <div className={styles.awardNumAfter}>（只展示部分用户）</div>
          {littleCashRecord.length>0?<div className={littleCashRecord.length<=10?styles.secondPrize:styles.thirdPrize}>
            {littleCashRecord.map(item => {
              return (
                <div>
                  {item.awardContent}
                </div>
              )
            })}
          </div>:''}
        </div>
      </div>
      <div className={styles.bg}></div>
      </div>
    );
  }
}
export default WinnersList;
