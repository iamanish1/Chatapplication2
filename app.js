// Corrected selectors
const tashuSelectorBtn = document.querySelector('#tashu-selector');
const anishSelectorBtn = document.querySelector('#anish-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

// Validate selectors
if (!tashuSelectorBtn || !anishSelectorBtn || !chatHeader || !chatMessages || !chatInputForm || !chatInput || !clearChatBtn) {
  console.error('One or more elements could not be found. Check your HTML IDs and classes.');
}

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Current message sender
let messageSender = 'Tashu';

// Function to create message element
const createChatMessageElement = (message) => {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${message.sender === 'Tashu' ? 'blue-bg' : 'gray-bg'}`;

  const senderDiv = document.createElement('div');
  senderDiv.className = 'message-sender';
  senderDiv.textContent = message.sender;

  const textDiv = document.createElement('div');
  textDiv.className = 'message-text';
  textDiv.textContent = message.text;

  const timestampDiv = document.createElement('div');
  timestampDiv.className = 'message-timestamp';
  timestampDiv.textContent = message.timestamp;

  messageDiv.append(senderDiv, textDiv, timestampDiv);
  return messageDiv;
};

// Load messages into the DOM on page load
window.onload = () => {
  console.log('Loading messages...');
  chatMessages.innerHTML = ''; // Clear messages before appending
  messages.forEach((message) => {
    chatMessages.append(createChatMessageElement(message));
  });
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
};

// Update the current sender
const updateMessageSender = (name) => {
  console.log(`Switching to ${name}...`);
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  tashuSelectorBtn.classList.toggle('active-person', name === 'Tashu');
  anishSelectorBtn.classList.toggle('active-person', name === 'Anish');

  chatInput.focus(); // Auto-focus the input field
};

// Attach click event handlers
tashuSelectorBtn.addEventListener('click', () => updateMessageSender('Tashu'));
anishSelectorBtn.addEventListener('click', () => updateMessageSender('Anish'));

// Send a message
const sendMessage = (e) => {
  e.preventDefault();

  if (!chatInput.value.trim()) {
    console.warn('Message is empty. Ignoring send.');
    return;
  }

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value.trim(),
    timestamp,
  };

  // Save message to local storage
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  // Add message to DOM
  chatMessages.append(createChatMessageElement(message));

  // Clear input field and scroll to bottom
  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;

  console.log('Message sent:', message);
};

// Attach form submit event
chatInputForm.addEventListener('submit', sendMessage);

// Clear chat messages
clearChatBtn.addEventListener('click', () => {
  console.log('Clearing chat...');
  localStorage.clear();
  messages = [];
  chatMessages.innerHTML = '';
});
