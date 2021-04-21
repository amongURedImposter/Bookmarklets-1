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

function createBox() {
    var evalBox = document.createElement("textarea")

    evalBox.style.display = "block"
    evalBox.onkeypress = (e) => {
        if (e.code === "Enter" && e.shiftKey === false) {
            let outbox = document.getElementById("Bookmarklet_Eval_Out")
            
            if (e.target.value === "clear") {
                outbox.value = ""
            } else {
                try {
                    outbox.value += eval(e.target.value) + "\n"
                } catch (err) {
                    outbox.value += err + "\n"
                }
            }
            
        }
    }
    evalBox.onkeyup = (e) => {
        if (e.code === "Enter" && e.shiftKey === false) {
            e.target.value = ""
        }
    }
    
    return evalBox
}

function createOutput() {
    var out = document.createElement("textarea")

    out.rows = 15
    out.cols = 40

    out.placeholder = "tip: use 'clear' to clear the output"
    out.readOnly = "true"
    out.id = "Bookmarklet_Eval_Out"

    out.style.resize = "both"

    return out
}

function createContainer() {
    var containerBox = document.createElement("div")

    containerBox.style.zIndex = "999"

    containerBox.id = "Bookmarklet_Eval"

    containerBox.style.position = "fixed"
    containerBox.style.left = "5%"
    containerBox.style.right = "5%"

    containerBox.appendChild(createBox())
    containerBox.appendChild(createOutput())

    makeDrag(containerBox)

    document.body.appendChild(containerBox)
}

function toggleEval() {
    if (document.getElementById("Bookmarklet_Eval")) {
        document.body.removeChild(document.getElementById("Bookmarklet_Eval"))
    } else {
        createContainer()
    }
}

toggleEval()