let pixelSize = 1;
let width = 400;
let height = 400;
let maxIterations = 100;
let mandelMin = -2.5;
let mandelMax = 2.5;
let infinity = 20;

function draw() {

    let ctx = document.getElementById('canvas').getContext('2d');

    for (var y = 0; y < height; y++) {

        for (var x = 0; x < width; x++) {

            var map = function (num, in_min, in_max, out_min, out_max) {
                return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            };

            var a = map(x, 0, width, mandelMin , mandelMax);
            var b = map(y, 0, width, mandelMin, mandelMax);

            var initialA = a;
            var initialB = b;

            var iterationCount = 0;

            while(iterationCount < maxIterations){

                //Echt
                var aa = (a * a) - (b * b);

                //Complex
                var bb = (2 * a * b);

                //De initiele waarde zijn c
                a = aa + initialA;
                b = bb + initialB;

                var result = Math.abs(a + b);

                //Is het oneindig?
                if( result >= infinity){
                    break;
                }else{

                    var brightness = 0;

                    ctx.fillStyle = 'rgb('+ brightness +', '+ brightness +', '+ brightness +')';
                    //Teken de pixel
                    ctx.fillRect( map(a ,mandelMin, mandelMax, 0, width )  * pixelSize, map(b, mandelMin, mandelMax, 0, height) * pixelSize, pixelSize, pixelSize);
                }

                iterationCount++;

            }
        }
    }
}
draw();
