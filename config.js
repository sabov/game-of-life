var App = (function(){
  var config = {
    interval : 1000,
    col      : 40,
    row      : 100,
    density  : 20
  };
  var getConfig = function() {
    return config;
  };
  return {
    getConfig : getConfig
  }
})();
