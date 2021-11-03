function updateCursor() {
    const cursorPosition = (mobile ? window.event.touches : [window.event])
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
    if (mobile) { document.body.ontouchmove = updateCursor }
    else { document.body.onmousemove = updateCursor }
}