const mobile = "ontouchstart" in window


function generateRandomId(characterCount) {
    id = [...Array(characterCount)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    while (document.getElementById(id)) {
        id = [...Array(characterCount)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    }
    return(id)
}


let drawing = false
let lines = {}
let lineWidth = 10

const shapesElement = document.getElementById("shapes")

function drawLine() {
    const lineElement = document.createElement("div")
    const lineId = generateRandomId(7)


    lineElement.id = lineId
    shapesElement.appendChild(lineElement)

    const lineShape = shapify(lineElement)
    lineShape.lineWidth = lineWidth > 150 ? 150 : (lineWidth < 1 ? 1 : lineWidth)

    if (mobile) {
        lineShape.x = window.event.touches[0].clientX
        lineShape.y = window.event.touches[0].clientY
    } else {
        lineShape.x = window.event.clientX
        lineShape.y = window.event.clientY
    }

    function finalLine() {
        drawing = false
        if (mobile) {
            shapesElement.ontouchmove = null
            shapesElement.ontouchend = null
        } else {
            shapesElement.onmousemove = null
            shapesElement.onmouseup = null
        }
        lines[lineId] = {"element": lineElement, "shape": lineShape}
    }

    function updateLine() {
        window.event.preventDefault()
        
        lineShape.lines = []
        if (mobile) {
            lineShape.appendLine("line", {"x": 0, "y": 0}, {"x": window.event.touches[0].clientX - lineShape.x, "y": window.event.touches[0].clientY - lineShape.y})
        } else {
            lineShape.appendLine("line", {"x": 0, "y": 0}, {"x": window.event.clientX - lineShape.x, "y": window.event.clientY - lineShape.y})
        }
        lineShape.refresh()
    }

    if (mobile) {
        shapesElement.ontouchmove = updateLine
        shapesElement.ontouchend = finalLine
    } else {
        shapesElement.onmousemove = updateLine
        shapesElement.onmouseup = finalLine
    }
}

function draw() {
    if (!drawing) {
        drawing = true
        drawLine()
    }
    console.log("click")
}

if (mobile) { shapesElement.ontouchstart = draw }
else { shapesElement.onmousedown = draw }


const lineWidthHeader = document.getElementById("settings-linewidth-value")

function updateLineWidthHeader() {
    lineWidthHeader.value = lineWidth
}

function setLineWidth() {
    lineWidth = parseInt(lineWidthHeader.value, 10)
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

document.getElementById("settings-linewidth-add").onclick = addLineWidth
document.getElementById("settings-linewidth-minus").onclick = minusLineWidth

lineWidthHeader.oninput = setLineWidth
lineWidthHeader.value = lineWidth

updateLineWidthHeader()


function clearCanvas() {
    for (key in lines) {
        shapesElement.removeChild(lines[key]["element"])
    }
    lines = {}
}

document.getElementById("settings-reset").onclick = clearCanvas


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

document.getElementById("settings-undoredo-undo").onclick = undo
document.getElementById("settings-undoredo-redo").onclick = redo