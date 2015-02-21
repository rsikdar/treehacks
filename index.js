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
		// console.log(data.x);
		if (oldX === null) {
			oldX = data.x;
			myMyo.unlock();

		}
		if (Math.abs(data.x - oldX) > 0.05) {
			console.log(data.x);
			// var file = fs.createReadStream(dir + "/M1_Piano_C4");
			oldX = data.x;
			// io.emit('audio', 'c');
		}
		if (((data.x - startX) < 0.5) && ((data.x - startX) >= 0)) {
			io.emit('audio', 'c');
		} else if (((data.x - startX) < 0.1) && ((data.x - startX) >= 0.5)) {
			io.emit('audio', 'd');
		} else if (((data.x - startX) < 0.15) && ((data.x - startX) >= 0.1)) {
			io.emit('audio', 'e');
		} else if (((data.x - startX) < 0.2) && ((data.x - startX) >= 0.15)) {
			io.emit('audio', 'f');
		} else if (((data.x - startX) < 0.25) && ((data.x - startX) >= 0.2)) {
			io.emit('audio', 'g');
		} else if (((data.x - startX) < 0.3) && ((data.x - startX) >= 0.25)) {
			io.emit('audio', 'a');
		} else if (((data.x - startX) < 0.35) && ((data.x - startX) >= 0.3)) {
			io.emit('audio', 'b');
		} else if (((data.x - startX) < 0.4) && ((data.x - startX) >= 0.35)) {
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
