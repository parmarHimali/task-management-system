import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    minLength: [3, "Title must contain atleast 3 characters"],
    maxLength: [30, "Title cannot exceed 30 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    minLength: [3, "Description must contain atleast 3 characters"],
    maxLength: [250, "Description cannot exceed 250 characters"],
  },
  priority: {
    type: String,
    default: "Low",
    enum: ["Low", "Meduim", "High"],
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide Due Date"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tasks = mongoose.model("Tasks", taskSchema);
export default Tasks;
