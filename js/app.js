(function() {

  var Game = {
    init: function() {
      this.config   = App.getConfig();
      this.universe = new App.Universe(this.config);
      new Binding([
        {
          name: 'col',
          selector: 'input[name=columns]',
          rate: [3, 100]
        },
        {
          name: 'row',
          selector: 'input[name=rows]',
          rate: [3, 100]
        },
        {
          name: 'interval',
          selector: 'input[name=interval]',
          rate: [500]
        },
        {
          name: 'density',
          selector: 'input[name=desity]',
          rate: [1, 100]
        }
      ], this.config);
    },
    initEvents: function() {
      jQuery('.save-settings').bind('click', changeSettings.bind(this));
    },
    changeSettings: function() {
    }
  }

  var Binding = function(bindigs, data) {
    this.bindigs = bindigs;
    this.data = data || {};
    if(data) this.setData();
  }
  Binding.prototype = {
    getValues: function() {
      this.bindigs.forEach(function(el) {
        var success = true;
        var input = jQuery(el['selector']);
        if(this.validate(el)) {
          this.data[el.name] = input.val();
          input.removeClass('error');
        }else {
          input.addClass('error');
          success = false;
        }
      }.bind(this));
      return success;
    },
    setData: function() {
      this.bindigs.forEach(function(el) {
        var input = jQuery(el['selector']);
        console.log(input);
        if(this.data[el.name]) {
          input.val(this.data[el.name]);
        }
      }.bind(this));
    },
    validate: function(el) {
      var input = jQuery(el['selector']);
      if(el.range.length == 1) {
        return input.val() > el.range[0];
      } else {
        return input.val() > el.range[0] && input.val() < el.range[1];
      }
    }
  }

  jQuery(function() {
    Game.init();
  });

})();

