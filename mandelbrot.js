let pixelSize = 1;
let width = 500;
let height = 500;
let maxIterations = 400;
let mandelMin = -2.5;
let mandelMax = 2.5;
let infinity = 50;
var brightness;

function draw() {

    let ctx = document.getElementById('canvas').getContext('2d');

    for (var y = 0; y < height; y++) {

        for (var x = 0; x < width; x++) {

            var map = function (num, in_min, in_max, out_min, out_max) {
                return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            };

            var a = map(y, 0, height, mandelMin, mandelMax);
            var b = map(x, 0, width, mandelMin , mandelMax);

            var initialA = a;
            var initialB = b;

            var iterationCount = 0;

            while(iterationCount < maxIterations){

                //Echt aa
                var aa = (a * a) - (b * b);

                //Complex bb
                var bb = (2 * a * b);

                //De initiele waarde zijn voor beide axis c
                a = aa + initialA;
                b = bb + initialB;

                var result = Math.abs(a + b);

                //Is het oneindig?
                if( result >= infinity){
                    brightness = 255;
                    ctx.fillStyle = 'rgb('+ brightness +', '+ brightness +', '+ brightness +')';
                    break;
                }else{

                    brightness = 0;
                    ctx.fillStyle = 'rgb('+ brightness +', '+ brightness +', '+ brightness +')';
                }

                iterationCount++;
            }
            ctx.fillRect(y * pixelSize, x * pixelSize, pixelSize, pixelSize);
        }
        ctx.fillRect(y * pixelSize, x * pixelSize, pixelSize, pixelSize);
    }
}
draw();
