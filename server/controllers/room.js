import Message from '../models/message';
import Room from "../models/room";

function buildRes(msg, room) {
    return { error: !!!room, message: msg, room }
}


let RoomController = {
    join: (req, res) => {

        const roomId = req.body.roomId.trim();
        const username = req.body.username.trim();
        if (!roomId || !username) return res.json(buildRes('Username and Room cannot be empty', null))

        Room.findOneOrCreate({ roomId: roomId }, (err, result) => {
            if (result) {
                //check if username already taken
                const userExist = result.users.includes(username);
                if (userExist) {
                    return res.json(buildRes('User already taken', null))
                }
            }

            return res.json(buildRes('Joining to room', result))

        });



    },
    addUser: async (username, roomId) => {
        return await Room.findOneAndUpdate({ roomId: roomId }, {
            "$push": { "users": username }
        })
    },
    getMessages: async (roomId) => {
        return await Message
            .find({ roomId: roomId })
            .sort({ _id: -1 })
    },
    sendMessage: (data) => {
        const message = new Message(data)
        return message.save()
    },
    removeUser: async (username, roomId) => {
        return await Room.findOneAndUpdate({ roomId: roomId }, {
            "$pull": { "users": username }
        })
    }
}

export default RoomController;