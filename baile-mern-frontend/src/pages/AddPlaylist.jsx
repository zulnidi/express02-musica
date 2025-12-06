import React, { useState } from "react";

const AddPlaylist = () => {
  const [playlist, setPlaylist] = useState({ nombre: "", descripcion: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddPlaylist = async () => {
    if (!playlist.nombre.trim()) {
      setError("El nombre de la playlist es obligatorio");
      setMessage("");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playlist),
      });

      if (!res.ok) throw new Error("Error al crear la playlist");

      setMessage("Playlist creada exitosamente!");
      setError("");
      setPlaylist({ nombre: "", descripcion: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h1>Agregar Playlist</h1>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={playlist.nombre}
          onChange={(e) => setPlaylist({ ...playlist, nombre: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={playlist.descripcion}
          onChange={(e) => setPlaylist({ ...playlist, descripcion: e.target.value })}
          className="input"
          style={{ marginLeft: "10px" }}
        />
        <button
          type="button"
          onClick={handleAddPlaylist}
          className="button"
          style={{ marginLeft: "10px" }}
        >
          Crear
        </button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddPlaylist;
