# Bookmarklets

## Installing

Copy the code into the url text box of a new bookmark and you can run the bookmarklet by clicking it on a page!

**Tip: Select all only takes 3 clicks**

## Note

A simple notepad-esque overlay.

```javascript
javascript:function makeDrag(elmnt) {var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;elmnt.onmousedown = dragMouseDown;elmnt.oncontextmenu = (e) => { return false };function dragMouseDown(e) {if (e.button === 2 || e.altKey === true) {e = e || window.event;e.preventDefault();pos3 = e.clientX;pos4 = e.clientY;document.onmouseup = closeDragElement;document.onmousemove = elementDrag}};function elementDrag(e) {e = e || window.event;e.preventDefault();pos1 = pos3 - e.clientX;pos2 = pos4 - e.clientY;pos3 = e.clientX;pos4 = e.clientY;elmnt.style.top = (elmnt.offsetTop - pos2) + "px";elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"};function closeDragElement() {document.onmouseup = null;document.onmousemove = null}};function spawnNote() {var noteDiv = document.createElement("div");noteDiv.style.zIndex = "999";var note = document.createElement("textarea");var closeButton = document.createElement("button");var downloadButton = document.createElement("a");var openButton = document.createElement("input");var localStorage = window.localStorage;note.id = "NotepadTextArea";note.rows = 20;note.cols = 60;note.placeholder = "Protip: You can move the note with right click or alt + left click";if (localStorage.getItem("NotepadTextValue") !== undefined) {note.value = localStorage.getItem("NotepadTextValue")};noteDiv.style.position = "fixed";noteDiv.style.top = "10%";noteDiv.style.left = "10%";closeButton.style.position = "absolute";closeButton.style.top = "100%";closeButton.style.left = "100%";closeButton.innerText = "x";closeButton.onclick = (e) => {noteDiv.remove();var d = new Date();localStorage.setItem("NotepadTextValue", note.value)};openButton.type = "file";openButton.style.position = "absolute";openButton.style.top = "0%";openButton.style.left = "101%";openButton.onchange = (e) => {e.target.files[0].text().then((t) => note.value = t)};downloadButton.style.position = "absolute";downloadButton.style.top = "100%";downloadButton.style.left = "0%";downloadButton.style.appearance = "button";downloadButton.style.textDecoration = "none";downloadButton.style.color = "initial";downloadButton.onclick = (e) => { downloadButton.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(note.value) };downloadButton.download = 'text.txt';downloadButton.innerText = "Download";noteDiv.appendChild(note);noteDiv.appendChild(closeButton);noteDiv.appendChild(downloadButton);noteDiv.appendChild(openButton);makeDrag(noteDiv);document.body.appendChild(noteDiv)};spawnNote()
```

## Tetris

Tetris!

```javascript
javascript:function makeDrag(elmnt) {var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;elmnt.onmousedown = dragMouseDown;elmnt.oncontextmenu = (e) => { return false };function dragMouseDown(e) {if (e.button === 2 || e.altKey === true) {e = e || window.event;e.preventDefault();pos3 = e.clientX;pos4 = e.clientY;document.onmouseup = closeDragElement;document.onmousemove = elementDrag}};function elementDrag(e) {e = e || window.event;e.preventDefault();pos1 = pos3 - e.clientX;pos2 = pos4 - e.clientY;pos3 = e.clientX;pos4 = e.clientY;elmnt.style.top = (elmnt.offsetTop - pos2) + "px";elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"};function closeDragElement() {document.onmouseup = null;document.onmousemove = null}};async function spawnTetris() {class piece {constructor(x, y) {this.origin = [x, y];this.orientations = [];this.rotation = 0;this.type = undefined;this.squares = this.constructSquares(this.orientations[this.rotation], this.origin)};commitPositions(orientation, origin) {var locations = [];for (var i in orientation) {locations.push([origin[0] + orientation[i][0], origin[1] + orientation[i][1]])};return locations};constructSquares(orientation, origin) {var squares = [];for (var squarePos in orientation) {squares.push(new square(origin[0] + orientation[squarePos][0], origin[1] + orientation[squarePos][1], 1))};return squares};rotate(lockedGrid) {this.rotation += 1;if (this.orientations.length === this.rotation) {this.rotation = 0};var positions = this.commitPositions(this.orientations[this.rotation], this.origin);var offsetX = 0;var offsetY = 0;for (var i in positions) {try {if (lockedGrid[positions[i][1]][positions[i][0]] === 1) {offsetY += 1}} catch {if (!(positions[i][1] >= gridHeight)) {offsetY += 1}};if (positions[i][0] < 0 && positions[i][0] * -1 > offsetX) {offsetX = positions[i][0] * -1} else if (positions[i][0] >= gridWidth && positions[i][0] * -1 < offsetX) {offsetX = (positions[i][0] - (gridWidth - 1)) * -1}};try {this.constructSquares(this.orientations[this.rotation], [this.origin[0] + offsetX, this.origin[1] + offsetY]);this.origin[0] += offsetX;this.origin[1] += offsetY} catch {this.rotation -= 1;return};this.update()};calculateCollisionHeight(grid) {var yVals = [];var yVal = 0;while (yVal < gridHeight) {var free = 1;var positions = this.commitPositions(this.orientations[this.rotation], [this.origin[0], yVal]);for (var i in positions) {if (grid[positions[i][1]] !== undefined) {if (grid[positions[i][1]][positions[i][0]] !== undefined) {if (grid[positions[i][1]][positions[i][0]] === 1) {free *= 0;break}} else {free *= 0;break}} else {free *= 0;break}};if (free === 1) {yVals.push(yVal)};yVal += 1};yVals.sort((a, b) => {return a - b});yVals = removeConsecutives(yVals);return yVals[yVals.length - 1]};commit(grid, lockedGrid) {this.update();var collisionHeight = this.calculateCollisionHeight(lockedGrid);var previewPositions = this.commitPositions(this.orientations[this.rotation], [this.origin[0], collisionHeight]);for (var sqr in this.squares) {try {grid[this.squares[sqr].y][this.squares[sqr].x] = this.squares[sqr]} catch {}};for (var preview in previewPositions) {grid[previewPositions[preview][1]][previewPositions[preview][0]] = new square(previewPositions[preview][0], previewPositions[preview][1], 2)};return grid};update() {this.squares = this.constructSquares(this.orientations[this.rotation], this.origin)}};class oPiece extends piece {constructor(x, y) {super(x, y);this.type = "O";this.orientations = [[[1, 0],[1, 1],[0, 1],[0, 0]]]}};class iPiece extends piece {constructor(x, y) {super(x, y);this.type = "I";this.orientations = [[[0, 0],[0, -1],[0, -2],[0, 1]],[[0, 0],[-2, 0],[-1, 0],[1, 0]],[[-1, 0],[-1, -1],[-1, -2],[-1, 1]],[[0, -1],[-2, -1],[-1, -1],[1, -1]]]}};class jPiece extends piece {constructor(x, y) {super(x, y);this.type = "J";this.orientations = [[[0, 0],[-1, 0],[1, 0],[-1, 1]],[[0, 0],[0, 1],[1, 1],[0, -1]],[[0, 0],[1, 0],[-1, 0],[1, -1]],[[0, 0],[0, 1],[0, -1],[-1, -1]]]}};class lPiece extends piece {constructor(x, y) {super(x, y);this.type = "L";this.orientations = [[[0, 0],[1, 0],[1, 1],[-1, 0]],[[0, 0],[0, 1],[0, -1],[1, -1]],[[0, 0],[1, 0],[-1, 0],[-1, -1]],[[0, 0],[0, 1],[0, -1],[-1, 1]]]}};class tPiece extends piece {constructor(x, y) {super(x, y);this.type = "T";this.orientations = [[[0, 0],[0, -1],[1, 0],[-1, 0]],[[0, 0],[0, 1],[-1, 0],[0, -1]],[[0, 0],[0, -1],[-1, -1],[1, -1]],[[0, 0],[0, 1],[0, -1],[1, 0]]]}};class sPiece extends piece {constructor(x, y) {super(x, y);this.type = "S";this.orientations = [[[0, 0],[0, 1],[1, 1],[-1, 0]],[[0, 0],[-1, 0],[0, -1],[-1, 1]]]}};class zPiece extends piece {constructor(x, y) {super(x, y);this.type = "Z";this.orientations = [[[0, 0],[0, 1],[1, 0],[-1, 1]],[[0, 0],[0, 1],[-1, 0],[-1, -1]]]}};class square {constructor(x, y, type, color) {this.x = x;this.y = y;this.type = type }};function setSquareColor(x, y, color) {try {document.getElementById(x.toString() + ";" + y.toString()).style.backgroundColor = color} catch(e) {}};function createSquareElement(color) {squareDiv = document.createElement("div");squareDiv.style.height = cellSize.toString() + "px";squareDiv.style.width = cellSize.toString() + "px";squareDiv.style.backgroundColor = color;return squareDiv};function clearRow(lockedGrid, y) {lockedGrid.splice(y, 1);var lockedRow = [];for (var i = 0; i < gridWidth; i++) {lockedRow.push(0)};lockedGrid.push(lockedRow);return lockedGrid};function lockPiece() {var affectedRows = [];var clearRows = [];for (var square in currentPiece.squares) { ;lockedGrid[currentPiece.squares[square].y][currentPiece.squares[square].x] = 1;if (!affectedRows.includes(currentPiece.squares[square].y)) {affectedRows.push(currentPiece.squares[square].y)}};for (var row in affectedRows) { ;var filled = 1;for (var square in lockedGrid[row]) {if (lockedGrid[affectedRows[row]][square] === 0) {filled *= 0;break}};if (filled > 0) {clearRows.push(parseInt(affectedRows[row]))}};clearRows.sort((a, b) => {return a - b});for (var row in clearRows) { ;lockedGrid = clearRow(lockedGrid, clearRows[row]);for (var i in clearRows) {clearRows[i] -= 1}};switch (clearRows.length) {case 0:;updateScore(score + hardDropScore);break;case 1:;updateScore(score + singleScore);break;case 2:;updateScore(score + doubleScore);break;case 3:;updateScore(score + tripleScore);break;case 4:;updateScore(score + quadScore);break;default:;updateScore(score + quadScore);break};placedPieces += 1;if (placedPieces % speedTime == 0 && placedPieces !== 0) { ;increaseSpeed(5)};blink = 1;blinking = false;holdPiece = 1;currentPiece = randomPiece() };function removeConsecutives(x) {var toBePopped = [];for (var i in x) {if (x[i - 1] + 1 === x[i]) {toBePopped.push(parseInt(i))}};for (var pop in toBePopped) {x.splice(toBePopped[pop], 1);for (var other in toBePopped) {toBePopped[other] -= 1}};return x};function resetGrid() {gridData = [];for (y = 0; y < gridHeight; y++) {var row = [];for (x = 0; x < gridWidth; x++) {setSquareColor(x, y, "#000000");row.push(new square(x, y, 0))};gridData.push(row)}};function render() {for (y = 0;y < gridHeight; y++) {for (x = 0;x < gridWidth; x++) {if (lockedGrid[y][x] === 1) {setSquareColor(x, y, "#ffffff")} else if (gridData[y][x].type === 1) {setSquareColor(x, y, "#ffffff")} else if (gridData[y][x].type === 2) {setSquareColor(x, y, "#ababab")}}};for (var square in currentPiece.squares) {if (blinking === true && blink < 0) {setSquareColor(currentPiece.squares[square].x, currentPiece.squares[square].y, "#ababab")} else {setSquareColor(currentPiece.squares[square].x, currentPiece.squares[square].y, "#ffffff")}}};function randomPiece() {var pieces = [];var catalog = getPieceCatalog();for (var i in catalog) {pieces.push(catalog[i])};if (currentPiece !== undefined) {while (true) {var piece = pieces[Math.floor(Math.random() * pieces.length)];if (currentPiece.type !== piece.type) {break}}} else {var piece = pieces[Math.floor(Math.random() * pieces.length)]};return piece};function increaseSpeed(increment) {gravitySpeed -= increment;if (gravitySpeed < 1) {gravitySpeed = 1}};function updateScore(newscore) {score = newscore;scoreButton.innerText = score.toString()};function tick() {if (locking > softDropTime) { ;if (currentPiece.calculateCollisionHeight(lockedGrid) < currentPiece.origin[1]) {currentPiece.origin[1] -= 1};currentPiece.update();locking = 0;resetGrid();lockPiece();gridData = currentPiece.commit(gridData, lockedGrid);render();return} else if (locking > 0) { ;locking += 1};if (blinking === true && tickCount % blinkTime == 0) {resetGrid();blink *= -1;render()};if (tickCount % gravitySpeed == 0 && tickCount !== 0) { ;resetGrid();if (currentPiece.calculateCollisionHeight(lockedGrid) < currentPiece.origin[1]) {currentPiece.origin[1] -= 1} else {if (locking === 0) {locking = 1;}};gridData = currentPiece.commit(gridData, lockedGrid);render()};try {if (inputQueue[0] === hardDrop) {resetGrid();currentPiece.origin[1] = currentPiece.calculateCollisionHeight(lockedGrid);currentPiece.update();lockPiece();gridData = currentPiece.commit(gridData, lockedGrid);render()} else if (inputQueue[0] === softDrop) {resetGrid();if (currentPiece.calculateCollisionHeight(lockedGrid) < currentPiece.origin[1]) {currentPiece.origin[1] -= 1};updateScore(score + softDropScore);gridData = currentPiece.commit(gridData, lockedGrid);render()} else if (inputQueue[0] === rotate) {if (locking > 0) {locking += 25};resetGrid();try {currentPiece.rotate(lockedGrid)} catch {};gridData = currentPiece.commit(gridData, lockedGrid);render()} else if (inputQueue[0] === hold) {if (holdPiece > 0) {resetGrid();blink = 1;blinking = false;if (heldPiece === undefined) {var originalHeld = randomPiece()} else {var originalHeld = getPieceCatalog()[heldPiece.type]};heldPiece = getPieceCatalog()[currentPiece.type];currentPiece = originalHeld;holdButton.innerText = heldPiece.type;holdPiece *= 0;gridData = currentPiece.commit(gridData, lockedGrid);render()}} else if (inputQueue[0] === left) {resetGrid();if (locking > 0) {locking += 25};var move = 1;var commitPositions = currentPiece.commitPositions(currentPiece.orientations[currentPiece.rotation], [currentPiece.origin[0] - 1, currentPiece.origin[1]]);for (var i in commitPositions) {try {if (commitPositions[i][0] < 0 || lockedGrid[commitPositions[i][1]][commitPositions[i][0]] === 1) {move *= 0}} catch {}};if (move > 0) {currentPiece.origin[0] -= 1};gridData = currentPiece.commit(gridData, lockedGrid);render()} else if (inputQueue[0] === right) {resetGrid();if (locking > 0) {locking += 25};var move = 1;var commitPositions = currentPiece.commitPositions(currentPiece.orientations[currentPiece.rotation], [currentPiece.origin[0] + 1, currentPiece.origin[1]]);for (var i in commitPositions) {try {if (commitPositions[i][0] === gridWidth || lockedGrid[commitPositions[i][1]][commitPositions[i][0]] === 1) {move *= 0}} catch {}};if (move > 0) {currentPiece.origin[0] += 1};gridData = currentPiece.commit(gridData, lockedGrid);render()} else {speedAmplifier = 1};inputQueue.splice(0, 1)} catch(e) {console.log(e)};tickCount += 1};function getPieceCatalog() {var pieceCatalog = {"O": new oPiece(gridWidth / 2, gridHeight),"I": new iPiece(gridWidth / 2, gridHeight),"J": new jPiece(gridWidth / 2, gridHeight),"L": new lPiece(gridWidth / 2, gridHeight),"T": new tPiece(gridWidth / 2, gridHeight),"Z": new zPiece(gridWidth / 2, gridHeight),"S": new sPiece(gridWidth / 2, gridHeight)};return pieceCatalog};var tickCount = 0 ;var tickSpeed = 10 ;var gravitySpeed = 75 ;var gridHeight = 24 ;var gridWidth = 10 ;var softDropTime = 50 ;var blinkTime = 25 ;var cellSize = 20 ;var speedTime = 20 ;var softDropScore = 1 ;var hardDropScore = 50 ;var singleScore = 100 ;var doubleScore = 300 ;var tripleScore = 500 ;var quadScore = 800 ;var left = "ArrowLeft";var right = "ArrowRight";var rotate = "ArrowUp";var softDrop = "ArrowDown";var hardDrop = "Space";var hold = "KeyC";var currentPiece = randomPiece();var heldPiece = undefined;var gridContainer = document.createElement("div");var grid = document.createElement("div");var closeButton = document.createElement("button");var holdButton = document.createElement("button");var scoreButton = document.createElement("button");var gridData = [];var lockedGrid = [];var run = true;var holdPiece = 1;var locking = 0;var blinking = false;var blink = -1;var score = 0;var placedPieces = 0;var inputQueue = [] ;grid.style.display = "grid";grid.style.gridTemplateColumns = "repeat(10, 1fr)";grid.style.gridTemplateRows = "repeat(24, 1fr)";for (y = 0; y < gridHeight; y++) {var row = [];var lockRow = [];for (x = 0; x < gridWidth; x++) {voidDiv = createSquareElement("#000000");voidDiv.id = x.toString() + ";" + (gridHeight - (y + 1)).toString();grid.appendChild(voidDiv);lockRow.push(0);row.push(new square(x, y, 0))};lockedGrid.push(lockRow);gridData.push(row)};closeButton.style.position = "absolute";closeButton.style.top = "100%";closeButton.style.left = "100%";closeButton.innerText = "x";closeButton.onclick = (e) => { gridContainer.remove(); run = false };holdButton.style.position = "absolute";holdButton.style.padding = "7.5px";holdButton.style.top = "0%";holdButton.style.left = "-15%";holdButton.innerText = "-";holdButton.onclick = (e) => { inputQueue.push(hold); gridContainer.focus() };scoreButton.style.position = "absolute";scoreButton.style.padding = "3px";scoreButton.style.top = "0%";scoreButton.style.left = "105%";scoreButton.innerText = "0";makeDrag(gridContainer);gridContainer.tabIndex = "-1";gridContainer.onkeydown = (e) => {inputQueue.push(e.code)};gridContainer.style.position = "fixed";gridContainer.style.top = "30%";gridContainer.style.left = "40%";gridContainer.appendChild(grid);gridContainer.appendChild(closeButton);gridContainer.appendChild(holdButton);gridContainer.appendChild(scoreButton);document.body.appendChild(gridContainer);gridContainer.focus();while (run) {tick();await new Promise(resolve => setTimeout(resolve, tickSpeed))}};spawnTetris()
```
