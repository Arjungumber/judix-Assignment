const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    assignedTo: String,
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    dueDate: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Task", taskSchema);
