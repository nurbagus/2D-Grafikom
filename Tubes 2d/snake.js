// Define variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20; // Size of each grid cell
const canvasSize = canvas.width / gridSize; // Number of cells along one side

let snake = [{ x: 5, y: 5 }]; // Initial snake position
let direction = { x: 1, y: 0 }; // Initial movement to the right
let gameRunning = false; // Track game state

// Start game function
function startGame() {
    snake = [{ x: 5, y: 5 }]; // Reset snake to starting position
    direction = { x: 1, y: 0 }; // Reset direction to the right
    gameRunning = true; // Set game state to running
    document.getElementById("startButton").disabled = true; // Disable start button
    gameLoop(); // Start game loop
}

// Draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.strokeStyle = "black";
    for (let i = 0; i < canvasSize; i++) {
        for (let j = 0; j < canvasSize; j++) {
            ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize); // Draw grid cell
        }
    }
}

// Draw the snake on the grid
function drawSnake() {
    ctx.fillStyle = "black";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize); // Draw snake segment
    });
}

// Update snake's position
function updateSnakePosition() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }; // Calculate new head position

    // Check if snake hits boundaries (optional game over logic)
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameRunning = false; // Stop the game
        alert("Game Over!");
        document.getElementById("startButton").disabled = false; // Re-enable start button
        return;
    }

    // Add new head and remove last segment (translates the snake in the direction)
    snake.unshift(head); 
    snake.pop();
}

// Game loop
function gameLoop() {
    if (!gameRunning) return; // Stop loop if game is not running
    drawGrid(); // Draw the grid
    updateSnakePosition(); // Update snake's position
    drawSnake(); // Draw the snake
    setTimeout(gameLoop, 150); // Repeat loop with delay (controls speed)
}

// Event listener for keypress to control snake direction
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
        case "s":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
        case "a":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
        case "d":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Click event to move snake towards clicked cell
canvas.addEventListener("click", (event) => {
    if (!gameRunning) return; // Only allow clicks if the game is running

    // Calculate clicked cell coordinates
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / gridSize);
    const y = Math.floor((event.clientY - rect.top) / gridSize);

    // Get the current position of the snake's head
    const head = snake[0];

    // Calculate the direction based on the click position
    if (x > head.x) direction = { x: 1, y: 0 }; // Move right
    else if (x < head.x) direction = { x: -1, y: 0 }; // Move left
    else if (y > head.y) direction = { x: 0, y: 1 }; // Move down
    else if (y < head.y) direction = { x: 0, y: -1 }; // Move up
});

// Add start button functionality
document.getElementById("startButton").addEventListener("click", startGame);
