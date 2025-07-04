// Canvas Resize Code //
// Base (logical) game resolution from Flash
export const BASE_WIDTH = 600;
export const BASE_HEIGHT = 400;

// Scaling factor: 2 = 1200×800 display
export const viewScale = 2;

// Get the canvas and context
export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

// Apply resolution and scale
canvas.width = BASE_WIDTH;
canvas.height = BASE_HEIGHT;

canvas.style.width = `${BASE_WIDTH * viewScale}px`;
canvas.style.height = `${BASE_HEIGHT * viewScale}px`;

ctx.imageSmoothingEnabled = false; // Optional: disable smoothing for pixel art
ctx.scale(viewScale, viewScale);


// End of canvas resize code