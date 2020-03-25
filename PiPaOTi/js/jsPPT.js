let userScore= 0;
let compScore= 0;
const userScore_span= document.getElementById('user-score');
const compScore_span= document.getElementById('comp-score');
const scoreBoard_div= document.querySelector('marcador');
const result_div= document.querySelector('.result p');
const piedra_div= document.getElementById('rock');
const papel_div= document.getElementById('paper');
const tijera_div= document.getElementById('scissor');
var intentos=0;

function movidaComp(){
  const opciones= ['r','p','t'];
  const random= Math.floor(Math.random() * 3);
  const movida= opciones[random];
  return (movida);
}
function convertirLetra(opcion){
  if (opcion == 'r'){
    return "Piedra";
  }else if (opcion == 'p') {
    return "Papel";
  }else {
    return "Tijeras";
  }
}

function ganar(opcionUser, opcionPc){
  userScore++;
  //esta es la parte donde te da la puntuacion uwuwuwuwuwuwuwuuw--------------------------------------------------------------------------------
  userScore_span.innerHTML= userScore;

  result_div.innerHTML= convertirLetra(opcionUser)+" le gana a "+convertirLetra(opcionPc)+".<br>  ganaste    <br><br><br><a href='index.html'>regresar al tablero uwu</a>";
  const userChoice_div= document.getElementById(opcionUser);
  const pcChoice_div= document.getElementById(opcionPc);
  userChoice_div.classList.add('verde');
  pcChoice_div.classList.add('rojo');
  setTimeout(function(){
    userChoice_div.classList.remove("verde");
    pcChoice_div.classList.remove("rojo");

  }, 2000);
}

function pierda(opcionUser, opcionPc){
  compScore++;
  compScore_span.innerHTML= compScore;
  result_div.innerHTML= convertirLetra(opcionPc)+" le gana a "+convertirLetra(opcionUser)+".<br> perdiste    <br><br><br><a href='index.html'>regresar al tablero uwu</a>";
  alert("Perdiste");
  window.close(500);
  const userChoice_div= document.getElementById(opcionUser);
  const pcChoice_div= document.getElementById(opcionPc);
  userChoice_div.classList.add('rojo');
  pcChoice_div.classList.add('verde');
  setTimeout(function(){
    userChoice_div.classList.remove("rojo");
    pcChoice_div.classList.remove("verde");
  }, 2000);
}

function empate(opcionUser){

  result_div.innerHTML= "Ambos eligieron "+convertirLetra(opcionUser)+".<br> Empate   <br><br><br><a href='index.html'>regresar al tablero uwu</a>";
  const opcion_div= document.getElementById(opcionUser);
  opcion_div.classList.add('gris');
  setTimeout(function(){
    opcion_div.classList.remove("gris");
  }, 2000);
}

function game(opcion){
  //si solo quieres que sea mas de uno entonces subele los intentos posibles----------------------------------------------------
  if(intentos<1){
  intentos=intentos+1;
  const movidaPc= movidaComp();
  const movidaUser= opcion;
  switch (movidaUser+movidaPc) {
    case 'rt':
    case 'pr':
    case 'tp':
    ganar(movidaUser, movidaPc);
  break;
    case 'rp':
    case 'pt':
    case 'tr':
    pierda(movidaUser, movidaPc);
  break;
    case 'rr':
    case 'pp':
    case 'tt':
    empate(movidaUser);
  break;

  }
  }

}

function main(){
  piedra_div.addEventListener('click', () => game("r"));
  papel_div.addEventListener('click', () => game("p"));
  tijera_div.addEventListener('click', () => game("t"));
}
main();
