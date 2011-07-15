

var pummel = require('./pummel'),
	$ = require('jquery');

var domain = 'http://demo.oemlr.com/',
	roArray = [],
	ro = null;


/* First */
ro = new pummel.RequestObject();
ro.uri = domain;
roArray.push(ro);


/* Second */
ro = new pummel.RequestObject();
ro.uri = domain + 'select/?tireSize=205/55R16';
roArray.push(ro);

/* Third */
ro = new pummel.RequestObject();
ro.uri = domain + '?resource=selectProductSubmissionRequest';
ro.method = 'POST';
ro.onRequestStart = function(error, xhr, response){
	var $products = $('.resultRow', response);
	
	/* TODO  : Write parsing logic to get random? proudct from results */

	return selectProductSubmissionRequest();
};
roArray.push(ro);

/* Fourth */
ro = new pummel.RequestObject();
ro.uri = domain + 'dealership/?tireSize=205/55R16';
roArray.push(ro);

/* Fifth */
ro = new pummel.RequestObject();
ro.uri = domain + '?resource=selectedLocationSubmissionRequest';
ro.method = 'POST';
ro.onRequestStart = function(error, xhr, response){

	return selectedLocationSubmissionRequest();
};
ro.onRequestEnd = function(error, xhr, response){
	console.log(response);
};
roArray.push(ro);

/* Sixth */
ro = new pummel.RequestObject();
ro.uri = domain + 'schedule/?tireSize=205/55R16';
ro.onRequestStart = function(error, xhr, response){
	console.log(this);
	return null;
};
ro.onRequestEnd = function(error, xhr, response){
	//console.log(response);
};
roArray.push(ro);

/* Seventh */
ro = new pummel.RequestObject();
ro.uri = domain + 'resource=';
ro.onRequestStart = function(error, xhr, response){
	return null;
};
ro.onRequestEnd = function(error, xhr, response){
	//console.log(response);
};
roArray.push(ro);

/* Eigth */
ro = new pummel.RequestObject();
ro.uri = domain + 'confirmation/?tireSize=205/55R16';
ro.onRequestStart = function(error, xhr, response){
	console.log(this);
	return null;
};
ro.onRequestEnd = function(error, xhr, response){
	//console.log(response);
};
roArray.push(ro);


/* Send Requests */
pummel.go(roArray);


function selectProductSubmissionRequest() {
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
};

function selectedLocationSubmissionRequest() {
	var xml = '<locationDealerID>' + 76770 + '</locationDealerID>';
		xml += '<locationCity>' + '' + '</locationCity>';
		xml += '<locationState>' + '' + '</locationState>';
		xml += '<locationZip>' + 44131 + '</locationZip>';
		xml += '<locationName>' + 'Andrew\'s place' + '</locationName>';
		xml += '<locationGuess>' + '' + '</locationGuess>';
		xml += '<locationZoom>' + 8 + '</locationZoom>';
	return '<?xml version="1.0" encoding="UTF-8" ?><selectedLocationSubmissionRequest>' + xml + '</selectedLocationSubmissionRequest>';
};

function consumerLeadSubmissionRequest() {
	var xml = '<consumer>';
			xml += '<firstName>' + '' + '</firstName>';
			xml += '<lastName>' + '' + '</lastName>';
			xml += '<Address1>' + '' + '</Address1>';
			xml += '<Address2>' + '' + '</Address2>';
			xml += '<AddressCity>' + '' + '</AddressCity>';
			xml += '<AddressRegionCode>' + '' + '</AddressRegionCode>';
			xml += '<AddressPostalCode>' + '' + '</AddressPostalCode>';
			xml += '<ContactEmail>' + '' + '</ContactEmail>';
			xml += '<ContactHomePhoneNumber>' + '' + '</ContactHomePhoneNumber>';
			xml += '<ContactCellPhoneNumber>' + '' + '</ContactCellPhoneNumber>';
			xml += '<ConsumerContactPreference>' + '' + '</ConsumerContactPreference>';
			xml += '<Comments><![CDATA[' + '' + ']]></Comments>';
		xml += '</consumer>';
		xml += '<appointment>';
			xml += '<requestedDate blockStartTime="' + '' + '" blockDurationMinutes="' + '' + '">' + '' + '</requestedDate>';
		xml += '</appointment>';
		xml += '<pricequote SubTotalAmount="' + '' + '" SupplementalChargesAmount="' + '' + '" />';
		xml += '<vehicle>';
			xml += '<year>' + '' + '</year>';
			xml += '<makeDescription>' + '' + '</makeDescription>';
			xml += '<modelDescription>' + '' + '</modelDescription>';
			xml += '<trimDescription>' + '' + '</trimDescription>';
		xml += '</vehicle>';
		xml += '<services>';
			for(n in servicesO) xml += '<service sid="' + n + '" serviceAmount="' + servicesO[n].amt + '">' + servicesO[n].qty + '</service>';
		xml += '</services>';
		xml += '<products>';
			for(n in productsO) xml += '<product pid="' + n + '">' + productsO[n] + '</product>';
		xml += '</products>';
		xml += (clientVars.tireSize.description === '')? '' : '<tireSizeSearch prefix="' + '' + '" width="' + '' + '" ratio="' + '' + '" diameter="' + '' + '">' + '' + '</tireSizeSearch>';
		
	return '<?xml version="1.0" encoding="UTF-8" ?><consumerLeadSubmissionRequest>' + xml + '</consumerLeadSubmissionRequest>';
};