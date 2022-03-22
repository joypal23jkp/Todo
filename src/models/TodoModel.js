const { Schema, model } = require("mongoose");
const validator = require("validator");
const { TodoStatus } = require("../enums/Enum")

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please fill your task name."],
    },
    shedule: {
        type: Date,
        required: [true, "Please fill task shedule."],
        select: false,
    },
    Status: {
        type: String,
        enum: TodoStatus
        default: TodoStatus.WillDo
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updateAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = model("Todo", todoSchema);

// 6238c38fef02672f6a421220
