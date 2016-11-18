// Tests are always loaded async
QUnit.config.autostart = false;
const CONSOLE_MSG = false;
//const API_URL = "http://api.her0.be/api.php";
const API_URL = "http://localhost/her0/api/public_www/api.php"
this.loadTests = function() {

	require([
						"tests/json.js",
						"tests/html.js",
						"tests/plain.js"
					],function() {
						QUnit.load();
						QUnit.start();
					}
		);
};
this.logRequestSuccess = function(type,name,url) {
	$('#qunit-status').append("<p class=\"success\">Test <strong> " + type + " " + name + "</strong>: Request <em>" + url + "</em>. Status <strong>OK</strong></p>");
};
this.logRequestError = function(type,name,url,status,statusText) {
	$('#qunit-status').append("<p class=\"error\">Test <strong> " + type + " " + name + "</strong>: Request <em>" + url + "</em>. Status <strong>FAILED</strong> (" + status + " " + statusText + ")</p>");
};
this.getRandomMS = function() {
	return parseInt(Math.random().toString(4).substr(-4,4));
};
