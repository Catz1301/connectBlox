# ConnectBlox

This is a web clone of the game "Connect Me - Logic Puzzle" by Viktor Bohush.

## Todo

+ [FIXED] Make the game playable - FIXED
+ [FIXED] make the puzzles solvable. (Falls into "make the game playable") - FIXED
+ [FIXED] fix the checkBoardForSquare function. It always returns undefined - FIXED
+ [FIXED] fix the dragging functionality. It likes to drop peices and pick up new ones when dragging over other pieces. - FIXED'
+ Add some UI elements. (buttons (maybe from a library), modals, toast if possible, etc.)

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
+ .
+ the modal will include two buttons.
+ both buttons will be the same size.
+ both buttons will have the option of being or hidden, but not both at the same time.
+ the buttons will be on the bottom of the modal.
+ the buttons will have the function "positiveButton" and "negativeButton".
+ the modal will return a result. if `POSITIVE`, then we can call the positive function. if `NEGATIVE`, then we can call the negative function.
+ the modal buttons will be of a separate class. this will allow for no event handling.
+ the modal will have a function that will be called when clicked. it will check to see if click was in the bounds of the modal buttons. this will return to the modal the result of the button.
+ the modal buttons will have a function that will have a function called inBounds. this will check to see if the mouse is in the bounds of the button. this will return a boolean.
+ depending on the button returning true, the modal will set the status of the button. This can return to an async function that will do something with the result. maybe.