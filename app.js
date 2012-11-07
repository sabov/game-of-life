(function() {

//Universe
  var Universe = function(col, row) {
    this.arr  = new Randomizer(col, row);
    this.grid = new Grid('canvas', col, row);
    this.refresh();
    this.nextStep();
  }
  Universe.prototype = {
    refresh : function() {
      this.arr.each(function(el, i, j, origArr) {
        if(el()) this.grid.drawCell(i, j);
      }.bind(this));
    },
    nextStep : function() {
      this.arr.each(function(el, i, j, origArr) {
        var neighbor = this.arr.getNeighborSumm(i, j);
      }.bind(this));
    }
    getNeighborSumm : function(i, j) {
      if(i < 0 || j < 0 || i > r - 1 || j > c)
      var result = 0;
      if(i == 0) {
        result += a(c, j - 1);
        result += a(c, j);
        result += a(c, j + 1);
      }else {
        result += a(i - 1, j - 1);
        result += a(i - 1, j);
        result += a(i - 1, j + 1);
      }
      if(i == r - 1) {
        result += a(c, j - 1);
        result += a(c, j);
        result += a(c, j + 1);
      }
    },
    getSubArr : function(i, j) {
      var a = this.arr;
      var c = a.col;
      var r = a.row;
      var subArr = new TdArray(3, 3);
      if(i > 0 && j > 0 && i < c - 1 && j < r - 1) {
        subArr.each(function(el, subI, subJ) {
          var value = a(i - 1 + subI, j - 1 + subJ);
          el(value);
        })
      } else if(i == 0 && j == 0) {
        var origSubArr = subArr.getArray();

      }
    }


  }

//Helper for canvas
  var Grid = function(canvas, col, row) {
    this.canvas = document.getElementById(canvas);
    this.ctx    = this.canvas.getContext("2d");
    this.setSize(col, row);
    this.refresh();
  }
  Grid.prototype = {
    setSize : function(col, row) {
      this.col = col;
      this.row = row;
    },
    refresh : function() {
      this.width  = this.canvas.width = innerWidth;
      this.height = this.canvas.height = innerHeight;
      this.colWidth  = Math.round(this.width/this.col);
      this.rowHeight = Math.round(this.height/this.row);
      this.drawGrid(this.col, this.row);
    },
    drawGrid : function(col, row) {

      this.ctx.lineWidth = 0.2;
      this.ctx.strokeStyle = "black";

      for (var px = 0; px <= this.width; px += this.colWidth) {
        this.ctx.moveTo(0.5 + px, 0);
        this.ctx.lineTo(0.5 + px, this.height);
      }
      for (var px = 0; px <= this.height; px += this.rowHeight) {
        this.ctx.moveTo(0, 0.5 + px);
        this.ctx.lineTo(this.width, 0.5 + px);
      }
      this.ctx.stroke();
    },
    drawCell : function(col, row) {
      var x1 = col * this.colWidth;
      var y1 = row * this.rowHeight;
      this.ctx.fillStyle="#999999";
      this.ctx.fillRect(x1, y1, this.colWidth, this.rowHeight);
    }
  }

//Geting random input for universe
  var Randomizer = function(col, row) {
    var arr = new TdArray(col, row);
    arr.each(function(el, i, j, arr) {
      var r = Math.floor(Math.random()*7);
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
    };
    fn.row = row;
    fn.col = col;

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
    };

    fn.getArray = function() {
      return arr;
    };

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
    new Universe(40, 20);
  });

})();
