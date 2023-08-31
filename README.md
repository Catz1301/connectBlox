# ConnectBlox

This is a web clone of the game "Connect Me - Logic Puzzle" by Viktor Bohush.

## Todo

+ Make the game playable
+ make the puzzles solvable. (Falls into "make the game playable")
+ [FIXED] fix the checkBoardForSquare function. It always returns undefined - FIXED
+ [FIXED] fix the dragging functionality. It likes to drop peices and pick up new ones when dragging over other peices. - FIXED


### Notes

+ The game is not playable yet. It is just a board with peices that can be dragged around.
+ add editor. (this is next). The editor will allow you to create your own puzzles. It will also allow you to save and load puzzles. (that is a bit further down the road).
+ The state of the program (editor or gameplay) will be controlled via a single variable. This will be set in the sketch.js file. This will allow for easy switching between the two states. you can switch with the 'e' key. The gameplate will be the default state.
+ the 'l' key will load a level. 's' will save a level. these will be saved locally to the computer.

### Thoughts

+ backspace will delete a square.
+ clicking a square will also select that square. (this will be used for the editor)
+ the state of square editing will be controlled by a variable. *editingSquare" (this will be used for the editor)
+ in mousePressed function
```
if (isEditing) {
    get square to be clicked
    '1' will add a connector to the top of the square. if there is already 4 connectors, then all top connectors will be removed.
    'r' will rotate the square.
    '2' will add a connector to the right of the square. if there is already 4 connectors, then all right connectors will be removed.
    '3' will add a connector to the bottom of the square. if there is already 4 connectors, then all bottom connectors will be removed.
    '4' will add a connector to the left of the square. if there is already 4 connectors, then all left connectors will be removed.
}
```
+ if we are in "add square" mode, then we will add a square to the board when clicking, instead of editing. if a square already exists, then we should not add a square.