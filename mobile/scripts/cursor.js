function updateCursor() {
    const cursorPosition = window.event.touches
    if (cursorPosition[0] === undefined) { return }
    const cursorElement = document.getElementById(elementIds.cursor)
    const cursorDotElement = document.getElementById(elementIds.cursorDot)
    cursorElement.style.width = `${thickness + 2}px`
    cursorElement.style.height = `${thickness + 2}px`

    cursorElement.style.left = `${cursorPosition[0].clientX - (thickness / 2) - 2}px`
    cursorElement.style.top = `${cursorPosition[0].clientY - (thickness / 2) - 2}px`
    cursorDotElement.style.left = `${(thickness - 2) / 2}px`
    cursorDotElement.style.top = `${(thickness - 2) / 2}px`
}
function initializeCursor() {
    document.body.ontouchmove = updateCursor
}