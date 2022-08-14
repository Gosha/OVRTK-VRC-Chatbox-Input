const API = new OVRT()

const sendButton = document.getElementById("enable-input")
async function enableInput() {
  const overlay = await API.spawnOverlay({
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    size: 0.5,
    opacity: 1,
    curvature: 0,
    framerate: 30,
    ecoMode: true,
    lookHiding: false,
    attachedDevice: 0,
    shouldSave: true,
  })

  overlay.setContent(0, {
    url: "input.html",
    width: 1000,
    height: 225,
  })
}

sendButton.onclick = enableInput
