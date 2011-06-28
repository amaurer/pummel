
var http = require('http'),
	jqtpl = require('jqtpl');

var multiplier = 1;
var requestCounter = 0;
var responseCounter = 0;
var i = 0, ii = 0, len = 0;
var reg = /www.*[me|com|net]/;

function cb(r){
	responseCounter++;
	console.log(r);
	process.exit();
	var m = r.connection._httpMessage._header.match(reg);
	if(m.length !== 0) console.log('Response - ' + responseCounter + ' - ' + m[0]);
};

var domains = [
               /*
               'www.msn.com',
               'www.google.com',
               'www.maurer.me',
               'www.netzero.net',
               'www.yahoo.com',
               'www.photobucket.com',
               'www.hotmail.com',
               'www.aol.com',
               'www.php.net',
               'www.hallmark.com',
               'www.att.com',
               'www.dslreports.com',
               */
               'www.coke.com'
               ];

for(i=0; i<multiplier; i++){
	for(ii=0, len=domains.length; ii<len; ii++){
		requestCounter++;
		http.get({
			host : domains[ii],
			port : 80,
			path : '/'
		}, cb);
		console.log('Request - ' + requestCounter + ' - ' + domains[ii]);
	}	
}

