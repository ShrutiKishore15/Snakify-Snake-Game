//Game constants and variables
let snakeVelocity={x:0, y:0};
const foodSound=new Audio('../static/snakeTurn.mp3');
const gameOverSound=new Audio('../static/gameOver.mp3');
const moveSound=new Audio('../static/snakeMove.mp3');
const gameSound=new Audio('../static/Snake Music.mp3');
const clickSound=new Audio('../static/gameClick.wav');
let speed=10;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
]
let food={x:7, y:8};
let score=0;
 
//Game functions
function firstStart(){
    startscreen=document.getElementById("startScreen");
    gameRegion1=document.getElementById("gameRegion");
    gameRegion1.style.display="none";
    startscreen.style.display="block";
}
function firstStartGame(){
    clickSound.play();
    startscreen=document.getElementById("startScreen");
    gameRegion2=document.getElementById("gameRegion");
    startscreen.style.display="none";
    gameRegion2.style.display="grid";
    main(ctime);
    
}
function start(){
    clickSound.play();
    scoreBox.innerHTML="Score: "+0;
    score=0;
    gameOver=document.getElementById("gameOver");
    gameRegion3=document.getElementById("gameRegion");
    gameRegion3.style.display="grid";
    gameOver.style.display="none";
    main(ctime);
}
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}
function isCollide(snake){
    //if snake bumps into itself
    for(let i=1; i<snake.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if snake bumps into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }

}
function stop(){
    gameOver=document.getElementById("gameOver");
    gameRegion=document.getElementById("gameRegion");
    gameRegion.style.display="none";
    gameOver.style.display="block";

    
}
function gameEngine(){
    //1.Update snake array
    if(isCollide(snakeArr)){
       
        gameSound.pause();
        gameOverSound.play();
        snakeVelocity={x:0, y:0};
        //alert("Game Over! Press any key to play again!");
        stop();
        snakeArr=[
            {x:13, y:15}
        ];
        gameSound.play();
        score=0;
    }
   
    //If food is eaten, increase score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=5;
        if(score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML="HighScore: "+ highScoreVal;
        }
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x+snakeVelocity.x, y: snakeArr[0].y+snakeVelocity.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake
    for (let i =snakeArr.length-2; i >=0; i--) {
        //const element = array i;
        snakeArr[i+1]={...snakeArr[i]};
        
    } 
    snakeArr[0].x+=snakeVelocity.x;
    snakeArr[0].y+=snakeVelocity.y;


    //2.Display the snake and food
    //display snake
    gameRegion.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
       
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        gameRegion.appendChild(snakeElement);
    })

    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    gameRegion.appendChild(foodElement);
}







//Main logic
gameSound.play();
let highScore=localStorage.getItem("highScore");
let highScoreVal=0;
if(highScore === null){
    highScoreVal=0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}else{
    highScoreVal=JSON.parse(highScore);
    highScoreBox.innerHTML="HighScore: "+ highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    snakeVelocity={x:0, y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            snakeVelocity.x=0;
            snakeVelocity.y=-1;
            break;
        case "ArrowDown":
            snakeVelocity.x=0;
            snakeVelocity.y=1;
            break;
        case "ArrowRight":
            snakeVelocity.x=1;
            snakeVelocity.y=0;
            break;
        case "ArrowLeft":
            snakeVelocity.x=-1;
            snakeVelocity.y=0;
            break;
        default:
            break;
    }
})
