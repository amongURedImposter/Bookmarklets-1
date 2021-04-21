function main() {
    var utilsMenu = document.createElement("div")
    utilsMenu.id = "LQR471814/WebUtils"
    utilsMenu.style.position = "fixed"
    utilsMenu.style.top = "30%"
    utilsMenu.style.left = "40%"

    closeButton.style.position = "absolute"
    closeButton.style.top = "100%"
    closeButton.style.left = "100%"
    closeButton.innerText = "x"
    closeButton.onclick = (e) => { utilsMenu.remove() }

    var info = document.createElement("p")
    info.innerText = "Convenience functions for the web!"

    utilsMenu.appendChild(info)
    utilsMenu.appendChild(closeButton)

    document.body.appendChild(utilsMenu)
}

main()