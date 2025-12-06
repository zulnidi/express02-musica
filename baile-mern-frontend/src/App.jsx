import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Library from "./pages/Library.jsx";
import Playlists from "./pages/Playlists.jsx";
import AddSong from "./pages/AddSong.jsx";
import AddPlaylist from "./pages/AddPlaylist.jsx";
import PlaylistDetail from "./pages/PlaylistDetail.jsx";
import SongDetail from "./components/SongDetail.jsx"; 

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Biblioteca de canciones */}
      <Route path="/" element={<Library />} />

      {/* Playlists */}
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlists/:id" element={<PlaylistDetail />} />

      {/* Formularios */}
      <Route path="/add-song" element={<AddSong />} />
      <Route path="/add-playlist" element={<AddPlaylist />} />

      {/* Detalle de canción */}
      <Route path="/songs/:id" element={<SongDetail />} />
    </Routes>
  </Router>
);

export default App;
