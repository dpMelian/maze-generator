const cellSize = 10;
const rows = 40;
const columns = 40;
var cells = createArray(rows, columns);
var randomDirections = [];
var stack;
var counter = 0;

function Maze() {
    stack = new Stack();
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            cells[i][j] = new Cell();
            cells[i][j].x = i;
            cells[i][j].y = j;
        }
    }
    
    const canvas = document.getElementById('maze');

    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Draw(ctx);

    //generateMaze(ctx, 1, 3);
    backtracker(ctx, 10, 10);

    Draw(ctx);
}

const Draw = async(ctx) => {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(cells[i][j].isWall){
                ctx.fillStyle = '#000000';
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = '#ffff00';
                if(i === 10 && j === 10){
                    ctx.fillStyle = '#ff0000';
                }
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

class Cell{
    constructor(){
        this.isWall = true;
        this.isVisited = false;
        this.x = 0;
        this.y = 0;
    }
}

function backtracker(ctx, x, y) {
    cells[x][y].isVisited = true;
    cells[x][y].isWall = false;
    stack.push(cells[x][y]);

    counter++;

    var randomDirections = [];
    for(let i = 0; i < 4; i++){
        if(!cells[x][y-2].isVisited && i == 0){
            randomDirections.push(1);
        }
        if(!cells[x+2][y].isVisited && i == 1){
            randomDirections.push(2);
        }
        if(!cells[x][y+2].isVisited && i == 2){
            randomDirections.push(3);
        }
        if(!cells[x-2][y].isVisited && i == 3){
            randomDirections.push(4);
        }
    }
    var foo = stack.peek();
    console.log(foo.x, foo.y);
    shuffle(randomDirections);
    if(randomDirections.length == 0){
        console.log('************************')
        stack.pop();
        var topOfStack = stack.pop();
        console.log(topOfStack.x, topOfStack.y);
        backtracker(ctx, topOfStack.x, topOfStack.y);
    }

    for(let i = 0; i < randomDirections.length; i++){
        if(counter == 60){
            break;
        }
        
        switch(randomDirections[i]){
            case 1: //up
                if(cells[x][y-1] && !cells[x][y-2].isVisited && y-2 !== 0){
                    stack.push(cells[x][y-2]);
                    //stack.push(cells[x][y-1]);
                    cells[x][y-2].isVisited = true;
                    cells[x][y-1].isVisited = true;
                    cells[x][y-2].isWall = false;
                    cells[x][y-1].isWall = false;
                    backtracker(ctx, x, y-2);
                } else if(cells[x][y-2].isVisited && y-2 !== 0){
                    backtracker(ctx, x, y);
                } else if(y-2 === 0){
                    stack.pop();
                    stack.pop();
                    var topOfStack = stack.peek();
                    backtracker(ctx, topOfStack.x, topOfStack.y);
                }
                break;
            case 2: //right
                if(cells[x+2][y] && !cells[x+2][y].isVisited && x+2 !== 39){
                    stack.push(cells[x+2][y]);
                    //stack.push(cells[x+1][y]);
                    cells[x+2][y].isVisited = true;
                    cells[x+1][y].isVisited = true;
                    cells[x+2][y].isWall = false;
                    cells[x+1][y].isWall = false;
                    backtracker(ctx, x+2, y);
                } else if(cells[x+1][y].isVisited && x+2 !== 39){
                    backtracker(ctx, x, y);
                } else if(x+2 === 39){
                    stack.pop();
                    stack.pop();
                    var topOfStack = stack.peek();
                    backtracker(ctx, topOfStack.x, topOfStack.y);
                }
                break;
            case 3: //down
                if(cells[x][y+2] && !cells[x][y+2].isVisited && y+2 !== 39){
                    stack.push(cells[x][y+2]);
                    //stack.push(cells[x][y+1]);
                    cells[x][y+2].isVisited = true;
                    cells[x][y+1].isVisited = true;
                    cells[x][y+2].isWall = false;
                    cells[x][y+1].isWall = false;
                    backtracker(ctx, x, y+2);
                } else if(cells[x][y+2].isVisited && y+2 !== 39){
                    backtracker(ctx, x, y);
                } else if(y+2 === 39){
                    stack.pop();
                    stack.pop();
                    var topOfStack = stack.peek();
                    backtracker(ctx, topOfStack.x, topOfStack.y);
                }
                break;
            case 4: //left
                if(cells[x-2][y] && !cells[x-2][y].isVisited && x-2 !== 0){
                    stack.push(cells[x-2][y]);
                    //stack.push(cells[x-1][y]);
                    cells[x-2][y].isVisited = true;
                    cells[x-1][y].isVisited = true;
                    cells[x-2][y].isWall = false;
                    cells[x-1][y].isWall = false;
                    backtracker(ctx, x-2, y);
                } else if(cells[x-2][y].isVisited && x-2 !== 0){
                    backtracker(ctx, x, y);
                } else if(x-2 === 0){
                    stack.pop();
                    stack.pop();
                    var topOfStack = stack.peek();
                    backtracker(ctx, topOfStack.x, topOfStack.y);
                }
                break;
            default:
                break;
        }
    }


}

function generateMaze(ctx, r, c) {
    var randomDirections = generateDirections();
    
    for(let i = 0; i < randomDirections.length; i++){
        switch(randomDirections[i]){
        case 1: //up
            if(r-2 <= 0){
                continue;
            }
            if(cells[r-2][c].isWall) {
                cells[r-2][c].isWall = false;
                cells[r-1][c].isWall = false;
                generateMaze(ctx, r-2, c);
            }
            break;
        case 2: //right
            if (c+2 >= rows-1){
                continue;
            }
            if(cells[r][c+2].isWall) {
                cells[r][c+2].isWall = false;
                cells[r][c+1].isWall = false;
                generateMaze(ctx, r, c+2);
            }
            break;
        case 3: //down
            if(r+2 >= columns-1){
                continue;
            }
            if(cells[r+2][c].isWall){
                cells[r+2][c].isWall = false;
                cells[r+1][c].isWall = false;
                generateMaze(ctx, r+2, c);
            }
            break;
        case 4: //left
            if(c-2 <= 0){
                continue;
            }
            if(cells[r][c-2].isWall){
                cells[r][c-2].isWall = false;
                cells [r][c-1].isWall = false;
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