// user should be able to see the word hello
// hello is represented as a string of flags, each flag containing a letter
// rotate them so the look like they're hanging - figure out how rotation actually works
// make them look like they're on a string
// change the colors - so each has it's own color
// to make interactive: they input a word (less than 10 letters) and it appears on the flags
// go through a sequence of colors

var input; //, button, greeting;
var bg;
var stringHeight = -240;
var characters;
var flag = [];

var wUnit;
var hUnit;

// flag colors
var blue = [157, 192, 249];
var pink = "pink";
var green = [152, 251, 152];
var yellow = [249, 236, 157];
var colors = [blue, pink, green, yellow];
var colorCount = 0; // how to keep track of colors used

var constants = {
  inputW: 6.5,
  inputH: 2,
  imageW: 1214,
  imageH: 866,
  screenX: 670,
  screenY: 310,
  textSize: 18
};

function preload(){
  bg = loadImage('https://content.codecademy.com/programs/code-foundations-path/bop-i/strings/Party.png');

}


function setup() {
  createCanvas(windowWidth, windowHeight); //should figure out how to change this to variable width
  background("#ef95ef");
  textAlign(CENTER);
  textSize(50);

  wUnit = windowWidth / 36;
  hUnit = windowHeight / 36;

  const imageWidth = constants.imageW*(wUnit*.03)
  const imageHeight = constants.imageH*(wUnit*.028)

  bgImage = {x: 0, y: 0,
    w: imageWidth, h: imageHeight};



  input = createInput('');
  input.position(width/2-200, 65);
  input.id('stringInput')
  input.style('width:430px; height:40px; font-size:14px; text-align:center;');
}

function draw() {
  background("#ef95ef");
  // image(img, 50, 0);
  image(bg, bgImage.x, bgImage.y, bgImage.w, bgImage.h);
  drawFlags();
}

function drawString() {
  // draw an ellipse (the "string") based on the number of characters
  noFill();
  strokeWeight(5);
  stroke("white");
  ellipse(width/2, (stringHeight + (characters.length*6)), 1200 + (characters.length*9), 950);
}


function drawFlags() {
  var myWord = input.value();
  myWord = myWord.toUpperCase();
  characters = myWord.split("");

  drawString();

  // numbers to keep track of flag number and positions
  var flagHeights = [];
  var j = 0; // to keep track of heights
  var counter = 1; // to create heights

  for (var i = 0; i < characters.length; i++) {
    // create a new flag
    flag[i] = new Flag();
    // flag[i] = new Triangle();

    // give the flag a new color
    //changeFlagColor();

    // modify flag x position:
    // for rectangle flags:
      flag[i].x = (60 * (i + 1)) + (width / 2 - ((Math.round(characters.length / 2) * 70)));

    //for triangles:
    // flag[i].x = (100 * (i + 1)) + (width / 2 - ((Math.round(characters.length / 2) * 150)));


    // modify flag y position:
    // if characters are an odd number:
    if (characters.length % 2 == 1) {

      // if it's in the first half
      if (i < Math.round(characters.length / 2)) {

        // flagHeights.push((counter * 5) + 130); // og hardcoded values
        flagHeights.push((counter * 5) + (stringHeight/(-1)));

        flag[i].y = flagHeights[j];

        counter += 2;
        j++;


      // if it's in the middle
      } else if (i == Math.round(characters.length / 2)) {
        j -= 2;
        flag[i].y = flagHeights[j];
        //console.log(flagHeights);

      // if it's at the end
      } else if (i > Math.round(characters.length / 2)) {
        j--;
        flag[i].y = flagHeights[j];

      }

      flag[i].letter = characters[i];

      // update display
      flag[i].display();

    } else { //for even numbers
      if (i < Math.round(characters.length / 2)) {

        flagHeights.push((counter * 5) + (stringHeight/(-1)));
        flag[i].y = flagHeights[j];

        counter += 2;

        j++;


      } else if (i >= Math.round(characters.length / 2)) {
        j--;
        flag[i].y = flagHeights[j];

      }

      flag[i].letter = characters[i];

      // update display
      flag[i].display();
    }
  }
}

function changeFlagColor(){
  flag[i].col = colors[colorCount];
  colorCount++;

  if (colorCount == 4){
    colorCount = 0;
  }
}

// flag object

class Flag {
  constructor(x, y, letter) {
    this.x = width / 2;
    this.y = 100;//height / 2;
    // this.col = [157, 192, 249];
    this.col = '#bd10e0';
    this.w = 55;
    this.h = 75;
    this.letter = "H";
  }

  display(){
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);

    fill("white");
    textSize(45);
    text(this.letter, this.x + 30, this.y + 55);
  }
}




class Triangle {
  constructor(x, y){
    this.x = width/2;
    this.y = 100;
    this.originalX = x;
    this.originalY = y;
    this.col = '#bd10e0';
    this.letter = 'H';
    this.size = 50;
    console.log(this.x, this.y);
  }

  display(){
    let x1 = this.x //* this.size;
    let x2 = this.x + 48 //* this.size;
    let x3 = this.x + 96 //* this.size;
    let y1 = this.y //* this.size;
    let y2 = this.y + 96 //* this.size;
    let y3 = this.y //* this.size;

    noStroke();
    fill(this.col);
    triangle(x1, y1, x2, y2, x3, y3);


    fill("white");
    textSize(40);
    text(this.letter, this.x + 50, this.y + 55);

    fill("green");

    ellipse(this.originalX, this.originalY, 10);
  }
}