//var canvas;
var context;
var colorOn = "#FFF";
var colorOff = "#000";

function canvasInit() {
    //Initialize the canvas
    var canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    width = canvas.width;
    height = canvas.height;

    clearScreen();
};

window.onload = function() {
    enableFileSelection();
    populateDropdown();
    canvasInit();
    chip8.setTimerRate(60);
};

//Maps keycodes (uppercase) to chip8 keys
//TODO: GUI to set keyMap
var keyMap = {
    88: 0x0,
    49: 0x1,
    50: 0x2,
    51: 0x3,
    81: 0x4,
    87: 0x5,
    69: 0x6,
    65: 0x7,
    83: 0x8,
    68: 0x9,
    90: 0xA,
    67: 0xB,
    52: 0xC,
    82: 0xD,
    70: 0xE,
    86: 0xF };

document.onkeyup = function(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.charCode;
    //toUpperCase approximation
    if (key > 96) key -= 32;
    //check to see if we have this key mapped to a chip8 key
    var keycode = keyMap[key];
    if (keycode !== undefined) {
        chip8.keys[ keycode[ = false;
    }
};

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.charCode;
    //toUpperCase approximation
    if (key > 96) key -= 32;
    //check to see if we have this key mapped to a chip8 key
    var keycode = keyMap[key];
    if (keycode !== undefined) {
        chip8.keys[ keycode[ = true;
        if (chip8.waitingForKey === true) {
			chip8.waitingForKey = keycode;
            chip8.emulateCycle();
        }
    } else if (key === 80) {
        chip8.paused = true;
    }
};

function enableConsole() {
    if (!chip8.debug) {
        var classname = document.getElementById("enableConsole").className;
        classname += 'btn-warning';
        document.getElementById("enableConsole").className = classname.replace('btn-info', '');
        document.getElementById("enableConsole").innerHTML = "Disable Console";
        chip8.enableDebug(true);
    } else {
        var classname = document.getElementById("enableConsole").className;
        classname += 'btn-info';
        document.getElementById("enableConsole").className = classname.replace('btn-warning', '');
        document.getElementById("enableConsole").innerHTML = "Enable Console";
        chip8.enableDebug(false);
    }
};


function pauseEmulation() {
    if (!chip8.paused) {
        var classname = document.getElementById("pause").className;
        classname += 'btn-warning';
        document.getElementById("pause").className = classname.replace('btn-info', '');
        document.getElementById("pause").innerHTML = "Resume";
        chip8.pause(true);
    } else {
        var classname = document.getElementById("pause").className;
        classname += 'btn-info';
        document.getElementById("pause").className = classname.replace('btn-warning', '');
        document.getElementById("pause").innerHTML = "Pause";
        chip8.pause(false);
    }
};

function step() {
    chip8.step();
};

var rsize = 12;
function drawPixel(X, Y, value) {
    context.fillStyle = value ? colorOn : colorOff;
    context.fillRect(X*rsize, Y*rsize, rsize, rsize);
};

function changeOn() {
    colorOn = '#' + pad(document.getElementById("txtColorOn").value, 3);
    chip8.fullRender();
};

function changeOff() {
    colorOff = '#' + pad(document.getElementById("txtColorOff").value, 3);
    chip8.fullRender();
};

function changeTimeout() {
    chip8.timeout = parseInt(document.getElementById("txtTimeout").value);
};

function changeTimer() {
    chip8.setTimerRate(parseInt(document.getElementById("txtTimer").value));
};

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
};

function clearScreen() {
    context.fillStyle = colorOff;
    context.fillRect(0, 0, width, height);
};
