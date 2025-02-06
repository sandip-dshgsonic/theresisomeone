// backend/routes/waitlistRoutes.js
const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitlistController');
const { validateEntry } = require('../middleware/validator');

router.get('/getallwaitlist', waitlistController.getAllEntries);
router.post('/create-entry', validateEntry, waitlistController.createEntry);
router.put('/update-entry/:id', validateEntry, waitlistController.updateEntry);
router.delete('/delete-entry/:id', waitlistController.deleteEntry);

module.exports = router;
