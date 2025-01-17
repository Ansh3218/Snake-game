// Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodsound = new Audio('Music Folder/eating-sound-effect-36186.mp3');
const gameOversound = new Audio('Music Folder/080047_lose_funny_retro_video-game-80925.mp3');
const moveSound = new Audio('Music Folder/90s-game-ui-6-185099_ENfTytZR.mp3');
const musicSound = new Audio('Music Folder/8-bit-background-music-for-arcade-game-come-on-mario-164702.mp3');
let speed = 10
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food  = {x: 12, y: 14};



// Game Function

function main(ctime){
window.requestAnimationFrame(main);
// console.log(ctime)
if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
}
lastPaintTime = ctime;
gameEngine();
}
function isCollide(snake){
    // *!_-_-_!* if you bump into yourself *!_-_-_!*
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    // ?--"."--?Part 1: Updating the snake array & Food

    if(isCollide(snakeArr)){
        gameOversound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }


    // If you have eaten the food, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }


    // *__* Moving the snake *-_-*
   for (let i = snakeArr.length - 2; i>=0;i--) {
    // const element = array[i];
    snakeArr[i+1] = {...snakeArr[i]}
   }
   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;


      



    // !--Part 2: Display the snake and Food--!

    // !---'.'---Display the snake!---'.'--- //

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // !---'.'---! Display the Food !---'.'---! //

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}







// Mail logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
     inputDir = {x: 0, y: 1} // Start Game
     moveSound.play();
     switch (e.key) {
        case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;

        case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
        default:
            break;
     }
})