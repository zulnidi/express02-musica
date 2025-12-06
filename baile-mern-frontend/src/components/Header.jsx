import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav>
      <Link to="/">Biblioteca</Link>
      <Link to="/playlists">Playlists</Link>
      <Link to="/add-song">Agregar Canción</Link>
      <Link to="/add-playlist">Agregar Playlist</Link>
    </nav>
  </header>
);

export default Header;
