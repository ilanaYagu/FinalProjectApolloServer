import mongoose, { Schema } from "mongoose";

const EventSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        beginningTime: {
            type: String,
            required: true
        },
        endingTime: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: false
        },
        notificationTime: {
            type: String,
            required: false
        },
        invitedGuests: {
            type: [{
                type: String
            }],
            required: false
        }
    }
);
const Event = mongoose.model("Event", EventSchema);
export default Event;
