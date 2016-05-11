
var r = new Rune({
  container: "#canvas",
  width: 600,
  height: 800,
  debug: false 
});

function drawFlower(radius, inOut, numPoints, envelope) {
//restart the canvas all over
  r.stage.children = [];


var pointDegree = 360 / numPoints
var pointDegree2 = 80 / numPoints;

var myPath = r.path(r.width/2, r.height/2)
  .fill('FFFFFF')
  .stroke('22DDDD')
  .strokeWidth(2);

for(var i = 0; i < numPoints + 1; i++) {
  var actualDegree = (i * pointDegree) + Rune.random(30, 30);
  var x = Math.cos(Rune.radians(actualDegree)) * radius;
  var y = Math.sin(Rune.radians(actualDegree)) * radius;

  if(i == 0) {
    myPath.moveTo(x, y);
  } else {
    var midRadius = radius + inOut;
    var in1XDegree = actualDegree - (pointDegree*envelope);
    var in1X = Math.cos(Rune.radians(in1XDegree)) * midRadius;
    var in1Y = Math.sin(Rune.radians(in1XDegree)) * midRadius;
    var in2XDegree = actualDegree - (pointDegree*(1-envelope));
    var in2X = Math.cos(Rune.radians(in2XDegree)) * midRadius;
    var in2Y = Math.sin(Rune.radians(in2XDegree)) * midRadius;
    myPath.curveTo(in2X, in2Y, in1X, in1Y, x, y);     
    // r.circle((r.width/2) + in1X, (r.height/2) + in1Y, 3);
    // r.circle((r.width/2) + in2X, (r.height/2) + in2Y, 3);
  }
}

r.draw();
}

//global var - can access these anywhere
var radius = 100;
var inOut = 70;
var numPoints = 20;
var envelope = 0.85;
//drawFlower(radius, inOut, numPoints, envelope);


 $(function() {
    $('.slider').on('input', redraw);
    $('#submit').click(redraw);

    $('#save').click(saveSvg);

    redraw();
  });

function redraw(){
   numPoints = parseInt($('#slider1').val());
    console.log('numPoints: ' + numPoints);

    //radius = NOT WORKING
    //get values of second slider
    radius = parseInt($('#slider2').val());
    console.log('radius: ' + radius);

    // //inOut = NOT WORKING
    // //get the value from the form
    inOut = parseInt($('#input2').val());
    console.log('inOut: ' + inOut);

    //envelope = WORKING (by itself)
    //get values of third slider
    envelope = parseInt($('#slider3').val());
    console.log('envelope: ' + envelope);

    drawFlower(radius, inOut, numPoints, envelope);
}

 ///For Sam:
 //1. How to add "export as SVG" button. 
 //2. how to make buttons part of the canvas, designwise. 
