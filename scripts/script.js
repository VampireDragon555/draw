// TODO Save Settings and Canvas data
let elementIds = null
let presetLineColors = null
const configUrl = window.location.hostname != "charlesyiu.github.io" ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}/config.json` : "https://cdn.jsdelivr.net/gh/charlesyiu/draw@latest/config.json"
function initialize() {
    fetch(configUrl)
        .then(response => response.json())
        .then(json => {
            elementIds = json.elementIds
            presetLineColors = json.presetLineColors
            document.getElementById("loading-notice").hidden = true
            document.getElementById("shapes").hidden = false
            document.getElementById("settings").hidden = false
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