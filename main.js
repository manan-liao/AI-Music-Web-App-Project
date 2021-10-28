song1 = "";
song2 = "";

leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftWrist = 0;
status = "";

function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("blue");
    stroke("blue");
    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,20);
        status = song1.isPlaying();
        if(status == "true"){
            song1.play();
            song2.stop();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme Song Is playing";
        }
        else if(status == "false"){
            song1.stop();
            song2.play();
            document.getElementById("song_name").innerHTML = "Peter Pan Song Is playing";
        }
    }
}

function gotPoses(){
    if(results.length>0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        scoreleftWrist = results[0].pose.keypoints[9].score;
    }
}

function modelLoaded(){
    console.log("posenet is initialized");
}