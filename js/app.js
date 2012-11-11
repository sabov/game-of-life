(function() {

  var Game = {
    init: function() {
      this.config   = App.getConfig();
      this.universe = new App.Universe(this.config);
      this.bindings = new Binding([
        {
          name: 'col',
          selector: 'input[name=columns]',
          range: [3, 101]
        },
        {
          name: 'row',
          selector: 'input[name=rows]',
          range: [3, 101]
        },
        {
          name: 'interval',
          selector: 'input[name=interval]',
          range: [500]
        },
        {
          name: 'density',
          selector: 'input[name=desity]',
          range: [1, 100]
        }
      ], this.config);
      this.initEvents();
    },
    initEvents: function() {
      jQuery('.save-settings').bind('click', this.changeSettings.bind(this));
      jQuery('.cancel').bind('click', this.closeModal.bind(this));
      jQuery('.settings').bind('click', this.openModal.bind(this));
    },
    closeModal: function() {
      jQuery('.modal').modal('hide');
      this.universe.resume();
    },
    openModal: function() {
      jQuery('.modal').modal('show');
      this.universe.pause();
    },
    changeSettings: function() {
      if(this.bindings.getValues()) {
        jQuery('.modal').modal('hide');
        this.universe = new App.Universe(this.bindings.data);
      }
    }
  }

  var Binding = function(bindigs, data) {
    this.bindigs = bindigs;
    this.data = data || {};
    if(data) this.setData();
  }
  Binding.prototype = {
    getValues: function() {
      var success = true;
      this.bindigs.forEach(function(el) {
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

