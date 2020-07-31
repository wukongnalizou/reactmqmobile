import React, { Component } from 'react';
// import { Toast, NavBar, Icon } from 'antd-mobile';
import moment from 'moment';
import NavBar from './../../components/NavBar/index';
import { connect } from 'dva';
import styles from './index.less';
import icon1 from './../../assets/award_red_envelope.png';
import icon2 from './../../assets/award_photography.png';
import icon3 from './../../assets/award_iphone.png';
import noGift from './../../assets/iconNothing.png';


@connect(({ MyGift, loading }) => ({
  MyGift,
  myGiftList:MyGift.myGiftList
}))
class MyGift extends Component {
  state = {
    list: [1],
  };
  componentDidMount() {
    this.getMyGiftList();
  }
  getMyGiftList() {
    let { list } = this.state;
    const { dispatch } = this.props;
    // if (this.page > this.total) return;
    dispatch({
      type: 'MyGift/getMyGiftList',
      payload: {
        // page: this.page,
        // rows: this.rows,
        // queryTimestamp: this.queryTimestamp,
        // parameter: {},
      },
      callback: res => {
        // if (res.success) {
        //   this.total = Math.ceil(res.data.total / 10);
        //   this.page++;
        //   this.queryTimestamp = res.timestamp;
        //   this.setState({
        //     list: [...list, ...res.data.list],
        //   });
        // }
      },
    });
  }
  render() {
    const {myGiftList}=this.props;
    return (
      <div className={styles.total}>
        <NavBar text={'我的奖品'} imgsrc={'./../../assets/iconBack.png'} />
        {myGiftList.length>0?<div className={styles.content}>
           <div style={{marginBottom:'1rem'}}>
          {myGiftList.map(item => {
            return(
              <div className={styles.item}>
                <img className={styles.icon} src={item.imgUrl} />
                <div>
              <div className={styles.first}>{item.awardName}</div>
            <div className={item.awardId==='1'||item.awardId==='2'?styles.minSecond:styles.second}>{item.condition}</div>
                  <div className={styles.third}>兑换时间：{moment(item.exChangeTime).format('YYYY-MM-DD HH:mm')}</div>
                </div>
              </div>
            )
          })}
          </div>
        </div>:
        <div>
          <img className={styles.noGift} src={noGift} />
          <div  className={styles.noGiftText}>您还没有兑换过礼物</div>
        </div>}
      </div>
    );
  }
}
export default MyGift;
