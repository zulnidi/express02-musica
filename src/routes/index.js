const express = require('express');
// importa las funciones generadoras
const { generarCancion, generarPlaylist } = require('../data/generador');

// crea una instancia del Router de Express
const router = express.Router();

// retorna un objeto canción con datos generados aleatoriamente.
router.get('/cancion', (req, res) => {
  const cancion = generarCancion();
  res.status(200).json(cancion);
});

// retorna un objeto playlist con un arreglo de entre 3 a 10 canciones
router.get('/playlist', (req, res) => {
  const playlist = generarPlaylist();
  res.status(200).json(playlist);
});

// exporta el router para usarlo en el servidor principal
module.exports = router;