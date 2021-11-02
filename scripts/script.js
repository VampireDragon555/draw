let elementIds = null
let presetLineColors = null
const configUrl = window.location.hostname === "127.0.0.1" ? `${window.location.protocol}//127.0.0.1:${window.location.port}/config.json` : "https://cdn.jsdelivr.net/gh/charlesyiu/draw@latest/config.json"
fetch(configUrl)
    .then(response => response.json())
    .then(json => {
        elementIds = json.elementIds
        presetLineColors = json.presetLineColors
        document.getElementById("loading-notice").hidden = true
        document.getElementById("shapes").hidden = false
        document.getElementById("settings").hidden = false
        setTool(lineTool)
        activateSettings()
    })
if (!elementIds) {
    document.getElementById("shapes").hidden = true
    document.getElementById("settings").hidden = true
}