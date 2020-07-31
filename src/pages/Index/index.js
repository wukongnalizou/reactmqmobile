import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import iconIndexList from '../../assets/iconIndexList.png';
import iconIndexAward from '../../assets/iconIndexAward.png';
import iconDownloadApp from '../../assets/iconDownloadApp.png';
import index_title from '../../assets/index_title.png';
import card_back from '../../assets/card_back.png';
import card_white from '../../assets/card_white.png';
import card_meat from '../../assets/card_meat.png';
import card_bean from '../../assets/card_bean.png';
import card_egg from '../../assets/card_egg.png';
import card_lobster from '../../assets/card_lobster.png';
import title_award_setup from '../../assets/title_award_setup.png';
import title_award_list from '../../assets/title_award_list.png';
import award_iphone from '../../assets/award_iphone.png';
import award_photography from '../../assets/award_photography.png';
import award_red_envelope from '../../assets/award_red_envelope.png';
import index_logo from '../../assets/index_logo.png';
import index_qrcode from '../../assets/index_qrcode.png';
import TweenOne from 'rc-tween-one';
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';
import iconDelete from '../../assets/iconDelete.png';
import pop_finish from '../../assets/pop_finish.png';
import pop_not_start from '../../assets/pop_not_start.png';
import iconShare from '../../assets/iconShare.png';
import Modal from './../../components/Modal/index';
import Bridge from '../../utils/iosBridge.js';
import wxShare from '../../utils/wxShare';
import { Toast } from 'antd-mobile';
var wx = require('weixin-js-sdk');
TweenOne.plugins.push(BezierPlugin);

const Newlyweds = props => {
  const { closeModal } = props;
  return (
    <div className={styles.newlywedsModalBox} onClick={() => closeModal()}>
      <div className={styles.newlywedsModal}>
        <div className={styles.ricePudding}>
          <div className={styles.riceItem}>
            <img src={card_white}></img>
            <div className={styles.riceNum}>4</div>
          </div>
          <div className={styles.riceItem}>
            <img src={card_meat}></img>
            <div className={styles.riceNum}>4</div>
          </div>
          <div className={styles.riceItem}>
            <img src={card_bean}></img>
            <div className={styles.riceNum}>1</div>
          </div>
          <div className={styles.riceItem}>
            <img src={card_egg}></img>
            <div className={styles.riceNum}>1</div>
          </div>
        </div>
        <div className={styles.riceCon}>
          <div className={styles.riceType}>白粽X4、肉粽X4、豆沙粽X1、蛋黄粽X1</div>
          <div className={styles.riceInfo}>已经放在了你的卡包中，</div>
          <div className={styles.riceInfo}>再抽几次就能兑换现金啦！</div>
        </div>
      </div>
      <div className={styles.closeButton}>
        <img src={iconDelete} onClick={() => closeModal()}></img>
      </div>
    </div>
  );
};
const NotStart = props => {
  const { closeModal } = props;
  return (
    <div className={styles.notstartModalBox}>
      <div className={styles.notstartModal}>
        <img src={pop_not_start}></img>
      </div>
      <div className={styles.closeButton}>
        <img src={iconDelete} onClick={() => closeModal()}></img>
      </div>
    </div>
  );
};
const Finished = props => {
  const { closeModal } = props;
  return (
    <div className={styles.finishedModalBox}>
      <div className={styles.finishedModal}>
        <img src={pop_finish}></img>
      </div>
      <div className={styles.closeButton}>
        <img src={iconDelete} onClick={() => closeModal()}></img>
      </div>
    </div>
  );
};
const LoginModal = props => {
  const { errorText = '', codeClick, phoneChange, codeChange, count, sent, phone, code } = props;
  return (
    <div className={styles.loginModal}>
      <div className={styles.loginItme}>
        <div className={styles.loginLabel}>手机号</div>
        <div className={styles.loginInput}>
          <input
            placeholder="请输入手机号"
            value={phone}
            type="number"
            pattern="[0-9]*"
            onInput={e => phoneChange(e)}
          />
        </div>
        <div className={styles.loginButton} onClick={() => codeClick()}>
          {sent ? <span>发验证码</span> : <span>{count + 's'}</span>}
        </div>
      </div>
      <div className={styles.loginItme}>
        <div className={styles.loginLabel}>验证码</div>
        <div className={styles.loginInput}>
          <input
            placeholder="请输入验证码"
            value={code}
            type="number"
            pattern="[0-9]*"
            onInput={e => codeChange(e)}
          />
        </div>
      </div>
      <div className={styles.errorText}>{errorText}</div>
    </div>
  );
};
// let getCardStatus = false; //抽卡接口状态
@connect(({ IndexModel }) => ({
  IndexModel,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flopStatus: false, //翻转控制
      getCardStatus: false, //抽卡接口状态
      points: [], //抛物点定义
      momentSecond: null, //多次动画
      flow: true, //动画暂停
      flowCardStatus: false, //抛物图片显示
      newlywedsStatus: false, //新人礼模态
      notStartStatus: false, //活动未开始
      finishedStatus: false, //活动已结束
      loginStatus: false, //登录
      count: 60, //倒计时
      sent: true, //发送验证码状态
      errorText: '', //错误信息
      phone: '', //电话号
      code: '', //验证码
      ricePudding: {}, //粽子持有量
      userList: [], //获奖名单
      ricePuddingIndex: ['2001', '2002', '2003', '2004', '2005'], //粽子对应顺序
      riceSort: 0, //翻卡粽子下标
      riceImg: '', //翻卡粽子图片
      relationStatus: false, //关联手机号
      isApp: false,
      activityStatus: '0', //0未开始 1已开始 2已结束
      changeStatus: false, //翻牌次数为0时为真
    };
  }

  componentDidMount() {
    //计算五张图片落点
    const f1 = 161 / 2 - 52 * 2 - 13 * 2 + 52 / 2;
    const f2 = 161 / 2 - 52 - 13 + 52 / 2;
    const f3 = 161 / 2 + 52 / 2;
    const f4 = 161 / 2 + 52 + 13 + 52 / 2;
    const f5 = 161 / 2 + 52 * 2 + 13 * 2 + 52 / 2;
    const points = [
      [
        { x: 0, y: 0 },
        { x: f1, y: 359 },
      ],
      [
        { x: 0, y: 0 },
        { x: f2, y: 359 },
      ],
      [
        { x: 0, y: 0 },
        { x: f3, y: 359 },
      ],
      [
        { x: 0, y: 0 },
        { x: f4, y: 359 },
      ],
      [
        { x: 0, y: 0 },
        { x: f5, y: 359 },
      ],
    ];
    //判断app用户
    const isApp = sessionStorage.getItem('isapp');
    const isMini = sessionStorage.getItem('ismini');
    this.setState({
      isApp,
      points,
      isMini,
    });
    this.getActivityConfig();
    this.getFirstInfo();
    this.getUserList();
    this.getShare();
  }
  flop() {
    this.setState(
      {
        flopStatus: true,
        momentSecond: null,
      },
      () => {
        setTimeout(() => {
          this.setState({
            flowCardStatus: true,
            flow: false,
          });
        }, 1000);
      },
    );
  }
  newlywedsModalClose() {
    this.setState({
      newlywedsStatus: false,
    });
  }
  notStartModalClose() {
    this.setState({
      notStartStatus: false,
    });
  }
  finishedModalClose() {
    this.setState({
      finishedStatus: false,
    });
  }
  loginModalClick(status, type) {
    const { phone, code } = this.state;
    if (type === 'close') {
      this.setState({
        loginStatus: status,
      });
    } else {
      console.log(phone, code);
      if (this.state.phone === '') {
        this.setState({
          errorText: '请输入手机号',
        });
        return;
      } else if (!/^1[34578]\d{9}$/.test(this.state.phone)) {
        this.setState({
          errorText: '请输入正确手机号',
        });
        return;
      } else if (this.state.code === '') {
        this.setState({
          errorText: '请输入验证码',
        });
        return;
      } else {
        this.setState({
          errorText: '',
        });
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const shareId = sessionStorage.getItem('shareId');
        this.props.dispatch({
          type: 'IndexModel/bindByWeChat',
          payload: {
            headPortrait: userInfo.headImgUrl,
            nickname: userInfo.nickname,
            openId: userInfo.openId,
            recommendAccountId: shareId,
            sex: userInfo.sex,
            telCode: code,
            telNumber: phone,
            unionId: userInfo.unionId,
          },
          callback: res => {
            if (res.success) {
              sessionStorage.setItem('access_token', res.data.access_token);
              this.setState({
                loginStatus: status,
              });
              this.getFirstInfo();
            } else if (res.subCode == '17007') {
              this.setState({
                errorText: '请输入正确的验证码',
              });
            } else if (res.subCode === '10104') {
              this.setState({
                relationStatus: true,
                loginStatus: status,
              });
            } else if (res.subCode === '10101') {
              Toast.info('该手机号已经绑定其他微信，请更换手机号', 2);
            } else {
              Toast.info(res.subMsg, 1);
            }
          },
        });
      }
    }
  }
  relationModalClick(status, type) {
    const { phone } = this.state;
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (type === 'close') {
      this.setState({
        relationStatus: status,
      });
    } else {
      this.props.dispatch({
        type: 'IndexModel/relation',
        payload: {
          headPortrait: userInfo.headImgUrl,
          nickname: userInfo.nickname,
          openId: userInfo.openId,
          sex: userInfo.sex,
          telNumber: phone,
          unionId: userInfo.unionId,
        },
        callback: res => {
          sessionStorage.setItem('access_token', res.access_token);
          this.setState({
            relationStatus: status,
          });
          this.getFirstInfo();
        },
      });
    }
  }
  codeClick = () => {
    if (!this.state.sent) {
      return;
    }

    if (this.state.phone === '') {
      this.setState({
        errorText: '请输入手机号',
      });
      return;
    } else if (!/^1[34578]\d{9}$/.test(this.state.phone)) {
      this.setState({
        errorText: '请输入正确手机号',
      });
      return;
    } else {
      this.setState({
        errorText: '',
      });
      this.props.dispatch({
        type: 'IndexModel/getCode',
        payload: {
          telNumber: this.state.phone,
        },
        callback: res => {
          let count = this.state.count;
          const timer = setInterval(() => {
            this.setState({ count: count--, sent: false }, () => {
              if (count === 0) {
                clearInterval(timer);
                this.setState({
                  sent: true,
                  count: 60,
                });
              }
            });
          }, 1000);
        },
      });
    }
  };
  phoneChange(e) {
    console.log(e.target.value);
    if (e.currentTarget.validity.valid) {
      this.setState({
        phone: e.currentTarget.value,
      });
    }
  }
  codeChange(e) {
    if (e.currentTarget.validity.valid) {
      this.setState({
        code: e.currentTarget.value,
      });
    }
  }
  downloadApp() {
    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.moomking.mogu.client';
  }
  getActivityConfig() {
    this.props.dispatch({
      type: 'IndexModel/getActivityConfig',
      payload: {},
      callback: res => {
        const activityTimeStamp = new Date().getTime();
        let activityStatus = 0;
        if (
          activityTimeStamp >= res.activityStartTime &&
          activityTimeStamp <= res.activityEndTime
        ) {
          activityStatus = 1;
        }
        if (activityTimeStamp < res.activityStartTime) {
          activityStatus = 0;
        }
        if (activityTimeStamp > res.activityEndTime) {
          activityStatus = 2;
        }
        this.setState({
          activityStatus,
        });
      },
    });
  }
  routerClick = url => {
    const youke = JSON.parse(sessionStorage.getItem('youke'));
    const { activityStatus } = this.state;
    console.log(activityStatus);
    if (!youke) {
      if (url == '/myGift' || url == '/exchangesGoods') {
        if (activityStatus == '2') {
          this.setState({
            finishedStatus: true,
          });
        } else if (activityStatus == '0') {
          this.setState({
            notStartStatus: true,
          });
        } else {
          this.props.history.push(url);
        }
      } else {
        this.props.history.push(url);
      }
    } else {
      this.setState({
        loginStatus: true,
      });
    }
  };
  getFirstInfo() {
    this.props.dispatch({
      type: 'IndexModel/getFirstInfo',
      payload: {},
      callback: res => {
        if (res.success) {
          sessionStorage.setItem('ricePudding', JSON.stringify(res.data));
          this.setState({
            ricePudding: res.data,
          });
          sessionStorage.setItem('youke', false);
          //调新人礼
          this.receivedRegisterAndConcernAward();
        } else if (res.subCode === '10002') {
          sessionStorage.setItem('youke', true);
          this.setState({
            loginStatus: true,
          });
        }
      },
    });
  }
  getCard() {
    const { ricePuddingIndex, count, flopStatus, ricePudding, activityStatus } = this.state;
    // console.log(activityStatus)
    const youke = JSON.parse(sessionStorage.getItem('youke'));
    if (youke) {
      this.setState({
        loginStatus: true,
      });
      return;
    }
    if (activityStatus == '0') {
      this.setState({
        notStartStatus: true,
      });
      return;
    }
    if (activityStatus == '2') {
      this.setState({
        finishedStatus: true,
      });
      return;
    }
    if (ricePudding.drawCardCount == 0) {
      this.setState({
        changeStatus: true,
      });
      return;
    }
    if (this.state.getCardStatus) {
      return;
    }
    this.state.getCardStatus = true;
    this.props.dispatch({
      type: 'IndexModel/getCard',
      payload: {},
      callback: res => {
        if (res.success) {
          let index = 0;
          for (let i = 0; i < ricePuddingIndex.length; i++) {
            if (ricePuddingIndex[i] === res.data.mid) {
              index = i;
            }
          }
          setTimeout(() => {
            this.getFirstInfo();
          }, 1000);
          this.setState(
            {
              riceSort: index,
              riceImg: res.data.imgUrl,
            },
            () => {
              setTimeout(() => {
                this.flop();
              }, 300);
            },
          );
          //活动未开始
        } else if (res.subCode === '9006') {
          this.setState({
            notStartStatus: true,
          });
          this.state.getCardStatus = false;
          //活动已结束
        } else if (res.subCode === '9007') {
          this.setState({
            finishedStatus: true,
          });
          this.state.getCardStatus = false;
        } else {
          this.state.getCardStatus = false;
        }
      },
    });
  }
  getUserList() {
    this.props.dispatch({
      type: 'IndexModel/getUserList',
      payload: {},
      callback: res => {
        this.setState({
          userList: res,
        });
      },
    });
  }
  appShare() {
    const url = window.location.protocol + '//' + window.location.host;
    const shareInfo = JSON.parse(sessionStorage.getItem('shareInfo'));
    const shareList = [
      {
        type: 'onMenuShareAppMessage',
        title: shareInfo.title,
        link: url + '/wxcode',
        desc: shareInfo.desc,
        imgUrl: shareInfo.imgUrl,
      },
      {
        type: 'onMenuShareTimeline',
        title: shareInfo.title,
        link: url + '/wxcode',
        desc: shareInfo.desc,
        imgUrl: shareInfo.imgUrl,
      },
    ];
    if (window.IAndroid) {
      window.IAndroid.share(JSON.stringify(shareList));
    } else {
      Bridge.callhandler('sendShare', JSON.stringify(shareList), function(response) {});
    }
  }
  getShare() {
    const url = window.location.href.split('#')[0];
    const share = sessionStorage.getItem('accountId');
    this.props.dispatch({
      type: 'IndexModel/shareInfo',
      payload: {
        url: url,
      },
      callback: res => {
        let shareUrl = url + encodeURIComponent('?fx=1&share=' + share);
        // wxShare(res, shareUrl);
        const sd = res;
        let link = shareUrl;
        let title = sd.title;
        let desc = sd.desc;
        let imgurl = sd.imgUrl;
        wx.config({
          debug: false,
          appId: sd.appId,
          timestamp: sd.timestamp,
          nonceStr: sd.nonceStr,
          signature: sd.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        });
        wx.ready(function() {
          wx.onMenuShareAppMessage({
            title: title,
            link: link,
            desc: desc,
            imgUrl: imgurl,
            success: function(res) {
              // alert('分享朋友成功');
              // alert(link)
              // alert(res)
            },
            cancel: function() {
              // alert('取消分享');
            },
          });
          wx.onMenuShareTimeline({
            title: title,
            link: link,
            desc: desc,
            imgUrl: imgurl,
            success: function() {
              // alert('分享到朋友圈成功');
            },
            cancel: function() {
              // alert('取消朋友分享');
            },
          });
        });
        wx.error(function(res) {
          // alert(res);
          console.log(res);
          // alert('分享失败');
        });
        wx.miniProgram.getEnv(function(res) {
          if (res.miniprogram) {
            const miniUrl = sessionStorage.getItem('miniUrl');
            //如果当前是小程序环境
            wx.miniProgram.postMessage({
              data: {
                desc: sd.desc,
                imgUrl: sd.imgUrl,
                webViewUrl: '/pages/common/h5/h5?url=' + miniUrl + '&h5=true',
              },
            });
          }
        });
      },
    });
  }
  receivedRegisterAndConcernAward() {
    const isApp = sessionStorage.getItem('isapp');
    this.props.dispatch({
      type: 'IndexModel/receivedRegisterAndConcernAward',
      payload: {
        isAppEnv: isApp,
      },
      callback: res => {
        if (res) {
          this.setState({
            newlywedsStatus: true,
          });
        }
        this.getFirstInfo();
      },
    });
  }
  changeModalClick(status, type) {
    if (type === 'close') {
      this.setState({
        changeStatus: status,
      });
    } else {
      this.setState({
        changeStatus: status,
      });
    }
  }
  render() {
    const {
      flopStatus,
      flowCardStatus,
      newlywedsStatus,
      notStartStatus,
      finishedStatus,
      loginStatus,
      errorText,
      count,
      sent,
      ricePudding,
      userList,
      riceSort,
      riceImg,
      relationStatus,
      isApp,
      activityStatus,
      isMini,
      changeStatus,
      phone,
      code,
    } = this.state;
    // console.log(isMini);
    return (
      <div className={styles.wrapper}>
        <div className={styles.firstScreen}>
          <div className={styles.title}></div>
          {!isApp && !isMini ? (
            <div className={styles.downloadButton}>
              <img
                src={iconDownloadApp}
                onClick={() => {
                  this.downloadApp();
                }}
              />
            </div>
          ) : null}

          <div className={styles.leftButton}>
            <div className={styles.leftItem} onClick={() => this.routerClick('/myGift')}>
              <img src={iconIndexAward} />
              <span>我的奖品</span>
            </div>
            {activityStatus == 1 ? (
              <div className={styles.leftItem} onClick={() => this.routerClick('/winnersList')}>
                <img src={iconIndexList} />
                <span>获奖名单</span>
              </div>
            ) : null}
          </div>
          <div className={styles.advertisement}>
            <img src={index_title}></img>
          </div>
          <div className={styles.activityDate}>
            <span>活动日期:</span>
            <span>6.19-6.25</span>
          </div>
          <div className={styles.cardBox}>
            <div className={`${styles.card} ${flopStatus ? styles.card_front_active : ''}`}>
              <img src={card_back}></img>
            </div>
            <div
              className={`${styles.card} ${
                flopStatus ? styles.card_back_active : styles.card_back
              }`}
            >
              <img src={riceImg}></img>
            </div>
            {flowCardStatus === true ? (
              <TweenOne
                animation={{
                  scale: 0, //缩小50%
                  rotate: 120,
                  bezier: {
                    type: 'soft',
                    autoRotate: false,
                    vars: this.state.points[riceSort],
                  },
                  duration: 2000,
                  onComplete: () => {
                    this.setState({
                      flopStatus: false,
                      momentSecond: 0,
                      flow: true,
                      flowCardStatus: false,
                    });
                    this.state.getCardStatus = false;
                  },
                }}
                paused={this.state.flow}
                moment={this.state.momentSecond}
              >
                <div className={`${styles.card}`}>
                  <img src={riceImg}></img>
                </div>
              </TweenOne>
            ) : null}
          </div>
          <div className={styles.chooseBox}>
            <div
              className={styles.choose}
              onClick={() => {
                this.getCard();
              }}
            >
              点我翻牌
            </div>
          </div>
          <div className={styles.times}>今日可免费翻牌{ricePudding.drawCardCount}次</div>
          <div className={styles.cardInfo}>
            <div>分享活动，增加1次翻卡次数</div>
            <div>邀请好友成功下载APP，增加3次翻卡次数</div>
          </div>
          <div className={styles.ricePudding}>
            <div className={styles.riceItem}>
              <img src={card_white}></img>
              {ricePudding.whiteCount > 0 ? (
                <div className={styles.riceNum}>{ricePudding.whiteCount}</div>
              ) : (
                <div className={styles.riceModal} />
              )}
            </div>
            <div className={styles.riceItem}>
              <img src={card_meat}></img>
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
          <div className={styles.changeButton} onClick={() => this.routerClick('/exchangesGoods')}>
            兑换奖品
          </div>
          <div className={styles.myPrize} onClick={() => this.routerClick('/myGift')}>
            我的奖品
          </div>
          <div className={styles.introTitle}>
            <img src={title_award_setup}></img>
          </div>
          <div className={styles.prizeList}>
            <div className={styles.prizeItem}>
              <div className={styles.imgBox}>
                <img src={award_iphone}></img>
              </div>
              <div className={styles.bottomBox}>
                <div className={styles.prizeLevel}>一等奖</div>
                <div className={styles.prizeName}>iPhone11 Pro Max</div>
              </div>
            </div>
            <div className={styles.prizeItem}>
              <div className={styles.imgBox}>
                <img src={award_photography}></img>
              </div>
              <div className={styles.bottomBox}>
                <div className={styles.prizeLevel}>二等奖</div>
                <div className={styles.prizeName} style={{ width: '1.5rem' }}>
                  盘子女人坊免费摄影卡
                </div>
              </div>
            </div>
            <div className={styles.prizeItem}>
              <div className={styles.imgBox}>
                <img src={award_red_envelope}></img>
              </div>
              <div className={styles.bottomBox}>
                <div className={styles.prizeLevel}>三等奖</div>
                <div className={styles.prizeName}>8.88元现金红包</div>
              </div>
            </div>
            <div className={styles.prizeItem}>
              <div className={styles.imgBox}>
                <img src={award_red_envelope}></img>
              </div>
              <div className={styles.bottomBox}>
                <div className={styles.prizeLevel}>四等奖</div>
                <div className={styles.prizeName}>1.88元现金红包</div>
              </div>
            </div>
          </div>
          {activityStatus != 0 ? (
            <div>
              <div className={styles.introTitle}>
                <img src={title_award_list}></img>
              </div>
              <div className={styles.prizeListPersonListBox}>
                <div className={styles.prizeListPersonList}>
                  {userList.length > 0
                    ? userList.map((item, index) => {
                        return (
                          <div className={styles.prizeListPersonItem} key={index}>
                            {item}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          ) : null}

          <div className={styles.activityRule}>活动规则</div>
          <div className={styles.ruleItem}>
            <div className={styles.ruleTitle}>粽有千种风情，要与他人说</div>
            <div className={styles.ruleTime}>
              <span>活动时间:</span>
              <span>6月19日--6月25日</span>
            </div>
            <div className={styles.ruleCon}>
              活动内容：活动期间，用户每天可以免费翻卡三次，每次都将随机获得一张粽子卡，还可通过其他方式获得额外翻卡机会。粽子卡可兑换奖品。
            </div>
          </div>
          <div className={styles.ruleItem}>
            <div className={styles.ruleTitle}>如何获得更多翻卡机会</div>
            <div className={styles.ruleCon}>
              <p>关注“魔咕圈”公众号，增加五次</p>
              <p>分享活动链接，好友点击链接，增加一次（每天 最多三次）；</p>
              <p>每邀请一名好友成功下载魔咕APP，增加三次 （每天最多成功邀请五名）；</p>
              <p>
                每成功邀请一名好友下载魔咕APP，获得小龙虾粽碎片一张，
                四张小龙虾粽碎片可一次性合成一张小龙虾粽；
              </p>
              <p>魔咕APP内新用户参与活动，免费获赠十张卡；</p>
            </div>
          </div>
          <div className={styles.ruleItem}>
            <div className={styles.ruleTitle}>兑换规则</div>
            <div className={styles.ruleCon}>
              <p>5张白粽卡+5张肉粽卡=1.88元现金（每天可兑换一次）；</p>
              <p>5张豆沙粽卡+5张蛋黄粽卡=8.88元现金（每天可兑换一次）；</p>
              <p>
                白粽卡、肉粽卡、豆沙粽卡、蛋黄粽卡、小龙虾粽卡
                各3张=免费摄影卡一张；（仅能兑换一次）；
              </p>
              <p>
                白粽卡、肉粽卡、豆沙粽卡、蛋黄粽卡、小龙虾粽卡 各5张=iphone11pro max
                一台（仅能兑换一次）；
              </p>
            </div>
          </div>
          <div className={styles.intro}>活动解释权归梦奇科技所有</div>
          {!isApp && !isMini ? (
            <div className={styles.codeBox}>
              <div
                className={`${styles.code} ${styles.leftCode}`}
                onClick={() => {
                  this.downloadApp();
                }}
              >
                <div className={styles.total}>
                  <img src={index_logo}></img>
                </div>
                <div className={styles.codeName}>点击下载app</div>
              </div>
              <div className={`${styles.code} ${styles.rightCode}`}>
                <div className={styles.total}>
                  <img src={index_qrcode}></img>
                </div>
                <div className={styles.codeName}>扫码关注公众号</div>
              </div>
            </div>
          ) : null}
        </div>
        {isApp ? (
          <div
            className={styles.shareButton}
            onClick={() => {
              this.appShare();
            }}
          >
            <img src={iconShare} />
          </div>
        ) : null}

        {newlywedsStatus ? <Newlyweds closeModal={() => this.newlywedsModalClose()} /> : null}
        {notStartStatus ? <NotStart closeModal={() => this.notStartModalClose()} /> : null}
        {finishedStatus ? <Finished closeModal={() => this.finishedModalClose()} /> : null}
        {loginStatus ? (
          <Modal
            setParentState={(status, type) => this.loginModalClick(status, type)}
            name={'绑定手机'}
            okText="绑定手机"
          >
            <LoginModal
              sent={sent}
              count={count}
              phone={phone}
              code={code}
              codeClick={() => this.codeClick()}
              errorText={errorText}
              codeChange={e => this.codeChange(e)}
              phoneChange={e => {
                this.phoneChange(e);
              }}
            />
          </Modal>
        ) : null}
        {relationStatus ? (
          <Modal
            name={'提示'}
            setParentState={(status, type) => this.relationModalClick(status, type)}
            okText="确定关联"
          >
            <div className={styles.relationModal}>您已注册过魔咕帐户，是否关联当前微信？</div>
          </Modal>
        ) : null}
        {changeStatus ? (
          <Modal
            name={'提示'}
            setParentState={(status, type) => this.changeModalClick(status, type)}
            okText="知道了"
          >
            <div className={styles.changeModal}>
              <div>1、活动期间每天会免费赠送三次翻卡机会；</div>
              <div>2、关注“魔咕圈”公众号，增加五次翻卡机会;</div>
              <div>3、分享活动链接，好友点击链接，增加一次翻卡机会（每天最多三次）；</div>
              <div>
                4、每邀请一名好友成功下载魔咕APP，可增加三次抽奖机会（每天最多成功邀请五名）；
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default Index;
