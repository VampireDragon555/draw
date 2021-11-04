function updateCursor() {
    const cursorPosition = [window.event]
    if (cursorPosition[0] === undefined) { return }

    const cursorElement = document.getElementById(elementIds.cursor)
    const cursorDotElement = document.getElementById(elementIds.cursorDot)

    cursorElement.hidden = false

    const dividedThickness = thickness / 2
    const cursorElementSize = `${thickness + 2}px`
    cursorElement.style.width = cursorElementSize
    cursorElement.style.height = cursorElementSize

    const leftStyle = `${(Math.round(cursorPosition[0].clientX - dividedThickness - 2))}px`
    const topStyle = `${(Math.round(cursorPosition[0].clientY - dividedThickness - 2))}px`
    cursorElement.style.left = leftStyle
    cursorElement.style.top = topStyle

    const cursorDotElementOffset = `${dividedThickness - 1}px`
    cursorDotElement.style.left = cursorDotElementOffset
    cursorDotElement.style.top = cursorDotElementOffset

    setTimeout(() => {
        if (cursorElement.style.left == leftStyle && cursorElement.style.top == topStyle) { cursorElement.hidden = true }
    }, 2500)
}
function initializeCursor() {
    document.body.onmousemove = updateCursor
    document.getElementById(elementIds.cursor).hidden = true
}