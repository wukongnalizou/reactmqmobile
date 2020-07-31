import wx from 'weixin-js-sdk';

const wxShare = function(sd, url) {
  let link = url;
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
    alert('分享失败');
  });
};
export default wxShare;
