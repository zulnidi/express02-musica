const express = require('express');
const apiRoutes = require('./routes');

// definimos el puerto 
const PORT = process.env.PORT || 3000;

// inicializa la aplicación Express
const app = express();

// middleware para parsear json, por si acaso
app.use(express.json());

app.use('/api', apiRoutes);

// ruta de prueba 
app.get('/', (req, res) => {
  res.send('API Música Core está corriendo. Prueba /api/cancion o /api/playlist');
});

// función flecha para arrancar el servidor
const startServer = () => {
  app.listen(PORT, () => {
    console.log(` Servidor Express corriendo en el puerto ${PORT}`);
    console.log(` Puedes acceder en: http://localhost:${PORT}`);
    console.log(` Rutas de prueba:`);
    console.log(`   - Canción: http://localhost:${PORT}/api/cancion`);
    console.log(`   - Playlist: http://localhost:${PORT}/api/playlist`);
  });
};

// llama a la función para iniciar
startServer();