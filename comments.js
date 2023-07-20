// Create web server

// Import express
var express = require('express');
var router = express.Router();

// Import controller
var controller = require('../controllers/commentController');

// Index
router.get('/', controller.index);
router.post('/', controller.create);

// Export
module.exports = router;
