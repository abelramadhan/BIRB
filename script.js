const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
let speed = 0;
let pipeGap = 200;
const gravity = 0.2;
let score = 0;

let birb = {
    x : 50, 
    y : 250
}

let pipe = [];
pipe[0] = {
    x : 410,
    top : Math.floor(Math.random()*400),
};

document.addEventListener("keydown",jump);
document.addEventListener("click",jump);
function jump() {
   birb.y -= 100;
   speed = 0;
}
   
function draw() {
    ctx.fillStyle = "#1f1f1f"
    ctx.fillRect(0,0,400,650);
    ctx.fillStyle = "#ebde34";
    ctx.fillRect(birb.x,birb.y,30,30);
    ctx.fillStyle = "#54a326";
    for (let i=0;i<pipe.length;i++) {
        ctx.fillRect(pipe[i].x,0,50,pipe[i].top);
        let bot = pipe[i].top+pipeGap;
        let bot1 = 650-bot;
        ctx.fillRect(pipe[i].x,bot,50,bot1);

        pipe[i].x -= 2;

        if (pipe[i].x==150) {
            pipe.push({
                x : 410,
                top : Math.floor(Math.random()*400),
            })
        }

        if (pipe[i].x==birb.x) {
            score += 1;
            document.getElementById("score1").innerHTML=score;
        }

        if (birb.x+30>pipe[i].x&&birb.y+30<pipe[i].top&&birb.x<pipe[i].x+50||
            birb.x+30>pipe[i].x&&birb.y+30>bot&&birb.x<pipe[i].x+50||
            birb.y<=pipe[i].top&&birb.x>=pipe[i].x&&birb.x<=pipe[i].x+50||
            birb.y+30>bot&&birb.x>=pipe[i].x&&birb.x<=pipe[i].x+50) {
            document.getElementById("gameover").style.visibility = "visible";
            document.getElementById("score").innerHTML = "score : "+score;
            document.getElementById("score1").style.visibility = "hidden";
            cancelAnimationFrame();   
        }
    } 
 
    if (birb.y<620) {
        birb.y += speed; 
    } else {
        birb.y = 620;  
    }
    
    if (speed<10) {
    speed = speed+gravity; 
    }
   
    requestAnimationFrame(draw);
} 

draw();

function restart() {
    location.reload();
}
