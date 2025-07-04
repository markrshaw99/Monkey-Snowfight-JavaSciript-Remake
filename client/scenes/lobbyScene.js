import { canvas } from '../config.js';
import ChatBox from '../ui/chatBox.js';

let chatBox = null;

const LobbyScene = {
  init() {
    console.log("LobbyScene: init");
    // Create and show the chat box when entering the lobby
    chatBox = new ChatBox();
    // Optionally, add a welcome message
    chatBox.addMessage('System', 'Welcome to the Lobby!');
  },

  update(dt) {
    // Game logic goes here
  },

  render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = "28px sans-serif";
    ctx.fillText("Welcome to the Lobby!", 250, 300);
  },

  cleanup() {
    console.log("LobbyScene: cleanup");
    // Remove the chat box when leaving the lobby
    if (chatBox) {
      chatBox.destroy();
      chatBox = null;
    }
  }
};

export default LobbyScene;
