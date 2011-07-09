

var pummel = require('./pummel');
var domain = 'http://demo.oemlr.com/';

/* First */
var ro = new pummel.RequestObject();
	ro.uri = domain;

/* Second */
	ro.next = new pummel.RequestObject();
	ro.next.uri = domain + 'select/?tireSize=205/55R16';
	
/* Setup for 3rd */
	ro.next.next = new pummel.RequestObject();
	ro.next.next.body = function(response){
		console.log(response);
		return 'hello andrew';
	};

/* Send Requests */
pummel.go(ro);