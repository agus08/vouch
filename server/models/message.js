
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

export default mongoose.model('Message', messageSchema);