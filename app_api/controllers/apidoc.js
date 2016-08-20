var fs = require('mz/fs');

var directory = 'app_api/data/';
var filename = 'apiDocumentation.jof';

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getFileData = function(req, res) {
	fs.readFile(directory + filename, 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}

		sendJsonResponse(res, 200, data);
	});
};