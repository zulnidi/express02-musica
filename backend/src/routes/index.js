const express = require('express');
const router = express.Router();

const cancionesRoutes = require('./canciones.routes');
const playlistRoutes = require('./playlist.routes');

router.use('/cancion', cancionesRoutes);

router.use('/playlist', playlistRoutes);

module.exports = router;
