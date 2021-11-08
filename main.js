obj = [];
Status = "";

function preload() {
 video = createCapture(VIDEO);
 video.hide();
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (Status != "") {
      objectDetector.detect(video, gotResult);
    }
    for (i = 0; i < obj.length; i++) {
      document.getElementById("status").innerHTML = "Status: We have detected the objects below";
      document.getElementById("number_of_objects").innerHTML = "The number of objects are:"+ obj.length;
      fill("#FF0000");
      percent = floor(obj[i].confidence * 100);
      text(obj[i].label + "" + percent + "%", obj[i].x, obj[i].y);
      noFill();
      stroke("#FF0000");
      rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
  }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "I am still Detecting. Give me a moment...";
}
function modelLoaded() {
  console.log("I have loaded now let me detect");
  Status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}
function gotResult(error, results) {
    if (error) {
     console.log(error);
    }
    console.log(results);
    obj = results;
}