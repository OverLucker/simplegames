var Actuator = {};
Actuator.movetile = function(x1, y1, x2, y2)
{
	var classprev = "tile-position-" + y1 + "-" + x1;
	var classnew = "tile-position-" + y2 + "-" + x2;
	var tileprev = document.getElementsByClassName(classprev)[0];
	var tilenew = document.getElementsByClassName(classnew)[0];
	
	tileprev.setAttribute("class", ["tile", classnew].join(" "));
	tilenew.setAttribute("class", ["tile", classprev].join(" "));
}

Actuator.actuate = function (game)
{
    var mmtext = document.querySelector("#moves_mixed")
    mmtext.dataset.content = game.mixmoves;
	for (i = 0; i < game.grid.X; ++i)
	{
		for (j = 0; j < game.grid.Y; ++j)
		{
			var tile = document.getElementById("t" + game.grid.rows[j][i]);
			var cls = ["tile", "tile-position-" + j + "-" + i];
			tile.setAttribute("class", cls.join(" "));
		}
	}
    this.updatemoves (Game.moves);
}

Actuator.updatemoves = function(moves)
{
    var scorestext = document.querySelector("#moves_done");
    scorestext.dataset.content = moves;
}

window.addEventListener("keydown", function (event) {
	var action = 
	{
        13 : 13,
		37 : { dx : 1, dy : 0}, // left
		38 : { dx : 0, dy : 1}, // up
		39 : { dx : -1, dy : 0 }, // right
		40 : { dx : 0, dy : -1 },  // down
        75 : { dx : 0, dy : 1}, // Vim up
        76 : { dx : -1, dy : 0 }, // Vim right
        74 : { dx : 0, dy : -1 }, // Vim down
        72 : { dx : 1, dy : 0}, // Vim left        
        87 : { dx : 0, dy : 1}, // W
        68 : { dx : -1, dy : 0 }, // D
        83 : { dx : 0, dy : -1 }, // S
        65 : { dx : 1, dy : 0}  // A
	}
	if (action [event.which] !== undefined)
	{
        if (action[event.which] == 13)
        {
            Game.make_new();
            Actuator.actuate(Game);
            Mess_State('none');
        }
        
		var ppos = { X : Game.tileZ.X, Y : Game.tileZ.Y};
		if (Game.movetile(action[event.which].dx, action[event.which].dy))
			return;
		
		Actuator.movetile(ppos.X, ppos.Y, Game.tileZ.X, Game.tileZ.Y);
		Actuator.updatemoves (Game.moves);
        
         
		if (Game.check() == 1)
		{
            Mess_State('block');
			
		}
	}
});

function Mess_State (state)
{
    var game_msg = document.getElementById("mess");
    game_msg.style.display = state;
}

window.onload = function () {
	Game.make_new();
	Actuator.actuate(Game);
    btn_new_game = document.getElementById('new_game');
    btn_new_game.onclick = function() {
        Game.make_new();
		Actuator.actuate(Game);
		Actuator.updatemoves(Game.moves);
        Mess_State('none');
    }
}

