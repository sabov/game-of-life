var App = (function(){
  var config = {
    interval : 1000,
    col      : 100,
    row      : 100,
    density  : 30
  };
  var getConfig = function() {
    return config;
  };
  return {
    getConfig : getConfig
  }
})();
