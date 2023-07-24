import mongoose from "../utils/db.util";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: Object,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", User);