// script.js
const canvas = document.getElementById("sudokuCanvas");
const ctx = canvas.getContext("2d");
canvas.style.border = "3px solid #6495ED"
// Define una matriz de ejemplo para el tablero Sudoku (0 representa celdas vacías)
const sudokuBoard =  [
    [0, 0, 2, 0, 0, 5, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 5],
    [0, 6, 0, 2, 0, 1, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 3],
    [0, 4, 0, 0, 0, 0, 9, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const sudokuSolution =[
    [9, 7, 2, 8, 6, 5, 4, 3, 1],
    [1, 3, 4, 9, 2, 4, 5, 7, 8],
    [5, 8, 6, 3, 7, 1, 6, 2, 9],
    [4, 1, 7, 6, 9, 8, 3, 2, 5],
    [3, 6, 5, 2, 4, 7, 8, 1, 9],
    [7, 2, 8, 5, 3, 9, 1, 6, 4],
    [2, 9, 1, 4, 8, 6, 7, 5, 3],
    [6, 4, 3, 7, 5, 2, 9, 8, 1],
    [8, 5, 7, 1, 3, 4, 2, 9, 6]
];

let selectedRow = 0;
let selectedCol = 0;
// Función para dibujar el tablero Sudoku en el canvas

const cellColors = [];
function initCell() {
    for (let i = 0; i < 9; i++) {
        cellColors[i] = [];
        for (let j = 0; j < 9; j++) {
            cellColors[i][j] = "white"; // Inicializa todas las celdas en blanco
        }
    }
}



function drawSudokuBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / 9;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;


    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            const x = j * cellSize;
            const y = i * cellSize;
            ctx.strokeStyle = "#EAECEE";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, 0, 0, canvas.height);
            ctx.strokeRect(0, y, canvas.width, 0);
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            ctx.strokeStyle = "transparent";
            const cellValue = sudokuBoard[i][j];
            const x = j * cellSize;
            const y = i * cellSize;


            const cellColor = cellColors[i][j]; // Obtiene el color de la celda

            // Dibuja el fondo de la celda con el color
            ctx.fillStyle = cellColor;
            ctx.fillRect(x, y, cellSize, cellSize);

            // Dibuja el borde de la celda
            ctx.strokeStyle = "#5D6D7E ";
            ctx.strokeRect(x, y, cellSize, cellSize);


            // Dibuja el número en la celda (si no es cero)
            if (cellValue !== 0) {
                ctx.font = "bold 24px Roboto Mono";
                ctx.fillStyle = "#000";
                ctx.fillText(cellValue.toString(), x + cellSize / 2 - 10, y + cellSize / 2 + 10);
            }
        }
    }


    for (let i = 1; i < 3; i++) {
        for (let j = 1; j < 3; j++) {
            const x = j * cellSize;
            const y = i * cellSize;

            ctx.strokeStyle = "#6495ED";
            ctx.lineWidth = 3;
            ctx.strokeRect(x * 3, 0, 0, canvas.height);
            ctx.strokeRect(0, y * 3, canvas.width, 0);

        }

    }


}

// Llama a la función para dibujar el tablero Sudoku
initCell()
drawSudokuBoard();

// Agrega un evento de clic al canvas para detectar la selección de una celda
function selectCell(x,y){
    const cellSize = canvas.width / 9;
    selectedRow = Math.floor(y / cellSize);
    selectedCol = Math.floor(x / cellSize);
    console.log(selectedRow)
    const indices = [];
    for (let row = 0; row < sudokuBoard.length; row++) {
        for (let col = 0; col < sudokuBoard[row].length; col++) {
            if(sudokuBoard[selectedRow][selectedCol]!=0){
                if (sudokuBoard[row][col] === sudokuBoard[selectedRow][selectedCol]) {
                    indices.push({ row, col }); // Agrega los índices de fila y columna a la lista
                }
            }
            
        }
    }

    for (let i = 0; i < indices.length; i++) {
        cellColors[indices[i].row][indices[i].col] = "#E5E7E9";
    }
    const blockStartRow = Math.floor(selectedRow / 3) * 3;
    const blockStartCol = Math.floor(selectedCol / 3) * 3;
    
    // Cambia el color de fondo de todas las celdas en el bloque 3x3
    for (let i = blockStartRow; i < blockStartRow + 3; i++) {
        for (let j = blockStartCol; j < blockStartCol + 3; j++) {
            cellColors[i][j] = "#E5E7E9"; // Cambia "lightblue" al color que desees
        }
    }

    for (let i = 0; i < 9; i++) {
        cellColors[selectedRow][i] = "#E5E7E9";
    }
    for (let i = 0; i < 9; i++) {
        cellColors[i][selectedCol] = "#E5E7E9";
    }
}

function selectCellNumber(x,y){
    console.log(x,y)
    const indices = [];
    for (let row = 0; row < sudokuBoard.length; row++) {
        for (let col = 0; col < sudokuBoard[row].length; col++) {
            if(sudokuBoard[x][y]!=0){
                if (sudokuBoard[row][col] === sudokuBoard[x][y]) {
                    indices.push({ row, col }); // Agrega los índices de fila y columna a la lista
                }
            }
            
        }
    }

    for (let i = 0; i < indices.length; i++) {
        cellColors[indices[i].row][indices[i].col] = "#E5E7E9";
    }
}
function isValid(row, col, k) {
    if (sudokuSolution[row][col] == k) {
        return true
    }
    return false;
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    initCell()
        
    const cellSize = canvas.width / 9;    
    selectedRow = Math.floor(y / cellSize);
    selectedCol = Math.floor(x / cellSize);

    selectCell(x,y);
    drawSudokuBoard();
    
});
// Agrega un evento para manejar la entrada de números en las celdas
canvas.addEventListener("keydown", function (event) {
    const keyCode = event.keyCode;
    const validKeyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57]; // Códigos de tecla para números del 1 al 9

    if (validKeyCodes.includes(keyCode)) {
        // Obtiene el número ingresado como un entero
        const numberEntered = parseInt(event.key, 10);        
        
        if (isValid(selectedRow, selectedCol, numberEntered)) {
            sudokuBoard[selectedRow][selectedCol] = numberEntered;

        }
        
        selectCellNumber(selectedRow,selectedCol)
        drawSudokuBoard();
    }
    
});

