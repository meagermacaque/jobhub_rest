const router = require('express').Router();
const authController = require('../controllers/authController')

router.post('/register', authController.createJob);

router.get('/login', authController.getAllJobs);

module.exports = router;
