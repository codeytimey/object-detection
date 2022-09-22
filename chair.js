img="";
status="";
objects=[];

function preload() {
    img = loadImage('Chair.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects= results;
}

function draw() {
    if (status != "") {
        image(img, 0, 0, 640, 420);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
