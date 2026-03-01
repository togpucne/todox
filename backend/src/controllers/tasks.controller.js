import Tasks from "../model/Tasks.js";

//  Get all tasks
export const getAllTasks = async (req, res) => {
  // default to "all" so front-end that doesn't pass a filter still gets all tasks
  const { filter = "all" } = req.query;
  const now = new Date();
  let startDate;
  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      // use a 7-day window (from now back 7 days)
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      startDate = new Date(weekAgo.getFullYear(), weekAgo.getMonth(), weekAgo.getDate());
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default: {
      startDate = null;
    }
  }
  // query should use `createdAt` (timestamp field) and only add filter when startDate set
  const query = startDate ? { createdAt: { $gte: startDate } } : {};
  try {
    // pull counts and total in one aggregation
    const counts = await Tasks.aggregate([
      { $match: query },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          activeTasksCount: [
            { $match: { status: "active" } },
            { $count: "count" },
          ],
          completedTasksCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const totalCount = counts[0].totalCount[0]?.count || 0;
    const activeTasksCount = counts[0].activeTasksCount[0]?.count || 0;
    const completedTasksCount = counts[0].completedTasksCount[0]?.count || 0;

    // pagination request parameters (only apply if both provided)
    let tasksQuery = Tasks.find(query).sort({ createdAt: -1 });
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      tasksQuery = tasksQuery.skip(skip).limit(limit);
    }

    const tasks = await tasksQuery;

    res.status(200).json({ tasks, activeTasksCount, completedTasksCount, totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Create a new task
export const createTasks = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Tasks({
      title,
      description,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: error.message });
  }
};
//  Update a task
export const updateTasks = async (req, res) => {
  try {
    const { title, description, status, completedAt } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        completedAt,
      },
      {
        returnDocument: "after",
      },
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      console.log("Task not found");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
};
//  Delete  a task
export const deleteTasks = async (req, res) => {
  try {
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      console.log("Task not found");
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: error.message });
  }
};
