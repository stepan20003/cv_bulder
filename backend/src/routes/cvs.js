const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', cvController.getAllCVs);
router.get('/:id', cvController.getCVById);
router.post('/', cvController.createCV);
router.put('/:id', cvController.updateCV);
router.delete('/:id', cvController.deleteCV);
router.get('/:id/download', cvController.downloadCV);

module.exports = router;
