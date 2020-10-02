function makeDrag(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    elmnt.onmousedown = dragMouseDown
    elmnt.oncontextmenu = (e) => { return false }

    function dragMouseDown(e) {
        if (e.button === 2 || e.altKey === true) {
            e = e || window.event
            e.preventDefault()
            pos3 = e.clientX
            pos4 = e.clientY
            document.onmouseup = closeDragElement
            document.onmousemove = elementDrag
        }
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
    }

    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

async function spawnTetris() {
    class piece {
        constructor(x, y) {
            this.origin = [x, y]
            this.orientations = []
            this.defaultOrientation = []
            this.squares = this.constructSquares()
            this.rotation = 0
        }

        commitPositions(orientation, origin) {
            var locations = []
            for (var i in orientation) {
                locations.push([origin[0] + orientation[i][0], origin[1] + orientation[i][1]])
            }
            return locations
        }

        constructSquares(orientation) {
            var squares = []
            for (var squarePos in orientation) {
                squares.push(new square(this.origin[0] + orientation[squarePos][0], this.origin[1] + orientation[squarePos][1], 1))
            }
            return squares
        }

        rotate() {
            this.rotation += 1
            if (this.orientations.length === this.rotation) {
                this.rotation = 0
            }
            this.squares = this.constructSquares(this.orientations[this.rotation])
        }

        calculateCollisionHeight(grid) {
            var yVal = 0

            while (yVal < gridHeight) {
                var free = 1
                var positions = this.commitPositions(this.orientations[this.rotation], [this.origin[0], yVal])
                for (var i in positions) {
                    if (grid[positions[i][1]] !== undefined) {
                        if (grid[positions[i][1]][positions[i][0]] !== undefined) {
                            if (grid[positions[i][1]][positions[i][0]] === 1) {
                                free *= 0
                                break
                            }
                        } else {
                            free *= 0
                        }
                    } else {
                        free *= 0
                    }
                }
                if (free === 1) {
                    return yVal
                }
                yVal += 1
            }
            return yVal
        }

        commit(grid) {
            for (var square in this.squares) {
                try {
                    grid[square.y][square.x] = square
                } catch {}
            }
            return grid
        }

        update() {
            this.squares = this.constructSquares(this.orientations[this.rotation])
        }
    }

    class oPiece extends piece {
        constructor(x, y) {
            super(x, y)
            this.orientations = [[[1, 0], [1, 1], [0, 1], [0, 0]]]
            this.defaultOrientation = this.orientations[0]
        }
    }

    class square {
        constructor(x, y, type) {
            this.x = x
            this.y = y
            this.type = type //? Type Format - 0:Empty, 1:Occupied, 2:Preview
        }
    }

    function setSquareColor(x, y, color) {
        try {
            document.getElementById(x.toString() + ";" + y.toString()).style.backgroundColor = color
        } catch(e) {
            console.log(e)
        }
    }

    function createSquareElement(color) {
        squareDiv = document.createElement("div")
        squareDiv.style.height = cellSize.toString() + "px"
        squareDiv.style.width = cellSize.toString() + "px"
        squareDiv.style.backgroundColor = color
        return squareDiv
    }

    function lockPiece() {
        for (var square in currentPiece.squares) {
            lockedGrid[square.y][square.x] = 1
        }

        currentPiece = new oPiece(gridWidth / 2, gridHeight)
    }

    function resetGrid() {
        gridData = []
        for (y = 0; y < gridHeight; y++) {
            var row = []
            for (x = 0; x < gridWidth; x++) {
                setSquareColor(x, y, "#000000")
                row.push(new square(x, y, 0))
            }
            gridData.push(row)
        }
    }

    function render() {
        for (y = 0;y < gridHeight; y++) {
            for (x = 0;x < gridWidth; x++) {
                if (lockedGrid[y][x] === 1) {
                    setSquareColor(x, y, "#ffffff")
                } else if (gridData[y][x].type === 1) {
                    setSquareColor(x, y, "#ffffff")
                } else if (gridData[y][x].type === 2) {
                    setSquareColor(x, y, "#ababab")
                }
            }
        }
        for (var square in currentPiece.squares) {
            setSquareColor(currentPiece.squares[square].x, currentPiece.squares[square].y, "#ffffff")
        }
    }

    function tick() {
        try {
            if (inputQueue[0] === "Space") {
                resetGrid()
                currentPiece.origin[1] = currentPiece.calculateCollisionHeight(lockedGrid)
                lockPiece()
                gridData = currentPiece.commit(gridData)
                render()
            } else if (inputQueue[0] === "ArrowDown") {
                speedAmplifier = 2
            } else if (inputQueue[0] === "ArrowUp") {
                currentPiece.rotate()
            } else if (inputQueue[0] === "KeyC") {
            } else if (inputQueue[0] === "ArrowLeft") {
                if (currentPiece.origin[0] > 0) {
                    currentPiece.origin[0] -= 1
                }
            } else if (inputQueue[0] === "ArrowRight") {
                if (currentPiece.origin[0] < gridWidth) {
                    currentPiece.origin[0] += 1
                }
            } else {
                speedAmplifier = 1
            }
            inputQueue.pop(0)
        } catch {}
        if (tickCount % gravitySpeed == 0 && tickCount !== 0) { //? On Gravity
            console.log("gravity!")
            resetGrid()
            if (currentPiece.calculateCollisionHeight(lockedGrid) < currentPiece.origin[1]) {
                currentPiece.origin[1] -= 1
            } else {
                lockPiece()
            }
            currentPiece.update()
            gridData = currentPiece.commit(gridData)
            render()
        }
        tickCount += 1
    }

    //? Settings

    var tickCount = 0 //? Number of ticks processed
    var tickSpeed = 10 //? Time (ms) till next tick
    var gravitySpeed = 75 //? Gravity is applied every ? ticks
    var gridHeight = 24 //? Grid height
    var gridWidth = 10 //? Grid width
    var softDropTime = 75 //? Soft drop is locked after ? ticks
    var cellSize = 20 //? Square size

    var currentPiece = new oPiece(gridWidth / 2, gridHeight)
    var speed = 1.0
    var speedAmplifier = 1.0
    var gridContainer = document.createElement("div")
    var grid = document.createElement("div")
    var closeButton = document.createElement("button")
    var gridData = []
    var lockedGrid = []
    var run = true

    var inputQueue = [] //? Input format - 0: Hard drop, 1: Soft drop, 2: Rotate, 3: Hold, 4: Left, 5: Right

    grid.style.display = "grid"
    grid.style.gridTemplateColumns = "repeat(10, 1fr)"
    grid.style.gridTemplateRows = "repeat(24, 1fr)"

    grid.onkeydown = (e) => {
        inputQueue.push(e.code)
    }

    for (y = 0; y < gridHeight; y++) {
        var row = []
        var lockRow = []
        for (x = 0; x < gridWidth; x++) {
            voidDiv = createSquareElement("#000000")
            voidDiv.id = x.toString() + ";" + y.toString()
            grid.appendChild(voidDiv)
            lockRow.push(0)
            row.push(new square(x, y, 0))
        }
        lockedGrid.push(lockRow)
        gridData.push(row)
    }

    closeButton.style.position = "absolute"
    closeButton.style.top = "100%"
    closeButton.style.left = "100%"
    closeButton.innerText = "x"
    closeButton.onclick = (e) => { gridContainer.remove(); run = false }

    makeDrag(gridContainer)

    gridContainer.style.position = "fixed"
    gridContainer.style.top = "30%"
    gridContainer.style.left = "40%"

    gridContainer.appendChild(grid)
    gridContainer.appendChild(closeButton)

    document.body.appendChild(gridContainer)
    while (run) {
        tick()
        await new Promise(resolve => setTimeout(resolve, tickSpeed * (speed / speedAmplifier)));
    }
}

spawnTetris().then(() => {})