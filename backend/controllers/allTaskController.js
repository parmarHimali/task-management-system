import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Tasks from "./../model/taskSchema.js";

export const getAllTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Tasks.find();
  res.status(200).json({
    success: true,
    tasks,
  });
});
export const completedTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Tasks.find({ completed: true });
  if (!tasks) {
    return next(new ErrorHandler("There is not any completed tasks", 400));
  }
  res.status(200).json({
    success: true,
    tasks,
  });
});

export const incompleteTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Tasks.find({ completed: false });
  if (!tasks) {
    return next(new ErrorHandler("There is not any incomplete tasks", 400));
  }
  res.status(200).json({
    success: true,
    tasks,
  });
});
export const postTask = catchAsyncError(async (req, res, next) => {
  const { title, description, priority, dueDate } = req.body;
  if (!title || !description || !priority || !dueDate) {
    return next(new ErrorHandler("Please provide all task details", 400));
  }

  const tasks = await Tasks.create({
    title,
    description,
    priority,
    dueDate,
  });

  res.status(200).json({
    success: true,
    message: "Tasks Created Successfully!",
    tasks,
  });
});

export const deleteTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await Tasks.findById(id);
  if (!task) {
    return next(new ErrorHandler("Oops! Task not found!"), 400);
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task deleted successfully!",
  });
});

export const updateComplete = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = await Tasks.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }
  task.completed = completed;
  await task.save();

  res.status(200).json({
    success: true,
    message: `${
      task.completed ? "Task completed successfully!" : "Task is incomplete!"
    }`,
    task,
  });
});

export const updateTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, completed } = req.body;
  if (
    !title ||
    !description ||
    !priority ||
    !dueDate ||
    completed === undefined
  ) {
    return next(new ErrorHandler("Please provide all task details", 400));
  }
  const task = await Tasks.findById(id);
  if (!task) {
    return next(new ErrorHandler("Oops! task not found"));
  }
  const updatedTask = await Tasks.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    success: true,
    message: "Task Updated Successfully!",
    updatedTask,
  });
});

export const highTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Tasks.find({ priority: "High" });
  if (!tasks) {
    return next(new ErrorHandler("High priority task not found!"));
  }
  res.status(200).json({
    success: "true",
    tasks,
  });
});
export const meduimTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Tasks.find({ priority: "Meduim" });
  if (!tasks) {
    return next(new ErrorHandler("Meduim priority task not found!"));
  }
  res.status(200).json({
    success: "true",
    tasks,
  });
});
export const lowTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Tasks.find({ priority: "Low" });
  if (!tasks) {
    return next(new ErrorHandler("Low priority task not found!"));
  }
  res.status(200).json({
    success: "true",
    tasks,
  });
});
