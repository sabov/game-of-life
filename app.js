(function() {

//main class
  var App = function(canvas) {
    var arr = new Randomizer(20, 10);
    var canvas  = document.getElementById(canvas);
    this.ctx    = canvas.getContext("2d");
    var context = this.ctx;
    this.width  = canvas.width = innerWidth;
    this.height = canvas.height = innerHeight;
    this.drawGrid(20, 10);
    arr.each(function(el, i, j, origArr) {
      if(el())this.drawCell(i, j);
    }.bind(this));
  }
  App.prototype = {
    drawGrid : function(col, row) {
      var context    = this.ctx;
      this.colWidth  = Math.round(this.width/col);
      this.rowHeight = Math.round(this.height/row);

      context.lineWidth = 0.2;
      context.strokeStyle = "black";

      for (var px = 0; px <= this.width; px += this.colWidth) {
        context.moveTo(0.5 + px, 0);
        context.lineTo(0.5 + px, this.height);
      }
      for (var px = 0; px <= this.height; px += this.rowHeight) {
        context.moveTo(0, 0.5 + px);
        context.lineTo(this.width, 0.5 + px);
      }
      context.stroke();
    },
    drawCell : function(col, row) {
      var c = this.ctx;
      var x1 = col * this.colWidth;
      var y1 = row * this.rowHeight;
      //console.log([x1, y1, x1 + this.colWidth, y1 + this.rowHeight]);
      c.fillStyle="#999999";
      c.fillRect(x1, y1, this.colWidth, this.rowHeight);
    }
  }

//Universe
  var Universe = function(col, row) {
  }
  Universe.prototype = {
    
  }

//Geting random input for universe
  var Randomizer = function(col, row) {
    var arr = new TdArray(col, row);
    arr.each(function(el, i, j, arr) {
      var r = Math.floor(Math.random()*5);
      el(r == 0? true : false);
    });
    return arr;
  }

//two-dimensional array
  var TdArray = function(col, row) {
    var arr = new Array(col);
    for(var i = arr.length - 1; i >= 0; i--) {
      arr[i] = new Array(row);
    }

    //geting access to value in array like arr(i, j)
    var fn = function(x, y) {
      return arr[x][y];
    }

    //loop through the array
    fn.each = function(callback) {
      for(var i = 0, iLength = arr.length; i < iLength; i++) {
        for(var j = 0, jLength = arr[i].length; j < jLength; j++) {
          callback(function(value) {
            if(value != undefined) {
              arr[i][j] = value;
            }
            return arr[i][j];
          }, i, j, arr);
        }
      }
    }

    fn.getArray = function() {
      return arr;
    }

    return fn;
  }

  //helper function
  var bindReady = function(callback) {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function(){
        callback();
      }, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function(){
        if (document.readyState === "complete") {
          callback();
        }
      });
    }
  };

  bindReady(function(){
    new App('canvas');
  });

})();
debug = console.log;
