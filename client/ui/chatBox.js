// ChatBox UI module for Monkey Snowfight
// This module creates and manages the chat UI overlay

export default class ChatBox {
  constructor(parent = document.body) {
    // Create chat container
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.left = '20px';
    this.container.style.bottom = '20px';
    this.container.style.width = '320px';
    this.container.style.background = 'rgba(0,0,0,0.7)';
    this.container.style.borderRadius = '8px';
    this.container.style.padding = '10px';
    this.container.style.color = '#fff';
    this.container.style.fontFamily = 'sans-serif';
    this.container.style.zIndex = '2000';
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';
    this.container.style.gap = '8px';

    // Chat messages area
    this.messages = document.createElement('div');
    this.messages.style.height = '120px';
    this.messages.style.overflowY = 'auto';
    this.messages.style.fontSize = '14px';
    this.messages.style.marginBottom = '4px';
    this.container.appendChild(this.messages);

    // Input row
    const inputRow = document.createElement('div');
    inputRow.style.display = 'flex';
    inputRow.style.gap = '4px';

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Type a message...';
    this.input.style.flex = '1';
    this.input.style.borderRadius = '4px';
    this.input.style.border = 'none';
    this.input.style.padding = '6px';
    this.input.style.fontSize = '14px';

    this.sendBtn = document.createElement('button');
    this.sendBtn.textContent = 'Send';
    this.sendBtn.style.background = '#4caf50';
    this.sendBtn.style.color = '#fff';
    this.sendBtn.style.border = 'none';
    this.sendBtn.style.borderRadius = '4px';
    this.sendBtn.style.padding = '6px 12px';
    this.sendBtn.style.cursor = 'pointer';

    inputRow.appendChild(this.input);
    inputRow.appendChild(this.sendBtn);
    this.container.appendChild(inputRow);

    // Add to DOM
    parent.appendChild(this.container);

    // Event listeners
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;
    this.addMessage('You', text);
    this.input.value = '';
    // TODO: Emit chat message to server via Socket.io
  }

  addMessage(user, text) {
    const msg = document.createElement('div');
    msg.innerHTML = `<b>${user}:</b> ${text}`;
    this.messages.appendChild(msg);
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  clear() {
    this.messages.innerHTML = '';
  }

  destroy() {
    this.container.remove();
  }
}
