
/* Called from console and imported as a module "require" */


/* TODO : check cookie setting, fails */

var args = process.argv,
	argsLen = args.length,
	spawn = require('child_process').spawn,
	request = require('request'),
	aProcesses = [],
	i = 0, len = 0, x = '', p = process;

if(argsLen === 3){
	len = 1;
} else if(argsLen === 4 && Number(args[3]) !== 'NaN'){
	len = Number(args[3]);
};

for (i=0; i<len; i++) {
	aProcesses.push(spawn('node', [args[2]]));
	x = aProcesses[i];
	x.stdout.on('data', handler);
	x.stderr.on('data', errorHandler);
	x.on('exit', exitHandler);
};

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
exports.go = function(threadRequestArray){
	var trArrayLen = threadRequestArray.length,
		ro = null,
		ref = null,
		roFinal = {},
		len = 0,
		i = 0;
	/* create proper object depth */
	for(i = 0; i<trArrayLen; i++){
		ro = threadRequestArray[i];
		if(i === 0){
			roFinal = ref = ro;
		} else {
			ref = ref.next = ro;
		};
	};

	/* Execute this process [x] amount of times */
	for(i=0, len=1; i<len; i++) executeRequest(roFinal);

	/* Recursive function call */
	function executeRequest(ro){
		request(ro, function(e, x, d){
			var body = '';
			if(e !== null) throw e;
			console.log(x.statusCode, ro.uri);
			if(typeof ro.onRequestEnd === 'function'){ // OnRequestEnd
				ro.onRequestEnd.apply(ro, arguments);
			};
			if(typeof ro.next !== 'undefinded' && ro.next !== null){
				/* Prep Cookie */
				if(typeof x.headers['set-cookie'] !== 'undefined'){
					ro.next.headers.Cookie = exports.getCookieString(x);
				} else if(typeof ro.headers.Cookie !== 'undefined'){
					ro.next.headers.Cookie = ro.headers.Cookie;
				}
				if(typeof ro.next.onRequestStart === 'function'){ // OnRequestStart
					body = ro.next.onRequestStart.apply(ro.next, arguments);
					if(body !== null) ro.next.body = body;
				};
				executeRequest(ro.next);
			};
		});
	};
}

exports.RequestObject = function(requestType){
	this.uri = '';
	this.method = requestType;
	this.onRequestEnd = null;
	this.onRequestStart = null;
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