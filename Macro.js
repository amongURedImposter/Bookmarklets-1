// * Shamelessly copied from Stack Overflow like a true JS Developer ;)
function findDeepest(elem) {
    var result = {
        maxDepth: 0,
        deepestElem: null
    }
    descend(elem, 0, result);
    return result
}

function descend(elem, depth, result) {
    switch (elem.nodeType) {
        case 1: // ELEMENT_NODE
            result.maxDepth = depth;
            result.deepestElem = elem;
            if (elem.childNodes.length) {
                descend(elem.childNodes[0], depth + 1, result);
            }
            break;
        case 3: // TEXT_NODE
        case 4: // CDATA_SECTION_NODE
        case 5: // ENTITY_REFERENCE_NODE
        case 8: // COMMENT_NODE
            // handle these cases as needed
            break;
    }
}

function main() {
    let activationContext = {
        keycombo: {
            key: "a",
            shiftKey: true,
            ctrlKey: false,
            altKey: true,
            metaKey: false
        }
    }

    const activationHandler = function (e) {
        if (checkCombo(e, this.keycombo)) {
            console.log("Active triggered!")
            let onSelectPosition = function selectMacroPosition(e) {
                makeMacro({
                    x: e.clientX,
                    y: e.clientY
                }, {
                    key: "q",
                    shiftKey: true,
                    ctrlKey: false,
                    altKey: true,
                    metaKey: false
                })
                console.log("Set macro!", e.clientX, e.clientY)
                document.removeEventListener("click", selectMacroPosition)
                return false
            }
            document.addEventListener("click", onSelectPosition)
        }
    }.bind(activationContext)

    document.addEventListener("keydown", activationHandler)
}

function makeMacro(pos, keycombo) {
    let context = {
        keycombo: keycombo,
        coords: pos
    }

    const onMacroTriggered = function (e) {
        if (checkCombo(e, this.keycombo) && this.coords.x && this.coords.y) {
            console.log("Macro triggered!")
            let evtObj = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true,
                'screenX': this.coords.x,
                'screenY': this.coords.y
            })

            let element = document.elementFromPoint(this.coords.x, this.coords.y)
            element = findDeepest(element).deepestElem
            console.log(element)

            element.dispatchEvent(evtObj)
        }
    }.bind(context)

    document.addEventListener("keydown", onMacroTriggered)
}

function checkCombo(e, keycombo) {
    let keyMatch
    if (e.key && keycombo.key) {
        keyMatch = (e.key.toLowerCase() === keycombo.key.toLowerCase())
    } else {
        return false
    }

    if (e.shiftKey === keycombo.shiftKey &&
        e.ctrlKey === keycombo.ctrlKey &&
        e.altKey === keycombo.altKey &&
        e.metaKey === keycombo.metaKey &&
        keyMatch
    ) {
        return true
    }
    return false
}
main()