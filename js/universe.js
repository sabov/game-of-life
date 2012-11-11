(function() {

//Universe
  App.Universe = function(options) {
    var row = options.row * 1;
    var col = options.col * 1;
    this.intervalId;
    this.options = options;
    this.arr  = new Randomizer(row, col, options.density * 1);
    this.grid = new Grid('canvas', row, col);
    this.startGame(options.interval * 1);
  }
  App.Universe.prototype = {
    startGame : function(interval) {
      this.refresh();
      this.intervalId = setInterval(function() {
        this.arr = this.nextStep();
        this.refresh();
      }.bind(this), interval);
    },
    pause : function() {
      clearInterval(this.intervalId);
    },
    resume : function() {
      this.startGame(this.options.interval);
    },
    refresh : function() {
      this.grid.refresh();
      this.arr.each(function(el, i, j, origArr) {
        if(el()) this.grid.drawCell(i, j);
      }.bind(this));
    },
    nextStep : function() {
      var newStepArr = new TdArray(this.arr.row, this.arr.col);
      newStepArr.each(function(el, i, j, origArr) {
        var subArr = this.getSubArr(i, j);
        el(this.checkNeighbors(subArr));
      }.bind(this));
      return newStepArr;
    },
    checkNeighbors : function(arr) {
      var count = 0;
      var result = false;
      var live   = false;
      arr.each(function(el, i, j) {
        if(el()) {
          count++;
          if(i == 1 && j == 1) {
            live = true;
          }
        }
      });
      if(count == 3 || (count == 4 && live)) result = true;
      return result;
    },
    getSubArr : function(i, j) {
      var subArr = new TdArray(3, 3);
      subArr.each(function(el, subI, subJ) {
        var value = this.arr(i - 1 + subI, j - 1 + subJ);
        el(value);
      }.bind(this))
      return subArr;
    }
  }

//Helper for canvas
  var Grid = function(canvas, row, col) {
    this.canvas = document.getElementById(canvas);
    this.ctx    = this.canvas.getContext("2d");
    this.offset = 0;
    this.setSize(row, col);
    this.needRefresh = false;
    jQuery(window).bind('resize', function() {
      this.needRefresh = true;
    }.bind(this));
  }
  Grid.prototype = {
    setSize : function(row, col) {
      this.row = row;
      this.col = col;
      this.canvas.width  = innerWidth;
      this.canvas.height = innerHeight;
      this.colWidth  = (this.canvas.width/this.col);
      this.rowHeight = (this.canvas.height/this.row);
      this.width  = col * this.colWidth;
      this.height = row * this.rowHeight;
      this.needRefresh = false;
    },
    refresh : function() {
      this.clearCanvas();
      if(this.needRefresh) this.setSize(this.row, this.col);
      this.drawGrid(this.row, this.col);
    },
    clearCanvas : function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawGrid : function(row, col) {
      this.ctx.lineWidth = 0.2;
      this.ctx.strokeStyle = "#CCCCCC";
      var offset = this.offset;

      for (var px = 0; px <= this.width; px += this.colWidth) {
        this.ctx.moveTo(offset + px, 0);
        this.ctx.lineTo(offset + px, this.height);
      }
      for (var px = 0; px <= this.height; px += this.rowHeight) {
        this.ctx.moveTo(0, offset + px);
        this.ctx.lineTo(this.width, offset + px);
      }
      this.ctx.stroke();
    },
    drawCell : function(row, col) {
      var offset = this.offset;
      var y1 = row * this.rowHeight;
      var x1 = col * this.colWidth;
      this.ctx.fillStyle="#BBBBBB";
      this.ctx.fillRect(x1 + offset, y1 + offset, this.colWidth - offset, this.rowHeight - offset);
    }
  }

//Geting random input for universe
  var Randomizer = function(row, col, density) {
    var arr = new TdArray(row, col);
    arr.each(function(el, i, j, arr) {
      var r = Math.floor(Math.random()*Math.sqrt(row*col)/(density/2));
      el(r == 0? true : false);
    });
    return arr;
  }

//two-dimensional array
  var TdArray = function(row, col) {
    var arr = new Array(row);
    for(var i = arr.length - 1; i >= 0; i--) {
      arr[i] = new Array(col);
    }

    //geting access to value in array like arr(i, j)
    var fn = function(i, j) {
      if(i < 0) i = row + i;
      if(j < 0) j = col + j;
      if(i > row - 1) i = i - row;
      if(j > col - 1) j = j - col;
      return arr[i][j];
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

    fn.debug = function() {
      arr.forEach(function(el) {
        console.log(el);
      });
    }
    return fn;
  }

})();
