const settingsElement = document.getElementById("settings")

function updateLineWidthHeader() {
    document.getElementById(elementIds.lineWidthSettingsInput).value = lineWidth
}

function setLineWidth() {
    lineWidth = parseInt(document.getElementById(elementIds.lineWidthSettingsInput).value, 10)
}

function addLineWidth() {
    if (lineWidth >= 150) { return }
    lineWidth += 1
    updateLineWidthHeader()
}

function minusLineWidth() {
    if (lineWidth <= 1) { return }
    lineWidth -= 1
    updateLineWidthHeader()
}

let lastUndoLines = []

function undo() {
    if (lineKey = Object.keys(lines)[Object.keys(lines).length - 1]) {
        const line = lines[lineKey]
        shapesElement.removeChild(document.getElementById(lineKey))
        delete lines[lineKey]
        if (lastUndoLines.length >= 10) { lastUndoLines.splice(0, 1) }
        lastUndoLines.push({"key": lineKey, "line": line})
    }
}

function redo() {
    if (lineData = lastUndoLines.pop()) {
        const lineKey = lineData["key"]
        const line = lineData["line"]
        lines[lineKey] = line
        shapesElement.appendChild(line["element"])
    }
}


// Clear Canvas
function clearCanvas() {
    for (key in lines) {
        shapesElement.removeChild(lines[key]["element"])
    }
    lines = {}
}

function activateSettings() {
    settingsElement.hidden = false
    document.getElementById(elementIds.addLineWidthSettingsButton).onclick = addLineWidth
    document.getElementById(elementIds.minusLineWidthSettingsButton).onclick = minusLineWidth
    document.getElementById(elementIds.lineWidthSettingsInput).oninput = setLineWidth
    document.getElementById(elementIds.lineWidthSettingsInput).value = lineWidth
    updateLineWidthHeader()
    document.getElementById(elementIds.undoButton).onclick = undo
    document.getElementById(elementIds.redoButton).onclick = redo
    document.getElementById(elementIds.clearCanvasButton).onclick = clearCanvas
}
settingsElement.hidden = true