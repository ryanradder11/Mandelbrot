let pixelSize = 1;
let width = 500;
let height = 500;
let maxIterations = 100;
let mandelMin = -2.5;
let mandelMax = 2.5;
let infinity = 40;
let brightness;
let canvas = document.getElementById('canvas');
let ctx = document.getElementById('canvas').getContext('2d');


function draw() {


    for (var y = 0; y < height; y++) {

        for (var x = 0; x < width; x++) {

            let a = map(y, 0, height, mandelMin, mandelMax);
            let b = map(x, 0, width, mandelMin, mandelMax);

            let initialA = a;
            let initialB = b;

            let iterationCount = 0;

            while (iterationCount < maxIterations) {

                //Echt component
                let aa = (a * a) - (b * b);

                //Denkbeeldig component
                let bb = (2 * a * b);

                //De initiele waarde is c
                a = aa + initialA;
                b = bb + initialB;

                //We willen de absolute waarde
                let result = Math.abs(a + b);

                //Is het oneindig?
                if (result >= infinity) {

                    //Niet in de set
                    brightness = (iterationCount * 16 ) % 255;
                    ctx.fillStyle = 'rgb(' + brightness + ', ' + brightness + ', ' + brightness + ')';
                    break;

                } else {

                    //Wel in de set
                    brightness = map(iterationCount, 0, maxIterations, 255, 0);
                    ctx.fillStyle = 'rgb(' + brightness + ', ' + brightness + ', ' + brightness + ')';
                }

                iterationCount++;
            }
            ctx.fillRect(y * pixelSize, x * pixelSize, pixelSize, pixelSize);
        }
        ctx.fillRect(y * pixelSize, x * pixelSize, pixelSize, pixelSize);
    }
}

draw();

function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

function writeMessage(canvas, message) {

    var context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, 500, 50);

    context.font = '14pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);

}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function (evt) {
    let mousePos = getMousePos(canvas, evt);
    let message = 'x = : ' + mousePos.x + ', y = ' + mousePos.y + ' MandelA: ' + map(mousePos.x, 0, width, mandelMin, mandelMax).toFixed(5) + ' MandelB ' + map(mousePos.y, 0, height, mandelMin, mandelMax).toFixed(5);
    writeMessage(canvas, message);
}, false);

let mousePosDown;
canvas.addEventListener('mousedown', function (evt) {
    mousePosDown = getMousePos(canvas, evt);
}, false);

let mousePosUp;
canvas.addEventListener('mouseup', function (evt) {
    mousePosUp = getMousePos(canvas, evt);
    redraw(mousePosDown, mousePosUp);
}, false);


function redraw(mouseDown, mouseUp) {

    debugger;
    if(mouseDown.x <= mouseUp.x){
        mandelMin = map(mouseDown.x, 0, width, mandelMin, mandelMax);
    }else{
        mandelMin = map(mouseUp.x, 0, width, mandelMin, mandelMax);
    }

    if(mouseDown.y <= mouseUp.y){
        mandelMax = map(mouseDown.y, height, 0, mandelMin, mandelMax);
    }else {
        mandelMax = map(mouseUp.y, height, 0, mandelMin, mandelMax);
    }

    draw();
}

