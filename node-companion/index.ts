import { json } from "body-parser"
import cors from "cors"
import express from "express"
import * as osc from "node-osc"

const client = new osc.Client("localhost", 9000)

const app = express()
app.use(json())
app.use(cors({ origin: "*" }))

app.post("/input", (req, res) => {
  const { value } = req.body

  client.send({
    address: "/chatbox/input",
    args: [
      { type: "string", value },
      { type: "boolean", value: true },
    ],
  })

  res.send("Sent ;)")
})

app.post("/typing", (req, res) => {
  const { value } = req.body

  client.send({
    address: "/chatbox/typing",
    args: [{ type: "boolean", value }],
  })

  res.send("Sent ;)")
})

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 9090
app.listen(PORT, "0.0.0.0", () => {
  console.log("listening on port", PORT)
})
