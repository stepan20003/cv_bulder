const express = require('express');
const router = express.Router();
const { createCV, getCVs, getCVById, updateCV, deleteCV, downloadCV } = require('../controllers/cvController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', createCV);
router.get('/', getCVs);
router.get('/:id', getCVById);
router.get('/:id/download', downloadCV);
router.put('/:id', updateCV);
router.delete('/:id', deleteCV);

module.exports = router;
