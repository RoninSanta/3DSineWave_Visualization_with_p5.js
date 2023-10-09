var confLoc;
var confTheta;

var sliderL;
var button;
var sliderS;
var sliderW;
function setup() {

    createCanvas(900, 800, WEBGL);
    camera(800,-600,800,0,0,0,0,1,0);
    angleMode(DEGREES);

    ////////////  AddOn Idea 2 Add slider options/////////////
    // Height of cubes
    sliderL = createSlider(100, 500, 200);
    sliderL.position(width/6, 20);
    button = createButton('Height of cubes');
    button.position(width/6, 40);
    //Size of Grid
    sliderS = createSlider(100, 600, 300);
    sliderS.position(width/3, 20);
    button = createButton('Size of Grid');
    button.position(width/3, 40);
    //Speed of sin wave
    sliderW = createSlider(1, 10, 3);
    sliderW.position(width/2, 20);
    button = createButton('Speed of waveform');
    button.position(width/2, 40);

    //Step 5.
    confLoc = [];
    confTheta = [];
    for(var i = 0; i< 200; i++){
        var r_x = random(-500,500);
        var r_y = random(-800,0);
        var r_z = random(-500,500);
        var r_v = createVector(r_x,r_y,r_z);
        confLoc.push(r_v);
        var r_a = random(0,360);
        confTheta.push(r_a);
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);
    //Step 4.
    var xLoc = cos(frameCount)*height;
    var zLoc = sin(frameCount)*height;
    camera(xLoc,-600,zLoc,0,0,0,0,1,0);

    //Step 2.
    normalMaterial();
    stroke(0);
    strokeWeight(2);
    //Step 1.
    for(var x=-sliderS.value(); x<=sliderS.value(); x+=50){
        for(var z=-sliderS.value(); z<=sliderS.value(); z+=50){
            push();
            translate(x,50,z);
            //Step 3.
            var distance = dist(0,0,x,z)+frameCount*sliderW.value();
            // var length = map(sin(distance),-1,1,100,300);
            var length = map(sin(distance),-1,1,0,sliderL.value());

            //////////// Add on IDEA 1 Change Material and add Lights ////
            // Add point light to showcase specular material
            let locX = mouseX - width / 2;
            let locY = mouseY - height / 2;
            // Add Point Light move with mouse
            pointLight(255, 0, 0, locX, locY, 100); 
            // Add Fixed Point Light
            pointLight(0,0,255,0,-200,0); 
            // Change material from normal to ambient
            ambientMaterial(255);
            noStroke()
            box(50,length,50);
            pop();
        }
    }
    noStroke();
    confetti();
}

function confetti(){
    for( var i=0; i<confLoc.length; i++){
        push();
        translate(confLoc[i].x,confLoc[i].y,confLoc[i].z);
        rotateX(confTheta[i]);
        plane(15,15);

        //Step 6.
        confLoc[i].y += 1;
        confTheta[i] += 10;
        if(confLoc[i].y>0)
        {
            confLoc[i].y = -800;
        }
        pop();
    }
}