  
// Selecciona el canvas
const canvas = document.getElementById("pong");

// dibujar
const ctx = canvas.getContext('2d');

// sonidero
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sonidos/uf.mp3";
wall.src = "sonidos/.mp3";
comScore.src = "sonidos/noo.mp3";
userScore.src = "sonidos/win.mp3";

// pelota
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// jugador
const user = {
    x : 0, // tamaño
    y : (canvas.height - 100)/2, // altura
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// computadora
const com = {
    x : canvas.width - 10, // - tamaño
    y : (canvas.height - 100)/2, // altura
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// dibujar rectangulo
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// dibujar circulo
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// pa que se mueva
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// cuando uno anota
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// dibujar
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// texto
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// colisiones shidas
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// calcular 
function update(){
    
    // el puntaje
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // velocidad de la pelota
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // Pa que se mueva la computadora
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
    // colisiones
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    
    // checa
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    // pelota con paleta
    if(collision(ball,player)){
        // sonido que choca
        hit.play();

        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        
        // movimiento
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // Que suba la velocidad.
        ball.speed += 0.1;
    }
    if (com.score>5){
       alert("Perdiste");
       window.close();
    }
    
}

function render(){
    
    // limpiar el canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // puntaje del uisuario
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // puntaje de la maquina
    drawText(com.score,3*canvas.width/4,canvas.height/5);

    
    // dibuja 
    drawNet();
    
    // dibuja al jugador
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // dibuja la computadora
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // dibujar la pelota
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
// numero de frames
let framePerSecond = 50;

//loop pa que se llame
let loop = setInterval(game,1000/framePerSecond);