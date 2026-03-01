import express from "express";
const route = express.Router();
// Task Controllers
import { getAllTasks, createTasks, updateTasks, deleteTasks}  from "../controllers/tasks.controller.js";

route.get("/",getAllTasks )
route.post("/",createTasks)
route.put("/:id", updateTasks)
route.delete("/:id", deleteTasks)

export default route;