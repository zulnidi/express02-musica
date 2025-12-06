import React, { useState } from "react";

const AddSong = () => {
  const [song, setSong] = useState({ titulo: "", artista: "", album: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddSong = async () => {
    if (!song.titulo.trim()) {
      setError("El título es obligatorio");
      setMessage("");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/canciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song),
      });

      if (!res.ok) throw new Error("Error al agregar la canción");

      setMessage("Canción agregada exitosamente!");
      setError("");
      setSong({ titulo: "", artista: "", album: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h1>Agregar Canción</h1>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Título"
          value={song.titulo}
          onChange={(e) => setSong({ ...song, titulo: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Artista"
          value={song.artista}
          onChange={(e) => setSong({ ...song, artista: e.target.value })}
          className="input"
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Álbum"
          value={song.album}
          onChange={(e) => setSong({ ...song, album: e.target.value })}
          className="input"
          style={{ marginLeft: "10px" }}
        />
        <button
          type="button"
          onClick={handleAddSong}
          className="button"
          style={{ marginLeft: "10px" }}
        >
          Agregar
        </button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddSong;
