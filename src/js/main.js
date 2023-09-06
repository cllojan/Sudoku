// script.js
const canvas = document.getElementById("sudokuCanvas");
const ctx = canvas.getContext("2d");
canvas.style.border = "3px solid #6495ED"
// Define una matriz de ejemplo para el tablero Sudoku (0 representa celdas vacías)
const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let selectedRow=0;
let selectedCol=0;
// Función para dibujar el tablero Sudoku en el canvas
function drawSudokuBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / 9;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;


    for(let i=1;i<9;i++){
        for(let j=1;j<9;j++){
            const x = j * cellSize;
            const y = i * cellSize;
            ctx.strokeStyle = "#EAECEE";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, 0, 0, canvas.height);
            ctx.strokeRect(0, y, canvas.width,0);
        }   
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            ctx.strokeStyle = "transparent";
            const cellValue = sudokuBoard[i][j];
            const x = j *cellSize;
            const y = i * cellSize;

            // Dibuja el borde de la celda
            ctx.strokeRect(x, y, cellSize, cellSize);


            // Dibuja el número en la celda (si no es cero)
            if (cellValue !== 0) {
                ctx.font = "bold 24px Arial";
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
            ctx.strokeRect(x*3, 0, 0, canvas.height);        
            ctx.strokeRect(0, y*3, canvas.width, 0);
        }

    }
    
    
}

// Llama a la función para dibujar el tablero Sudoku
drawSudokuBoard();
// Agrega un evento de clic al canvas para detectar la selección de una celda
function isSudokuBoardValid(board) {
    // Verifica filas y columnas
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        const colSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (rowSet.has(board[i][j]) || colSet.has(board[j][i])) {
                return false;
            }
            if (board[i][j] !== 0) {
                rowSet.add(board[i][j]);
            }
            if (board[j][i] !== 0) {
                colSet.add(board[j][i]);
            }
        }
    }

    // Verifica bloques 3x3
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const blockSet = new Set();
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    if (blockSet.has(board[i][j])) {
                        return false;
                    }
                    if (board[i][j] !== 0) {
                        blockSet.add(board[i][j]);
                    }
                }
            }
        }
    }

    return true; // El tablero es válido
}

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calcula la fila y la columna seleccionadas
    const cellSize = canvas.width / 9;
    selectedRow = Math.floor(y / cellSize);
    selectedCol = Math.floor(x / cellSize);

    // Imprime la fila y la columna seleccionadas en la consola
    console.log("Elemento seleccionado" + sudokuBoard[selectedRow][selectedCol]);
    
});
// Agrega un evento para manejar la entrada de números en las celdas
canvas.addEventListener("keydown", function(event) {
    const keyCode = event.keyCode;    
    const validKeyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57]; // Códigos de tecla para números del 1 al 9

    if (validKeyCodes.includes(keyCode)) {
        // Obtiene el número ingresado como un entero
        const numberEntered = parseInt(event.key, 10);

        // Actualiza la celda seleccionada en currentSudokuBoard
        sudokuBoard[selectedRow][selectedCol] = numberEntered;

        // Vuelve a dibujar el tablero Sudoku actualizado
        drawSudokuBoard();
    }
});

function isValidNumber(number, row, col) {
    // Verifica la fila actual
    for (let i = 0; i < 9; i++) {
        if (sudokuBoard[row][i] === number && i !== col) {
            return false; // Número repetido en la fila
        }
    }

    // Verifica la columna actual
    for (let i = 0; i < 9; i++) {
        if (sudokuBoard[i][col] === number && i !== row) {
            return false; // Número repetido en la columna
        }
    }

    // Verifica el bloque 3x3 actual
    const blockStartRow = Math.floor(row / 3) * 3;
    const blockStartCol = Math.floor(col / 3) * 3;
    for (let i = blockStartRow; i < blockStartRow + 3; i++) {
        for (let j = blockStartCol; j < blockStartCol + 3; j++) {
            if (sudokuBoard[i][j] === number && (i !== row || j !== col)) {
                return false; // Número repetido en el bloque
            }
        }
    }

    return true; // El número es válido
}

canvas.addEventListener("change", function(event) {
    const inputValue = parseInt(event.target.value, 10);
    const rowIndex = selectedRow;
    const colIndex = selectedCol;

    if (isValidNumber(inputValue, rowIndex, colIndex)) {
        // Si el número ingresado es válido, actualiza la matriz currentSudokuBoard
        sudokuBoard[rowIndex][colIndex] = inputValue;
    } else {
        // Si el número no es válido, muestra un mensaje de error o realiza alguna otra acción adecuada
        alert("Número no válido. Verifica las reglas del Sudoku.");
        // También puedes borrar el valor ingresado o hacer otra acción según tu diseño.
    }

    // Vuelve a dibujar el tablero Sudoku actualizado
    drawSudokuBoard();
});