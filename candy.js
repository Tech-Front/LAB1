 // Initialize the two-dimensional tile array
 for (var i=0; i<level.columns; i++) 
 {
    level.tiles[i] = [];
    for (var j=0; j<level.rows; j++) 
    {
        // Define a tile type and a shift parameter for animation
        level.tiles[i][j] = { type: 0, shift:0 }
    }
}

// Render tiles
function renderTiles() 
{
    for (var i=0; i<level.columns; i++) 
    {
        for (var j=0; j<level.rows; j++) 
        {
            // Get the shift of the tile for animation
            var shift = level.tiles[i][j].shift;
            
            // Calculate the tile coordinates
            var coord = getTileCoordinate(i, j, 0, (animationtime / animationtimetotal) * shift);
            
            // Check if there is a tile present
            if (level.tiles[i][j].type >= 0) 
            {
                // Get the color of the tile
                var col = tilecolors[level.tiles[i][j].type];
                
                // Draw the tile using the color
                drawTile(coord.tilex, coord.tiley, col[0], col[1], col[2]);
            }
            
            // Draw the selected tile
            if (level.selectedtile.selected) {
                if (level.selectedtile.column == i && level.selectedtile.row == j) 
                {
                    // Draw a red tile
                    drawTile(coord.tilex, coord.tiley, 255, 0, 0);
                }
            }
        }
    }
    
    // Render the swap animation
    if (gamestate == gamestates.resolve && (animationstate == 2 || animationstate == 3)) {
        // Calculate the x and y shift
        var shiftx = currentmove.column2 - currentmove.column1;
        var shifty = currentmove.row2 - currentmove.row1;

        // First tile
        var coord1 = getTileCoordinate(currentmove.column1, currentmove.row1, 0, 0);
        var coord1shift = getTileCoordinate(currentmove.column1, currentmove.row1, (animationtime / animationtimetotal) * shiftx, (animationtime / animationtimetotal) * shifty);
        var col1 = tilecolors[level.tiles[currentmove.column1][currentmove.row1].type];
        
        // Second tile
        var coord2 = getTileCoordinate(currentmove.column2, currentmove.row2, 0, 0);
        var coord2shift = getTileCoordinate(currentmove.column2, currentmove.row2, (animationtime / animationtimetotal) * -shiftx, (animationtime / animationtimetotal) * -shifty);
        var col2 = tilecolors[level.tiles[currentmove.column2][currentmove.row2].type];
        
        // Draw a black background
        drawTile(coord1.tilex, coord1.tiley, 0, 0, 0);
        drawTile(coord2.tilex, coord2.tiley, 0, 0, 0);
        
        // Change the order, depending on the animation state
        if (animationstate == 2) {
            // Draw the tiles
            drawTile(coord1shift.tilex, coord1shift.tiley, col1[0], col1[1], col1[2]);
            drawTile(coord2shift.tilex, coord2shift.tiley, col2[0], col2[1], col2[2]);
        } else {
            // Draw the tiles
            drawTile(coord2shift.tilex, coord2shift.tiley, col2[0], col2[1], col2[2]);
            drawTile(coord1shift.tilex, coord1shift.tiley, col1[0], col1[1], col1[2]);
        }
    }
}