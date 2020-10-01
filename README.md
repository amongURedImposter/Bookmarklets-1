# Bookmarklets

## Installing

Copy the code into the url of a new bookmark and you can run the bookmarklet by clicking it on a page!

## Note

A simple notepad-esque overlay.

```javascript
javascript:function makeDrag(elmnt) {;var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;elmnt.onmousedown = dragMouseDown;function dragMouseDown(e) {;if (e.button === 2) {;e = e || window.event;e.preventDefault();pos3 = e.clientX;pos4 = e.clientY;document.onmouseup = closeDragElement;document.onmousemove = elementDrag;};};function elementDrag(e) {;e = e || window.event;e.preventDefault();pos1 = pos3 - e.clientX;pos2 = pos4 - e.clientY;pos3 = e.clientX;pos4 = e.clientY;elmnt.style.top = (elmnt.offsetTop - pos2) + "px";elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";};function closeDragElement() {;document.onmouseup = null;document.onmousemove = null;};};function spawnNote() {;var noteDiv = document.createElement("div");noteDiv.style.zIndex = "999";var note = document.createElement("textarea");var closeButton = document.createElement("button");note.rows = 20;note.cols = 60;note.placeholder = "Protip: You can move the note with right click";noteDiv.style.position = "fixed";noteDiv.style.top = "10%";noteDiv.style.left = "10%";noteDiv.oncontextmenu = (e) => { return false };closeButton.style.position = "absolute";closeButton.style.top = "100%";closeButton.style.left = "100%";closeButton.innerText = "x";closeButton.onclick = (e) => { noteDiv.remove() };noteDiv.appendChild(note);noteDiv.appendChild(closeButton);makeDrag(noteDiv);document.body.appendChild(noteDiv);};spawnNote();
```
