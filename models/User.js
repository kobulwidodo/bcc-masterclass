import mongoose from "mongoose";
import pkg from "validator";
const { isEmail } = pkg;
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
    },
    roles: {
        type: Number,
        default: 0, //user level default
    },
    balance: {
        type: Number,
        default: 0,
    },
    course: [{
        type: Schema.Types.ObjectId,
        ref: "course",
    }],
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect Credentials");
    }
    throw Error("No Email Found");
};

const User = mongoose.model("user", userSchema);

export default User;