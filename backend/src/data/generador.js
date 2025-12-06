
// importamos el faker
const { faker } = require('@faker-js/faker'); 

// función auxiliar
const generarId = () => faker.string.uuid();

// función que genera canción
const generarCancion = () => ({
  id: generarId(),
  titulo: faker.music.songName(),
  artista: faker.person.fullName(),
  album: faker.commerce.productName(),
  // se simula un formato de duración 
  duracion: `${faker.number.int({ min: 1, max: 9 })}:${faker.number.int({ min: 10, max: 59 })}`,
  genero: faker.music.genre(),
  fechaLanzamiento: faker.date.past().toISOString().split('T')[0]
});

// función que genera playlist
const generarPlaylist = () => {
  // genera un número aleatorio de canciones entre 3 y 10
  const numCanciones = faker.number.int({ min: 3, max: 10 });
  const canciones = [];

  // rellena el arreglo de canciones usando la función generarCancion
  for (let i = 0; i < numCanciones; i++) {
    canciones.push(generarCancion());
  }

  return {
    idPlaylist: generarId(),
    nombre: faker.lorem.words(3), 
    descripcion: faker.lorem.sentence(),
    canciones: canciones, // arreglo de objetos Canción
    creador: faker.person.firstName(),
    fechaCreacion: faker.date.recent().toISOString().split('T')[0]
  };
};

// exporta las funciones
module.exports = {
  generarCancion,
  generarPlaylist
};