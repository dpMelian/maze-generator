function Maze() {
    
    const canvas = document.getElementById('maze');
    const rows = 10;
    const columns = 10;
    const wallSize = 5;

    canvas.width = 200;
    canvas.height = 200;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF';
    
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            ctx.fillRect((j * wallSize), (i * wallSize), wallSize, wallSize);
        }
    }
    
}