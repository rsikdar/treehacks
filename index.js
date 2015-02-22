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
var startX = 0;
var oldX = null;
var fist_pose = false;
var rest_pose = true;
var note_play = null;


io.on('connection', function(socket){
	myMyo.on('orientation', function(data) {
		// console.	log(data.x);
		myMyo.unlock();
		xVal = data.x;
		// console.log(data.w);
		// console.log(data.x);
		if (oldX === null) {
			oldX = xVal;
			myMyo.unlock();

		}
		if (Math.abs(xVal - oldX) > 0.05) {
			// console.log(xVal);
			// var file = fs.createReadStream(dir + "/M1_Piano_C4");
			oldX = xVal;
			// io.emit('audio', 'c');
		}

		io.emit('xPos', xVal);
		xVal = Math.abs(xVal);
		if (rest_pose){
			if (((xVal) < 0.05) && ((xVal) >= 0) && note_play != 'a') {
				note_play = 'a';
				io.emit('audio', 'a');
			} else if (((xVal) < 0.1) && ((xVal) >= 0.05) && note_play != 'b') {
				note_play = 'b';
				io.emit('audio', 'b');
			} else if (((xVal) < 0.15) && ((xVal) >= 0.1) && note_play != 'c') {
				note_play = 'c';
				io.emit('audio', 'c');
			} else if (((xVal) < 0.2) && ((xVal) >= 0.15) && note_play != 'd') {
				note_play = 'd';
				io.emit('audio', 'd');
			} else if (((xVal) < 0.25) && ((xVal) >= 0.2) && note_play != 'e') {
				note_play = 'e';
				io.emit('audio', 'e');
			} else if (((xVal) < 0.3) && ((xVal) >= 0.25) && note_play != 'f') {
				note_play = 'f';
				io.emit('audio', 'f');
			} else if (((xVal) < 0.35) && ((xVal) >= 0.3) && note_play != 'g') {
				note_play = 'g';
				io.emit('audio', 'g');
			} else if (((xVal) < 0.4) && ((xVal) >= 0.35) && note_play != 'a') {
				note_play = 'a';
				io.emit('audio', 'a');
			}
		}
			
		//negative values
		// else if (((xVal) < 0.3) && ((xVal) >= 0.25)) {
		// 	io.emit('audio', 'a');
		// } else if (((xVal) < 0.35) && ((xVal) >= 0.3)) {
		// 	io.emit('audio', 'b');
		// } else if (((xVal) < 0.4) && ((xVal) >= 0.35)) {
		// 	io.emit('audio', 'c');
		// }

	});

	myMyo.on('fingers_spread', function(edge){
		// if (edge) {
		// 	console.log('fingers spread start');
		// 	console.log(myMyo.lastIMU);
		// 	myMyo.vibrate();
		// } else {
		// 	console.log('fingers spread end');
		// }
		if (edge) {
			rest_pose = false;
			console.log('orienting');
			myMyo.zeroOrientation();
			myMyo.vibrate();
		} else {
			rest_pose = true;
			console.log('orienting');
		}
	});

	myMyo.on('wave_out', function(edge){
		if (edge) {
			rest_pose = false;
			first_pose = true;
		} else {
			rest_pose = true;
			fist_pose = false;
		}
	});

	myMyo.on('wave_in', function(edge){
		if (edge) {
			rest_pose = false;
			first_pose = true;
		} else {
			rest_pose = true;
			fist_pose = false;
		}
	});

	myMyo.on('fist', function(edge){
		if (edge) {
			rest_pose = false;
			fist_pose = true;
		} else {
			rest_pose = true;
			fist_pose = false;
			// io.emit('audio_end');
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
