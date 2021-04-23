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

// //? Will make element maintain style (className) when it is removed and re-added (aka. re-render)
// function attachStyleMaintainer(elementParent: HTMLElement, style: string) {
//   let reAppend: Node | null = null

//   const observer = new MutationObserver(
//     (mutationRecords) => {
//       for (const record of mutationRecords) {
//         for (const node of record.removedNodes) {
//           if ((node as HTMLElement).className === style) {
//             reAppend = node
//             return
//           }
//         }

//         for (const node of record.addedNodes) {

//         }
//       }
//     }
//   )

//   observer.observe(elementParent, {
//     attributes: true,
//     childList: true,
//     subtree: true
//   })
// }

//* Make Navbar sticky and nicer
const newParent = document.getElementById('body')!
const headerChildren = getFirstXPATHElement(`//header`)!.children

moveChildren(headerChildren, newParent, (child) => {
  if (child.tagName !== "NAV" || !child) return

  child.classList.add('mod-style-stickyNav')
})

getFirstXPATHElement(`//div[@id='header']`)!.remove()
window.scrollTo(0, 0)

//* Inject styles
const styleInjectElement = document.createElement("style")
styleInjectElement.innerHTML = `{STYLE_INJECT_HERE}`
document.body.appendChild(styleInjectElement)
