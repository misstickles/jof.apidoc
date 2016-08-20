// var fr = new FileReader();
// fr.onload = function(e) {
// };
// fr.readAsText('apiDocumentation.jof');

readTextFile('http://localhost:3000/api/apidoc/data');

function readTextFile(file) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', file, true);
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200 || httpRequest.status === 0) {
				var md = new GithubMarkdown({
					text: httpRequest.responseText,
					stylesheet: '/stylesheets/app.css'
				});
			} else {
				alert("There was a problem with the request (reading file)." + httpRequest.responseText);				
			}
		}
	}

	httpRequest.send(null);
}

;function GithubMarkdown(opts) {
	'use strict';

	var me = this;
	var html = '';

	opts.text = opts.text || '    Please create a file, apiDocumentation.jof, in app_api\\data.'
	opts.stylesheet = opts.stylesheet || 'app.css';
	opts.mode = opts.mode || 'markdown';
	opts.context = opts.context || '';
	opts.title = opts.title || 'Jo - API Documentation';
	opts.apiUrl = opts.apiUrl || 'https://api.github.com/markdown';

	var httpRequest;

	var msg = {
		"text": opts.text.replace(/["]/g, '').replace(/\\r\\n/g, String.fromCharCode(13)),
		"mode": opts.mode,
		"context" : opts.context
	};

	var data = JSON.stringify(msg);

//	document.getElementById("sendButton").onclick = function() { makeRequest( markdownUrl ); };

	makeRequest(opts.apiUrl);

	function makeRequest(url) {
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			alert("Giving up :(  Cannot create XMLHTTP instance.");
			return false;
		}

		httpRequest.onreadystatechange = handleResponse;
		httpRequest.open("POST", url);
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		httpRequest.send(data);
	}

	function handleResponse() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				appendResponse(httpRequest.responseText);
				document.write(html);
				// alert(httpRequest.responseText);
			} else {
				alert("There was a problem with the request." + httpRequest.responseText);
			}
		}
	}

	function appendResponse(data) {
		if (opts.stylesheet || opts.title) {
			concat('<!DOCTYPE html>\n' +
				'<html>\n' +
				'<head>\n' +
				'  <title>' + opts.title + '</title>\n' +
				'  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">\n' +
				'  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">\n' +
				'  <link rel="stylesheet" href="' + opts.stylesheet + '">\n' +
				'</head>\n' +
				'<body>\n' );
		}

		concat(data + '\n');

		if (opts.stylesheet || opts.title) {
			concat('</body>\n</html>\n');
		}
	}

	function concat(data) {
		html += data;
	}
}