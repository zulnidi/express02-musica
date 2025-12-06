const express = require('express');
const cors = require('cors'); // <-- Importamos CORS
const app = express();

// Habilitar CORS para todos los orígenes
app.use(cors());

app.use(express.json());

app.use('/api/playlists', require('./routes/playlist.routes'));
app.use('/api/canciones', require('./routes/canciones.routes'));

app.get('/', (req, res) => {
  res.send('API Música en funcionamiento');
});

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));
