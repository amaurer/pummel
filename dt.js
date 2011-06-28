

var request = require('request'),
	$ = require('jquery');


var i = 0, len = 1;

for (i=0; i < len; i++) {
	startSession(i);
}


function startSession(sessionID){
	
	var requestObject = {
			uri : '',
			method : 'GET',
			headers : {
				'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64; rv:5.0) Gecko/20100101 Firefox/5.0',
				'Accept' : 'text/html'
			},
			body : ''
	};
	
	var s = 'http://joemyerstoyota.oemlr.com/';
		
	requestObject.uri = s;
	request(requestObject, function(e, x, d){

		console.log(sessionID + ' - ' + s);
		
		s = 'http://joemyerstoyota.oemlr.com/select/?tireSize=205/55R16';
		requestObject.uri = s;
		requestObject.headers.Cookie = getCookieString(x); /* Sets Session */
		request(requestObject, function(e, x, d){
			
			console.log(sessionID + ' - ' + s);
			
			s = 'http://joemyerstoyota.oemlr.com/?resource=selectProductSubmissionRequest';
			requestObject.uri = s;
			requestObject.method = 'POST';
			requestObject.body = getProductSelectionXML();
			requestObject.headers['Content-Type'] = 'application/xml';
			requestObject.headers['Accept'] = 'text/xml';
			request(requestObject, function(e, x, d){

				console.log(x, d);
				console.log(sessionID + ' - ' + s);
						
				s = 'http://joemyerstoyota.oemlr.com/schedule/?tireSize=205/55R16';
				delete requestObject.headers['Content-Type'];
				requestObject.method = 'GET';
				requestObject.headers['Accept'] = 'text/html';
				requestObject.uri = s;
				requestObject.body = '';
				request(requestObject, function(e, x, d){
					
					console.log('done');
					console.log(d);
					process.exit();
					return;
					console.log(e);
					
				});
				
			});
			
		});
		
	});
	
}

function getProductSelectionXML() {
	var xml = '<productAttributes>';
			xml += '<product>';
				xml += '<productID>' + 366 + '</productID>';
				xml += '<productSKU>' + 'DT31538' + '</productSKU>';
				xml += '<productPosition></productPosition>';
				xml += '<quantity>' + 4 + '</quantity>';
				xml += '<productGroupID>0</productGroupID>';
			xml += '</product>';
			xml += '<tireAttributes>';
				xml += '<tireSize>' + '205/55R16' + '</tireSize>';
			xml += '</tireAttributes>';
		xml += '</productAttributes>';
		/*
	} else {
		xml += '<vehicleAttributes>';
		xml += '<year>' + clientVars.vehicle.year + '</year>';
		xml += '<model>' + clientVars.vehicle.model + '</model>';
		xml += '<trim>' + clientVars.vehicle.trim + '</trim>';
		xml += '</vehicleAttributes>';
	}
	*/
	return '<?xml version="1.0" encoding="UTF-8" ?><selectProductSubmissionRequest>' + xml + '</selectProductSubmissionRequest>';
}


function getCookieString(x){
	
	var i = 0, len = 0, x, a = [];

	for (i = 0, len = x.headers['set-cookie'].length; i < len; i++) {
		a.push(x.headers['set-cookie'][i].split(';')[0]);
	}
	return a.join(';');
	//return x.headers['set-cookie'].join(';');
}

function doDecompress(decompressor, input) {
	  var d1 = input.substr(0, 25);
	  var d2 = input.substr(25);

	  sys.puts('Making decompression requests...');
	  var output = '';
	  decompressor.setInputEncoding('binary');
	  decompressor.setEncoding('utf8');
	  decompressor.addListener('data', function(data) {
	    output += data;
	  }).addListener('error', function(err) {
	    throw err;
	  }).addListener('end', function() {
	    sys.puts('Decompressed length: ' + output.length);
	    sys.puts('Raw data: ' + output);
	  });
	  decompressor.write(d1);
	  decompressor.write(d2);
	  decompressor.close();
	  sys.puts('Requests done.');
	}




/*

function createSession(u) {
	requestObject()
	
}
request(requestObject, function(e, x, d){
	if(e) {
		console.log(e);
		process.exit();
	}
	
	
	
	cookie = getCookieArray(x.headers['set-cookie']).join(';');
	console.log(cookie);
	console.log(x);
	var $body = $(d);
});

function getCookieArray(a) {
	
	
	
	
	
	
	
	var a = s.split(';');
	var i = 0, len = 0;
	var retArray = [];
	
	if(a.length === 0) return retArray;
	
	for (i = 0, len = a.length; i < len; i++) {
		val = a[i].split('=');
		if(i%2){
			if(val.length !== 2) break;
			
		}
		
	}
	
}
*/
