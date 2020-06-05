# Roomba Simulator
 This code executes a Roomba-type simulator based on a predefined input file. The roomba will navigate and clean piles of dirt based on the file's contents.

## Program Execution

The file `roomba.js` can be downloaded and executed with Node.js at the command line. Ex:

```
node roomba.js
```

## Input

The program expects to read from a file named `input.txt` in the same directory. You can download and modify the included sample file.

Sample file contents:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

Description by line:

* The room dimensions (x y) - 5 5 here yields a 5x5 room grid
* The initial roomba position (x y)
* Zero or more positions of piles of dirt (x y) - This sample contains 3 piles
* The driving directions should be on the last line of the file, provided as a string of cardinal directions

The input file must contain at least 3 lines-- room dimensions, the initial position, and the directions. It will generate an error if the file does not contain 3 lines.

## Output

When execution completes, the program will output two lines:

```
1 3
1
```

Description by line:

* The final position of the roomba (x y)
* The number of dirt piles successfully cleaned

## Notes

 The code was written with Node.js, which I used for the first for this exercise. My previous experience with JavaScript has been mostly limited to the context of email personalization, so some standard syntactic conventions may have been overlooked.

## Enhancement Ideas

* Make it interactive! Take an initial configuration, then take directions as terminal commands with results after each direction.
* Add a printout of the room after each move.
* Add a UI :)