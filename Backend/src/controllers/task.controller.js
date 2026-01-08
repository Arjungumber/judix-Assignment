const Task = require("../models/task.model");

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const { status, sort, search } = req.query;
        const { id, role } = req.user;

        let query = {};

        if (role !== "admin") {
        query.createdBy = id;
        }

        if (status) query.status = status;

        if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { assignedTo: { $regex: search, $options: "i" } },
        ];
        }

        let tasks = Task.find(query).populate("createdBy");
        if (sort === "dueDate") tasks = tasks.sort({ dueDate: 1 });

        const result = await tasks;
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role !== "admin") {
      res
        .status(403)
        .json({ message: "Forbidden: Only admins can update tasks" });
      return;
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role !== "admin") {
      res
        .status(403)
        .json({ message: "Forbidden: Only admins can delete tasks" });
      return;
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
