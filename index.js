var Myo = require("myo");
var myMyo = Myo.create();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var PythonShell = require('python-shell');

// var options = {
//   mode: 'text',
//   pythonOptions: ['-u'],
//   scriptPath: 'piano_audio',
// };


// PythonShell.run('sound.py', options, function(err) {
// 	if (err) throw err;
// 	console.log('finished');
// });

// var dir = "/piano_mp3";
startX = 0;
oldX = null;

io.on('connection', function(socket){
	myMyo.on('orientation', function(data) {
		myMyo.unlock();
		xVal = -data.x;
		// console.log(data.x);
		if (oldX === null) {
			oldX = -xVal;
			myMyo.unlock();

		}
		if (Math.abs(xVal - oldX) > 0.05) {
			console.log(xVal);
			// var file = fs.createReadStream(dir + "/M1_Piano_C4");
			oldX = xVal;
			// io.emit('audio', 'c');
		}
		if (((xVal) < 0.05) && ((xVal) >= 0)) {
			io.emit('audio', 'c');
		} else if (((xVal) < 0.1) && ((xVal) >= 0.05)) {
			io.emit('audio', 'd');
		} else if (((xVal) < 0.15) && ((xVal) >= 0.1)) {
			io.emit('audio', 'e');
		} else if (((xVal) < 0.2) && ((xVal) >= 0.15)) {
			io.emit('audio', 'f');
		} else if (((xVal) < 0.25) && ((xVal) >= 0.2)) {
			io.emit('audio', 'g');
		} else if (((xVal) < 0.3) && ((xVal) >= 0.25)) {
			io.emit('audio', 'a');
		} else if (((xVal) < 0.35) && ((xVal) >= 0.3)) {
			io.emit('audio', 'b');
		} else if (((xVal) < 0.4) && ((xVal) >= 0.35)) {
			io.emit('audio', 'c');
		}


		if (data.y < -0.5) {
			console.log('y smaller than -1');
		}
		if (data.z < -1) {
			console.log('z smaller than -1');
		}

	});

	myMyo.on('fingers_spread', function(edge){
		if (edge) {
			console.log('fingers spread start');
			console.log(myMyo.lastIMU);
			myMyo.vibrate();
		} else {
			console.log('fingers spread end');
		}
	});

	myMyo.on('fist', function(edge){
		if (edge) {
			console.log('fist start');
			myMyo.zeroOrientation();
			myMyo.vibrate();
		} else {
			console.log('fist end');
		}
	});

	myMyo.on('wave_in', function(edge){
		if (edge) {
			console.log('wave_in start');
			myMyo.vibrate();
		} else {
			console.log('wave_in end');
		}
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
	myMyo.zeroOrientation();
});


http.listen(3000, function(){
	console.log('listening on port 3000');
});
