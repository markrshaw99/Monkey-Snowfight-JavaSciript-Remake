import { ctx } from "./config.js";
import { preloadCriticalAssets, preloadBackgroundAssets, setProgressCallback } from "./assetManager.js";
import { changeScene, updateScene, renderScene } from "./sceneManager.js";
import LobbyScene from "./scenes/lobbyScene.js";

const loadingOverlay = document.getElementById("loadingOverlay");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let lastTime = 0;

function gameLoop(timestamp) {
  const dt = (timestamp - lastTime) / 100;
  lastTime = timestamp;

  updateScene(dt);
  renderScene(ctx);

  requestAnimationFrame(gameLoop);
}

function updateProgress(percent) {
  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "%";
}

async function startGame() {
  setProgressCallback(updateProgress);
  const start = Date.now(); // Start time for loading duration

  try {
    await preloadCriticalAssets();
  } catch (err) {
    console.error("Error loading assets:", err);
    progressText.textContent = "Failed to load assets";
    return;
  }

  // Ensure at least 1 second display
  const elapsed = Date.now() - start;
  if (elapsed < 1000) {
  }

  // Force 100% display and wait a couple of seconds before hiding overlay
  progressFill.style.width = "100%";
  progressText.textContent = "100%";
  await new Promise(res => setTimeout(res, 1000)); // Wait 2 seconds
  loadingOverlay.style.display = "none";

  changeScene(LobbyScene);
  requestAnimationFrame(gameLoop);
}

startGame();

preloadBackgroundAssets();