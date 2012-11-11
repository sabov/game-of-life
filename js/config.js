var App = (function(){
  var config = {
    interval : 1000,
    col      : 100,
    row      : 40,
    density  : 20
  };
  var getConfig = function() {
    return config;
  };
  return {
    getConfig : getConfig
  }
})();
