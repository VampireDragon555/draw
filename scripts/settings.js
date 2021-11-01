function setLineColorR() {
    let newLineColorR = parseInt(document.getElementById(elementIds.lineColorSettingsInputR).value, 10)
    if (newLineColorR > 255) { newLineColorR = 255 }
    else if ( newLineColorR < 0 ) { newLineColorR = 0 }
    lineColor.r = newLineColorR
}

function setLineColorG() {
    let newLineColorG = parseInt(document.getElementById(elementIds.lineColorSettingsInputG).value, 10)
    if (newLineColorG > 255) { newLineColorG = 255 }
    else if ( newLineColorG < 0 ) { newLineColorG = 0 }
    lineColor.g = newLineColorG
}

function setLineColorB() {
    let newLineColorB = parseInt(document.getElementById(elementIds.lineColorSettingsInputB).value, 10)
    if (newLineColorB > 255) { newLineColorB = 255 }
    else if ( newLineColorB < 0 ) { newLineColorB = 0 }
    lineColor.b = newLineColorB
}

function setLineColorA() {
    let newLineColorA = parseInt(document.getElementById(elementIds.lineColorSettingsInputA).value, 10)
    if (newLineColorA > 1) { newLineColorA = 1 }
    else if ( newLineColorA < 0 ) { newLineColorA = 0 }
    lineColor.a = newLineColorA
}


function updateLineWidthHeader() { document.getElementById(elementIds.lineWidthSettingsInput).value = lineWidth }

function setLineWidth() {
    let newLineWidth = parseInt(document.getElementById(elementIds.lineWidthSettingsInput).value, 10)
    if (newLineWidth > 150) { newLineWidth = 150 }
    else if ( newLineWidth < 1 ) { linewLineWidth = 1 }
    lineWidth = newLineWidth
}

let pressing = false

function addLineWidth() {
    if (pressing) { return }
    pressing = true
    const addLineWidthSettingsButton = document.getElementById(elementIds.addLineWidthSettingsButton)
    function stopAddLineWidth() {
        pressing = false
        if (mobile) { addLineWidthSettingsButton.ontouchend = null }
        else { addLineWidthSettingsButton.onmouseup = null }
    }
    function addLineWidthAction() {
        if (lineWidth >= 150) { return }
        lineWidth += 1
        updateLineWidthHeader()
    }
    function repeatAddLineWidthAction() {
        if (!pressing) { return }
        addLineWidthAction()
        setTimeout(repeatAddLineWidthAction, 125)
    }
    if (mobile) { addLineWidthSettingsButton.ontouchend = stopAddLineWidth }
    else { addLineWidthSettingsButton.onmouseup = stopAddLineWidth }
    addLineWidthAction()
    setTimeout(() => { if (pressing) { repeatAddLineWidthAction() } }, 1000)
}

function minusLineWidth() {
    if (pressing) { return }
    pressing = true
    const minusLineWidthSettingsButton = document.getElementById(elementIds.minusLineWidthSettingsButton)
    function stopMinusLineWidth() {
        pressing = false
        if (mobile) { minusLineWidthSettingsButton.ontouchend = null }
        else { minusLineWidthSettingsButton.onmouseup = null }
    }
    function minusLineWidthAction() {
        if (lineWidth <= 1) { return }
        lineWidth -= 1
        updateLineWidthHeader()
    }
    function repeatMinusLineWidthAction() {
        if (!pressing) { return }
        minusLineWidthAction()
        setTimeout(repeatMinusLineWidthAction, 125)
    }
    if (mobile) { minusLineWidthSettingsButton.ontouchend = stopMinusLineWidth }
    else { minusLineWidthSettingsButton.onmouseup = stopMinusLineWidth }
    minusLineWidthAction()
    setTimeout(() => { if (pressing) { repeatMinusLineWidthAction() } }, 1000)
}

let lastUndoLines = []

function undo() {
    if (pressing) { return }
    pressing = true
    const undoButton = document.getElementById(elementIds.undoButton)
    function stopUndo() {
        pressing = false
        if (mobile) { undoButton.ontouchend = null }
        else { undoButton.onmouseup = null }
    }
    function undoAction() {
        if (lineKey = Object.keys(lines)[Object.keys(lines).length - 1]) {
            const line = lines[lineKey]
            shapesElement.removeChild(document.getElementById(lineKey))
            delete lines[lineKey]
            if (lastUndoLines.length >= 10) { lastUndoLines.splice(0, 1) }
            lastUndoLines.push([{"key": lineKey, "line": line}])
        }
    }
    function repeatUndoAction() {
        if (!pressing) { return }
        undoAction()
        setTimeout(repeatUndoAction, 125)
    }
    if (mobile) { undoButton.ontouchend = stopUndo }
    else { undoButton.onmouseup = stopUndo }
    undoAction()
    setTimeout(() => { if (pressing) { repeatUndoAction() } }, 1000)
}

function redo() {
    if (pressing) { return }
    pressing = true
    const redoButton = document.getElementById(elementIds.redoButton)
    function stopRedo() {
        pressing = false
        if (mobile) { redoButton.ontouchend = null }
        else { redoButton.onmouseup = null }
    }
    function redoAction() {
        if (linesData = lastUndoLines.pop()) {
            linesData.forEach(lineData => {
                const lineKey = lineData.key
                const line = lineData.line
                lines[lineKey] = line
                shapesElement.appendChild(line.element)
            })
        }
    }
    function repeatRedoAction() {
        if (!pressing) { return }
        redoAction()
        setTimeout(repeatRedoAction, 125)
    }
    if (mobile) { redoButton.ontouchend = stopRedo }
    else { redoButton.onmouseup = stopRedo }
    redoAction()
    setTimeout(() => { if (pressing) { repeatRedoAction() } }, 1000)
}

function clearCanvasComfirm() {
    const clearCanvasButton = document.getElementById(elementIds.clearCanvasButton)
    clearCanvasButton.textContent = "Click To Comfirm"
    clearCanvasButton.onclick = clearCanvas
}

function clearCanvas() {
    const clearCanvasButton = document.getElementById(elementIds.clearCanvasButton)
    clearCanvasButton.textContent = "Clear Canvas"
    clearCanvasButton.onclick = clearCanvasComfirm
    let undolines = []
    for (key in lines) {
        const line = lines[key]
        shapesElement.removeChild(lines[key].element)
        undolines.push({"key": key, "line": line})
    }
    lastUndoLines.push(undolines)
    lines = {}
}

function activateSettings() {
    document.getElementById("settings").hidden = false

    document.getElementById(elementIds.lineColorSettingsInputR).oninput = setLineColorR
    document.getElementById(elementIds.lineColorSettingsInputR).value = lineColor.r
    document.getElementById(elementIds.lineColorSettingsInputG).oninput = setLineColorG
    document.getElementById(elementIds.lineColorSettingsInputG).value = lineColor.g
    document.getElementById(elementIds.lineColorSettingsInputB).oninput = setLineColorB
    document.getElementById(elementIds.lineColorSettingsInputB).value = lineColor.b
    document.getElementById(elementIds.lineColorSettingsInputA).oninput = setLineColorA
    document.getElementById(elementIds.lineColorSettingsInputA).value = lineColor.a
    document.getElementById(elementIds.lineWidthSettingsInput).oninput = setLineWidth
    document.getElementById(elementIds.lineWidthSettingsInput).value = lineWidth
    updateLineWidthHeader()
    if (mobile) {
        document.getElementById(elementIds.undoButton).ontouchstart = undo
        document.getElementById(elementIds.redoButton).ontouchstart = redo
        document.getElementById(elementIds.addLineWidthSettingsButton).ontouchstart = addLineWidth
        document.getElementById(elementIds.minusLineWidthSettingsButton).ontouchstart = minusLineWidth
    }
    else {
        document.getElementById(elementIds.undoButton).onmousedown = undo
        document.getElementById(elementIds.redoButton).onmousedown = redo
        document.getElementById(elementIds.addLineWidthSettingsButton).onmousedown = addLineWidth
        document.getElementById(elementIds.minusLineWidthSettingsButton).onmousedown = minusLineWidth
    }
    document.getElementById(elementIds.clearCanvasButton).onclick = clearCanvasComfirm
}
document.getElementById("settings").hidden = true