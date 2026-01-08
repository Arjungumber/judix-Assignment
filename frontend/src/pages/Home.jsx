import { useState } from "react";
import TaskCard from "../component/TaskCard";
import TaskForm from "../component/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "../helpers/tasks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import FilterSortBar from "../component/dropdown";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    status: "Pending",
    dueDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log("Fetching tasks...");
    try {
      const { data } = await getTasks(localStorage.getItem("token"));
      toast.success("Tasks fetched successfully!");
      setTasks(data);
      console.log(tasks);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      console.log(taskData);
      await createTask(taskData, localStorage.getItem("token"));
      setNewTask({
        title: "",
        description: "",
        assignedTo: "",
        status: "Pending",
      });
      setIsModalOpen(false);
      toast.success("Task added successfully!");
      fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    setIsModalOpen(true);
    try {
      await updateTask(id, updatedData, localStorage.getItem("token"));
      setIsModalOpen(false);
      toast.success("Task updated successfully!");
      fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, localStorage.getItem("token"));
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      filterStatus === "All" ? true : task.status === filterStatus
    )
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
      else return new Date(b.dueDate) - new Date(a.dueDate);
    });

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white mb-4 px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <FilterSortBar
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        <div className="relative w-full sm:w-1/3">
          <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-gray-400">
            🔍
          </span>
          <span
            className="absolute inset-y-0 right-12 flex items-center"
            aria-hidden="true"
          >
            <span className="h-6 w-px bg-gray-300"></span>
          </span>
          <input
            type="text"
            placeholder="Search by title or assignee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg pl-4 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <TaskForm
              onAdd={handleAddTask}
              onUpdate={handleUpdateTask}
              taskToEdit={taskToEdit}
              users={users}
            />
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => editTask(task)}
              onDelete={() => handleDelete(task._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
