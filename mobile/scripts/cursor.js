function updateCursor() {
    const cursorPosition = window.event.touches
    if (cursorPosition[0] === undefined) { return }

    const cursorThumbElement = document.getElementById(elementIds.cursorThumb)
    const cursorElement = document.getElementById(elementIds.cursor)
    const cursorDotElement = document.getElementById(elementIds.cursorDot)

    cursorThumbElement.hidden = false

    const dividedThickness = thickness / 2
    const cursorElementSize = `${thickness + 2}px`
    cursorElement.style.width = cursorElementSize
    cursorElement.style.height = cursorElementSize

    const leftStyle = `${(Math.round(cursorPosition[0].clientX - 38))}px`
    const topStyle = `${(Math.round(cursorPosition[0].clientY - 38))}px`
    cursorThumbElement.style.left = leftStyle
    cursorThumbElement.style.top = topStyle

    const cursorElementOffset = `${38 - dividedThickness}px`
    cursorElement.style.left = cursorElementOffset
    cursorElement.style.top = cursorElementOffset

    const cursorDotElementOffset = `${dividedThickness - 1}px`
    cursorDotElement.style.left = cursorDotElementOffset
    cursorDotElement.style.top = cursorDotElementOffset

    setTimeout(() => {
        if (cursorThumbElement.style.left == leftStyle && cursorThumbElement.style.top == topStyle) { cursorThumbElement.hidden = true }
    }, 500)
}
function initializeCursor() {
    document.body.ontouchmove = updateCursor
    document.body.ontouchstart = updateCursor
    document.getElementById(elementIds.cursorThumb).hidden = true
}