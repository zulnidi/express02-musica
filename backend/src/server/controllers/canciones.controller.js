const { canciones } = require('../../data/db');
const { generarCancion } = require('../../data/generador');

// GET /canciones
exports.getCanciones = (req, res) => {
  res.json(canciones);
};

// GET /canciones/:id
exports.getCancion = (req, res) => {
  const { id } = req.params;
  const cancion = canciones.find(c => c.id === id);

  if (!cancion) return res.status(404).json({ message: "Canción no encontrada" });

  res.json(cancion);
};

// POST /canciones
exports.createCancion = (req, res) => {
  const nueva = {
    id: generarCancion().id,
    ...req.body
  };

  canciones.push(nueva);
  res.status(201).json(nueva);
};

// PUT /canciones/:id
exports.updateCancion = (req, res) => {
  const { id } = req.params;
  const index = canciones.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Canción no encontrada" });

  canciones[index] = { ...canciones[index], ...req.body };
  res.json(canciones[index]);
};

// DELETE /canciones/:id
exports.deleteCancion = (req, res) => {
  const { id } = req.params;
  const index = canciones.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Canción no encontrada" });

  const eliminada = canciones.splice(index, 1);
  res.json({ message: "Canción eliminada", eliminada });
};
