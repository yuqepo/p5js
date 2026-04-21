/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose;
let video;
let hands = [];
let prevX = 0;
let prevY = 0;
let hearts = [];

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    let thumb = hand.keypoints[4];   // 엄지 끝
    let index = hand.keypoints[8];   // 검지 끝

    let d = dist(thumb.x, thumb.y, index.x, index.y);

    if (d < 40) {

      let midX = (thumb.x + index.x) / 2;
      let midY = (thumb.y + index.y) / 2;

      hearts.push({
        x: midX,
        y: midY,
         size: random(20,40)
      });
    }

    stroke(255,0,0);
    strokeWeight(5);

    line(prevX, prevY, index.x, index.y);

    prevX = index.x;
    prevY = index.y;

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
    for (let j = 0; j < hand.keypoints.length - 1; j++) {
        let p1 = hand.keypoints[j];
        let p2 = hand.keypoints[j + 1];

        stroke(255);
        line(p1.x, p1.y, p2.x, p2.y);
      }
  }
  for (let i = 0; i < hearts.length; i++) {

  textSize(hearts[i].size);
  text("❤️", hearts[i].x, hearts[i].y);

  hearts[i].y -= 2; // 위로 올라감
}
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
