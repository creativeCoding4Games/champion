// TODO - finish client code
/*
var championClient = function( renderer ){
	var myRenderer = renderer || new renderer;

	myRenderer.setUp();

	openWebsocketListenForServer( newObjects ){
		myRenderer.loadObjects( newObjects );
		myRenderer.step();
	}
}
*/

module.exports = Renderer;

function Renderer(stage) {
	this.myStage = stage;
  this.ctx = stage.getContext('2d');
	this.sprites = [];
  this.stairCount = 0;
}

Renderer.prototype = {
	setUp : function( sprites ){
    this.sprites =
      [buildChamp()]
      .concat(buildStairs())
      .concat(sprites.map(function (sprite) {
        return new Sprite(sprite);
      }));
	},
	loadObjects : function( sprites ){
    for (var index in sprites) {
      var sprite = new Sprite(sprites[index]);
      this.sprites.push(sprite);
    }
	},
	step : function(){
    var ctx = this.ctx;
    var width = this.myStage.width;
    var height = this.myStage.height;

    this.stairCount += 1;
    if (this.stairCount === 8) {
      this.loadObjects([nextStair(-1)]);
      this.stairCount = 0;
    }

    var sprites = this.sprites;

    sprites.filter(function (sprite) {
      return sprite.isDead();
    }).forEach(function (sprite) {
      sprites.splice(sprites.indexOf(sprite), 1);
    });

    ctx.clearRect(0, 0, width, height);

    sprites.sort(function (a, b) {
      return b.position.z - a.position.z;
    }).forEach(function (sprite) {
      sprite.step();
      sprite.render(ctx);
    });
	}
}

var buildChamp = function(){
	return new Sprite({
		path : "./assets/rocky run2.gif",
		lifeTime : -1,
		position : {
			x : 300,
			y : 200,
			z : 0
		},
		xVel : 0,
		yVel : 0
	});
}

var nextStair = function(i) {
	return new Sprite({
		path : "assets/stair.png",
		lifeTime : 400 - i * 8,
    position : {
      x : 530 - i*8,
      y : i*8,
      z : 10
    },
    xVel : -1,
    yVel : 1
	});
}

var buildStairs = function(){
	var stairSprites = [];
	for (var i = -1; i < 50; i++ ){
		stairSprites.push(nextStair(i));
	}
  return stairSprites;
}



var Sprite = function( spriteJSON ){
	this.path = spriteJSON.path;
	this.lifeTime = spriteJSON.lifeTime;
	this.position = {
		x : spriteJSON.position.x,
		y : spriteJSON.position.y,
		z : spriteJSON.position.z
  };
	this.xVel = spriteJSON.xVel;
	this.yVel = spriteJSON.yVel;

  this._failed = false;
  this.img = new Image();
  this.img.src = this.path;
  this.img.onerror = this._onLoadFailure.bind(this);
}

Sprite.prototype = {
  step: function () {
    this.position.x += this.xVel;
    this.position.y += this.yVel;
    if (this.lifeTime > 0) {
      this.lifeTime -= 1;
    }
  },
  isDead: function () {
    return this.lifeTime === 0;
  },
  render: function(ctx) {
    if (this.img.complete && !this._failed) {
      ctx.drawImage(this.img, this.position.x, this.position.y);
    }
  },
  _onLoadFailure: function(e) {
    this._failed = true;
    console.error(e);
  }
};
