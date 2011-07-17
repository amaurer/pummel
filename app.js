

var pummel = require('./pummel'),
	$ = require('jquery'),
	should = require('should');


/* Send Requests */
for(var i=0, len=1; i<len; i++) pummel.go(arrayOfRequestObjects());


function shouldTry(fn){
	try{
		fn();
	} catch (e) {
		console.log(e.message);
	}
}

function arrayOfRequestObjects(){
	
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
	ro.onRequestEnd = function(error, xhr, response, roNext){
		var $products = $('.result_item', response);

		shouldTry(function(){
			$products.length.should.be.above(0);
		});
	};
	roArray.push(ro);

	/* Third */
	ro = new pummel.RequestObject();
	ro.uri = domain + '?resource=selectProductSubmissionRequest';
	ro.method = 'POST';
	ro.onRequestStart = function(error, xhr, response){
		/* TODO  : Write parsing logic to get random? proudct from results */
		return selectProductSubmissionRequest();
	};
	roArray.push(ro);

	/* Fourth */
	ro = new pummel.RequestObject();
	ro.uri = domain + 'dealership/?tireSize=205/55R16';
	ro.onRequestEnd = function(error, xhr, response, roNext){
		var $page = $('#dealership', response);
		shouldTry(function(){
			$page.length.should.be.above(0);
		});
	};
	roArray.push(ro);

	/* Fifth */
	ro = new pummel.RequestObject();
	ro.uri = domain + '?resource=selectedLocationSubmissionRequest';
	ro.method = 'POST';
	ro.onRequestStart = function(error, xhr, response){
		return selectedLocationSubmissionRequest();
	};
	ro.onRequestEnd = function(error, xhr, response, roNext){
		/*
		var $products = $('.result_item', response);

		shouldTry(function(){
			$products.length.should.be.above(0);
		});
		*/
	};
	roArray.push(ro);

	/* Sixth */
	ro = new pummel.RequestObject();
	ro.uri = domain + 'schedule/?tireSize=205/55R16';
	ro.onRequestEnd = function(error, xhr, response, roNext){
		var $page = $('#schedule', response);
		shouldTry(function(){
			$page.length.should.be.above(0);
		});
	};
	roArray.push(ro);

	/* Seventh */
	ro = new pummel.RequestObject();
	ro.uri = domain + '?resource=consumerLeadSubmissionRequest';
	ro.method = 'POST';
	ro.onRequestStart = function(error, xhr, response){
		return consumerLeadSubmissionRequest();
	};
	ro.onRequestEnd = function(error, xhr, response, roNext){
		var r = /consumerLeadID[\s]=[\s]"(\d+)"/i;
		var leadMatch = response.match(r);
		shouldTry(function(){
			leadMatch.length.should.be.above(0);
		});
		roNext.uri += '&leadID=' + leadMatch[1];
	};
	roArray.push(ro);

	/* Eighth */
	ro = new pummel.RequestObject();
	ro.uri = domain + 'confirmation/?tireSize=205/55R16';
	ro.onRequestEnd = function(error, xhr, response, roNext){
		var $page = $('#confirmation', response);
		shouldTry(function(){
			$('#confirmation', response).length.should.be.above(0);
			$('#search', response).length.should.not.be.above(0);
		});
		//var r = /leadID=(\d+)/i;
		//roNext.uri += '&leadID=' + this.uri.match(r)[1];
	};
	roArray.push(ro);

	/* Ninth */
	ro = new pummel.RequestObject();
	ro.uri = domain + '?resource=confirmAppointmentSubmissionRequest';
	ro.method = 'POST';
	ro.onRequestStart = function(error, xhr, response){
		return confirmAppointmentSubmissionRequest(this.leadID);
	};
	// SKIP THIS FOR NOW roArray.push(ro);

	return roArray;
}

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
	var xml = '<locationDealerID>' + 69765 + '</locationDealerID>';
		xml += '<locationCity>' + '' + '</locationCity>';
		xml += '<locationState>' + '' + '</locationState>';
		xml += '<locationZip>' + '' + '</locationZip>';
		xml += '<locationName>' + 'DEVON' + '</locationName>';
		xml += '<locationGuess>' + '' + '</locationGuess>';
		xml += '<locationZoom>' + 8 + '</locationZoom>';
	return '<?xml version="1.0" encoding="UTF-8" ?><selectedLocationSubmissionRequest>' + xml + '</selectedLocationSubmissionRequest>';
};

function consumerLeadSubmissionRequest() {
	var xml = '<consumer>';
			xml += '<firstName>' + 'test' + '</firstName>';
			xml += '<lastName>' + 'test' + '</lastName>';
			xml += '<Address1>' + 'test' + '</Address1>';
			xml += '<Address2>' + 'test' + '</Address2>';
			xml += '<AddressCity>' + 'test' + '</AddressCity>';
			xml += '<AddressRegionCode>' + '' + '</AddressRegionCode>';
			xml += '<AddressPostalCode>' + '44131' + '</AddressPostalCode>';
			xml += '<ContactEmail>' + 'amaurer@dealertire.com' + '</ContactEmail>';
			xml += '<ContactHomePhoneNumber>' + '555-333-5555' + '</ContactHomePhoneNumber>';
			xml += '<ContactCellPhoneNumber>' + '' + '</ContactCellPhoneNumber>';
			xml += '<ConsumerContactPreference>' + 'email' + '</ConsumerContactPreference>';
			xml += '<Comments><![CDATA[' + 'Test' + ']]></Comments>';
		xml += '</consumer>';
		xml += '<appointment>';
			xml += '<requestedDate blockStartTime="' + '10:00AM' + '" blockDurationMinutes="' + '180' + '">' + '08/03/2011' + '</requestedDate>';
		xml += '</appointment>';
		xml += '<pricequote SubTotalAmount="' + '999.00' + '" SupplementalChargesAmount="' + '1.00' + '" />';
		xml += '<vehicle>';
			xml += '<year>' + '' + '</year>';
			xml += '<makeDescription>' + '' + '</makeDescription>';
			xml += '<modelDescription>' + '' + '</modelDescription>';
			xml += '<trimDescription>' + '' + '</trimDescription>';
		xml += '</vehicle>';
		xml += '<services>';
			//for(n in servicesO) xml += '<service sid="' + n + '" serviceAmount="' + servicesO[n].amt + '">' + servicesO[n].qty + '</service>';
		xml += '</services>';
		xml += '<products>';
			//for(n in productsO) xml += '<product pid="' + n + '">' + productsO[n] + '</product>';
			xml += '<product pid="' + '366' + '">' + '366' + '</product>';
		xml += '</products>';
		//xml += (clientVars.tireSize.description === '')? '' : 
		xml += '<tireSizeSearch prefix="' + '' + '" width="' + '205' + '" ratio="' + '55' + '" diameter="' + '16' + '">' + '205/55R16' + '</tireSizeSearch>';
		
	return '<?xml version="1.0" encoding="UTF-8" ?><consumerLeadSubmissionRequest>' + xml + '</consumerLeadSubmissionRequest>';
};

function confirmAppointmentSubmissionRequest(leadID){
	return '<confirmAppointmentSubmissionRequest><consumerLeadID>' + leadID + '</consumerLeadID></confirmAppointmentSubmissionRequest>';
}