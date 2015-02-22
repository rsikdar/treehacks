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
var play_flat = false;

var startZ = 0;
var oldZ = null;


io.on('connection', function(socket){
	console.log('myMyo ' + myMyo);
	myMyo.on('pose',function(pose){
		console.log(pose);
	});
	myMyo.on('arm_unsynced', function(){
		console.log('please reconnect');
	});
	myMyo.on('orientation', function(data) {
		console.log(data.x);
		myMyo.unlock();
		xVal = -data.x;
		if (oldX === null) {
			oldX = xVal;

		}
		if (data.z < -0.15){
			play_flat = true;
		} else {
			play_flat = false;
		}
		// if (oldZ === null) {
		// 	oldZ = zVal;
		// 	myMyo.unlock();
		// }

		if (Math.abs(xVal - oldX) > 0.05) {
			// console.log(xVal);
			// var file = fs.createReadStream(dir + "/M1_Piano_C4");
			oldX = xVal;
			// io.emit('audio', 'c');
		}

		// if (Math.abs(zVal - oldZ) > 0.05) {
		// 	// console.log(xVal);
		// 	// var file = fs.createReadStream(dir + "/M1_Piano_C4");
		// 	oldz = zVal;
		// 	// io.emit('audio', 'c');
		// }

		io.emit('xPos', xVal);

		// xVal = Math.abs(xVal);
		if (rest_pose){
			if (!play_flat) {
				if (((xVal) < 0.05) && ((xVal) >= 0) && note_play != 'c3') {
					note_play = 'c3';
					io.emit('audio', 'c3');
				} else if (((xVal) < 0.1) && ((xVal) >= 0.05) && note_play != 'd3') {
					note_play = 'd3';
					io.emit('audio', 'd3');
				} else if (((xVal) < 0.15) && ((xVal) >= 0.1) && note_play != 'e3') {
					note_play = 'e3';
					io.emit('audio', 'e3');
				} else if (((xVal) < 0.2) && ((xVal) >= 0.15) && note_play != 'f3') {
					note_play = 'f3';
					io.emit('audio', 'f3');
				} else if (((xVal) < 0.25) && ((xVal) >= 0.2) && note_play != 'g3') {
					note_play = 'g3';
					io.emit('audio', 'g3');
				} else if (((xVal) < 0.3) && ((xVal) >= 0.25) && note_play != 'a3') {
					note_play = 'a3';
					io.emit('audio', 'a3');
				} else if (((xVal) < 0.35) && ((xVal) >= 0.3) && note_play != 'b3') {
					note_play = 'b3';
					io.emit('audio', 'b3');
				} else if (((xVal) < 0.4) && ((xVal) >= 0.35) && note_play != 'c4') {
					note_play = 'c4';
					io.emit('audio', 'c4');
				}
			} else {
				if (((xVal) < 0.05) && ((xVal) >= 0) && note_play != 'cb3') {
					note_play = 'cb3';
					io.emit('audio', 'cb3');
				} else if (((xVal) < 0.1) && ((xVal) >= 0.05) && note_play != 'db3') {
					note_play = 'db3';
					io.emit('audio', 'db3');
				} else if (((xVal) < 0.15) && ((xVal) >= 0.1) && note_play != 'eb3') {
					note_play = 'eb3';
					io.emit('audio', 'eb3');
				} else if (((xVal) < 0.2) && ((xVal) >= 0.15) && note_play != 'fb3') {
					note_play = 'fb3';
					io.emit('audio', 'fb3');
				} else if (((xVal) < 0.25) && ((xVal) >= 0.2) && note_play != 'gb3') {
					note_play = 'gb3';
					io.emit('audio', 'gb3');
				} else if (((xVal) < 0.3) && ((xVal) >= 0.25) && note_play != 'ab3') {
					note_play = 'ab3';
					io.emit('audio', 'ab3');
				} else if (((xVal) < 0.35) && ((xVal) >= 0.3) && note_play != 'bb3') {
					note_play = 'bb3';
					io.emit('audio', 'bb3');
				} else if (((xVal) < 0.4) && ((xVal) >= 0.35) && note_play != 'cb4') {
					note_play = 'cb4';
					io.emit('audio', 'cb4');
			}}
			
		}

		// if (rest_pose){
		//	if ((xVal < -0.5) && note_play != 'a') {
		// 		note_play = 'a';
		// 		io.emit('audio', 'a');
		// 	} else if ((xVal < -0.45) && (xVal >= -0.5) && note_play != 'bb') {
		// 		note_play = 'bb';
		// 		io.emit('audio', 'bb');
		// 	} else if ((xVal < -0.4) && (xVal >= -0.45) && note_play != 'b') {
		// 		note_play = 'b';
		// 		io.emit('audio', 'b');
		// 	} else if ((xVal < -0.35) && (xVal >= -0.4) && note_play != 'c') {
		// 		note_play = 'c';
		// 		io.emit('audio', 'c');
		// 	} else if ((xVal < -0.30) && (xVal >= -0.35) && note_play != 'db') {
		// 		note_play = 'db';
		// 		io.emit('audio', 'db');
		// 	} else if ((xVal < -0.25) && (xVal >= -0.30) && note_play != 'd') {
		// 		note_play = 'd';
		// 		io.emit('audio', 'd');
		// 	} else if ((xVal < -0.20) && (xVal >= -0.25) && note_play != 'eb') {
		// 		note_play = 'eb';
		// 		io.emit('audio', 'eb');
		// 	} else if ((xVal < -0.15) && (xVal >= -0.20) && note_play != 'e') {
		// 		note_play = 'e';
		// 		io.emit('audio', 'e');
		// 	} else if ((xVal < -0.1) && (xVal >= -0.15) && note_play != 'f') {
		// 		note_play = 'f';
		// 		io.emit('audio', 'f');
		// 	} else if ((xVal < -0.05) && (xVal >= -0.1) && note_play != 'gb') {
		// 		note_play = 'gb';
		// 		io.emit('audio', 'gb');
		// 	} else if ((xVal < 0.05) && (xVal >= 0) && note_play != 'g') {
		// 		note_play = 'g';
		// 		io.emit('audio', 'g');
		// 	} else if ((xVal < 0.10) && (xVal >= 0.05) && note_play != 'ab') {
		// 		note_play = 'ab';
		// 		io.emit('audio', 'ab');
		// 	} else if ((xVal < 0.15) && (xVal >= 0.10) && note_play != 'a') {
		// 		note_play = 'a';
		// 		io.emit('audio', 'a');
		// 	}
		// }
			
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
		console.log('fingers spread');
		// }
		if (edge) {
			rest_pose = false;
			console.log('orienting');
			myMyo.zeroOrientation();
		} else {
			rest_pose = true;
			console.log('orienting');
		}
	});

	myMyo.on('wave_out', function(edge){
		console.log('wave_out');
		if (edge) {
			rest_pose = false;
			first_pose = true;
			console.log(myMyo.lastIMU);
		} else {
			rest_pose = true;
			fist_pose = false;
		}
	});

	myMyo.on('wave_in', function(edge){
		console.log('wave_in');
		if (edge) {
			rest_pose = false;
			first_pose = true;
		} else {
			rest_pose = true;
			fist_pose = false;
		}
	});

	myMyo.on('fist', function(edge){
		console.log('fist');
		myMyo.unlock();
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
