const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Variables
let seaLevel = 0.0;  // Sea level in meters
let ecoCoins = 100;  // Resource currency
let seaLevelRiseRate = 0.03;  // Rate of sea level rise per tick
let solarPanelIncome = 0;  // Income from solar panels
let awarenessEffect = 1;  // Multiplier for slowing down resource depletion
let countdownTimer = 3;  // Countdown timer before game starts
let gameActive = false;  // Flag to check if the game is active

// Functions to handle player actions
function buildSeaWall() {
    if (gameActive && ecoCoins >= 50) {
        ecoCoins -= 50;
        seaLevelRiseRate -= 0.02;  // Slows down sea level rise
        updateInfoPanel();
    } else if (!gameActive) {
        alert("Game is over! Restart to play again.");
    } else {
        alert("Not enough Eco Coins!");
    }
}

function plantTrees() {
    if (gameActive && ecoCoins >= 30) {
        ecoCoins -= 30;
        seaLevelRiseRate -= 0.01;  // Minor effect on sea level rise
        updateInfoPanel();
    } else if (!gameActive) {
        alert("Game is over! Restart to play again.");
    } else {
        alert("Not enough Eco Coins!");
    }
}

function switchToRenewables() {
    if (gameActive && ecoCoins >= 100) {
        ecoCoins -= 100;
        seaLevelRiseRate -= 0.05;  // Significant impact on sea level rise
        updateInfoPanel();
    } else if (!gameActive) {
        alert("Game is over! Restart to play again.");
    } else {
        alert("Not enough Eco Coins!");
    }
}

function publicAwarenessCampaign() {
    if (gameActive && ecoCoins >= 20) {
        ecoCoins -= 20;
        awarenessEffect *= 1.1;  // Slows down eco coin usage rate
        updateInfoPanel();
    } else if (!gameActive) {
        alert("Game is over! Restart to play again.");
    } else {
        alert("Not enough Eco Coins!");
    }
}

function installSolarPanels() {
    if (gameActive && ecoCoins >= 80) {
        ecoCoins -= 80;
        solarPanelIncome += 1;  // Generates eco coins over time (reduced rate)
        updateInfoPanel();
    } else if (!gameActive) {
        alert("Game is over! Restart to play again.");
    } else {
        alert("Not enough Eco Coins!");
    }
}

function emergencyFloodDrills() {
    if (gameActive && ecoCoins >= 40) {
        ecoCoins -= 40;
        seaLevelRiseRate -= 0.05;  // Temporary reduction in sea level rise
        setTimeout(() => {
            seaLevelRiseRate += 0.05;  // Reset after some time
        }, 5000);  // Effect lasts for 5 seconds
        updateInfoPanel();
    } else if (!gameActive) {
        alert("Game is over! Restart to play again.");
    } else {
        alert("Not enough Eco Coins!");
    }
}

// Update the info panel on the UI
function updateInfoPanel() {
    document.getElementById("seaLevel").innerText = `🌊 Sea Level: ${seaLevel.toFixed(1)}m`;
    document.getElementById("ecoCoins").innerText = `💰 Eco Coins: ${ecoCoins}`;
}

// Start countdown before game begins
function startCountdown() {
    document.getElementById("instructions-modal").style.display = "none";  // Hide instructions modal
    document.getElementById("countdown").classList.remove("hidden");     // Show countdown timer

    // Reset and start the countdown
    countdownTimer = 3;
    document.getElementById("timer").innerText = countdownTimer; // Display initial value

    const countdownInterval = setInterval(() => {
        countdownTimer--;
        document.getElementById("timer").innerText = countdownTimer;

        if (countdownTimer <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").classList.add("hidden");  // Hide countdown timer
            gameActive = true;  // Activate the game
            gameLoop();  // Start the game loop after countdown
        }
    }, 1000);  // Countdown every second
}

// Main game loop
function gameLoop() {
    if (!gameActive) return;  // Stop the game loop if game is over

    // Core game mechanics and logic
    seaLevel += seaLevelRiseRate;
    ecoCoins += solarPanelIncome;

    // Check if eco coins have run out
    if (ecoCoins <= 0) {
        ecoCoins = 0; // Ensure ecoCoins don't go negative
        endGame("Game Over! You have run out of Eco Coins.");
        return;
    }

    // Ensure sea level does not go below 0
    if (seaLevel < 0) {
        seaLevel = 0;
        endGame("City Saved! The sea level has been controlled.");
        return;
    }

    updateInfoPanel();
    drawCity();

    // Check for game over condition
    if (seaLevel * 20 >= canvas.height) {  // End game when sea level reaches bottom line
        endGame("Game Over! The city is submerged.");
        return;
    }

    requestAnimationFrame(gameLoop);
}

// End the game and display a steady message
function endGame(message) {
    gameActive = false;  // Stop the game actions
    // Show the end-game message
    const endGameMessage = document.createElement("div");
    endGameMessage.id = "end-game-message";
    endGameMessage.className = "steady-message";
    endGameMessage.innerHTML = `<p>${message}</p><button onclick="restartGame()">Restart Game</button>`;
    document.body.appendChild(endGameMessage);

    // Stop eco coins generation
    solarPanelIncome = 0;
}

// Draw the city and sea level
function drawCity() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#009688";
    ctx.fillRect(0, canvas.height - (seaLevel * 20), canvas.width, canvas.height);
}

// Restart the game by resetting variables and showing the instructions modal again
function restartGame() {
    seaLevel = 0;
    ecoCoins = 100;
    seaLevelRiseRate = 0.05;
    solarPanelIncome = 0;
    awarenessEffect = 1;
    gameActive = false;  // Reset game state to inactive

    // Remove end-game message
    const endGameMessage = document.getElementById("end-game-message");
    if (endGameMessage) {
        endGameMessage.remove();
    }

    // Show instructions modal again and wait for user to press play
    document.getElementById("instructions-modal").style.display = "flex";
}

// Handle start game button click in instructions modal
function handleStartGame() {
    startCountdown();
}

// Attach event listener to the "Start Game" button
document.querySelector("#instructions-modal button").addEventListener("click", handleStartGame);

// Initialize the game by showing the instructions modal
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("instructions-modal").style.display = "flex";
});

