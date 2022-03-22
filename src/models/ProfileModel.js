const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    file: {
        type: Buffer,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model("Profile", profileSchema);
