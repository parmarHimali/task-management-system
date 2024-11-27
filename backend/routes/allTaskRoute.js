import express from "express";
import {
  completedTasks,
  deleteTask,
  getAllTasks,
  highTasks,
  incompleteTasks,
  lowTasks,
  meduimTasks,
  postTask,
  updateComplete,
  updateTask,
} from "../controllers/allTaskController.js";

const router = express.Router();

router.get("/allTasks", getAllTasks);
router.get("/completedTasks", completedTasks);
router.get("/incompleteTasks", incompleteTasks);
router.get("/highTasks", highTasks);
router.get("/meduimTasks", meduimTasks);
router.get("/lowTasks", lowTasks);
router.post("/createTask", postTask);
router.delete("/deleteTask/:id", deleteTask);
router.put("/updateComplete/:id", updateComplete);
router.put("/updateTask/:id", updateTask);
export default router;
