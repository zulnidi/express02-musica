const { generarCancion } = require('./generador');

const canciones = Array.from({ length: 10 }, () => generarCancion());
const playlists = [];

module.exports = { canciones, playlists };
