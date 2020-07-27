

function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 65;

	food = getRandomfood();

	snake = {
		init_len : 5,
		color : "red",
		cells :[],
		direction : "right",

		createSnake : function(){
			for(let i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0})
			}
		},

		drawSnake : function(){
			pen.fillStyle = this.color;
			for(let i=0;i<this.cells.length;i++){
			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);}
		},
		updateSnake : function(){

				
				var Headx = this.cells[0].x;
				var Heady = this.cells[0].y;

				if(Headx == food.x && Heady == food.y){
					food = getRandomfood();
				}
				else {
					this.cells.pop();
				}

				if(this.direction == "right"){
					var X = Headx + 1;
					var Y = Heady;
					if(X*cs>W) X = 0;
					this.cells.unshift({x:X,y:Y});
				}
				else if(this.direction == "left"){
					var X = Headx - 1;
					var Y = Heady;
					if(X<0) X=Math.round(W/cs);

					this.cells.unshift({x:X,y:Y});
				}
				else if(this.direction == "up"){
					var X = Headx;
					var Y = Heady - 1;
					if(Y<0) {Y = Math.round(H/cs);}
					this.cells.unshift({x:X,y:Y});
				}
				else if(this.direction == "down"){
					var X = Headx;
					var Y = Heady + 1;
					if(Y*cs>H) Y = 0;
					this.cells.unshift({x:X,y:Y});
				}
		}
	};
	snake.createSnake();

	function keyPressed(e){
		console.log("key is pressed",e.key);
		if(e.key == "ArrowRight"){
			snake.direction = "right";
		}
		if(e.key == "ArrowDown"){
			snake.direction = "down";
		}
		if(e.key == "ArrowLeft"){
			snake.direction = "left";
		}
		if(e.key == "ArrowUp"){
			snake.direction = "up";
		}
	}
	document.addEventListener('keydown',keyPressed);
}
function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle = food.color;
	pen.fillRect(food.x*cs,food.y*cs,cs,cs)


}
function update(){
	snake.updateSnake();
}

function getRandomfood(){
	var Foodx = Math.round(Math.random()*((W-cs)/(cs)));
	var Foody = Math.round(Math.random()*((H-cs)/(cs)));
	var food = {
		x:Foodx,
		y:Foody,
		color: "yellow",
	}
	return food;
}

function gameloop(){
	draw();
	update();
}

init();
var f = setInterval(gameloop,100)