import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/canciones/${id}`)
      .then(res => res.json())
      .then(data => {
        setSong(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container">Cargando canción...</div>;
  if (!song) return <div className="container">Canción no encontrada</div>;

  return (
    <div className="container">
      <h1>{song.titulo}</h1>
      <p><strong>Artista:</strong> {song.artista}</p>
      <p><strong>Álbum:</strong> {song.album}</p>
      <p><strong>Género:</strong> {song.genero}</p>
      <p><strong>Duración:</strong> {song.duracion}</p>
      <p><strong>Fecha de lanzamiento:</strong> {song.fechaLanzamiento}</p>
    </div>
  );
};

export default SongDetail;
