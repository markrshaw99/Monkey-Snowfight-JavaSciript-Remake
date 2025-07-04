let currentScene = null;

export function changeScene(newScene) {
  if (currentScene && currentScene.cleanup) {
    currentScene.cleanup();
  }

  currentScene = newScene;

  if (currentScene.init) {
    currentScene.init();
  }
}

export function updateScene(dt) {
  if (currentScene && currentScene.update) {
    currentScene.update(dt);
  }
}

export function renderScene(ctx) {
  if (currentScene && currentScene.render) {
    currentScene.render(ctx);
  }
}
