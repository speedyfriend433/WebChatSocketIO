const socket = io();

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (chatInput.value) {
        socket.emit('chat message', chatInput.value);
        chatInput.value = '';
    }
});

socket.on('chat message', (msg) => {
    addMessage(msg);
});

socket.on('chat history', (history) => {
    history.forEach(msg => addMessage(msg));
});

function addMessage(msg) {
    const li = document.createElement('li');
    li.textContent = msg;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}
