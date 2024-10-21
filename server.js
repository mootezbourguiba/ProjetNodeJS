const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Sequelize, DataTypes } = require('sequelize');
const twig = require('twig');

// Initialisation de l'application Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuration de Twig
app.set('view engine', 'twig');
app.set('views', './views');
app.use(express.static('public'));


// Configuration Sequelize (remplacez les informations de connexion par les vôtres)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // ou 'sqlite', 'postgres', etc.
});

// Définir les modèles de données ici...

// Routes
app.get('/', (req, res) => {
    console.log('Route / accédée');
    res.render('index', { title: 'Chat en Temps Réel' });
  });
  

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`L'utilisateur a rejoint le groupe ${groupId}`);
  });

  socket.on('newMessage', (data) => {
    const { content, userId, groupId } = data;
    // Émettre le message à tous les utilisateurs dans le groupe
    io.to(groupId).emit('message', { content, userId, groupId });
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
