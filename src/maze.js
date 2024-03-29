const cellSize = 10;
var rows = 41;
var columns = 41;
var cells;
var randomDirections = [];
var stack;
var slowMode = false;
var ctx;
var hasWon = false;
let wallColor = '#000000';
let pathColor = '#ffffff';

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

    clearPlayerCells();

    hasWon = false;
    if(document.getElementById('success') !== null){
        document.getElementById('success').remove();
    }

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

const draw = async(x, y) => {
    var playerCells = getPlayerCells();
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(cells[i][j].isWall){
                ctx.fillStyle = wallColor;
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            } else if(!cells[i][j].isWall){
                ctx.fillStyle = pathColor;
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
            if(playerCells){
                if(playerCells[i][j].isPainted){
                    ctx.fillStyle = '#65ff65';
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
                if(i === x && j === y){
                    ctx.fillStyle = '#2abb2a';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }
    if(x === rows-1 && y === columns-2 && !hasWon){
        hasWon = true;
        var success = document.createElement('div');
        success.innerHTML = 'You solved it!';
        success.setAttribute('id', 'success');
        success.setAttribute('class', 'alert alert-success');
        success.setAttribute('role', 'alert');
        document.body.append(success);
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
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        if(x+2 < rows-1){
            if(!cells[x+2][y].isVisited && i == 1){
                randomDirections.push(2);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        if(y+2 < rows-1){
            if(!cells[x][y+2].isVisited && i == 2){
                randomDirections.push(3);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        if(x-2 > 0){
            if(!cells[x-2][y].isVisited && i == 3){
                randomDirections.push(4);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
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

function printMaze() {
    var canvas = document.getElementById('maze');
    
    var img = canvas.toDataURL("image/png");

    //document.write('<img src="'+img+'" id="mainImg"/>');

    var image = document.createElement("IMG");
    image.setAttribute("src", img);

    var printWindow = window.open('', 'Print Window','height=400,width=600');
    printWindow.document.write('<html><head><title>Print Window</title>');
    printWindow.document.write('</head><body ><img src=\'');
    printWindow.document.write(image.src);
    printWindow.document.write('\' /></body></html>');
    printWindow.document.close();
    printWindow.print();
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
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

let wallColorPicker = document.getElementById('wall-color-picker');
let pathColorPicker = document.getElementById('path-color-picker');

const setMazeWallColor = (event) => {
    wallColor = event.target.value;
}

wallColorPicker.addEventListener("input", setMazeWallColor, false);
wallColorPicker.addEventListener("change", setMazeWallColor, false);


const setMazePathColor = (event) => {
    pathColor = event.target.value;
}

pathColorPicker.addEventListener("input", setMazePathColor, false);
pathColorPicker.addEventListener("change", setMazePathColor, false);
