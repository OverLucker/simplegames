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
	for (i = 0; i < game.grid.X; ++i)
	{
		for (j = 0; j < game.grid.Y; ++j)
		{
			var tile = document.getElementById(game.grid.rows[j][i]);
			var cls = ["tile", "tile-position-" + j + "-" + i];
			tile.setAttribute("class", cls.join(" "));
		}
	}
}

Actuator.updatemoves = function(moves)
{
	var class_name = ["moves_done"];
	var scores = document.getElementsByClassName(class_name.join(" "))[0];
	scores.textContent = moves;
}

window.addEventListener("keydown", function (event) {
	var action = 
	{
		37 : { dx : 1, dy : 0}, // left
		38 : { dx : 0, dy : 1}, // up
		39 : { dx : -1, dy : 0 }, // right
		40 : { dx : 0, dy : -1 }  // down	
	}
	if (action [event.which] !== undefined)
	{
		var ppos = { X : Game.tileZ.X, Y : Game.tileZ.Y};
		if (Game.movetile(action[event.which].dx, action[event.which].dy))
			return;
		
		Actuator.movetile(ppos.X, ppos.Y, Game.tileZ.X, Game.tileZ.Y);
		Actuator.updatemoves (Game.moves);
        
         
		if (Game.check() == 1)
		{
            Mess_State('block');
			Game.make_new();
			Actuator.actuate(Game);
			Actuator.updatemoves(Game.moves);
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
        Mess_State('none');
    }
}

