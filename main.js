song1 = "";
song2 = "";

leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
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
    status = song1.isPlaying();
    if(scorerightWrist > 0.2){
        circle(rightWristx,rightWristy,20);
        song1.stop();
        if(song2.isPlaying() == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Peter Pan Song is playing";
        }
    }

    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,20);
        status = song1.isPlaying();
        song2.stop();
        if(status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme Song is playing";
        }
    }
}

function gotPoses(){
    console.log(results);
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("posenet is initialized");
}