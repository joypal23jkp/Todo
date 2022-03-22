const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please fill your email."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please Provide a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please fill your password."],
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please fill your password confirm"],
        validate: {
            validator: function(el) {
                // "this" works only on create and save
                return el === this.password;
            },
            message: "Your password and confirmation password are not the same",
        },
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profie'
    },
    todos: {
        type: Schema.Types.ObjectId,
        ref: 'Todo'
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

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre("save", async function(next) {
    // check the password if it is modified
    if (!this.isModified("password")) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12)

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function(
    typedPassword,
    originalPassword,
) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

module.exports = model("User", userSchema);

