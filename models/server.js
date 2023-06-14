const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")
const cors = require("cors")
const Sockets = require("./sockets")

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.server = http.createServer(this.app)
        this.io = socketio(this.server)
        this.sockets = new Sockets(this.io)
    }

    middleWares(){
        this.app.use(express.static(path.resolve(__dirname, "../public")))
        this.app.use(cors())
        this.app.get("/ultimos", (req, res) => {
            res.json({
                ok: true,
                ultimos: this.sockets.ticketList.ultimos13
            })
        })
    }

    // configurarSockets(){
    //     new Sockets(this.io)
    // }

    execute(){
        this.middleWares()

        this.server.listen(this.port, () => {
            console.log("PUERTO USADO => " + this.port)
        })
    }
}

module.exports = Server