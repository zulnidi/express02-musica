const express = require('express');
const router = express.Router();

const ctrl = require('../server/controllers/canciones.controller');

router.get('/', ctrl.getCanciones);
router.get('/:id', ctrl.getCancion);
router.post('/', ctrl.createCancion);
router.put('/:id', ctrl.updateCancion);
router.delete('/:id', ctrl.deleteCancion);

module.exports = router;
