function makeDrag(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    elmnt.onmousedown = dragMouseDown

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

function createButton(text) {
    var button = document.createElement("div")
    button.innerText = text
    return button
}

function spawnCalculator() {
    var calcDiv = document.createElement("div")
    var display = document.createElement("textarea")

    display.rows = "2"
    display.cols = "50"
    display.readOnly = "true"
    display.style.gridColumn = "1 / -1"

    calcDiv.style.display = "grid"
    calcDiv.columnGap = "0px"
    calcDiv.style.position = "fixed"
    calcDiv.style.top = "20%"
    calcDiv.style.left = "10%"
    calcDiv.style.justifyItems = "center"
    calcDiv.style.gridTemplateColumns = "repeat(3, 1fr)"

    calcDiv.appendChild(display)
    for (i = 1; i < 10; i++) {
        calcDiv.appendChild(createButton(i.toString()))
    }

    document.body.appendChild(calcDiv)
}

spawnCalculator()