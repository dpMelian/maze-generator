const cellSize = 10;
var rows = 41;
var columns = 41;
var cells;
var randomDirections = [];
var stack;
var slowMode = false;
var ctx;

class Cell{
    constructor(){
        this.isWall = true;
        this.isVisited = false;
        this.x = 0;
        this.y = 0;
    }
}

function maze() {
    rows = document.getElementById('maze-size').value;
    columns = document.getElementById('maze-size').value;
    slowMode = document.getElementById('slow-mode').checked;
    cells = createArray(rows, columns);
    stack = new Stack();

    if(rows % 2 == 0){
        var alertBootstrap = document.createElement('div');
        alertBootstrap.innerHTML = 'Number must be odd';
        alertBootstrap.setAttribute('id', 'alertBootstrap');
        alertBootstrap.setAttribute('class', 'alert alert-primary');
        alertBootstrap.setAttribute('role', 'alert');
        document.body.prepend(alertBootstrap);
        return;
    } else{
        var alertBootstrap = document.getElementById('alertBootstrap'); 
        if(alertBootstrap !== null){
            alertBootstrap.remove();
        }
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            cells[i][j] = new Cell();
            cells[i][j].x = i;
            cells[i][j].y = j;
        }
    }
    
    cells[0][1].isWall = false;
    cells[rows-1][columns-2].isWall = false;

    const canvas = document.getElementById('maze');

    canvas.width = rows * 10;
    canvas.height = columns * 10;

    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw(ctx);

    stack.push(cells[1][1]);
    backtracker(ctx, 1, 1);

    if(!slowMode){
        draw(ctx);
    }
}

const draw = async() => {
    var playerCells = getPlayerCells();
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(cells[i][j].isWall){
                ctx.fillStyle = '#000000';
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            } else if(!cells[i][j].isWall){
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
            if(playerCells){
                if(playerCells[i][j].isPainted){
                    ctx.fillStyle = '#65ff65';
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
            }
        }
    }
}

const backtracker = async(ctx, x, y) => {
    cells[x][y].isVisited = true;
    cells[x][y].isWall = false;
    stack.push(cells[x][y]);
    
    if(slowMode){
        await sleep(15);
        draw(ctx);
    }
    
    var randomDirections = [];
    for(let i = 0; i < 4; i++){
        if(y-2 > 0){
            if(!cells[x][y-2].isVisited && i == 0){
                randomDirections.push(1);
            }
        }
        if(x+2 < rows-1){
            if(!cells[x+2][y].isVisited && i == 1){
                randomDirections.push(2);
            }
        }
        if(y+2 < rows-1){
            if(!cells[x][y+2].isVisited && i == 2){
                randomDirections.push(3);
            }
        }
        if(x-2 > 0){
            if(!cells[x-2][y].isVisited && i == 3){
                randomDirections.push(4);
            }
        }
    }
    shuffle(randomDirections);

    switch(randomDirections[0]){
        case 1: //up
            if(!cells[x][y-2].isVisited && y-2 > 0){
                cells[x][y-1].isVisited = true;
                cells[x][y-1].isWall = false;
                backtracker(ctx, x, y-2);
            } else if(cells[x][y-2].isVisited && y-2 > 0){
                backtracker(ctx, x, y);
            } else if(!cells[x][y-2].isVisited && y-2 < 0){
                backtracker(ctx, x, y);
            }
            break;
        case 2: //right
            if(!cells[x+2][y].isVisited && x+2 < rows-1){
                cells[x+1][y].isVisited = true;
                cells[x+1][y].isWall = false;
                backtracker(ctx, x+2, y);
            } else if(cells[x+1][y].isVisited && x+2 < rows-1){
                backtracker(ctx, x, y);
            } else if(!cells[x+2][y].isVisited && x+2 > rows-1){
                backtracker(ctx, x, y);
            }
            break;
        case 3: //down
            if(!cells[x][y+2].isVisited && y+2 < rows-1){
                cells[x][y+1].isVisited = true;
                cells[x][y+1].isWall = false;
                backtracker(ctx, x, y+2);
            } else if(cells[x][y+2].isVisited && y+2 < rows-1){
                backtracker(ctx, x, y);
            } else if(!cells[x][y+2].isVisited && y+2 > rows-1){
                backtracker(ctx, x, y);
            }
            break;
        case 4: //left
            if(!cells[x-2][y].isVisited && x-2 > 0){
                cells[x-1][y].isVisited = true;
                cells[x-1][y].isWall = false;
                backtracker(ctx, x-2, y);
            } else if(cells[x-2][y].isVisited && x-2 > 0){
                backtracker(ctx, x, y);
            } else if(!cells[x-2][y].isVisited && x-2 < 0){
                backtracker(ctx, x, y);
            }
            break;
        case undefined:
            if(stack.length() > 1){
                stack.pop();
                var nextCell = stack.pop();
                backtracker(ctx, nextCell.x, nextCell.y);
            }
    }
}

function generateDirections() {
    for(let i = 0; i < 4; i++){
        randomDirections[i] = i + 1;
    }

    shuffle(randomDirections);

    return randomDirections;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function getCells(){
    return this.cells;
}

function getRows(){
    return this.rows;
}

function getColumns(){
    return this.columns;
}