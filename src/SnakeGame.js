import React, { useEffect, useRef, useState } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const tileSize = 20;
    const rows = 400 / tileSize;
    const cols = 400 / tileSize;

    let snake;
    let dx;
    let dy;
    let food;

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    let gameLoop;

    const resetGame = () => {
        snake = [
            { x: 160, y: 160 },
            { x: 140, y: 160 },
            { x: 120, y: 160 },
        ];

        dx = tileSize;  // Reset horizontal movement (initially moving right)
        dy = 0;  // Reset vertical movement (initially no vertical movement)

        food = {
            x: Math.floor(Math.random() * cols) * tileSize,
            y: Math.floor(Math.random() * rows) * tileSize,
        };
    };

    const startGame = () => {
        setIsGameRunning(true);
        setGameOver(false);
        resetGame(); // Reset game variables to initial state
        runGameLoop(); // Start the game loop
        document.addEventListener('keydown', changeDirection); // Add key event listener
    };

    const endGame = () => {
        clearInterval(gameLoop); // Stop the game loop
        setGameOver(true); // Set the game over state
        document.removeEventListener('keydown', changeDirection); // Remove key event listener
    };

    const runGameLoop = () => {
        const canvas = canvasRef.current;  // Access the canvas element
        const ctx = canvas.getContext('2d');  // Get the 2D drawing context

        gameLoop = setInterval(() => {
            clearCanvas(ctx);  // Clear the canvas
            drawFood(ctx);  // Draw the food
            moveSnake();  // Move the snake
            drawSnake(ctx);  // Draw the snake
            checkFoodCollision();  // Check if the snake ate the food

            if (checkGameOver()) {
                endGame(); // End the game when game over condition is met
            }
        }, 100);
    };

    const moveSnake = () => {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        snake.pop();
    };

    const drawSnake = (ctx) => {
        snake.forEach((part) => {
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(part.x, part.y, tileSize, tileSize);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(part.x, part.y, tileSize, tileSize);
        });
    };

    const clearCanvas = (ctx) => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const drawFood = (ctx) => {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(food.x, food.y, tileSize, tileSize);
    };

    const checkFoodCollision = () => {
        if (snake[0].x === food.x && snake[0].y === food.y) {
            snake.push({}); // Grow the snake by adding an empty part
            food = {
                x: Math.floor(Math.random() * cols) * tileSize,
                y: Math.floor(Math.random() * rows) * tileSize,
            };
        }
    };

    const checkGameOver = () => {
        const head = snake[0];

        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            return true;
        }

        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }

        return false;
    };

    const changeDirection = (event) => {
        const W_KEY = 87; // W key
        const A_KEY = 65; // A key
        const S_KEY = 83; // S key
        const D_KEY = 68; // D key

        const keyPressed = event.keyCode;

        const goingUp = dy === -tileSize;
        const goingDown = dy === tileSize;
        const goingRight = dx === tileSize;
        const goingLeft = dx === -tileSize;

        if (keyPressed === A_KEY && !goingRight) { // Left
            dx = -tileSize;
            dy = 0;
        }
        if (keyPressed === D_KEY && !goingLeft) { // Right
            dx = tileSize;
            dy = 0;
        }
        if (keyPressed === W_KEY && !goingDown) { // Up
            dx = 0;
            dy = -tileSize;
        }
        if (keyPressed === S_KEY && !goingUp) { // Down
            dx = 0;
            dy = tileSize;
        }
    };

    useEffect(() => {
        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', changeDirection);
        };
    }, []);

    return (
        <div>
            <button 
                onClick={startGame} 
                style={{ display: isGameRunning || gameOver ? 'none' : 'block', margin: '0 auto', display: 'block' }}
            >
                Start Game
            </button>
            {gameOver && (
                <div style={{ textAlign: 'center' }}>
                    <h2>Game Over!</h2>
                    <button onClick={startGame}>Restart Game</button>
                </div>
            )}
            <canvas ref={canvasRef} width="400" height="400" style={{ display: 'block', margin: '0 auto' }} />
        </div>
    );
};

export default SnakeGame;
