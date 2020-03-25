

window.onload = function() {
  
  var rollButton = document.getElementById("rollButton");
  rollButton.onclick = Game.takeTurn;

 
  Game.populateBoard();
};


var Game = (function() {
  
  var game = {};

  
  game.squares = [
    new Square("¿Quien es ese Pokemon?", 100, "square2"),
    new Square("Pong", 150, "square3"),
    new Square("Pong2", 200, "square4" ),
    new Square("Gato", 250, "square5"),
    new Square("Piedra,Papel o Tijera", 300, "square6"),
    new Square("Breakout", 350, "square7"),
    new Square("¿Quien es ese Pokemon?", 400, "square8"),
    new Square("Pong", 450, "square9"),
    new Square("Breakout", 500, "square10"),
    new Square("Gato", 550, "square11"),
    new Square("Piedra,Papel o Tijera", 600, "square12" /* document.location.href="/Q4/s64/index.html"*/)
  ];
  

  
  game.players = [
    new Player("Q", 1000, "Triangle", "player1"),
    new Player("Z", 1000, "Circle", "player2")
  ];

  
  game.currentPlayer = 0;

 
  game.populateBoard = function() {
    
    for (var i = 0; i < this.squares.length; i++) {
      
      var id = this.squares[i].squareID;

     
      var squareName = document.getElementById(id + "-name");
      var squareValue = document.getElementById(id + "-value");
      var squareOwner = document.getElementById(id + "-owner");

      squareName.innerHTML = this.squares[i].name;
      squareValue.innerHTML = "$" + this.squares[i].value;
      squareOwner.innerHTML = this.squares[i].owner;
    }

    
    var square1 = document.getElementById("square1-residents");
    for (var i = 0; i < game.players.length; i++) {
      
      game.players[i].createToken(square1);
    }

   
    updateByID("player1-info_name", game.players[0].name);
    updateByID("player1-info_cash", game.players[0].cash);
    updateByID("player2-info_name", game.players[1].name);
    updateByID("player2-info_cash", game.players[1].cash);
  };

  
  game.takeTurn = function() {
   
    movePlayer();

    
    checkTile();

    
    if (game.players[game.currentPlayer].cash < 0) {
      alert("JAJA " + game.players[game.currentPlayer].name + ", perdiste");
      window.close();
      //var go= "/Q4/MONO/index.html";

    }

    
    game.currentPlayer = nextPlayer(game.currentPlayer);

    
    updateByID("Jugador Actual", game.players[game.currentPlayer].name);
  };

  
  function nextPlayer(currentPlayer) {
    var nextPlayer = currentPlayer + 1;

    if (nextPlayer == game.players.length) {
      return 0;
    }

    return nextPlayer;
  }

  
  function movePlayer() {
    
    var moves = Math.floor(Math.random() * (4 - 1) + 1);
    
    var totalSquares = game.squares.length + 1;
   
    var currentPlayer = game.players[game.currentPlayer];
    var currentSquare = parseInt(currentPlayer.currentSquare.slice(6));

   
    if (currentSquare + moves <= totalSquares) {
      var nextSquare = currentSquare + moves;
    } else {
      var nextSquare = currentSquare + moves - totalSquares;
      currentPlayer.updateCash(currentPlayer.cash + 100);
      console.log("$100 por que sobreviviste una ronda");
    }

    
    currentPlayer.currentSquare = "square" + nextSquare;

    
    var currentToken = document.getElementById(currentPlayer.id);
    currentToken.parentNode.removeChild(currentToken);

    
    currentPlayer.createToken(
      document.getElementById(currentPlayer.currentSquare)
    );
  }

 
  function checkTile() {
    var currentPlayer = game.players[game.currentPlayer];
    var currentSquareId = currentPlayer.currentSquare;
    var currentSquareObj = game.squares.filter(function(square) {
      return square.squareID == currentSquareId;
    })[0];
    
    /*function abrirEnPestana(url) {
    var a = document.createElement("a","b","c");
    a.target = "_blank";
    a.href = url;
    a.click();
    }
 
  /*var url="http://www.lawebdelprogramador.com";
 
  window.onload=function(){
    abrirEnPestana(url);
  }*/
    
    if (currentSquareId == "square1") {
      currentPlayer.updateCash(currentPlayer.cash + 100);
      updateByID(
        "messagePara",
        currentPlayer.name + ": Aterrizo en el inicio que crack, toma 100"
      );
    } else if (currentSquareObj.owner == "No jugado") {
      
      if (currentPlayer.cash <= currentSquareObj.value) {
        updateByID(
          "messagePara",
          currentPlayer.name +
            ": No tienes suficiente dinero"
        );
        return;
      }
      
      
      var compra = window.confirm(
        currentPlayer.name +
          ":Este es un nuevo juego y cuesta $" +
          currentSquareObj.value +
          "?"
      );
     
      if (compra) {
       

        currentSquareObj.owner = currentPlayer.id;
        
        currentPlayer.updateCash(currentPlayer.cash - currentSquareObj.value);
       
        //document.location.href="/Q4/s64/index.html" ;
        if (currentSquareId == "square2") {
          //alert("hola");
          window.open("QEEP/index.html#", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square3") {
          //alert("hola2");
          window.open("Juego/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square4") {
          //alert("hola3");
          window.open("Juegos/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square5") {
          //alert("hola4");
          window.open("MONOPOLY/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square6") {
          //alert("hola5");
          window.open("PiPaOTi/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square7") {
          //alert("hola");
          window.open("Breakout/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square8") {
         // alert("hola");
          window.open("QEEP/index.html#", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square9") {
         // alert("hola2");
          window.open("Juego/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square10") {
         // alert("hola3");
          window.open("Breakout/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square11") {
        //  alert("hola4");
          window.open("MONOPOLY/index.html", "JUEGO", "width=900, height=900");
        }
        if (currentSquareId == "square12") {
        //  alert("hola5");
          window.open("PiPaOTi/index.html", "JUEGO", "width=900, height=900");
        }

        updateByID(
          "messagePara",
          currentPlayer.name + ": saldo actual $" + currentPlayer.cash
        );
        
        updateByID(
          currentSquareObj.squareID + "-owner",
          "Le pertenezco a: " + game.players[game.currentPlayer].name
        );
        
      }
    } else if (currentSquareObj.owner == currentPlayer.id) {
      
      updateByID(
        "messagePara",
        currentPlayer.name + ": YA LO Tienes"
      );
    } else {
      
      updateByID(
        "messagePara",
        currentPlayer.name +
          ":jaja esta es la propiedad de" +
          currentSquareObj.owner +
          ". Le debes $" +
          currentSquareObj.rent +
          ". Y me queda $" +
          currentPlayer.cash
      );

      var owner = game.players.filter(function(player) {
        return player.id == currentSquareObj.owner;
      });
      currentPlayer.updateCash(currentPlayer.cash - currentSquareObj.rent);
    }
  }

 
  function updateByID(id, msg) {
    document.getElementById(id).innerHTML = msg;
  }

  
  function Square(name, value, squareID) {
    
    this.name = name;
    
    this.value = value;
    
    this.rent = value * 0.3;
    
    this.squareID = squareID;
    
    this.owner = "No jugado";

  }

  
  function Player(name, cash, token, id) {
    this.name = name;
    this.cash = cash;
    this.token = token;
    this.id = id;
    this.currentSquare = "square1";
    this.ownedSquares = [];
  }

  
  Player.prototype.createToken = function(square) {
    var playerSpan = document.createElement("span");
    playerSpan.setAttribute("class", this.token);
    playerSpan.setAttribute("id", this.id);
    square.appendChild(playerSpan);
  };

  
  Player.prototype.updateCash = function(amount) {
    document.getElementById(this.id + "-info_cash").innerHTML = amount;
    this.cash = amount;
  };

  return game;
})();
