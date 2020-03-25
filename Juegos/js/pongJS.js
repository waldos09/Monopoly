//************MOTOR GRAFICO********************

//Variables

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
var jugando;
var velocidadPelota = 20;
var velocidadJugador = 15;
var vidas = 3;
var pausa;
var segundos = 30;
var perdiste = false;
var estado = document.getElementById("estado");

//Funciones

function cargarImagenes()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	pelota.renderizar();
	jugador.renderizar();
	cpu.renderizar();
	colision();
	puntos();
}

function update()
{
	ganar();
	cargarImagenes();
	jugando = requestAnimationFrame(update);
	pelota.movimiento();
	jugador.movimiento();
	cpu.movimiento();
}

function iniciar()
{
	update();
}


class Colisiones
{
	colision(obj)
	{
		if(this.fondo < obj.posY || this.posY > obj.fondo
			|| this.derecha < obj.posX || this.posX > obj.derecha)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}

function colision()
{
	if(pelota.colision(jugador))
	{
		pelota.velocidadX = -pelota.velocidadX;
		new Audio('multimedia/jugador.wav').play();
	}
	if (pelota.colision(cpu)) 
	{
		pelota.velocidadX = -pelota.velocidadX;
		new Audio('multimedia/cpu.wav').play();
	}
}


//*****************JUEGO*******************************


//Controles
function mover(event)
{
 var e = event.keyCode;
	 if(e === 40 || e === 83)
	 {
	 	jugador.velocidadY = velocidadJugador;
	 	return true;
	 }
	 else if (e === 38 || e === 87) 
	 {
	 	jugador.velocidadY = -velocidadJugador;
	 	return true;
	 }	
	 else
	 {
	 	alert("CONTROLES: \n" + "W-↑ \n" + "S-↓")
	 	return false;
	 }
}
//Bloquear click derecho
document.addEventListener('contextmenu', event => event.preventDefault());
function detener(event)
{
 var e = event.keyCode;
	 if(e == 40 || e == 83)
	 {
	 	jugador.velocidadY = 0;
	 }
	 if (e == 38 || e == 87)
	 {
	 	jugador.velocidadY = 0;
	 } 	
}
//Pelota
class Pelota extends Colisiones
{
	constructor()
	{
		super();
		this.tamaño = 30;
		this.posX = (canvas.width/2)-(this.tamaño/2);
		this.posY = (canvas.height/2)-(this.tamaño/3);
		this.velocidadX = velocidadPelota;
		this.velocidadY = velocidadPelota;
	}

	movimiento()
	{
		this.posX += this.velocidadX;
		this.posY += this.velocidadY;
		this.fondo = this.posY + this.tamaño;
		this.derecha = this.posX + this.tamaño;
		this.reboteHorizontal();
		this.reboteVertical();
	}

	reboteHorizontal()
	{
		if(this.posX <= 0)
		{
			vidas --;
			this.velocidadX = -this.velocidadX;
			new Audio('multimedia/puntocpu.wav').play();	
			perder();
		}

		if (this.posX >= (canvas.width-this.tamaño)) 
		{
			this.velocidadX = -this.velocidadX;
			new Audio('multimedia/puntojugador.wav').play();
		}
	}

	reboteVertical()
	{
		if(this.posY >= (canvas.height - this.tamaño) || this.posY <= 0)
			this.velocidadY = -this.velocidadY;
	}

	renderizar()
	{
		ctx.fillRect(this.posX,this.posY,this.tamaño,this.tamaño);
	}
}

//Jugador
class Barra extends Colisiones
{
	constructor()
	{
		super();
		this.altura = 150;
		this.ancho = 30;
		this.posX = (this.ancho/2) ;
		this.posY = (canvas.height/2 - this.altura);
		this.velocidadY = 0;

	}
	movimiento()
	{
		if(this.posY <= 0)
		{
			this.posY = 0.01;
			this.velocidadY = 0;
		}
		if(this.posY >= (canvas.height-this.altura))
		{
			this.velocidadY = 0;
			this.posY = canvas.height-this.altura-0.01;
		}
		this.derecha = this.ancho + this.posX;
		this.fondo = this.altura + this.posY;
		this.posY += this.velocidadY;
	}
	renderizar()
	{
		ctx.fillRect(this.posX,this.posY,this.ancho,this.altura);
	}
}

//IA
class CPU extends Colisiones
{
	constructor()
	{
		super();
		this.altura = 150;
		this.ancho = 30;
		this.posX = (canvas.width -this.ancho*1.5);
		this.posY = (canvas.height/2 - this.altura/2);
		this.velocidadY = pelota.velocidadY;

	}

	movimiento()
	{
		if(this.posY <= 0)
		{
			this.posY = 0;
			this.velocidadY = 0;
		}
			
		if(this.posY >= (canvas.height-this.altura))
		{
			this.velocidadY = 0;
			this.posY = canvas.height-this.altura;
		}
		this.posY += pelota.velocidadY*0.8;
		this.derecha = this.ancho + this.posX;
		this.fondo = this.altura + this.posY;
	}

	renderizar()
	{
		ctx.fillRect(this.posX,this.posY,this.ancho,this.altura);
	}
}


//DECORACION

function puntos()
{
	//Dibujar Red

	ctx.setLineDash([30,30]);
	ctx.beginPath();
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,canvas.height );
	ctx.strokeStyle = 'white';
	ctx.stroke();
	ctx.lineWidth = 7;

	//Temporizador
	ctx.font = "800 80px Courier New";
	if(tiempo <= 5)
	{
		ctx.fillStyle = "red";
	}
	ctx.fillText(tiempo ,(canvas.width) -200,80);

	//Mensaje al perder
	if (perdiste) 
	{
		slowMo();
		ctx.fillStyle = "red";
		ctx.fillText("Game Over",(canvas.width/2) - 210,canvas.height/2);
		alert("perdiste");
		window.close(500);
	}	

	//Mensaje al ganar
	if(!perdiste && tiempo <= 0)
	{
		slowMo();
		ctx.fillStyle = "lime";
		ctx.fillText("Ganaste",(canvas.width/2) - 180,canvas.height/2);
	}

	//Mostrar Controles
	//ctx.fillText("w:↑ s:↓",20,90);
}


//Temporizador
var tiempo = 30;
	var cuenta = setInterval(function() 
	{
    tiempo--;
    if(tiempo <= 0)
    	{
    		clearInterval(cuenta);
    	}
	}, 1000);

function perder()
{
	//estado.innerHTML= "Perdiste";
	perdiste = true;
	setInterval(function()
	{
		window.location="index.html";
	},5000)
}

function ganar()
{
	if(!perdiste && tiempo <= 0)
	{
		//estado.innerHTML ="Ganaste";
		setInterval(function()
		{
			window.location="index.html";
		},5000)
	}
}

//Efecto Slow Motion
function slowMo()
{
	velocidadJugador = 0.5;
	pelota.velocidadX = 0.5;
	pelota.velocidadY = 0.5;
}

//Objetos
var pelota = new Pelota();
var jugador = new Barra();
var cpu = new CPU();