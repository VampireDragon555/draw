let elementIds = null
fetch("https://cdn.jsdelivr.net/gh/charlesyiu/draw@latest/config.json")
    .then(response => response.json())
    .then(json => {
        elementIds = json.elementIds
        document.getElementById("loading-notice").hidden = true
        document.getElementById("shapes").hidden = false
        document.getElementById("settings").hidden = false
        activateDraw()
        activateSettings()
    })
if (!elementIds) {
    document.getElementById("shapes").hidden = true
    document.getElementById("settings").hidden = true
}
const mobile = "ontouchstart" in window