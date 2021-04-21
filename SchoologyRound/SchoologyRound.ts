function getFirstXPATHElement(xpath: string, context?: Element): HTMLElement | null {
    return document.evaluate(
        xpath,
        context ? context : document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue as HTMLElement
}

function moveChildren(children: HTMLCollection, newParent: HTMLElement, callback: (child: HTMLElement) => void) {
    const moveChildren = []

    for (const child of children) {
        console.log(child)
        callback(child as HTMLElement)
        moveChildren.push(child)
    }

    for (const child of moveChildren) {
        newParent.prepend(child)
    }
}

//* Make Navbar sticky and nicer
const newParent = document.getElementById('body')!
const headerChildren = getFirstXPATHElement(`//header`)!.children

moveChildren(headerChildren, newParent, (child) => {
    if (child.tagName !== "NAV" || !child) {
        return
    }

    child.classList.add('mod-style-stickyNav')

    for (const navBarParent of child.children) {
        for (const navBarChild of navBarParent.children) {
            (navBarChild as HTMLElement).style.marginLeft = "10px";

            const childButton = (getFirstXPATHElement(`.//*[name()='button' or name()='a']`, navBarChild) as HTMLElement)
            if (childButton) {
                childButton.classList.add('mod-style-navMenuButton')
            }
        }
    }
})

getFirstXPATHElement(`//div[@id='header']`)!.remove()
window.scrollTo(0, 0)

//* Inject styles
const styleInjectElement = document.createElement("style")
styleInjectElement.innerHTML = `{STYLE_INJECT_HERE}`
document.body.appendChild(styleInjectElement)
