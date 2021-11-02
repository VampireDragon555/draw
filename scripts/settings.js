function updateLineColorInput() { document.getElementById(elementIds.lineColorSettingsInputA).value = lineColor.a * 100 }

function setLineColorA() {
    let newLineColorA = parseInt(document.getElementById(elementIds.lineColorSettingsInputA).value, 10) / 100
    if (newLineColorA > 1) { newLineColorA = 1 }
    else if ( newLineColorA < 0.015 ) { newLineColorA = 0.015 }
    lineColor.a = newLineColorA
}

function generateLineColorGrid() {
    const lineColorGrid = document.getElementById(elementIds.lineColorSettingsGrid)
    let moveLeft = 0
    let totalCount = 0
    let count = 0
    const size = 16
    presetLineColors.forEach(color => {
        if (count === 4) {
            count = 0
            moveLeft += size
        }
        const singleColorGrid = document.createElement("div")
        singleColorGrid.id = generateRandomId(7)
        singleColorGrid.style.position = "relative"
        singleColorGrid.style.width = `${size}px`
        singleColorGrid.style.height = `${size}px`
        singleColorGrid.style.left = `${moveLeft}px`
        singleColorGrid.style.top = `-${(totalCount * size) - (count * size)}px`
        singleColorGrid.style.backgroundColor = formatColor(color)
        singleColorGrid.setAttribute("r", color.r.toString())
        singleColorGrid.setAttribute("g", color.g.toString())
        singleColorGrid.setAttribute("b", color.b.toString())
        singleColorGrid.onclick = () => {
            lineColorGrid.childNodes.forEach(child => { document.getElementById(child.id).style.outline = "" })
            singleColorGrid.style.outline = `5px solid white`
            singleColorGrid.style.outlineOffset = `${size - 10}`
            lineColor.r = parseInt(color.r, 10)
            lineColor.g = parseInt(color.g, 10)
            lineColor.b = parseInt(color.b, 10)
        }
        lineColorGrid.appendChild(singleColorGrid)
        totalCount += 1
        count += 1
    })
    lineColorGrid.style.height = `${4 * size}px`
}

function updateLineWidthInput() { document.getElementById(elementIds.lineWidthSettingsInput).value = thickness }


function setLineWidth() {
    let newLineWidth = parseInt(document.getElementById(elementIds.lineWidthSettingsInput).value, 10)
    if (newLineWidth > 150) { newLineWidth = 150 }
    else if ( newLineWidth < 1 ) { linewLineWidth = 1 }
    thickness = newLineWidth
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
        if (thickness >= 150) { return }
        thickness += 1
        updateLineWidthInput()
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
        if (thickness <= 1) { return }
        thickness -= 1
        updateLineWidthInput()
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

let removedActions = []

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
        if (action = actions.pop()) {
            if (action.type === actionTypes.draw) {
                const shapeId = action.shape.id
                shapesElement.removeChild(document.getElementById(shapeId))
                if (removedActions.length >= 10) { removedActions.splice(0, 1) }
                removedActions.push(action)
            }
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
        if (action = removedActions.pop()) {
            if (action.type === actionTypes.draw) {
                const shapeId = action.shape.id
                actions.push(action)
                shapesElement.appendChild(action.element)
            }
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
    while (shapesElement.hasChildNodes()) {
        shapesElement.removeChild(shapesElement.firstChild)
    }
    removedActions = []
    actions = []
}

function activateSettings() {
    document.getElementById("settings").hidden = false
    generateLineColorGrid()
    document.getElementById(elementIds.lineColorSettingsInputA).oninput = setLineColorA
    document.getElementById(elementIds.lineColorSettingsInputA).value = lineColor.a
    updateLineColorInput()
    document.getElementById(elementIds.lineWidthSettingsInput).oninput = setLineWidth
    document.getElementById(elementIds.lineWidthSettingsInput).value = thickness
    updateLineWidthInput()
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