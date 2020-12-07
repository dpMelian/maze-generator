const cellSize = 10;
const rows = 41;
const columns = 41;
var cellsTest = createArray(rows, columns);
var randomDirections = [];

function Maze() {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            cellsTest[i][j] = new Cell();
        }
    }
    
    const canvas = document.getElementById('maze');

    canvas.width = 410;
    canvas.height = 410;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Draw(ctx);

    generateMaze(ctx, 1, 3);

    Draw(ctx);
}

const Draw = async(ctx) => {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(cellsTest[i][j].isWall){
                ctx.fillStyle = '#000000';
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

class Cell{
    constructor(){
        this.isWall = true;
    }
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

function generateMaze(ctx, r, c) {
    var randomDirections = generateDirections();
    
    for(let i = 0; i < randomDirections.length; i++){
        switch(randomDirections[i]){
        case 1: //up
            if(r-2 <= 0){
                continue;
            }
            if(cellsTest[r-2][c].isWall) {
                cellsTest[r-2][c].isWall = false;
                cellsTest[r-1][c].isWall = false;
                generateMaze(ctx, r-2, c);
            }
            break;
        case 2: //right
            if (c+2 >= rows-1){
                continue;
            }
            if(cellsTest[r][c+2].isWall) {
                cellsTest[r][c+2].isWall = false;
                cellsTest[r][c+1].isWall = false;
                generateMaze(ctx, r, c+2);
            }
            break;
        case 3: //down
            if(r+2 >= columns-1){
                continue;
            }
            if(cellsTest[r+2][c].isWall){
                cellsTest[r+2][c].isWall = false;
                cellsTest[r+1][c].isWall = false;
                generateMaze(ctx, r+2, c);
            }
            break;
        case 4: //left
            if(c-2 <= 0){
                continue;
            }
            if(cellsTest[r][c-2].isWall){
                cellsTest[r][c-2].isWall = false;
                cellsTest [r][c-1].isWall = false;
                generateMaze(ctx, r, c-2);
            }
            break;
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