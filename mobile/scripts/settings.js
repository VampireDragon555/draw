function updateLineColorInputA() { document.getElementById(elementIds.lineColorSettingsInputA).value = lineColor.a * 100 }

function toggleLineColorInputOutline() {
    const lineColorInput = document.getElementById(elementIds.lineColorSettingsInput)
    if (!lineColorInput.style.border) {
        lineColorInput.style.border = "5px solid white"
        if (navigator.vendor ===  "Apple Computer, Inc.") { lineColorInput.style.width = "91.5%" }
        lineColorInput.style.marginTop = "9%"
    } else {
        lineColorInput.style.border = ""
        if (navigator.vendor ===  "Apple Computer, Inc.") { lineColorInput.style.width = "96.5%" }
        lineColorInput.style.marginTop = "10%"
    }
}
function setLineColor() {
    const lineColorInput = document.getElementById(elementIds.lineColorSettingsInput)

    document.getElementById(elementIds.lineColorSettingsGrid).childNodes.forEach(child => { document.getElementById(child.id).style.outline = "" })
    if (!lineColorInput.style.border) { toggleLineColorInputOutline() }

    const hex = lineColorInput.value
    lineColorInput.style.backgroundColor = hex
    r = "0x" + hex[1] + hex[2]
    g = "0x" + hex[3] + hex[4]
    b = "0x" + hex[5] + hex[6]
    lineColor.r = +r
    lineColor.g = +g
    lineColor.b = +b
}

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
        if (color.r === lineColor.r && color.g === lineColor.g && color.b === lineColor.b) {
            singleColorGrid.style.outline = `5px solid white`
        }
        singleColorGrid.onclick = () => {
            lineColorGrid.childNodes.forEach(child => { document.getElementById(child.id).style.outline = "" })
            if (document.getElementById(elementIds.lineColorSettingsInput).style.border) { toggleLineColorInputOutline() }
            singleColorGrid.style.outline = `5px solid white`
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
    else if ( newLineWidth < 1 ) { newLineWidth = 1 }
    thickness = newLineWidth
}

let addLineWidthPressing = false
function addLineWidth() {
    if (addLineWidthPressing) { return }
    addLineWidthPressing = true
    const addLineWidthSettingsButton = document.getElementById(elementIds.addLineWidthSettingsButton)
    function stopAddLineWidth() {
        addLineWidthPressing = false
        addLineWidthSettingsButton.ontouchend = null
    }
    function addLineWidthAction() {
        if (thickness >= 150) { return }
        thickness += 1
        updateLineWidthInput()
    }
    function repeatAddLineWidthAction() {
        if (!addLineWidthPressing) { return }
        addLineWidthAction()
        setTimeout(repeatAddLineWidthAction, 125)
    }
    addLineWidthSettingsButton.ontouchend = stopAddLineWidth
    addLineWidthAction()
    setTimeout(() => { if (addLineWidthPressing) { repeatAddLineWidthAction() } }, 1000)
}

let minusLineWidthPressing = false
function minusLineWidth() {
    if (minusLineWidthPressing) { return }
    minusLineWidthPressing = true
    const minusLineWidthSettingsButton = document.getElementById(elementIds.minusLineWidthSettingsButton)
    function stopMinusLineWidth() {
        minusLineWidthPressing = false
        minusLineWidthSettingsButton.ontouchend = null
    }
    function minusLineWidthAction() {
        if (thickness <= 1) { return }
        thickness -= 1
        updateLineWidthInput()
    }
    function repeatMinusLineWidthAction() {
        if (!minusLineWidthPressing) { return }
        minusLineWidthAction()
        setTimeout(repeatMinusLineWidthAction, 125)
    }
    minusLineWidthSettingsButton.ontouchend = stopMinusLineWidth
    minusLineWidthAction()
    setTimeout(() => { if (minusLineWidthPressing) { repeatMinusLineWidthAction() } }, 1000)
}

let removedActions = []

let undoPressing = false
function undo() {
    if (undoPressing) { return }
    undoPressing = true
    const undoButton = document.getElementById(elementIds.undoButton)
    function stopUndo() {
        undoPressing = false
        undoButton.ontouchend = null
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
        if (!undoPressing) { return }
        undoAction()
        setTimeout(repeatUndoAction, 125)
    }
    undoButton.ontouchend = stopUndo
    undoAction()
    setTimeout(() => { if (undoPressing) { repeatUndoAction() } }, 1000)
}

let redoPressing = false
function redo() {
    if (redoPressing) { return }
    redoPressing = true
    const redoButton = document.getElementById(elementIds.redoButton)
    function stopRedo() {
        redoPressing = false
        redoButton.ontouchend = null
    }
    function redoAction() {
        if (action = removedActions.pop()) {
            if (action.type === actionTypes.draw) {
                actions.push(action)
                shapesElement.appendChild(action.element)
            }
        }
    }
    function repeatRedoAction() {
        if (!redoPressing) { return }
        redoAction()
        setTimeout(repeatRedoAction, 125)
    }
    redoButton.ontouchend = stopRedo
    redoAction()
    setTimeout(() => { if (redoPressing) { repeatRedoAction() } }, 1000)
}

let clearCanvasPressed = false
function resetClearCanvasButton() {
    const clearCanvasButton = document.getElementById(elementIds.clearCanvasButton)
    clearCanvasButton.textContent = "Clear Canvas"
    clearCanvasButton.onclick = clearCanvasComfirm
}
function clearCanvasComfirm() {
    clearCanvasPressed = false

    const clearCanvasButton = document.getElementById(elementIds.clearCanvasButton)
    clearCanvasButton.textContent = "Click To Comfirm"
    clearCanvasButton.onclick = clearCanvas

    setTimeout(() => { if (!clearCanvasPressed) { resetClearCanvasButton() } }, 2500)
}
function clearCanvas() {
    clearCanvasPressed = true

    resetClearCanvasButton()

    while (shapesElement.hasChildNodes()) {
        shapesElement.removeChild(shapesElement.firstChild)
    }
    removedActions = []
    actions = []
}

function initializeSettings() {
    generateLineColorGrid()
    document.getElementById(elementIds.lineColorSettingsInputA).oninput = setLineColorA
    document.getElementById(elementIds.lineColorSettingsInputA).value = lineColor.a
    updateLineColorInputA()
    document.getElementById(elementIds.lineColorSettingsInput).oninput = setLineColor
    if (navigator.vendor ===  "Apple Computer, Inc.") {
        document.getElementById(elementIds.lineColorSettingsInput).style.width = "96.5%"
    }
    document.getElementById(elementIds.lineColorSettingsDiv).hidden = true
    document.getElementById(elementIds.showLineColorSettingsButton).onclick = () => {
        const lineColorSettingsDiv = document.getElementById(elementIds.lineColorSettingsDiv)
        lineColorSettingsDiv.hidden = !lineColorSettingsDiv.hidden
        document.getElementById(elementIds.showLineColorSettingsButton).textContent = lineColorSettingsDiv.hidden ? "Show Color" : "Hide Color"
    }
    document.getElementById(elementIds.lineWidthSettingsInput).oninput = setLineWidth
    document.getElementById(elementIds.lineWidthSettingsInput).value = thickness
    updateLineWidthInput()
    document.getElementById(elementIds.lineWidthSettingsDiv).hidden = true
    document.getElementById(elementIds.showLineWidthSettingsButton).onclick = () => {
        const lineWidthSettingsDiv = document.getElementById(elementIds.lineWidthSettingsDiv)
        lineWidthSettingsDiv.hidden = !lineWidthSettingsDiv.hidden
        document.getElementById(elementIds.showLineWidthSettingsButton).textContent = lineWidthSettingsDiv.hidden ? "Show Width" : "Hide Width"
    }
    document.getElementById(elementIds.undoButton).ontouchstart = undo
    document.getElementById(elementIds.redoButton).ontouchstart = redo
    document.getElementById(elementIds.addLineWidthSettingsButton).ontouchstart = addLineWidth
    document.getElementById(elementIds.minusLineWidthSettingsButton).ontouchstart = minusLineWidth
    document.getElementById(elementIds.clearCanvasButton).onclick = clearCanvasComfirm
    document.getElementById(elementIds.showSettingsButton).onclick = () => {
        document.getElementById(elementIds.showSettingsButton).hidden = true
        document.getElementById(elementIds.settingsDiv).hidden = false
    }
    document.getElementById(elementIds.hideSettingsButton).onclick = () => {
        document.getElementById(elementIds.settingsDiv).hidden = true
        document.getElementById(elementIds.showSettingsButton).hidden = false
    }
}