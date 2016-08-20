var express = require('express');
var router = express.Router();

var docsController = require('../controllers/apidoc');

router.get('/apidoc/data', docsController.getFileData);

module.exports = router;