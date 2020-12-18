var playerCells;
var currentCell;
var eventListenerExists = false;
var step1 = document.getElementById('step1');
var step2 = document.getElementById('step2');

class PlayerCell{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.isPainted = false;
    }
}

function play(){
    playerCells = null;
    
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

    var keyHandler = function (e) {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowUp':
                var cells = getCells();
                if(currentCell.y-1 > 0 && !cells[currentCell.x][currentCell.y-1].isWall){
                    if(cells[currentCell.x][currentCell.y-1].isWall){
                        break;
                    } else{
                        currentCell = playerCells[currentCell.x][currentCell.y-1];
                        currentCell.isPainted = true;
                        var randomBoolean = Math.random() < 0.5;
                        if(randomBoolean){
                            step1.currentTime = 0;
                            step1.play();
                        } else{
                            step2.currentTime = 0;
                            step2.play();
                        }
                        draw(currentCell.x, currentCell.y);
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
                        var randomBoolean = Math.random() < 0.5;
                        if(randomBoolean){
                            step1.currentTime = 0;
                            step1.play();
                        } else{
                            step2.currentTime = 0;
                            step2.play();
                        }
                        draw(currentCell.x, currentCell.y);
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
                        var randomBoolean = Math.random() < 0.5;
                        if(randomBoolean){
                            step1.currentTime = 0;
                            step1.play();
                        } else{
                            step2.currentTime = 0;
                            step2.play();
                        }
                        draw(currentCell.x, currentCell.y);
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
                        var randomBoolean = Math.random() < 0.5;
                        if(randomBoolean){
                            step1.currentTime = 0;
                            step1.play();
                        } else{
                            step2.currentTime = 0;
                            step2.play();
                        }
                        draw(currentCell.x, currentCell.y);
                        break;
                    }
                }
                break;
        }
    }

    if(!eventListenerExists){
        document.addEventListener("keydown", keyHandler);
        eventListenerExists = true;
    }
}

function getPlayerCells(){
    return this.playerCells;
}

function clearPlayerCells(){
    if(playerCells !== undefined){
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                playerCells[i][j].isPainted = false;
            }
        }
    }
}