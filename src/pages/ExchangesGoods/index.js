import React, { Component } from 'react';
// import { Toast, NavBar, Icon } from 'antd-mobile';
import NavBar from './../../components/NavBar/index';
import Modal from './../../components/Modal/index';
import { connect } from 'dva';
import styles from './index.less';
import icon1 from './../../assets/award_red_envelope.png';
import icon2 from './../../assets/award_photography.png';
import icon3 from './../../assets/award_iphone.png';
import myZongzi from './../../assets/my_zongzi.png';
import card_white from '../../assets/card_white.png';
import card_meat from '../../assets/card_meat.png';
import card_bean from '../../assets/card_bean.png';
import card_egg from '../../assets/card_egg.png';
import card_lobster from '../../assets/card_lobster.png';


@connect(({ exchangesGoods, loading }) => ({
  exchangesData: exchangesGoods.exchangesData,
}))
class exchangesGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list: [1],
      modalShow: false,
      modalShowMoney: false,
      name: '',  // 姓名
      nameShow: false,
      address: '',  // 地址
      addressShow: false,
      phone: '',  // 电话
      phoneShow: false,
      modalText: false,
      text: '',
      contentText: '活动太火爆啦！我们账户被支付宝限额啦！您放心，兑换的奖金将在活动结束后的三个工作日自动转到您的账户里，说话算话哦~',
      awardId: '',
      ricePudding: {}, //粽子持有量
      styleGift: true,
      continuationClick: true,
      continuationClickPhoto: true,
    };
    this.setSelfState = this.setSelfState.bind(this)
    this.textMoodal = this.textMoodal.bind(this)

  }

  componentDidMount() {
    this.getExchangesList(); // 获取兑换奖品信息
    this.getFirstInfo();  // 获取我的粽子数量
  }
  /**
   * 获取兑换奖品信息
   */
  getExchangesList() {
    let { list } = this.state;
    const { dispatch } = this.props
    dispatch({
      type: 'exchangesGoods/getExchangesList',
      payload: {},
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
  /**
   *  获取我的粽子数量
   */
  getFirstInfo() {
    this.props.dispatch({
      type: 'IndexModel/getFirstInfo',
      payload: {},
      callback: res => {
        this.setState({
          ricePudding: res.data,
        });
      },
    });
  }
  change = (e) => {
    this.state.name = e.target.value
  }
  changeAddress = (e) => {
    this.state.address = e.target.value
  }
  changePhone = (e) => {
    this.state.phone = e.target.value
  }
  clickExchange = (awardId, isClick) => {
    if (isClick) {
      this.setState({
        modalShow: true,
        awardId,
      })
    }
  }
  clickExchangeMoney = (awardId, isClick) => {
    if (isClick) {
      this.setState({
        modalShowMoney: true,
        awardId,
      })
    }
  }
  textMoodal = (text, type) => {
    this.setState({
      modalText: false,
    })
  }
  setSelfState = (text, type) => {
    const { name, phone, address, modalShow, awardId } = this.state;
    const { dispatch } = this.props
    if (type === 'close') {
      this.setState({
        modalShow: text,
        modalShowMoney: text,
      })
    } else {
      if (modalShow) {
        if (name) {
          this.setState({
            nameShow: false
          })
          if (address) {
            this.setState({
              addressShow: false
            })
            if (phone) {
              this.setState({
                phoneShow: false
              })
              if (this.state.continuationClickPhoto) {
                this.state.continuationClickPhoto = false;  // 防连点变成true
                dispatch({
                  type: 'exchangesGoods/exchangePhotographyCard',
                  payload: {
                    awardId,
                    phone,
                    realName: name,
                    address,
                  },
                  callback: res => {
                    this.state.continuationClick=true;  // 请求返回之后变成true
                    if (res.success) {
                      this.setState({
                        text: '恭喜中奖',
                        modalShow: text,
                        contentText: '待活动截止日期后的七个工作日内魔咕会将摄影卡寄出，注意查收',
                        styleGift: false,
                        modalText: true,
                        name: '',
                        address: '',
                        phone: '',
                      })
                      this.getExchangesList();
                      this.getFirstInfo();  // 获取我的粽子数量
                    } else if (res.subCode === '21012' || res.subCode === '9004' || res.subCode === '9006' || res.subCode === '9009' || res.subCode === '9010') {
                      this.setState({
                        text: '注意',
                        modalText: true,
                        modalShow: false,
                        contentText: res.subMsg,
                        styleGift: true,
                      })
                    } else if (res.subCode === '9007') {
                      this.setState({
                        text: '很遗憾',
                        modalText: true,
                        modalShow: false,
                        contentText: '活动已经结束，不能再兑换奖品了',
                        styleGift: true,
                      })
                    }
                  },
                });
              }

            } else {
              this.setState({
                phoneShow: true
              })
            }
          } else {
            this.setState({
              addressShow: true
            })
          }
        } else {
          this.setState({
            nameShow: true
          })
        }
      } else {
        if (name) {
          this.setState({
            nameShow: false
          })
          if (address) {
            this.setState({
              addressShow: false
            })
            if (this.state.continuationClick) {
              this.state.continuationClick = false;  // 防连点变成false
            dispatch({
              type: 'exchangesGoods/exchangeCash',
              payload: {
                awardId,
                realName: name,
                alipayNo: address,
              },
              callback: res => {
                this.state.continuationClick = true;  // 请求返回之后变成true
                if (res.success) {
                  this.setState({
                    modalShowMoney: text,
                    text: '恭喜中奖',
                    contentText: '活动太火爆啦！我们账户被支付宝限额啦！您放心，兑换的奖金将在活动结束后的三个工作日自动转到您的账户里，说话算话哦~',
                    styleGift: true,
                    modalText: true,
                    name: '',
                    address: '',
                    phone: '',
                  })
                  this.getExchangesList();
                  this.getFirstInfo();  // 获取我的粽子数量
                } else if (res.subCode === '21012' || res.subCode === '21013' || res.subCode === '21014' || res.subCode === '9004' || res.subCode === '9006' || res.subCode === '9009' || res.subCode === '9010' || res.subCode === '9017') {
                  this.setState({
                    text: '注意',
                    modalText: true,
                    modalShowMoney: false,
                    contentText: res.subMsg,
                    styleGift: true,
                  })
                } else if (res.subCode === '9007') {
                  this.setState({
                    text: '很遗憾',
                    modalText: true,
                    modalShow: false,
                    contentText: '活动已经结束，不能再兑换奖品了',
                    styleGift: true,
                  })
                }
              },
            });
          }
          } else {
            this.setState({
              addressShow: true
            })
          }
        } else {
          this.setState({
            nameShow: true
          })
        }
      }
    }

  }
  render() {
    const { ricePudding } = this.state;
    const { exchangesData } = this.props;
    return (
      <div className={styles.total}>
        <NavBar text={'兑换奖品'} imgsrc={'./../../assets/iconBack.png'} />
        <div className={styles.content}>
          <div>
            <div>
              <div className={styles.item}>
                <img className={styles.icon} src={icon1} />
                <div>
                  <div className={styles.first}>1.88元 红包</div>
                  <div className={styles.second}>白粽x5+肉粽x5</div>
                </div>
                {exchangesData.length > 0 ? <div className={exchangesData[0].isMeetCondition ? styles.right : styles.noClick} style={{ marginLeft: '1.4rem' }}
                  onClick={() => this.clickExchangeMoney(exchangesData[0].awardId, exchangesData[0].isMeetCondition)} >
                  兑换
                </div> : ''}
              </div>
              <div className={styles.item}>
                <img className={styles.icon} src={icon1} />
                <div>
                  <div className={styles.first}>8.88元 红包</div>
                  <div className={styles.second}>豆沙粽x5+蛋黄粽x5</div>
                </div>
                {exchangesData.length > 0 ? <div style={{ marginLeft: '0.9rem' }} className={exchangesData[1].isMeetCondition ? styles.right : styles.noClick}
                  onClick={() => this.clickExchangeMoney(exchangesData[1].awardId, exchangesData[1].isMeetCondition)}>
                  兑换
                </div> : ''}
              </div>
              <div className={styles.item}>
                <img className={styles.icon} src={icon2} />
                <div>
                  <div className={styles.firstOther}>盘子女人坊免费摄影卡</div>
                  <div className={styles.second}>白粽x3+肉粽x3</div>
                  <div style={{ marginTop: '0.08rem' }} className={styles.second}>豆沙粽x3+蛋黄粽x3+龙虾粽x3</div>
                </div>
                {exchangesData.length > 0 ? <div className={exchangesData[2].isMeetCondition ? styles.right : styles.noClick} style={{ marginLeft: '-0.8rem' }}
                  onClick={() => this.clickExchange(exchangesData[2].awardId, exchangesData[2].isMeetCondition)}>
                  兑换
                </div> : ''}
              </div>
              <div className={styles.item}>
                <img className={styles.icon} src={icon3} />
                <div>
                  <div className={styles.firstOther}>IPHONE11 PRO MAX</div>
                  <div className={styles.second}>白粽x5+肉粽x5</div>
                  <div style={{ marginTop: '0.08rem' }} className={styles.second}>豆沙粽x5+蛋黄粽x5+龙虾粽x5</div>
                </div>
                {exchangesData.length > 0 ? <div className={exchangesData[3].isMeetCondition ? styles.right : styles.noClick} style={{ marginLeft: '-0.8rem' }}
                  onClick={() => this.clickExchange(exchangesData[3].awardId, exchangesData[3].isMeetCondition)}>
                  兑换
              </div> : ''}
              </div>
            </div>
            <img className={styles.myZongzi} src={myZongzi} />
            <div className={styles.ricePudding}>
              <div className={styles.riceItem}>
                <img src={card_white}></img>
                {ricePudding.whiteCount > 0 ? (
                  <div className={styles.riceNum}>{ricePudding.whiteCount}</div>
                ) : (
                    <div className={styles.riceModal} />
                  )}
                {/* <div className={styles.riceModal}>
                  <div className={styles.ricePieNum}>1/4</div>
                </div> */}
              </div>
              <div className={styles.riceItem}>
                <img src={card_meat}></img>
                {/* <div className={styles.riceNum}>1</div> */}
                {ricePudding.meatCount > 0 ? (
                  <div className={styles.riceNum}>{ricePudding.meatCount}</div>
                ) : (
                    <div className={styles.riceModal} />
                  )}
              </div>
              <div className={styles.riceItem}>
                <img src={card_bean}></img>
                {ricePudding.beanPasteCount > 0 ? (
                  <div className={styles.riceNum}>{ricePudding.beanPasteCount}</div>
                ) : (
                    <div className={styles.riceModal} />
                  )}
              </div>
              <div className={styles.riceItem}>
                <img src={card_egg}></img>
                {ricePudding.yolkCount > 0 ? (
                  <div className={styles.riceNum}>{ricePudding.yolkCount}</div>
                ) : (
                    <div className={styles.riceModal} />
                  )}
              </div>
              <div className={styles.riceItem}>
                <img src={card_lobster}></img>
                {ricePudding.crayfishCount > 0 ? (
                  <div className={styles.riceNum}>{ricePudding.crayfishCount}</div>
                ) : (
                    <div className={styles.riceModal}>
                      <div className={styles.ricePieNum}>{ricePudding.crayfishShardCount}/4</div>
                    </div>
                  )}
              </div>
            </div>
            {/* 兑换弹窗 */}
          </div>
          {/* updateParent= {this.updateParent} */}
          {this.state.modalShow ? <Modal name={'兑换奖品'} setParentState={this.setSelfState}>
            <div className={styles.inputDiv}>
              <input autofocus="autofocus" className={styles.modalInput} onChange={this.change} placeholder='请输入姓名' />
              {this.state.nameShow ? <div className={styles.errorToast}>请输入姓名</div> : ''}
            </div>
            <div className={styles.inputDiv}>
              <input className={styles.modalInput} onChange={this.changeAddress} placeholder='请输入收货地址' />
              {this.state.addressShow ? <div className={styles.errorToast}>请输入收货地址</div> : ''}
            </div>
            <div className={styles.inputDiv}>
              <input className={styles.modalInput} onChange={this.changePhone} placeholder='请输入手机号码' />
              {this.state.phoneShow ? <div className={styles.errorToast}>请输入手机号码</div> : ''}
            </div>
          </Modal> : ''}
          {/* 兑换红包弹窗 */}
          {this.state.modalShowMoney ? <Modal name={'红包提现'} setParentState={this.setSelfState}>
            <div className={styles.inputDiv}>
              <input autofocus="autofocus" className={styles.modalInput} onChange={this.change} placeholder='请输入姓名' />
              {this.state.nameShow ? <div className={styles.errorToast}>请输入姓名</div> : ''}
            </div>
            <div className={styles.inputDiv}>
              <input className={styles.modalInput} onChange={this.changeAddress} placeholder='请输入支付宝账号' />
              {this.state.addressShow ? <div className={styles.errorToast}>请输入支付宝账号</div> : ''}
            </div>
          </Modal> : ''}
          {/* 文字提示弹窗 */}
          {this.state.modalText ? <Modal name={this.state.text} okText="知道了" setParentState={this.textMoodal}>
            <div className={this.state.styleGift === true ? styles.inputText : styles.inputTextMax}>
              {this.state.contentText}
            </div>
          </Modal> : ''}
        </div>
      </div>
    );
  }
}
export default exchangesGoods;
