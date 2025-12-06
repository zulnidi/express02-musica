import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArtist, setFilterArtist] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/canciones")
      .then(res => res.json())
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container">Cargando...</div>;

  const filteredSongs = songs.filter(song =>
    song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    song.artista.toLowerCase().includes(filterArtist.toLowerCase())
  );

  const artists = [...new Set(songs.map(song => song.artista).filter(Boolean))];

  return (
    <div className="container">
      <h1>Biblioteca de Música</h1>

      <input
        type="text"
        placeholder="Buscar canción..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
        style={{ marginBottom: "10px", width: "100%" }}
      />

      <select
        value={filterArtist}
        onChange={(e) => setFilterArtist(e.target.value)}
        className="input"
        style={{ marginBottom: "20px", width: "100%" }}
      >
        <option value="">Todos los artistas</option>
        {artists.map((artist, i) => (
          <option key={i} value={artist}>{artist}</option>
        ))}
      </select>

      {filteredSongs.length === 0 ? (
        <p>No hay canciones que coincidan.</p>
      ) : (
        <ul>
          {filteredSongs.map(song => (
            <li key={song.id} style={{ padding: "5px 0" }}>
              {/* Aquí añadimos el link al detalle */}
              <Link to={`/songs/${song.id}`} style={{ fontWeight: "bold", textDecoration: "none" }}>
                {song.titulo}
              </Link>
              {song.artista && ` - ${song.artista}`} {song.album && `(${song.album})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Library;
