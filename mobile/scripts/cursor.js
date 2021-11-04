function updateCursor() {
    const cursorPosition = window.event.touches
    if (cursorPosition[0] === undefined) { return }

    const cursorElement = document.getElementById(elementIds.cursor)
    const cursorDotElement = document.getElementById(elementIds.cursorDot)

    cursorElement.hidden = false

    cursorElement.style.width = `${thickness + 2}px`
    cursorElement.style.height = `${thickness + 2}px`

    const leftStyle = `${(Math.round(cursorPosition[0].clientX - (thickness / 2) - 2))}px`
    const topStyle = `${(Math.round(cursorPosition[0].clientY - (thickness / 2) - 2))}px`
    cursorElement.style.left = leftStyle
    cursorElement.style.top = topStyle
    cursorDotElement.style.left = `${(thickness - 2) / 2}px`
    cursorDotElement.style.top = `${(thickness - 2) / 2}px`

    setTimeout(() => {
        if (cursorElement.style.left === leftStyle && cursorElement.style.top === topStyle) {
            cursorElement.hidden = true
        }
    }, 2500)
}
function initializeCursor() {
    document.body.ontouchmove = updateCursor
    document.getElementById(elementIds.cursor).hidden = true
}