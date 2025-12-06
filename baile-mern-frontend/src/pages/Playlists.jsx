import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/playlists")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar playlists");
        return res.json();
      })
      .then(data => setPlaylists(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Cargando playlists...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  const filteredPlaylists = playlists.filter(pl =>
    pl.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pl.canciones?.some(song => song.titulo?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h1>Playlists</h1>

      <input
        type="text"
        placeholder="Buscar playlist o canción..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="input"
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {filteredPlaylists.length === 0 ? (
        <p>No hay playlists que coincidan.</p>
      ) : (
        <ul>
          {filteredPlaylists.map(pl => (
            <li key={pl.idPlaylist} style={{ padding: "5px 0" }}>
              <Link to={`/playlists/${pl.idPlaylist}`} style={{ fontWeight: "bold" }}>
                {pl.nombre}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlists;
