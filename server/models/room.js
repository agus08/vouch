
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: String
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

roomSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

export default mongoose.model('Room', roomSchema);