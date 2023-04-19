// require("dotenv")();
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.set("PORT", process.env.PORT || 5000);

app.get("/", (req, res) => {
    res.send("Hello There");
});

io.on("connection", (socket) => {
    console.log(`Connection successful: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected from the server`)
    })
});

server.listen(app.get("PORT"), () =>
    console.log(`Node Server running on port ${app.get("PORT")}`)
);
