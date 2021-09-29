import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from 'cors'
import path from 'path'
import dotenv from "dotenv";
dotenv.config();

import mongoConnect from './config/mongo';
import RoomController from './controllers/room'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(cors())

app.use(express.json());

app.post('/api/join', RoomController.join)

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/dist", "index.html"));
});

const initApp = async () => {
    try {
        await mongoConnect();
        console.log("DB connection established");
        httpServer.listen(process.env.PORT, () => {
            console.log(`HTTP Server listening on ${process.env.PORT}`);
        });
    } catch (e) {
        throw e;
    }
}


io.on("connection", socket => {
    socket.on("join", async ({ username, roomId }) => {
        let room = await RoomController.addUser(username, roomId)
        let messages = await RoomController.getMessages(roomId)

        socket.join(roomId);
        io.to(roomId).emit("roomData", {
            room,
            messages
        });
    })

    socket.on("sendMessage", async (data) => {
        await RoomController.sendMessage(data)
        io.emit("message", data);
    });

    socket.on("disconnect", async () => {
        // should remove user
        console.log("connection disconnected");
    });
})


initApp().catch(err => console.log(`Error on startup! ${err}`));