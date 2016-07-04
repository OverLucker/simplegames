var Game =
{
	tileZ : { // position of Zero tile
		X : 3,
		Y : 3
	},
	grid : { 
		X : 4,
		Y : 4,
		rows : []
	},
	
	moves : 0 //moves from the start of new game
};

Game.tileZ.update = function (newX, newY)
{
	Game.grid.rows[newY][newX] = 0;
	this.X = newX;
	this.Y = newY;
}

Game.make_new = function ()
{
	// initialization
	for (i = 0; i < this.grid.X; ++i)
	{
		this.grid.rows[i] = [];
		for (j = 0; j < this.grid.Y; ++j)
			this.grid.rows[i].push( i * this.grid.X + j + 1);	
	}
	
	this.tileZ.update(this.grid.X - 1, this.grid.Y - 1);
	
	this.mixmoves = Math.round(Math.random() * 350 + 150); // 150 - 500
	
	var events = {
		1 : { dx : 1, dy : 0}, // left
		2 : { dx : 0, dy : 1}, // up
		3 : { dx : -1, dy : 0 }, // right
		4 : { dx : 0, dy : -1 }  // down
	}
	for (i = 0; i < this.mixmoves; ++i)
	{
		var move = Math.round( Math.random() * 3 + 1);
		this.movetile(events[move].dx, events[move].dy);
	}
	
	this.moves = 0;
}


Game.check = function ()
{
	for (i = 0; i < this.grid.Y - 1 ; ++i)
		for (j = 0; j < this.grid.X; ++j)
		if (this.grid.rows[i][j] !== i * this.grid.X + j + 1)
			return 0;
	for (j = 0; j < this.grid.X - 1; ++j)
		if (this.grid.rows[this.grid.Y - 1][j] !== (this.grid.Y - 1) * this.grid.X + j + 1)
			return 0;
	return 1;
}

Game.movetile = function (dx, dy)
{
	var ppos = { X : this.tileZ.X, Y : this.tileZ.Y};
	var npos = { X : this.tileZ.X, Y : this.tileZ.Y};
	if ((dx + ppos.X )>= 0 && (dx + ppos.X) < this.grid.X)
		if ((dy + ppos.Y) >= 0 && (dy + ppos.Y) < this.grid.Y)
		{
			npos.X = ppos.X + dx;
			npos.Y = ppos.Y + dy;
			this.moves++;
		}

	this.grid.rows[ppos.Y][ppos.X] = this.grid.rows[npos.Y][npos.X];
	this.tileZ.update(npos.X, npos.Y);
	if (ppos.X == Game.tileZ.X 
		&& ppos.Y == Game.tileZ.Y)
		return true;
}