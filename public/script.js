const socket = io();

// Événement pour rejoindre le groupe
document.getElementById('joinGroup').onclick = () => {
    const username = document.getElementById('username').value;
    const group = document.getElementById('group').value;
    socket.emit('joinGroup', group);
    alert(`${username} a rejoint le groupe ${group}`);
};

// Événement pour envoyer un message
document.getElementById('sendMessage').onclick = () => {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    const group = document.getElementById('group').value;

    if (message) {
        socket.emit('newMessage', { content: message, userId: username, groupId: group });
        messageInput.value = '';
    }
};

// Écouter les messages
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message other';
    messageDiv.textContent = `${data.userId}: ${data.content}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Faire défiler vers le bas
});
