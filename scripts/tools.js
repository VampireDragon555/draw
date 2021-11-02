const mobile = "ontouchstart" in window

const shapesElement = document.getElementById("shapes")

const actionTypes = {"draw": "draw"}
let actions = []

let lineColor = {"r": 0, "g": 0, "b": 0, "a": 1}
let thickness = 10
let usingTool = false

function formatColor(color) {
    return(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ? color.a : 1})`)
}
function generateRandomId(characterCount) {
    id = [...Array(characterCount)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    while (document.getElementById(id)) {
        id = [...Array(characterCount)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    }
    return(id)
}

function setTool(tool) {
    if (mobile) { shapesElement.ontouchstart = tool }
    else { shapesElement.onmousedown = tool }
}

function drawLine(shapeElement, drawnLine) {
    const lineId = generateRandomId(7)
    const cursor = (mobile ? window.event.touches : [window.event])
    const position = {"x": cursor[0].clientX, "y": cursor[0].clientY}
    function updateLine() {
        window.event.preventDefault()
        const cursor = (mobile ? window.event.touches : [window.event])

        shapeElement.lines.pop()
        shapeElement.appendLine(lineId, {"x": position.x - shapeElement.x, "y": position.y - shapeElement.y}, {"x": cursor[0].clientX - shapeElement.x, "y": cursor[0].clientY - shapeElement.y})
        shapeElement.refresh()
    }
    function finalLine() {
        updateLine()
        if (mobile) {
            shapesElement.ontouchmove = null
            shapesElement.ontouchend = null
        } else {
            shapesElement.onmousemove = null
            shapesElement.onmouseup = null
        }
        if (drawnLine) { drawnLine({"shapeElement": shapeElement, "lineId": lineId}) }
    }
    if (mobile) {
        shapesElement.ontouchmove = updateLine
        shapesElement.ontouchend = finalLine
    } else {
        shapesElement.onmousemove = updateLine
        shapesElement.onmouseup = finalLine
    }
}

function lineTool() {
    if (usingTool) { return }
    usingTool = true

    const lineElement = document.createElement("div")
    lineElement.id = generateRandomId(7)
    shapesElement.appendChild(lineElement)

    const lineShape = shapify(lineElement)
    lineShape.x = 0
    lineShape.y = 0
    lineShape.lineColor = formatColor(lineColor)
    lineShape.lineWidth = thickness

    drawLine(lineShape, () => {
        usingTool = false
        actions.push({"type": actionTypes.draw, "element": lineElement, "shape": lineShape})
    })
}

// function shapeTool() {
//     if (usingTool) { return }
//     usingTool = true

//     const shapeElement = document.createElement("div")
//     shapeElement.id = generateRandomId(7)
//     shapesElement.appendChild(shapeElement)

//     const shapeShape = shapify(shapeElement)
//     shapeShape.x = 0
//     shapeShape.y = 0
//     shapeShape.lineColor = formatColor(lineColor)
//     shapeShape.lineWidth = thickness

    
// }