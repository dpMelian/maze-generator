const cellSize = 20;
const rows = 20;
const columns = 20;
const wallSize = 5;

function Maze() {
    
    const canvas = document.getElementById('maze');

    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var cells = new Array(400);
    for(let i = 0; i < cells.length; i++){
        cells[i] = new Cell();
    }

    Draw(canvas, ctx, cells);
    
}

const Draw = async(canvas, ctx, cells) => {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(cells[i+j].top){
                ctx.moveTo(i * cellSize, j * cellSize);
                ctx.lineTo((i+1) * cellSize, j * cellSize);
                ctx.stroke();
            }
            if(cells[i,j].right){
                ctx.moveTo((i+1) * cellSize, j * cellSize);
                ctx.lineTo((i+1) * cellSize, (j+1) * cellSize);
                ctx.stroke();
            }
            if(cells[i,j].bottom){
                ctx.moveTo(i * cellSize, (j+1) * cellSize);
                ctx.lineTo((i+2) * cellSize, (j+1) * cellSize);
                ctx.stroke();
            }
            if(cells[i,j].left){
                ctx.moveTo(i * cellSize, (j+1) * cellSize);
                ctx.lineTo(i * cellSize, (j-1) * cellSize);
                ctx.stroke();
            }
            await sleep(5);
        }
    }
}

class Cell{
    constructor(){
        this.top = Math.random() < 0.6;
        this.right = Math.random() < 0.6;
        this.bottom = Math.random() < 0.6;
        this.left = Math.random() < 0.6;
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}