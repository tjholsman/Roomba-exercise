// Node.js modules
const fs = require('fs');
const readline = require('readline');

/*
 * Global variables
 * inputLines - array of lines from input.txt
 * room - 2d array representing the room
 * startingPosition - x,y coordinates of the roomba's starting position
 */
var inputLines = [];
var room;
var startingPosition; 

/** 
 * Splits 'input.txt' into a formatted array of the file's lines
 */
function splitFile() {
  const fileStream = fs.createReadStream('input.txt');
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  // Transforms coordinates from string 'x y' to integer array [x, y]
  rl.on('line', (line) => {
    if (line.indexOf(' ') >= 0) {
      inputLines.push(line.split(' ').map(x => parseInt(x)));
    }
    // String of directions gets added to inputLines as is
    else inputLines.push(line);
  });

  rl.on('close', main);
}  

/** 
 * Checks input, then calls specific functions per line
 */
function main() {
  
  // input must have at least 3 lines
  if (inputLines.length < 3) {
    console.error('input.txt requires a minimum of 3 lines: Room dimensions, roomba position, and driving instructions.');
  }

  else {
    createRoom(inputLines[0]); // first line is room dimensions
    placeRoomba(inputLines[1], true); // second line is starting position
    for (i = 2; i < inputLines.length - 1; i++) {
      placeDirt(inputLines[i]); // optional lines are dirt pile locations
    }
    runRoomba(inputLines[inputLines.length - 1]); // final line is the roomba directions
  }
}

/** 
 * Creates a 2-dimensional array of empty strings representing the room
 * @param {array} dimensions - The [x, y] dimensions of the room
 */
function createRoom(dimensions) {
  room = Array(dimensions[0]).fill().map(() => Array(dimensions[1]).fill(''));
}

/** 
 * Moves roomba to the specified position
 * @param {array} position - The [x, y] coordinates for the roomba
 * @param {boolean} isStartingPosition - Whether the position is the initial starting position (default=false)
 */
function placeRoomba(position, isStartingPosition = false) {
  room[position[0]][position[1]] = 'R'; // roomba represented by 'R' in the room array
  if (isStartingPosition) {
    startingPosition = position;
  }
}

/** 
 * Places a dirt pile at the specified position
 * @param {array} position - The [x, y] coordinates for the dirt pile
 */
function placeDirt(position) {
  room[position[0]][position[1]] = 'd'; // dirt piles represented by 'd' in the room array
}

/** 
 * Runs the roomba according to the directions and cleans dirt piles found.
 * Outputs the final coordinates of the roomba and the number of dirt piles cleaned.
 * @param {string} directions - The cardinal directions the roomba should move in
 */
function runRoomba(directions) {
  var position = startingPosition;
  var pilesCleaned = 0;
  
  for (i = 0; i < directions.length; i++) {
    
    // Clear 'R' from current position
    room[position[0]][position[1]] = ''
    
    // Move roomba by incrementing/decrementing along x or y axis, staying in place at walls
    switch(directions.charAt(i)) {
      case 'N':
        if (position[1] < room[0].length - 1) {
          position[1]++; 
        }
        break;
      case 'S':
        if (position[1] > 0) {
          position[1]--;
        }
        break;
      case 'E':
        if (position[0] < room.length - 1) {
          position[0]++;
        }
        break;
      case 'W':
        if (position[0] > 0) {
          position[0]--;
        }
        break;
    }
  
    // Clean dirt pile if it exists and increment pilesCleaned
    if (room[position[0]][position[1]] == 'd') {
      pilesCleaned++;
    }    
    
    // Mark roomba's position in the room
    room[position[0]][position[1]] = 'R';
  }
  
  // Write final position and number of piles
  console.log(position[0] + ' ' + position[1]);
  console.log(pilesCleaned);
}

// Initial code executed, calls splitFile and handles errors
try {
  splitFile();
}
catch(err) {
  console.error(err)
}