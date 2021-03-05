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
            let onSelectPosition = function (e) {
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
                document.removeEventListener("click", this.self)
                return false
            }
            onSelectPosition = onSelectPosition.bind({
                self: onSelectPosition
            })
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
        if ( checkCombo(e, this.keycombo) &&  this.coords.x &&  this.coords.y) {
            let evtObj = document.createEvent("Events")
            evtObj.initEvent("click", true, false)
            let element = document.elementFromPoint(this.coords.x, this.coords.y)
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
    if ( e.shiftKey === keycombo.shiftKey &&  e.ctrlKey === keycombo.ctrlKey &&  e.altKey === keycombo.altKey &&  e.metaKey === keycombo.metaKey &&  keyMatch) {
        return true
    }
    return false
}
main()