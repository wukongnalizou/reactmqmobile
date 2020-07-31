function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    // console.log("1",window.WebViewJavascriptBridge)
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    // console.log("2")
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  // console.log(WVJBIframe)
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

export default {
  callhandler(name, data, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(name, data, callback);
    });
  },
  registerhandler(name, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      bridge.registerHandler(name, function(data, responseCallback) {
        callback(data, responseCallback);
      });
    });
  },
};
