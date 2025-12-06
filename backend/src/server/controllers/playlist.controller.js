const { faker } = require('@faker-js/faker');

let playlists = [];

// Obtener todas
const getPlaylists = (req, res) => {
  res.json(playlists);
};

// Obtener una
const getPlaylist = (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id);
  if (!playlist) {
    return res.status(404).json({ message: 'Playlist no encontrada' });
  }
  res.json(playlist);
};

// Crear
const createPlaylist = (req, res) => {
  const { nombre, descripcion } = req.body;

  const newPlaylist = {
    id: faker.string.uuid(),
    nombre,
    descripcion,
    canciones: []   // 👈 Esta es la clave correcta
  };

  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
};

// Actualizar
const updatePlaylist = (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id);
  if (!playlist) {
    return res.status(404).json({ message: 'Playlist no encontrada' });
  }

  const { nombre, descripcion } = req.body;
  playlist.nombre = nombre ?? playlist.nombre;
  playlist.descripcion = descripcion ?? playlist.descripcion;

  res.json(playlist);
};

// Eliminar
const deletePlaylist = (req, res) => {
  playlists = playlists.filter(p => p.id !== req.params.id);
  res.json({ message: 'Playlist eliminada' });
};

// Agregar canción
const addToPlaylist = (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id);
  if (!playlist) {
    return res.status(404).json({ message: 'Playlist no encontrada' });
  }

  const { idCancion } = req.body;

  playlist.canciones.push(idCancion);

  res.json(playlist);
};

// Remover canción
const removeFromPlaylist = (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id);
  if (!playlist) {
    return res.status(404).json({ message: 'Playlist no encontrada' });
  }

  playlist.canciones = playlist.canciones.filter(c => c !== req.params.idCancion);

  res.json(playlist);
};

module.exports = {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addToPlaylist,
  removeFromPlaylist
};
