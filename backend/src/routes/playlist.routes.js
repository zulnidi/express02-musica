const express = require('express');
const router = express.Router();
const ctrl = require('../server/controllers/playlist.controller');

router.get('/', ctrl.getPlaylists);
router.get('/:id', ctrl.getPlaylist);
router.post('/', ctrl.createPlaylist);
router.put('/:id', ctrl.updatePlaylist);
router.delete('/:id', ctrl.deletePlaylist);

router.post('/:id/agregar', ctrl.addToPlaylist);
router.delete('/:id/remover/:idCancion', ctrl.removeFromPlaylist);

module.exports = router;
