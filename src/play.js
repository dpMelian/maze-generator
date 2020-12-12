var playerCells;
var currentCell;

class PlayerCell{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.isPainted = false;
    }
}

function play(){
    var rows = getRows();
    var columns = getColumns();
    playerCells = createArray(rows, columns);
    
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            playerCells[i][j] = new PlayerCell();
            playerCells[i][j].x = i;
            playerCells[i][j].y = j;
        }
    }
    
    currentCell = playerCells[0][1];
    currentCell.isPainted = true;
    draw();

    document.addEventListener('keydown', function(e) {
        console.log(currentCell);
        switch (e.key) {
            case 'ArrowUp':
                var cells = getCells();
                if(currentCell.y-1 > 0 && !cells[currentCell.x][currentCell.y-1].isWall){
                    if(cells[currentCell.x][currentCell.y-1].isWall){
                        break;
                    } else{
                        currentCell = playerCells[currentCell.x][currentCell.y-1];
                        currentCell.isPainted = true;
                        console.log('up');
                        draw();
                        break;
                    }
                }
                break;
            case 'ArrowRight':
                var cells = getCells();
                if(currentCell.x+1 < getRows() && !cells[currentCell.x+1][currentCell.y].isWall){
                    if(cells[currentCell.x+1][currentCell.y].isWall){
                        break;
                    } else{
                        currentCell = playerCells[currentCell.x+1][currentCell.y];
                        currentCell.isPainted = true;
                        console.log('right');
                        draw();
                        break;
                    }
                }
                break;
            case 'ArrowDown':
                var cells = getCells();
                if(currentCell.y+1 < getRows() && !cells[currentCell.x][currentCell.y+1].isWall){
                    if(cells[currentCell.x][currentCell.y+1].isWall){
                        break;
                    } else{
                        currentCell = playerCells[currentCell.x][currentCell.y+1];
                        currentCell.isPainted = true;
                        console.log('down');
                        draw();
                        break;
                    }
                }
                break;
            case 'ArrowLeft':
                var cells = getCells();
                if(currentCell.x-1 > 0 && !cells[currentCell.x-1][currentCell.y].isWall){
                    if(cells[currentCell.x][currentCell.y].isWall){
                        break;
                    } else{
                        currentCell = playerCells[currentCell.x-1][currentCell.y];
                        currentCell.isPainted = true;
                        console.log('left');
                        draw();
                        break;
                    }
                }
                break;
        }
    });
}

function getPlayerCells(){
    return this.playerCells;
}