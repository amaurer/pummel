
/* Called from console and imported as a module "require" */


/* TODO : check cookie setting, fails */

var args = process.argv,
	argsLen = args.length,
	spawn = require('child_process').spawn,
	request = require('request'),
	aProcesses = [],
	i = 0, len = 0,x = '', p = process;

if(argsLen === 3){
	len = 1;
} else if(argsLen === 4 && Number(args[3]) !== 'NaN'){
	len = Number(args[3]);
}

for (i=0; i<len; i++) {
	aProcesses.push(spawn('node', [args[2]]));
	x = aProcesses[i];
	x.stdout.on('data', handler);
	x.stderr.on('data', errorHandler);
	x.on('exit', exitHandler);
}

function handler(d){
	console.log('Data', d.toString());
};
function errorHandler(d){
	console.log('Error', d.toString());
};
function exitHandler(){
	console.log('Exit', arguments);
};
	

/* Public */
exports.go = function(threadRequestObjects){
	executeRequest(threadRequestObjects);
	function executeRequest(ro){
		request(ro, function(e, x, d){
			if(e !== null) throw e;
			console.log(x.statusCode);
			if(typeof ro.next !== 'undefinded' && ro.next !== null){
				ro.next.headers.Cookie = exports.getCookieString(x);
				console.log(typeof ro.next.body, ' body check');
				if(typeof ro.next.body === 'function') ro.next.body = ro.next.body(d);
				executeRequest(ro.next);
			};
		});
	};
}

exports.RequestObject = function(requestType){
	this.uri = '';
	this.method = requestType;
	if(typeof requestType !== 'undefined' && requestType.toUpperCase() === 'POST') this.body = '';
	this.headers = {
		'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64; rv:5.0) Gecko/20100101 Firefox/5.0',
		'Accept' : 'text/html'
	};
	this.next = null;
};

exports.getCookieString = function(x){
	
	var i = 0, len = 0, x, a = [];

	for (i = 0, len = x.headers['set-cookie'].length; i < len; i++) {
		a.push(x.headers['set-cookie'][i].split(';')[0]);
	}
	return a.join(';');
	//return x.headers['set-cookie'].join(';');
}