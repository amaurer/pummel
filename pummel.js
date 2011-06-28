

var args = process.argv,
	spawn = require('child_process').spawn,
	aProcesses = [],
	len = (args.length === 3 && Number(args[2]) !== 'NaN')? Number(args[2]) : 1 ,
	i = 0, x = '';

for (i=0; i<len; i++) {
	aProcesses.push(spawn('node', ['app.js']));
	x = aProcesses[i];
	x.stdout.on('data', handler);
	x.stderr.on('data', handler);
	x.on('exit', exitHandler);
}

function handler(d){
	console.log('Data', d.toString());
};
function errorHandler(){
	console.log('Error', arguments);
};
function exitHandler(){
	console.log('Exit', arguments);
};
