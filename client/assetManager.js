// client/assetManager.js

const images = {};
let totalToLoad = 0;
let loadedCount = 0;
let progressCallback = null;

/**
 * Set a callback function to receive loading progress updates.
 * @param {function(number):void} cb - Receives progress percent (0-100).
 */
export function setProgressCallback(cb) {
  progressCallback = cb;
}

/**
 * Internal: update progress and call the callback if set.
 */
function updateProgress() {
  if (progressCallback && totalToLoad > 0) {
    const percent = Math.floor((loadedCount / totalToLoad) * 100);
    progressCallback(percent);
  }
}

/**
 * Load a single image by name.
 * @param {string} name - Unique key for the image.
 * @param {string} src - Image file path.
 * @returns {Promise<void>}
 */
export function loadImage(name, src) {
  return new Promise((resolve, reject) => {
    if (images[name]) {
      // Already loaded, count as loaded for progress purposes
      updateProgress();
      return resolve();
    }

    totalToLoad++;
    const img = new Image();

    img.onload = () => {
      images[name] = img;
      loadedCount++;
      updateProgress();
      resolve();
    };

    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

    img.src = src;
  });
}

/**
 * Load a sequence of images, useful for animations.
 * @param {string} prefix - Base name for frames.
 * @param {number} count - Number of frames to load.
 * @param {string} folderPath - Folder containing images.
 * @param {string} extension - File extension (default 'svg').
 * @param {number} startIndex - The starting frame number (default 1).
 * @returns {Promise<void>}
 */
export async function loadImageSequence(prefix, count, folderPath, extension = "svg", startIndex = 1) {
  const promises = [];
  // Start at startIndex, end at startIndex + count - 1
  for (let i = startIndex; i < startIndex + count; i++) {
    const name = `${prefix}_${i}`;
    const path = `${folderPath}/${i}.${extension}`;
    promises.push(loadImage(name, path));
  }
  await Promise.all(promises);
}

/**
 * Retrieve a loaded image by its name.
 * @param {string} name
 * @returns {HTMLImageElement|null}
 */
export function getImage(name) {
  return images[name] || null;
}

/**
 * Unload an image by name, freeing memory.
 * @param {string} name
 */
export function unloadImage(name) {
  if (images[name]) {
    delete images[name];
  }
}

/**
 * Unload all loaded images.
 */
export function unloadAll() {
  for (const key in images) {
    delete images[key];
  }
}

/**
 * Preload only the critical assets needed to start the game quickly.
 */
export async function preloadCriticalAssets() {
  await Promise.all([
    loadImage("Background", "assets/Background/Background.svg"),
    loadImageSequence("AimGuide_Player2", 1, "assets/AimGuide_Player2", "svg", 1),
    loadImageSequence("Chimney_Player1", 2, "assets/Chimney_Player1", "svg", 1),
    loadImageSequence("FloorAndCeiling", 2, "assets/FloorAndCeiling", "svg", 1),
    // Add any other assets needed for the lobby/loading screen here
  ]);
  console.log("Critical assets loaded.");
}

/**
 * Preload the rest of the assets in the background after the game starts.
 */
export async function preloadBackgroundAssets() {
  await Promise.all([
    loadImageSequence("AimSlider", 2, "assets/AimSlider", "svg", 1),
    loadImageSequence("AimSliderFlashingBehind", 30, "assets/AimSliderFlashingBehind", "svg", 1),
    loadImageSequence("HealthPlayer1", 100, "assets/HealthPlayer1", "svg", 1),
    loadImageSequence("HealthPlayer2", 100, "assets/HealthPlayer2", "svg", 1),
    loadImageSequence("IceBlockDamaged", 3, "assets/IceBlockDamaged", "svg", 1),
    loadImageSequence("IceBlockExplosion", 11, "assets/IceBlockExplosion", "svg", 1),
    loadImageSequence("Icicle Shake", 7, "assets/Icicle Shake", "svg", 1),
    loadImage("Markiclip", "assets/Markiclip/markiclip.svg"),
    loadImageSequence("MetalObstacle", 41, "assets/MetalObstacle", "svg", 1),
    loadImageSequence("MonkeyAddSnow_Player1", 14, "assets/MonkeyAddSnow_Player1", "svg", 81),
    loadImageSequence("MonkeyAim_Player1", 17, "assets/MonkeyAim_Player1", "svg", 13),
    loadImageSequence("MonkeyEyesMoving", 149, "assets/MonkeyEyesMoving", "svg", 1),
    loadImageSequence("MonkeyFire_Player1", 51, "assets/MonkeyFire_Player1", "svg", 30),
    loadImageSequence("MonkeyGetUp_Player1", 12, "assets/MonkeyGetUp_Player1", "svg", 105),
    loadImageSequence("MonkeyHit_Player1", 10, "assets/MonkeyHit_Player1", "svg", 95),
    loadImageSequence("MonkeyIdle_Player1", 12, "assets/MonkeyIdle_Player1", "svg", 1),
    loadImageSequence("MonkeyLose_Player1", 10, "assets/MonkeyLose_Player1", "svg", 124),
    loadImageSequence("MonkeyWin_Player1", 7, "assets/MonkeyWin_Player1", "svg", 117),
    loadImageSequence("ObstacleArea", 1, "assets/ObstacleArea", "svg", 1),
    loadImageSequence("PowerButton_Player2", 2, "assets/PowerButton_Player2", "svg", 1),
    loadImageSequence("PowerScale_Player2", 35, "assets/PowerScale_Player2", "svg", 1),
    loadImageSequence("Snowball", 19, "assets/Snowball", "svg", 1),
    loadImageSequence("SnowButton", 2, "assets/SnowButton", "svg", 1),
    loadImageSequence("Snowpile_Player1", 92, "assets/Snowpile_Player1", "svg", 1),
    loadImageSequence("SnowScale_Player2", 1, "assets/SnowScale_Player2", "svg", 1),
    loadImageSequence("TurretExtension_Player1", 35, "assets/TurretExtension_Player1", "svg", 1),
    loadImageSequence("Explosion", 13, "assets/Explosion", "svg", 1),
  ]);
  console.log("Background assets loaded.");
}
