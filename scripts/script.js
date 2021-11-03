// TODO Save Settings and Canvas data
let elementIds = null
let presetLineColors = null
const port = window.location.port != "" ? `:${window.location.port}` : ""
const configUrl = `${window.location.protocol}//${window.location.hostname}${port}${window.location.pathname}config.json`
function initialize() {
    fetch(configUrl)
        .then(response => response.json())
        .then(json => {
            elementIds = json.elementIds
            presetLineColors = json.presetLineColors
            document.getElementById("loading-notice").hidden = true
            document.getElementById("shapes").hidden = false
            document.getElementById("settings").hidden = false
            initializeCursor()
            setTool(scribbleTool)
            initializeTools()
            initializeSettings()
        })
    if (!elementIds) {
        document.getElementById("shapes").hidden = true
        document.getElementById("settings").hidden = true
    }
}
window.onload = initialize