// TODO Save Settings and Canvas data=
const homePath = window.location.hostname === "vampiredragon555.github.io" ? "/draw" : ""
const mobilePath = `${homePath}/mobile/`
const computerPath = `${homePath}/`
let elementIds = null
let presetLineColors = null
function loadResources() {
    fetch(`${window.location}config.json`)
    .then(response => response.json())
    .then(json => {
        elementIds = json.elementIds
        presetLineColors = json.presetLineColors
        document.getElementById("loading-notice").hidden = true
        document.getElementById("view").hidden = false
        initializeCursor()
        setTool(scribbleTool)
        initializeTools()
        initializeSettings()
    })
}
function initialize() {
    if (!("ontouchstart" in window)) {
        window.location = `${window.location.protocol}//${window.location.host}${computerPath}`
        return
    }
    if (window.location.pathname.endsWith("index.html", window.location.pathname.length - 10) || !window.location.pathname.endsWith("/")) {
        window.location = `${window.location.protocol}//${window.location.host}${mobilePath}`
        return
    }
    if (!elementIds) { document.getElementById("view").hidden = true }
    loadResources()
}
initialize()
