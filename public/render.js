var championClient = function( renderer ){
	var myRenderer = renderer || new renderer;

	myRenderer.setUp();

	openWebsocketListenForServer( newObjects ){
		myRenderer.loadObjects( newObjects );
		myRenderer.step();
	}
}

var Renderer = function( stage ){
	this.myStage = stage || document.getElementById('stage');
	this.sprites = [];
}

Renderer.prototype = {
	setUp : function( sprites ){
		this.sprites.push( buildChamp );
		this.sprites.concat( buildStairs );
		for (var attrId in sprites)

	},
	loadObjects : function( sprites ){
		//add all objects to sprites array
	},
	step : function(){
		//remove all 'dead' sprites from array
		//Render all sprites in array

		//NOTE: maybe 1 step is multiple frames
	}
}

var buildChamp = function(){
	return new Sprite({
		path : "./assets/champ.gif",
		lifeTime : -1,
		position : {
			x : 300,
			y : 200,
			z : 10
		},
		xVel : 0,
		yVel : 0
	});
}

var buildStairs = function(){
	var stairSprites = [];
	for (var i = 0; i < 25; i++ ){
		stairSprites.push(
			new Sprite({
				path : "./assets/stair.gif",
				lifeTime : i*2,
				position : {
					x : i*8,
					y : i*12 + 12,
					z : 10
				},
				xVel : -1,
				yVel : 1
			})
		);
	}
}

var nextStep = function(){
	return new Sprite({
		path : "./assets/stair.gif",
		lifeTime : 50,
		position : {
			x : 600,
			y : 400 + 12,
			z : 10
		},
		xVel : -1,
		yVel : 1
	});
}

var Sprite = function( spriteJSON ){
	this.path = spriteJSON.path;
	this.lifeTime = spriteJSON.lifeTime;
	this.position = {
		x : spriteJSON.x,
		y : spriteJSON.y,
		z : spriteJSON.z};
	this.xVel = spriteJSON.xVel;
	this.yVel = spriteJSON.yVel;
}