const API = new OVRT()

window.addEventListener("api-ready", function () {
  API.setCurrentBrowserTitle("VRChat Keyboard")
})

const input = document.getElementById("input")
const sendButton = document.getElementById("send-button")
const clearButton = document.getElementById("clear-button")
const undoButton = document.getElementById("undo-button")

/** @type {'OVR' | 'COMPANION'} */
const MODE = "OVR"

let latestInput = ""
async function clear() {
  latestInput = input.value
  input.value = ""
  await sendTyping(false)
}

function undo() {
  input.value = latestInput
  sendTyping(true)
}

async function sendTyping(isTyping) {
  if (MODE == "OVR") {
    // 0 int
    // 1 float
    // 2 boolean
    API.sendOSCMessage("/chatbox/typing", isTyping, 2)
  } else {
    fetch("http://localhost:9090/typing", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: isTyping,
      }),
    })
  }
}

async function sendInput() {
  const value = input.value

  if (value.length == 0) return

  if (MODE == "OVR") {
    API.sendOSCMessageArray("/chatbox/input", [value, true])
  } else {
    await fetch("http://localhost:9090/input", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
      }),
    })
  }

  clear()
}

input.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    sendInput()
  }
})

input.oninput = function () {
  if (input.value.length > 0) {
    sendTyping(true)
  } else {
    sendTyping(false)
  }
}

sendButton.onclick = sendInput
clearButton.onclick = clear
undoButton.onclick = undo
