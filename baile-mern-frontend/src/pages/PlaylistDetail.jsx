import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para canciones seleccionadas
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/playlists/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Playlist no encontrada");
        return res.json();
      })
      .then(data => setPlaylist(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCheckboxChange = (songId) => {
    setSelectedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId) // desmarcar
        : [...prev, songId]               // marcar
    );
  };

  const addToPlaylist = () => {
    // Aquí podrías llamar a tu API para agregar las canciones seleccionadas
    console.log("Canciones seleccionadas para agregar:", selectedSongs);
    alert(`Canciones agregadas a la playlist: ${selectedSongs.join(", ")}`);
    setSelectedSongs([]); // limpiar selección si quieres
  };

  if (loading) return <div className="container">Cargando playlist...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!playlist) return <div className="container">Playlist no encontrada</div>;

  return (
    <div className="container">
      <h1>{playlist.nombre}</h1>
      <p><strong>Descripción:</strong> {playlist.descripcion}</p>
      <p><strong>Creador:</strong> {playlist.creador}</p>
      <p><strong>Fecha de creación:</strong> {playlist.fechaCreacion}</p>

      <h2>Canciones</h2>
      {playlist.canciones?.length > 0 ? (
        <ul>
          {playlist.canciones.map(song => (
            <li key={song.id} className="flex items-center justify-between my-2">
              <div>
                <strong>{song.titulo}</strong> - {song.artista} ({song.album})
              </div>
              <input
                type="checkbox"
                checked={selectedSongs.includes(song.id)}
                onChange={() => handleCheckboxChange(song.id)}
                className="w-5 h-5 accent-green-600"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay canciones en esta playlist.</p>
      )}

      {playlist.canciones?.length > 0 && (
        <button
          onClick={addToPlaylist}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition"
        >
          Agregar canciones seleccionadas
        </button>
      )}

      <Link
        to="/playlists"
        className="button"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        Volver a Playlists
      </Link>
    </div>
  );
};

export default PlaylistDetail;
